import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 max-w-[18ch] font-display text-4xl font-semibold tracking-tight sm:text-6xl">
        This page doesn&rsquo;t exist.{" "}
        <em className="text-accent">The work does.</em>
      </h1>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Back home
        </Link>
        <Link href="/projects" className="btn btn-outline">
          View work
        </Link>
      </div>
    </div>
  );
}
