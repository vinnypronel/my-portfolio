"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { getLenis } from "@/lib/lenis";
import { SocialLinks } from "./SocialLinks";

const navLinks = [
  { label: "Work", href: "/projects" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Fixed header plus a full-screen takeover menu underneath it.
 *
 *  - header stays visible above the takeover (z 60 over z 58) so the logo and
 *    the morphing X keep their place
 *  - the takeover is always mounted and toggled with opacity / visibility /
 *    pointer-events, links stagger up via nth-child transition delays
 *  - body and html scroll are locked while open (and Lenis is stopped),
 *    restored on close; Escape closes; route changes close
 *  - hidden links are removed from the tab order
 *  - short viewports compact the type (see .nav-takeover in globals.css)
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll lock + Escape while open
  useEffect(() => {
    if (!open) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    getLenis()?.stop();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        data-site-header
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-500 ${
          scrolled && !open ? "bg-void/70 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="container-site flex h-16 items-center justify-between sm:h-20"
        >
          <Link
            href="/"
            className="font-mono text-sm font-medium tracking-[0.08em] text-fg"
            aria-label={`${site.brand}, home`}
          >
            {site.brand}
            <span className="text-accent">.</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-9 md:flex">
            {navLinks.slice(0, 3).map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`link-sweep font-mono text-[13px] tracking-[0.08em] uppercase transition-colors duration-300 ${
                    active ? "text-fg" : "text-fg-soft hover:text-fg"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/contact" className="btn btn-ghost !px-5 !py-2.5">
              Start a project
            </Link>
          </div>

          {/* Three-bar hamburger that morphs into an X */}
          <button
            type="button"
            className="flex size-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="flex w-6 flex-col items-center gap-[6px]">
              <span
                className="nav-bar"
                style={{
                  transform: open ? "translateY(7.5px) rotate(45deg)" : "none",
                  backgroundColor: open ? "var(--color-accent)" : undefined,
                }}
              />
              <span
                className="nav-bar"
                style={{ opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "scaleX(1)" }}
              />
              <span
                className="nav-bar"
                style={{
                  transform: open ? "translateY(-7.5px) rotate(-45deg)" : "none",
                  backgroundColor: open ? "var(--color-accent)" : undefined,
                }}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Full-screen takeover, always mounted, under the header */}
      <div
        id="site-menu"
        className={`nav-takeover md:hidden ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Menu" className="container-site flex flex-1 flex-col justify-end !px-0">
          <ul className="flex flex-col">
            {navLinks.map((link, i) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href} className="border-b border-line">
                  <Link
                    href={link.href}
                    tabIndex={open ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    className="nav-takeover-link group flex items-baseline justify-between py-4"
                  >
                    <span
                      className={`display-lg font-semibold transition-colors duration-300 ${
                        active ? "text-accent" : "text-fg group-hover:text-accent"
                      }`}
                    >
                      {link.label}
                    </span>
                    <span className="font-mono text-xs text-fg-faint">0{i + 1}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="nav-takeover-footer container-site flex flex-wrap items-end justify-between gap-6 pt-10 !px-0">
          <div>
            <p className="eyebrow">Email</p>
            <a
              href={`mailto:${site.email}`}
              tabIndex={open ? 0 : -1}
              className="footer-link mt-2 text-lg !text-fg"
            >
              {site.email}
            </a>
          </div>
          <div inert={!open ? true : undefined}>
            <SocialLinks />
          </div>
        </div>
      </div>
    </>
  );
}
