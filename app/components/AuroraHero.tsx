"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Cpu, Zap, Trophy, Users, Wrench, Orbit } from "lucide-react";
import dynamic from "next/dynamic";
import ChromaGrid, { type ChromaGridItem } from "./ui/ChromaGrid";
import FlyingPosters from "./ui/FlyingPosters";
import CardSwap, { Card } from "./ui/CardSwap";

const RoboCanvas = dynamic(() => import("./RoboCanvas"), { ssr: false });

// ── Data ─────────────────────────────────────────────────────────────────────

const workFilters = ["All", "Rovers", "Line Followers", "Battle Bots", "Automation"];

const services = [
  { id: "01", title: "Robot Building Workshops", icon: Wrench, featured: true },
  { id: "02", title: "Coding & Automation Sessions", icon: Cpu, featured: false },
  { id: "03", title: "Competition Training & Strategy", icon: Trophy, featured: false },
  { id: "04", title: "Community & Mentorship Programs", icon: Users, featured: false },
];

const processSteps = [
  { label: "Join the Club", icon: "01", desc: "Attend orientation, meet the team, pick your track." },
  { label: "Design & Prototype", icon: "02", desc: "CAD + circuit design in guided workshops." },
  { label: "Build & Program", icon: "03", desc: "Hands-on fabrication, embedded coding, ROS." },
  { label: "Test and Compete", icon: "04", desc: "Arena trials and national competition prep." },
];

const stats = [
  { value: "50+", label: "Active Members" },
  { value: "18+", label: "Competition Podiums" },
  { value: "3+", label: "National Events" },
  { value: "5yrs", label: "Club Legacy" },
];

const overYears = ["VEX Robotics", "FIRST Tech", "Arduino", "ROS", "OpenCV", "National Finals"];

const projectHighlights = [
  {
    title: "Autonomous Rover Build",
    description: "Terrain-aware rover with sensor fusion, waypoint logic, and obstacle avoidance.",
    icon: Orbit,
    tag: "Navigation",
  },
  {
    title: "Line-Following Bot Challenge",
    description: "High-speed PID tuning and IR sensor calibration for track stability.",
    icon: Zap,
    tag: "Speed",
  },
  {
    title: "Battle Bots Season Entry",
    description: "Custom chassis, impact-tolerant mechanics, and competition strategy drills.",
    icon: Trophy,
    tag: "Combat",
  },
];

const testimonials = [
  { name: "Amit Chauhan", role: "Head", quote: "Best hands-on engineering experience I have ever had." },
  { name: "Harsh Prajapati", role: "Software Team Lead", quote: "We built robots that competed at national championships!" },
  { name: "Vineeta", role: "Circuit Designing Lead", quote: "Students quickly move from ideas to working prototypes with clear mentorship." },
];

const workshopBanner = "/photos/workshop-today-banner.jpeg";
const whatsappImages = Array.from({ length: 17 }, (_, i) => `/photos/workshop-whatsapp-${String(i + 1).padStart(2, "0")}.jpeg`);
const repoEventImages = [
  "/photos/repo/repo-event-workshop-2026.png",
  "/photos/repo/repo-event-roboeminence.jpg",
  "/photos/repo/repo-event-lecture-series.jpg",
  "/photos/repo/repo-event-workshop-main.jpg",
  "/photos/repo/repo-workshop-01.jpg",
  "/photos/repo/repo-workshop-02.jpg",
  "/photos/repo/repo-workshop-03.jpg",
  "/photos/repo/repo-workshop-04.jpg",
  "/photos/repo/repo-workshop-05.jpg",
  "/photos/repo/repo-workshop-06.jpg",
  "/photos/repo/repo-workshop-07.jpg",
  "/photos/repo/repo-workshop-08.jpg",
  "/photos/repo/repo-workshop-09.jpg",
  "/photos/repo/repo-workshop-10.jpg",
  "/photos/repo/repo-workshop-11.jpg",
  "/photos/repo/repo-lecture-03.jpg",
  "/photos/repo/repo-lecture-06.jpg",
  "/photos/repo/repo-lecture-09.jpg",
];

const memberPlaceholderImage = "/photos/member-placeholder.svg";

const teamItems: ChromaGridItem[] = [
  { image: memberPlaceholderImage, title: "Amit Chauhan", subtitle: "Head", handle: "@amit_chauhan", borderColor: "#3B82F6", gradient: "linear-gradient(145deg,#3B82F6,#020617)" },
  { image: memberPlaceholderImage, title: "Ahmad Tarique", subtitle: "Co-head", handle: "@ahmad_tarique", borderColor: "#10B981", gradient: "linear-gradient(180deg,#10B981,#020617)" },
  { image: memberPlaceholderImage, title: "Harsh Prajapati", subtitle: "Software Team Lead", handle: "@harsh_prajapati", borderColor: "#8B5CF6", gradient: "linear-gradient(170deg,#8B5CF6,#020617)" },
  { image: memberPlaceholderImage, title: "Jatin Pandey", subtitle: "Software Team Co-lead", handle: "@jatin_pandey", borderColor: "#22D3EE", gradient: "linear-gradient(160deg,#22D3EE,#020617)" },
  { image: memberPlaceholderImage, title: "Vineeta", subtitle: "Circuit Designing Lead", handle: "@vineeta_circuits", borderColor: "#F59E0B", gradient: "linear-gradient(170deg,#F59E0B,#020617)" },
  { image: memberPlaceholderImage, title: "Lakshya Soni", subtitle: "Circuit Designing Co-lead", handle: "@lakshya_soni", borderColor: "#F472B6", gradient: "linear-gradient(180deg,#F472B6,#020617)" },
];

const eventPosters = [workshopBanner, ...repoEventImages, ...whatsappImages];
const galleryImages = [workshopBanner, ...repoEventImages, ...whatsappImages].map((src, idx) => ({ src, alt: `Robotics moment ${idx + 1}` }));

const blogs = [
  { title: "Workshop Inauguration Highlights", date: "Feb 21, 2026", image: repoEventImages[0] },
  { title: "Hands-on Build and Debug Sessions", date: "Feb 21, 2026", image: repoEventImages[8] },
  { title: "Talk on Career in Space: Key Takeaways", date: "Feb 21, 2026", image: repoEventImages[2] },
];

const heroShowcaseImages = [
  { src: repoEventImages[0], alt: "Robotics workshop inauguration poster" },
  { src: repoEventImages[1], alt: "Roboeminence event highlight" },
  { src: whatsappImages[0], alt: "Workshop activity snapshot" },
];

const heroCardPositionClasses = [
  "left-[8%] top-[17%] rotate-[-14deg]",
  "left-1/2 top-[11%] z-20 -translate-x-1/2",
  "right-[8%] top-[17%] rotate-[14deg]",
];

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setText(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

// ── Component ─────────────────────────────────────────────────────────────────
export const AuroraHero = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const typeword = useTypewriter(["Innovate.", "Build.", "Compete.", "Automate.", "Explore."]);
  useReveal();

  return (
    <div className="robo-site">

      {/* ── Notification banner ── */}
      <section className="robo-notif-bar">
        <div className="mx-auto grid max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-robo-accent">
              Latest Notification
            </p>
            <p className="mt-1 text-sm font-medium text-white/80">
              February 21, 2026 — Workshop Inauguration & Talk on Career in Space.
            </p>
          </div>
          <a
            href="https://life-robo.vercel.app/events/robotics-workshops-series-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-2xl border border-robo-border bg-white/4 shadow-robo"
          >
            <img
              src={workshopBanner}
              alt="Today workshop inauguration and career in space banner"
              className="h-24 w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </a>
        </div>
      </section>

      {/* ── HERO ── */}
      <section id="top" className="robo-hero">
        <RoboCanvas />

        {/* Spline 3D robot — lazy iframe */}
        <div className="robo-spline-frame" aria-hidden="true">
          <iframe
            src="https://my.spline.design/nexbotrobot-a4c4b2b8aea7be8da7a7261a4ef5e79e/"
            frameBorder="0"
            width="100%"
            height="100%"
            loading="lazy"
            title="3D robot model"
          />
        </div>

        <div className="robo-hero-content">
          <div className="robo-hero-left reveal">
            <p className="robo-eyebrow">
              <span className="robo-dot-pulse" />
              Life Robo — College Robotics Club
            </p>
            <h1 className="robo-hero-h1">
              <span className="robo-type-line">{typeword}<span className="robo-cursor">|</span></span>
              <span className="block robo-hero-sub mt-3">Where Robots Are Built</span>
              <span className="block robo-hero-sub-2">& Ideas Come Alive.</span>
            </h1>
            <p className="robo-hero-body mt-6">
              A student-led engineering club at the heart of FOET Lucknow University —
              designing, programming, and competing with real robots since day one.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="robo-rating">★★★★★</span>
              <span className="text-sm text-white/60">120+ Active Builders</span>
            </div>

            <div className="robo-hero-ctas mt-10">
              <Link href="#contact" className="robo-btn-primary">
                Join the Club
                <span className="robo-btn-icon"><ArrowRight className="h-4 w-4" /></span>
              </Link>
              <Link href="#works" className="robo-btn-ghost">
                Our Projects
              </Link>
            </div>
          </div>

          <div className="robo-hero-right reveal" style={{ animationDelay: "0.2s" }}>
            <div className="robo-showcase-card">
              <div className="robo-showcase-glow" />
              <p className="robo-showcase-label">• Latest showcase</p>
              <div className="robo-showcase-stack">
                {heroShowcaseImages.map((item, idx) => (
                  <article key={item.src} className={`creative-stack-card ${heroCardPositionClasses[idx]}`}>
                    <img src={item.src} alt={item.alt} className="creative-card-media" loading="lazy" />
                  </article>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="robo-tag">Line Followers</span>
                <span className="robo-tag">Rover Systems</span>
                <button type="button" className="ml-auto robo-icon-btn" aria-label="Open showcase">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
              <h2 className="robo-showcase-title">Club Build Highlights</h2>
            </div>
          </div>
        </div>

        <div className="robo-hero-stats reveal">
          {stats.map((s) => (
            <div key={s.value} className="robo-hero-stat">
              <span className="robo-stat-value">{s.value}</span>
              <span className="robo-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Scroll down"
          className="robo-scroll-cue"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="robo-section">
        <div className="robo-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <div className="robo-image-card reveal">
            <img src={repoEventImages[5]} alt="Mobile robotics platform in workshop" loading="lazy" />
            <span className="robo-img-caption">Mobile Robot Prototyping</span>
          </div>
          <div className="reveal" style={{ animationDelay: "0.15s" }}>
            <p className="robo-eyebrow">About Our Club</p>
            <h2 className="robo-heading mt-3">
              A student-led robotics community that learns by building.
            </h2>
            <p className="robo-body mt-4">
              We are students of FOET, University of Lucknow — a hands-on club where engineers learn
              mechanics, embedded systems, computer vision, and strategy to design robots that compete
              at the national level.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Hands-on Labs", "Mentor Guidance", "Competition Focused", "Open to All Branches"].map((t) => (
                <span key={t} className="robo-chip">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="works" className="robo-section robo-section-dark">
        <div className="robo-container">
          <p className="robo-eyebrow text-center reveal">Our Robots & Projects</p>
          <h2 className="robo-heading text-center mt-2 reveal">Build Portfolio</h2>

          <div className="robo-filter-bar mt-8 reveal">
            {workFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`robo-filter-btn ${activeFilter === f ? "active" : ""}`}
              >
                {f}
              </button>
            ))}
          </div>

          <article className="robo-work-card mt-10 reveal">
            <div className="robo-work-image-frame">
              <img src={repoEventImages[9]} alt="Battle bot robot" className="gc-work-image" loading="lazy" />
            </div>
            <div className="gc-work-overlay">
              <p className="robo-eyebrow !text-robo-accent/80">Competition Robot</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Autonomous Rover Build</h3>
              <p className="mt-2 text-sm text-white/70">
                Modular rover architecture, route planning, and robust chassis integration.
              </p>
              <button type="button" className="robo-btn-lime mt-6">View Project</button>
            </div>
          </article>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {projectHighlights.map((p, i) => (
              <article key={p.title} className="robo-project-mini reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="robo-project-icon-wrap">
                  <p.icon className="h-5 w-5" />
                </div>
                <span className="robo-tag mt-3">{p.tag}</span>
                <h3 className="mt-2 text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-white/65">{p.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE BUILD ── */}
      <section className="robo-section">
        <div className="robo-container">
          <p className="robo-eyebrow reveal">Workflow</p>
          <h2 className="robo-heading mt-2 reveal">How We Build</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {processSteps.map((step, idx) => (
              <article key={step.label} className="robo-process-card reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
                <span className="robo-process-num">{step.icon}</span>
                <h3 className="mt-3 text-sm font-semibold text-white">{step.label}</h3>
                <p className="mt-2 text-xs text-white/55">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="robo-section robo-section-dark">
        <div className="robo-container">
          <p className="robo-eyebrow text-center reveal">Gallery</p>
          <h2 className="robo-heading text-center mt-2 reveal">Build Sessions & Robot Trials</h2>
          <div className="gc-gallery-grid mt-8">
            {galleryImages.map((image, i) => (
              <figure key={image.src} className="robo-gallery-item reveal" style={{ animationDelay: `${(i % 6) * 0.07}s` }}>
                <img src={image.src} alt={image.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="robo-section">
        <div className="robo-container">
          <p className="robo-eyebrow reveal">Club Members & Mentors</p>
          <h2 className="robo-heading mt-2 reveal">Meet the Robotics Team</h2>
          <p className="robo-body mt-3 max-w-2xl reveal">
            Cross-functional builders — mechanics, embedded systems, computer vision, and strategy.
          </p>
          <div className="gc-team-grid-shell mt-10 reveal">
            <ChromaGrid items={teamItems} radius={300} damping={0.45} fadeOut={0.6} ease="power3.out" columns={3} rows={2} />
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="robo-section robo-section-dark">
        <div className="robo-container">
          <p className="robo-eyebrow !text-robo-accent/80 reveal">Workshops & Training</p>
          <h2 className="robo-heading mt-2 reveal">Robotics Learning Tracks</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {services.map((service, i) => (
              <article
                key={service.id}
                className={`robo-service-card reveal ${service.featured ? "featured" : ""}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="robo-service-num">{service.id}</span>
                <div className="robo-service-icon-wrap">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="relative z-10 mt-4 text-2xl font-medium text-white">{service.title}</h3>
                {!service.featured && (
                  <p className="relative z-10 mt-3 max-w-xs text-sm text-white/60">
                    Weekly sessions with practical assignments and mentor feedback.
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS / FLYING POSTERS ── */}
      <section id="events" className="robo-section robo-section-dark pt-0">
        <div className="robo-container">
          <article className="robo-events-card reveal">
            <p className="robo-eyebrow !text-robo-accent/80">Events</p>
            <h2 className="robo-heading mt-2">Robotics Event Wall</h2>
            <p className="mt-3 max-w-2xl text-sm text-white/60">
              Competition snapshots, workshop moments, and live demo highlights from club activities.
            </p>
            <div className="gc-events-stage">
              <FlyingPosters
                items={eventPosters}
                planeWidth={320}
                planeHeight={320}
                distortion={3}
                scrollEase={0.01}
                cameraFov={45}
                cameraZ={20}
              />
            </div>
          </article>
        </div>
      </section>

      {/* ── STAT CALLOUT ── */}
      <section className="robo-section">
        <div className="robo-container grid gap-10 lg:grid-cols-[1fr_0.9fr] items-center">
          <div className="reveal">
            <p className="robo-eyebrow">Build With Us</p>
            <h2 className="robo-heading mt-2">Sign Up for Robotics Trials</h2>
            <p className="robo-body mt-4 max-w-xl">
              Join practical sessions in electronics, CAD, embedded coding, and test-day simulation
              to prepare for real robotics challenges.
            </p>
            <button type="button" className="robo-btn-primary mt-6">
              Sign Up for Robotics Trials
              <span className="robo-btn-icon"><ArrowRight className="h-4 w-4" /></span>
            </button>
          </div>
          <div className="robo-stat-hero reveal" style={{ animationDelay: "0.15s" }}>
            <p className="text-sm text-white/60">Competition Podiums</p>
            <p className="robo-stat-giant">18+</p>
            <p className="mt-4 text-sm text-white/60">
              League placements across line-following, rover navigation, and combat categories.
            </p>
          </div>
        </div>
      </section>

      {/* ── CARD SWAP ── */}
      <section className="robo-section robo-section-dark pt-0">
        <div className="robo-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <div className="reveal">
            <p className="robo-eyebrow !text-robo-accent/80">Interactive Preview</p>
            <h2 className="robo-heading mt-2">Robot Design Iterations</h2>
            <p className="robo-body mt-4 max-w-xl">
              Scroll through concept stacks to review mechanical layout, wiring strategy,
              and control model updates.
            </p>
          </div>
          <div className="gc-card-swap-stage reveal" style={{ animationDelay: "0.15s" }}>
            <CardSwap cardDistance={54} verticalDistance={60} delay={5000} pauseOnHover={false} width={320} height={220}>
              <Card className="gc-swap-card"><h4>Card 01</h4><p>Rover chassis concept</p></Card>
              <Card className="gc-swap-card gc-swap-card-alt"><h4>Card 02</h4><p>Sensor placement map</p></Card>
              <Card className="gc-swap-card gc-swap-card-alt-2"><h4>Card 03</h4><p>Control loop flow</p></Card>
            </CardSwap>
          </div>
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <section className="robo-section">
        <div className="robo-container">
          <p className="robo-eyebrow reveal">Trusted Over Years</p>
          <h2 className="robo-heading mt-2 reveal">Learning Platforms & Competitions</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {overYears.map((name, i) => (
              <div key={name} className="robo-logo-pill reveal" style={{ animationDelay: `${i * 0.07}s` }}>{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="robo-section robo-section-dark">
        <div className="robo-container">
          <p className="robo-eyebrow !text-robo-accent/80 text-center reveal">Club Members & Mentors</p>
          <h2 className="robo-heading text-center mt-2 reveal">What Our Team Says</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <article key={item.name} className="robo-testimonial-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="robo-testimonial-avatar">
                  <img src={galleryImages[i % galleryImages.length].src} alt={`${item.name} avatar`} loading="lazy" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/75">&ldquo;{item.quote}&rdquo;</p>
                <p className="mt-5 text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-white/45">{item.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOGS ── */}
      <section id="blogs" className="robo-section">
        <div className="robo-container">
          <p className="robo-eyebrow reveal">From Blog</p>
          <h2 className="robo-heading mt-2 reveal">Explore Robotics Logs</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {blogs.map((blog, i) => (
              <article key={blog.title} className="robo-blog-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="robo-blog-image-frame">
                  <img src={blog.image} alt={blog.title} loading="lazy" />
                </div>
                <p className="mt-3 text-xs text-white/40">{blog.date}</p>
                <h3 className="mt-1 text-base font-medium text-white">{blog.title}</h3>
                <Link href="#" className="robo-blog-link mt-4">
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER / CONTACT ── */}
      <footer id="contact" className="robo-footer">
        <div className="robo-container">
          <p className="robo-eyebrow !text-robo-accent/80">Connect with Us</p>
          <h2 className="robo-footer-h2">Build With Us</h2>
          <p className="mt-4 max-w-2xl text-sm text-white/60">
            Share your details and we will guide you to the right robotics track.
          </p>

          <form className="mt-10 grid gap-4 md:grid-cols-2">
            <label className="robo-label">
              Name
              <input type="text" className="robo-input mt-2" placeholder="Your name" />
            </label>
            <label className="robo-label">
              Email
              <input type="email" className="robo-input mt-2" placeholder="you@example.com" />
            </label>
            <label className="robo-label md:col-span-2">
              Interested in Robotics Skills or Competitions?
              <textarea className="robo-input mt-2 min-h-[110px] resize-none" placeholder="Tell us your interests" />
            </label>
            <div className="md:col-span-2">
              <button type="button" className="robo-btn-primary">
                Sign Up for Robotics Trials
                <span className="robo-btn-icon"><ArrowRight className="h-4 w-4" /></span>
              </button>
            </div>
          </form>

          <p className="mt-14 border-t border-white/8 pt-6 text-sm text-white/35">
            &copy; Life Robo Robotics Club — FOET, University of Lucknow | Building Future Engineers
          </p>
        </div>
      </footer>
    </div>
  );
};
