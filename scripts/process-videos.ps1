# Processes the Gemini source clips into web-ready loops.
#  - crop 1120x630 from top-left (removes the baked-in Gemini sparkle watermark,
#    which sits inset around x=1140..1185, y=573..620; no interpolation artifacts)
#  - crossfade the last 1s over the first 1s => seamless 9s loop
#  - encode H.264 mp4 only (VP9 came out LARGER here), no audio, faststart
#  - export a poster frame (also used as the prefers-reduced-motion still)

$src = "C:\MY PROJECTS\my-portfolio\Video Backgrounds"
$dst = "C:\MY PROJECTS\my-portfolio\public\video"
New-Item -ItemType Directory -Force $dst | Out-Null
Get-ChildItem $dst -Filter *.webm -ErrorAction SilentlyContinue | Remove-Item -Force

$jobs = @(
  @{ In = "Abstract_topographic_contour_l.mp4";      Out = "hero-topo";      W = 800;  H = 450; Crf = 31 },
  @{ In = "Extreme_macro_shot_of_deep_ult.mp4";      Out = "ink-band";       W = 1120; H = 630; Crf = 27 },
  @{ In = "Extreme_macro_of_slow_moving_blue.mp4";   Out = "cat-research";   W = 640;  H = 360; Crf = 30 },
  @{ In = "Extreme_macro_of_slow_moving_orange.mp4"; Out = "cat-freelance";  W = 640;  H = 360; Crf = 30 },
  @{ In = "Extreme_macro_of_slow_moving_pink.mp4";   Out = "cat-leadership"; W = 640;  H = 360; Crf = 30 },
  @{ In = "Thousands_of_tiny_glowing_part.mp4";      Out = "particles";      W = 800;  H = 450; Crf = 31 }
)

foreach ($j in $jobs) {
  $inPath = Join-Path $src $j.In
  if (-not (Test-Path $inPath)) { Write-Output "MISSING: $($j.In)"; continue }

  $chain = "[0:v]crop=1120:630:0:0,scale=$($j.W):$($j.H),fps=24,split=2[a][b];" +
           "[a]trim=0:9,setpts=PTS-STARTPTS[main];" +
           "[b]trim=9:10,setpts=PTS-STARTPTS,format=yuva420p,fade=t=out:st=0:d=1:alpha=1[tail];" +
           "[main][tail]overlay=eof_action=pass,format=yuv420p[v]"

  & ffmpeg -y -v error -i $inPath -filter_complex $chain -map "[v]" -an `
    -c:v libx264 -crf $j.Crf -preset veryslow -profile:v high -pix_fmt yuv420p `
    -movflags +faststart (Join-Path $dst "$($j.Out).mp4")

  & ffmpeg -y -v error -ss 4 -i $inPath -frames:v 1 `
    -vf "crop=1120:630:0:0,scale=$($j.W):$($j.H)" -q:v 7 (Join-Path $dst "$($j.Out).jpg")

  Write-Output "built $($j.Out)"
}

Write-Output "---"
$files = Get-ChildItem $dst | Sort-Object Name
$files | Select-Object Name, @{n='KB';e={[math]::Round($_.Length/1KB)}} | Format-Table -AutoSize
Write-Output "TOTAL KB: $([math]::Round(($files | Measure-Object Length -Sum).Sum / 1KB))"
