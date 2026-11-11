"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { getLenis } from "@/lib/lenis";
import { SocialLinks } from "./SocialLinks";

const navLinks = [
  { label: "Work", href: "/projects" },
  { label: "Research", href: "/research" },
  { label: "Studio", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const ease = [0.16, 1, 0.3, 1] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll while the overlay is open
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
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

          {/* Menu button: two bars that rotate into an X */}
          <button
            type="button"
            className="relative flex size-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute h-px w-6 bg-fg transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "rotate-45" : "-translate-y-[4px]"
              }`}
            />
            <span
              className={`absolute h-px w-6 bg-fg transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "-rotate-45" : "translate-y-[4px]"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[58] flex flex-col bg-void"
            initial={{ clipPath: reduce ? "inset(0 0 0 0)" : "inset(0 0 100% 0)", opacity: reduce ? 0 : 1 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: reduce ? "inset(0 0 0 0)" : "inset(100% 0 0 0)", opacity: reduce ? 0 : 1 }}
            transition={{ duration: reduce ? 0.2 : 0.8, ease }}
          >
            <div className="container-site flex flex-1 flex-col justify-end pb-10 pt-28">
              <nav aria-label="Menu" className="flex flex-col">
                {navLinks.map((link, i) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <div key={link.href} className="line-mask border-b border-line">
                      <motion.div
                        initial={{ y: reduce ? 0 : "110%" }}
                        animate={{ y: 0 }}
                        exit={{ y: reduce ? 0 : "-110%" }}
                        transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease }}
                      >
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className="group flex items-baseline justify-between py-4"
                        >
                          <span
                            className={`display-lg font-semibold transition-colors duration-300 ${
                              active ? "text-accent" : "text-fg group-hover:text-accent"
                            }`}
                          >
                            {link.label}
                          </span>
                          <span className="font-mono text-xs text-fg-faint">
                            0{i + 1}
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  );
                })}
              </nav>

              <motion.div
                className="mt-10 flex flex-wrap items-end justify-between gap-6"
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease }}
              >
                <div>
                  <p className="eyebrow">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="link-sweep mt-2 inline-block text-lg text-fg"
                  >
                    {site.email}
                  </a>
                </div>
                <SocialLinks />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
