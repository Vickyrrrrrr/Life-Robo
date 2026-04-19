"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/#programs" },
  { label: "Projects", href: "/#projects" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <div className="shell nav-shell">
        <Link href="/#top" className="brand-mark" aria-label="Life Robo — go to home">
          <span className="brand-mark__icon" aria-hidden="true">LR</span>
          <span className="brand-mark__text">
            <strong>Life Robo</strong>
            <small>Robotics Club · FOET LU</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <Link href="/editor" className="btn btn--ghost">
            Open IDE
          </Link>
          <a href="/#contact" className="btn btn--primary">
            Join the club
          </a>
          <button
            type="button"
            className="mobile-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-panel${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav className="mobile-panel__nav" aria-label="Mobile navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/editor"
            className="mobile-nav-link"
            onClick={() => setOpen(false)}
          >
            Open IDE
          </Link>
          <a
            href="/#contact"
            className="btn btn--primary mobile-cta"
            onClick={() => setOpen(false)}
          >
            Apply now
          </a>
        </nav>
      </div>
    </header>
  );
}
