"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import RoboCanvas from "./RoboCanvas";

const STATS = [
  { value: "50+", label: "Active Members" },
  { value: "12+", label: "Projects Built" },
  { value: "8+",  label: "Events Hosted" },
  { value: "3+",  label: "Years Running" },
];

const DOMAINS = [
  "Embedded Systems",
  "Computer Vision",
  "Autonomous Navigation",
  "Mechanical Design",
  "AI & ML",
  "PCB Design",
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Reveal-on-scroll
  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    if (!reveals) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Stagger hero elements in
  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      gsap.from(".hero-stagger > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
        delay: 0.3,
      });
    };
    load();
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen w-full overflow-hidden circuit-noise scanlines">
      {/* Three.js canvas background */}
      <RoboCanvas />

      {/* Radial glow behind hero text */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(0,80,180,0.13) 0%, transparent 70%)",
        }}
      />

      {/* ── Hero Content ── */}
      <section
        id="top"
        className="relative z-10 flex min-h-screen flex-col items-start justify-center px-6 pt-24 pb-16 md:px-16 lg:px-24"
      >
        <div className="hero-stagger max-w-4xl">
          {/* Badge */}
          <div className="pill mb-6">
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00c8ff", display: "inline-block", animation: "pulse 2s infinite" }} />
            FOET · University of Lucknow
          </div>

          {/* Headline */}
          <h1
            className="hero-gradient-text glow-cyan mb-4 font-bold leading-tight"
            style={{ fontSize: "var(--text-hero)", letterSpacing: "-0.03em" }}
          >
            Life<br />Robo
          </h1>

          {/* Sub-headline */}
          <p
            className="mb-4 font-medium"
            style={{ fontSize: "var(--text-xl)", color: "rgba(232,234,246,0.75)", maxWidth: "52ch" }}
          >
            Where circuits meet creativity.
          </p>
          <p
            style={{ fontSize: "var(--text-base)", color: "var(--color-muted)", maxWidth: "55ch", lineHeight: 1.7 }}
            className="mb-10"
          >
            The official robotics club of FOET — building autonomous systems,
            intelligent machines, and the engineers of tomorrow.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link href="/#about" className="btn-primary">
              Explore Club
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/#events" className="btn-ghost">
              See Events
            </Link>
          </div>

          {/* Stats */}
          <div className="reveal grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="robo-card p-4">
                <div className="stat-number">{s.value}</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--color-muted)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Domains strip ── */}
      <section
        id="domains"
        className="reveal relative z-10 border-t px-6 py-10 md:px-16 lg:px-24"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p style={{ fontSize: "var(--text-xs)", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>
          Domains We Work In
        </p>
        <div className="flex flex-wrap gap-3">
          {DOMAINS.map((d) => (
            <span key={d} className="pill">{d}</span>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        className="reveal relative z-10 border-t px-6 py-20 md:px-16 lg:px-24"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="max-w-3xl">
          <p className="pill mb-6">About Us</p>
          <h2
            style={{ fontSize: "var(--text-2xl)", fontWeight: 700, lineHeight: 1.2, marginBottom: 20 }}
            className="hero-gradient-text"
          >
            Building the future,<br />one bot at a time.
          </h2>
          <p style={{ fontSize: "var(--text-base)", color: "var(--color-muted)", lineHeight: 1.85, maxWidth: "62ch" }}>
            Life Robo is the student-run robotics and automation club at the Faculty of
            Engineering and Technology, University of Lucknow. We bring together students
            passionate about robotics, embedded systems, AI, and mechanical design to
            collaborate, compete, and build real-world systems.
          </p>
        </div>
      </section>

      {/* ── Events ── */}
      <section
        id="events"
        className="reveal relative z-10 border-t px-6 py-20 md:px-16 lg:px-24"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p className="pill mb-6">Events</p>
        <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: 32 }}>What We Host</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Robo Wars", desc: "Combat robotics tournament with custom-built bots.", tag: "Annual" },
            { title: "Line Follower Sprint", desc: "Autonomous line-following bot challenge.", tag: "Semester" },
            { title: "Hackathon", desc: "48-hour hack for hardware + software projects.", tag: "Annual" },
            { title: "Workshop Series", desc: "Hands-on sessions on Arduino, ROS, PCB, and more.", tag: "Monthly" },
            { title: "Project Showcase", desc: "Members present and demo their semester builds.", tag: "Semester" },
            { title: "Guest Lectures", desc: "Industry engineers and researchers talk robotics.", tag: "Regular" },
          ].map((ev) => (
            <div key={ev.title} className="robo-card glow-border-hover p-6">
              <div className="pill mb-3" style={{ fontSize: "0.65rem" }}>{ev.tag}</div>
              <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 600, marginBottom: 8 }}>{ev.title}</h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-muted)", lineHeight: 1.7 }}>{ev.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section
        id="team"
        className="reveal relative z-10 border-t px-6 py-20 md:px-16 lg:px-24"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p className="pill mb-6">Team</p>
        <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: 32 }}>Meet the Crew</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "President",       role: "Club Lead" },
            { name: "Vice President",  role: "Operations" },
            { name: "Tech Lead",       role: "R&D" },
            { name: "Design Lead",     role: "CAD & Mech" },
          ].map((m) => (
            <div key={m.name} className="robo-card glow-border-hover p-6 flex flex-col gap-3">
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  border: "1px solid rgba(0,200,255,0.3)",
                  background: "rgba(0,200,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                }}
              >
                🤖
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: "var(--text-base)" }}>{m.name}</p>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="reveal relative z-10 border-t px-6 py-20 md:px-16 lg:px-24"
        style={{ borderColor: "var(--color-border)" }}
      >
        <p className="pill mb-6">Contact</p>
        <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: 12 }}>Get in Touch</h2>
        <p style={{ fontSize: "var(--text-base)", color: "var(--color-muted)", marginBottom: 32, maxWidth: "50ch" }}>
          Interested in joining, collaborating, or sponsoring? Reach us on social media or at the club room.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="https://www.instagram.com/liferobo.foet.lu/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Instagram
          </a>
          <a href="https://www.linkedin.com/in/roboticsclublu/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            LinkedIn
          </a>
          <a href="https://x.com/liferobo_foet/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            X / Twitter
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="relative z-10 border-t px-6 py-8 md:px-16 lg:px-24"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "var(--text-xs)", color: "var(--color-muted)" }}>
            © 2025 Life Robo · FOET, University of Lucknow
          </span>
          <span className="pill">Built by the club, for the club</span>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
