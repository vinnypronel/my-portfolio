# Processes the Gemini source clips into web-ready loops for the dark studio site.
#
# Shared steps for every clip:
#  - crop 1120x630 from top-left (removes the baked-in Gemini sparkle watermark,
#    which sits inset around x=1140..1185, y=573..620; cropping is artifact-free,
#    delogo smears on gradients and line art)
#  - per-clip color grade so every clip sits in the near-black + cyan palette
#  - crossfade the last 1s over the first 1s => seamless 9s loop (except the
#    scrub clip, which is scrolled through once and never loops)
#  - encode H.264 mp4 only (VP9 came out LARGER for this footage), no audio,
#    faststart, plus a WebP poster frame (also the prefers-reduced-motion still)
#
# Grades (verified on test frames before the overhaul):
#  topo:      negate -> white contour lines on black, desaturated, slight cool cast
#  ink:       negate + hue 180 -> cyan ink on black
#  silk blue: as shot, slight contrast lift
#  silk orange: hue +160 -> teal
#  silk pink:   hue +215 -> steel blue
#  particles: as shot (already dark + cyan)
#
# Requires ffmpeg on PATH. Re-run after dropping new source clips in.

$src = "C:\MY PROJECTS\my-portfolio\Video Backgrounds"
$dst = "C:\MY PROJECTS\my-portfolio\public\video"
New-Item -ItemType Directory -Force $dst | Out-Null
Get-ChildItem $dst -Include *.mp4, *.jpg, *.webp -Recurse -ErrorAction SilentlyContinue | Remove-Item -Force

$gradeTopo      = "negate,eq=contrast=1.35:brightness=-0.18:saturation=0,colorbalance=bs=0.08:bm=0.04"
$gradeInk       = "negate,hue=h=180,eq=contrast=1.25:brightness=-0.12:saturation=1.4"
$gradeSilkBlue  = "eq=contrast=1.1:brightness=-0.05"
$gradeSilkTeal  = "hue=h=160,eq=contrast=1.1:brightness=-0.05"
$gradeSilkSteel = "hue=h=215,eq=contrast=1.1:brightness=-0.05"
$gradeNone      = "null"

$jobs = @(
  # Hero: full-bleed behind the headline. Desktop + mobile sources.
  @{ In = "Abstract_topographic_contour_l.mp4"; Out = "hero-topo";        W = 1120; H = 630; Crf = 26; Grade = $gradeTopo;      Loop = $true  },
  @{ In = "Abstract_topographic_contour_l.mp4"; Out = "hero-topo-mobile"; W = 640;  H = 360; Crf = 28; Grade = $gradeTopo;      Loop = $true  },
  # Footer CTA band.
  @{ In = "Extreme_macro_shot_of_deep_ult.mp4"; Out = "footer-ink";       W = 1120; H = 630; Crf = 27; Grade = $gradeInk;       Loop = $true  },
  # Service tracks (hover / in-view loops).
  @{ In = "Extreme_macro_of_slow_moving_blue.mp4";   Out = "track-web";       W = 800; H = 450; Crf = 29; Grade = $gradeSilkBlue;  Loop = $true },
  @{ In = "Extreme_macro_of_slow_moving_orange.mp4"; Out = "track-platforms"; W = 800; H = 450; Crf = 29; Grade = $gradeSilkTeal;  Loop = $true },
  @{ In = "Extreme_macro_of_slow_moving_pink.mp4";   Out = "track-research";  W = 800; H = 450; Crf = 29; Grade = $gradeSilkSteel; Loop = $true },
  # Ambient particle loop (404, about).
  @{ In = "Thousands_of_tiny_glowing_part.mp4"; Out = "particles";        W = 800;  H = 450; Crf = 30; Grade = $gradeNone;      Loop = $true  },
  # Scroll-scrubbed clip: every frame is a keyframe so seeking is instant.
  @{ In = "Thousands_of_tiny_glowing_part.mp4"; Out = "process-scrub";    W = 960;  H = 540; Crf = 30; Grade = $gradeNone;      Loop = $false }
)

foreach ($j in $jobs) {
  $inPath = Join-Path $src $j.In
  if (-not (Test-Path $inPath)) { Write-Output "MISSING: $($j.In)"; continue }

  $base = "crop=1120:630:0:0,$($j.Grade),scale=$($j.W):$($j.H),fps=24"
  $outMp4 = Join-Path $dst "$($j.Out).mp4"

  if ($j.Loop) {
    $chain = "[0:v]$base,split=2[a][b];" +
             "[a]trim=0:9,setpts=PTS-STARTPTS[main];" +
             "[b]trim=9:10,setpts=PTS-STARTPTS,format=yuva420p,fade=t=out:st=0:d=1:alpha=1[tail];" +
             "[main][tail]overlay=eof_action=pass,format=yuv420p[v]"
    & ffmpeg -y -v error -i $inPath -filter_complex $chain -map "[v]" -an `
      -c:v libx264 -crf $j.Crf -preset veryslow -profile:v high -pix_fmt yuv420p `
      -movflags +faststart $outMp4
  } else {
    & ffmpeg -y -v error -i $inPath -vf "$base,format=yuv420p" -an `
      -c:v libx264 -crf $j.Crf -preset veryslow -profile:v high -pix_fmt yuv420p `
      -g 1 -keyint_min 1 -movflags +faststart $outMp4
  }

  & ffmpeg -y -v error -ss 4 -i $inPath -frames:v 1 `
    -vf "crop=1120:630:0:0,$($j.Grade),scale=$($j.W):$($j.H)" `
    -c:v libwebp -quality 78 (Join-Path $dst "$($j.Out).webp")

  Write-Output "built $($j.Out)"
}

Write-Output "---"
$files = Get-ChildItem $dst | Sort-Object Name
$files | Select-Object Name, @{n='KB';e={[math]::Round($_.Length/1KB)}} | Format-Table -AutoSize
Write-Output "TOTAL KB: $([math]::Round(($files | Measure-Object Length -Sum).Sum / 1KB))"
