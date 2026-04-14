"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About",   href: "/#about" },
  { label: "Events",  href: "/#events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team",    href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
          background: scrolled ? "rgba(2,5,16,0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,200,255,0.1)" : "1px solid transparent",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-jetbrains-mono, monospace)",
              fontSize: "1.05rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#fff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* Inline SVG robot gear logo */}
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-label="Life Robo logo">
              <circle cx="16" cy="16" r="14" stroke="#00c8ff" strokeWidth="1.5" opacity="0.5" />
              <circle cx="16" cy="16" r="8" stroke="#00c8ff" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="3" fill="#00c8ff" opacity="0.8" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <line
                  key={i}
                  x1={16 + 8 * Math.cos((deg * Math.PI) / 180)}
                  y1={16 + 8 * Math.sin((deg * Math.PI) / 180)}
                  x2={16 + 13 * Math.cos((deg * Math.PI) / 180)}
                  y2={16 + 13 * Math.sin((deg * Math.PI) / 180)}
                  stroke="#00c8ff"
                  strokeWidth="1.5"
                  opacity="0.6"
                />
              ))}
            </svg>
            Life<span style={{ color: "#00c8ff" }}>Robo</span>
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "rgba(232,234,246,0.7)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00c8ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,234,246,0.7)")}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/editor"
              className="btn-primary"
              style={{ padding: "8px 18px", fontSize: "0.8rem" }}
            >
              IDE
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="flex md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open
                ? <path d="M18 6L6 18M6 6l12 12" />
                : <path d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            style={{
              background: "rgba(2,5,16,0.97)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(0,200,255,0.1)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "rgba(232,234,246,0.85)",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/editor" onClick={() => setOpen(false)} className="btn-primary" style={{ width: "fit-content" }}>
              IDE
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
