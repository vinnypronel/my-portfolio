import Link from "next/link";
import { AmbientVideo } from "@/components/video/AmbientVideo";

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <AmbientVideo
          src="/video/particles.mp4"
          poster="/video/particles.webp"
          className="absolute inset-0 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/70" />
      </div>
      <div className="container-site pb-20 sm:pb-28">
        <p className="eyebrow">404</p>
        <h1 className="display-xl mt-6 max-w-[14ch] font-semibold text-fg">
          This page doesn&rsquo;t exist. The work does.
        </h1>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Back home
          </Link>
          <Link href="/projects" className="btn btn-ghost">
            See the work
          </Link>
        </div>
      </div>
    </div>
  );
}
