"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Cpu,
  Trophy,
  Users,
  Wrench,
  GalleryHorizontal,
  ChevronRight,
} from "lucide-react";

/* ── data ───────────────────────────────────────────────── */
const metrics = [
  { value: "50+", label: "Active members" },
  { value: "18+", label: "Competition podiums" },
  { value: "Weekly", label: "Build sessions" },
];

const programs = [
  {
    Icon: Cpu,
    title: "Foundation workshops",
    copy: "Structured sessions covering Arduino, sensors, CAD, embedded coding, and electronics for beginners.",
  },
  {
    Icon: Bot,
    title: "Project squads",
    copy: "Cross-functional teams build rovers, line followers, and autonomous systems with design reviews.",
  },
  {
    Icon: Trophy,
    title: "Competition prep",
    copy: "Focused test cycles, rapid iteration, and strategy drills to prepare for national-level contests.",
  },
];

const projects = [
  {
    tag: "Navigation",
    title: "Autonomous rover build",
    copy: "Sensor fusion, route planning, and terrain-aware chassis integration for robust outdoor testing.",
    image: "/photos/repo/repo-workshop-09.jpg",
  },
  {
    tag: "Control systems",
    title: "Line follower sprint bot",
    copy: "PID tuning, compact electronics packaging, and track-stability optimisation for competition use.",
    image: "/photos/repo/repo-workshop-07.jpg",
  },
  {
    tag: "Automation",
    title: "Battle bot platform",
    copy: "Custom chassis, impact-tolerant frame, and programmable strike logic for combat robotics events.",
    image: "/photos/repo/repo-workshop-03.jpg",
  },
];

const gallery = [
  { src: "/photos/repo/repo-event-workshop-2026.png", alt: "Workshop inauguration 2026" },
  { src: "/photos/repo/repo-event-roboeminence.jpg", alt: "Roboeminence event" },
  { src: "/photos/repo/repo-event-lecture-series.jpg", alt: "Lecture series" },
  { src: "/photos/repo/repo-workshop-03.jpg", alt: "Workshop session 03" },
  { src: "/photos/repo/repo-workshop-07.jpg", alt: "Workshop session 07" },
  { src: "/photos/workshop-whatsapp-04.jpeg", alt: "Workshop activity" },
];

const team = [
  { name: "Amit Chauhan", role: "Head" },
  { name: "Ahmad Tarique", role: "Co-head" },
  { name: "Harsh Prajapati", role: "Software Team Lead" },
  { name: "Jatin Pandey", role: "Software Team Co-lead" },
  { name: "Vineeta", role: "Circuit Designing Lead" },
  { name: "Lakshya Soni", role: "Circuit Designing Co-lead" },
];

const workflow = [
  "Apply and attend orientation",
  "Choose your learning track — software, electronics, or mechanics",
  "Build with a team and a dedicated mentor",
  "Demo, compete, and publish your outcomes",
];

const testimonials = [
  {
    name: "Amit Chauhan",
    role: "Head",
    quote: "Best hands-on engineering experience I have had as a student.",
  },
  {
    name: "Harsh Prajapati",
    role: "Software Team Lead",
    quote: "We built robots that competed at national championships. Nothing else comes close.",
  },
  {
    name: "Vineeta",
    role: "Circuit Designing Lead",
    quote: "Students move from ideas to working prototypes quickly with clear mentorship and real practice.",
  },
];

/* ── component ─────────────────────────────────────────── */
export const AuroraHero = () => {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <div className="lr-site" id="top">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="shell hero-grid">

          {/* left copy */}
          <div className="hero-copy">
            <p className="eyebrow" aria-hidden="true">Life Robo · Robotics Club · FOET LU</p>
            <h1 id="hero-heading">
              Build robots.
              <br />
              Learn fast.
              <br />
              <span className="hero-heading-accent">Compete.</span>
            </h1>
            <p className="hero-lead">
              Life Robo is the robotics club at FOET, University of Lucknow — a
              student-led community where engineering comes to life through
              hands-on building, practical workshops, and national-level competition.
            </p>
            <div className="hero-actions">
              <a href="/#contact" className="btn btn--primary btn--large">
                Join the club <ArrowRight size={16} />
              </a>
              <a href="/#projects" className="btn btn--outline btn--large">
                See our projects
              </a>
            </div>
            <ul className="hero-highlights" aria-label="Club highlights">
              <li>
                <Users size={15} aria-hidden="true" />
                Member-driven learning and peer mentorship
              </li>
              <li>
                <Wrench size={15} aria-hidden="true" />
                Hardware, coding, circuits, and fabrication
              </li>
              <li>
                <GalleryHorizontal size={15} aria-hidden="true" />
                Workshops, showcases, and competition events
              </li>
            </ul>
          </div>

          {/* right panel */}
          <div className="hero-panel" aria-label="Club at a glance">
            <div className="hero-feature-card">
              <span className="hero-feature-kicker">Recent event</span>
              <h2 className="hero-feature-title">Workshop Inauguration & Career in Space talk</h2>
              <p className="hero-feature-body">
                February 21, 2026 — practical robotics session and a guest lecture on space careers at FOET.
              </p>
              <a
                href="/#gallery"
                className="hero-feature-link"
                aria-label="View event highlights in gallery"
              >
                View highlights <ChevronRight size={14} aria-hidden="true" />
              </a>
              <img
                src="/photos/workshop-today-banner.jpeg"
                alt="Workshop inauguration 2026 banner"
                className="hero-feature-img"
                loading="eager"
                width={560}
                height={220}
              />
            </div>
            <div className="metrics-row" aria-label="Club metrics">
              {metrics.map((m) => (
                <div key={m.value} className="metric-chip">
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section className="section section--muted" id="about" aria-labelledby="about-heading">
        <div className="shell split-section">
          <div>
            <p className="eyebrow">About</p>
            <h2 id="about-heading" className="section-title">
              A student-led robotics community that learns by building.
            </h2>
          </div>
          <div className="split-body">
            <p className="section-copy">
              We are students from FOET, University of Lucknow who build
              competitive robots, run structured workshops, and mentor each other
              through real engineering challenges. The club spans software,
              electronics, and mechanical disciplines so members develop
              well-rounded skills from day one.
            </p>
            <div className="tag-row">
              {["Hands-on labs", "Mentor guidance", "Competition focused", "Arduino & ROS", "OpenCV & Vision"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ──────────────────────────────────────── */}
      <section className="section" id="programs" aria-labelledby="programs-heading">
        <div className="shell">
          <div className="section-header">
            <p className="eyebrow">Programs</p>
            <h2 id="programs-heading" className="section-title">What students actually do here</h2>
          </div>
          <div className="card-grid-3">
            {programs.map(({ Icon, title, copy }) => (
              <article key={title} className="program-card">
                <span className="program-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="program-title">{title}</h3>
                <p className="program-copy">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────── */}
      <section className="section section--muted" id="projects" aria-labelledby="projects-heading">
        <div className="shell">
          <div className="section-header section-header--split">
            <div>
              <p className="eyebrow">Projects</p>
              <h2 id="projects-heading" className="section-title">Recent builds and technical work</h2>
            </div>
            <p className="section-copy section-copy--narrow">
              Every project is driven by students and reviewed by mentors at each design stage before moving to hardware.
            </p>
          </div>

          {/* tab selector */}
          <div className="project-tabs" role="tablist" aria-label="Select a project">
            {projects.map((p, i) => (
              <button
                key={p.title}
                role="tab"
                aria-selected={activeProject === i}
                aria-controls={`project-panel-${i}`}
                id={`project-tab-${i}`}
                className={`project-tab${activeProject === i ? " is-active" : ""}`}
                onClick={() => setActiveProject(i)}
                type="button"
              >
                <span className="project-tab-tag">{p.tag}</span>
                {p.title}
              </button>
            ))}
          </div>

          {projects.map((p, i) => (
            <div
              key={p.title}
              id={`project-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`project-tab-${i}`}
              hidden={activeProject !== i}
              className="project-panel"
            >
              <figure className="project-panel-img-frame">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={900}
                  height={420}
                />
              </figure>
              <div className="project-panel-body">
                <span className="tag">{p.tag}</span>
                <h3 className="project-panel-title">{p.title}</h3>
                <p className="section-copy">{p.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────── */}
      <section className="section" id="gallery" aria-labelledby="gallery-heading">
        <div className="shell">
          <div className="section-header">
            <p className="eyebrow">Gallery</p>
            <h2 id="gallery-heading" className="section-title">Workshops, sessions, and events</h2>
          </div>
          <div className="gallery-grid" role="list">
            {gallery.map((img) => (
              <figure key={img.src} className="gallery-item" role="listitem">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={420}
                  height={315}
                />
              </figure>
            ))}
          </div>
          <div className="gallery-cta-row">
            <Link href="/gallery" className="btn btn--ghost">
              View full gallery <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────── */}
      <section className="section section--muted" id="team" aria-labelledby="team-heading">
        <div className="shell">
          <div className="section-header section-header--split">
            <div>
              <p className="eyebrow">Team</p>
              <h2 id="team-heading" className="section-title">Leadership and tech leads</h2>
            </div>
            <p className="section-copy section-copy--narrow">
              The club is run entirely by students, with each lead owning a
              specific engineering discipline and mentoring newer members.
            </p>
          </div>
          <div className="team-grid" role="list">
            {team.map(({ name, role }) => (
              <article key={name} className="team-card" role="listitem">
                <div className="team-avatar" aria-hidden="true">
                  {name.charAt(0)}
                </div>
                <div>
                  <h3 className="team-name">{name}</h3>
                  <p className="team-role">{role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ───────────────────────────────────── */}
      <section className="section" id="workflow" aria-labelledby="workflow-heading">
        <div className="shell split-section">
          <div>
            <p className="eyebrow">Member journey</p>
            <h2 id="workflow-heading" className="section-title">From interest to shipped work</h2>
          </div>
          <ol className="workflow-list">
            {workflow.map((step, i) => (
              <li key={step} className="workflow-item">
                <span className="workflow-number" aria-hidden="true">
                  0{i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="section section--muted" aria-labelledby="testimonials-heading">
        <div className="shell">
          <div className="section-header">
            <p className="eyebrow">Voices</p>
            <h2 id="testimonials-heading" className="section-title">What members say</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map(({ name, role, quote }) => (
              <blockquote key={name} className="testimonial-card">
                <p className="testimonial-quote">&#8220;{quote}&#8221;</p>
                <footer className="testimonial-footer">
                  <div className="team-avatar team-avatar--sm" aria-hidden="true">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <cite className="testimonial-name">{name}</cite>
                    <p className="testimonial-role">{role}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / FOOTER ──────────────────────────────── */}
      <footer className="site-footer" id="contact">
        <div className="shell footer-grid">

          <div className="footer-info">
            <p className="eyebrow eyebrow--light">Get involved</p>
            <h2 className="footer-title">Ready to build with Life Robo?</h2>
            <p className="footer-body">
              Share your interest and we will point you to the right track —
              whether that is software, electronics, mechanics, or competitions.
            </p>
            <div className="footer-links">
              <a
                href="https://www.instagram.com/liferobo.foet.lu/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/roboticsclublu/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/liferobo_foet/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
              >
                X / Twitter
              </a>
            </div>
          </div>

          <form className="contact-form" aria-label="Join the club enquiry form">
            <label className="form-field">
              <span>Name</span>
              <input type="text" placeholder="Your name" autoComplete="name" />
            </label>
            <label className="form-field">
              <span>Email</span>
              <input type="email" placeholder="you@example.com" autoComplete="email" />
            </label>
            <label className="form-field">
              <span>Your interest</span>
              <textarea
                placeholder="Tell us whether you are interested in software, electronics, mechanics, or competitions."
              />
            </label>
            <button type="button" className="btn btn--light btn--large">
              Send your interest
            </button>
          </form>

        </div>

        <div className="shell footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Life Robo Robotics Club · FOET, University of Lucknow
          </p>
          <nav aria-label="Footer navigation">
            <a href="/#about">About</a>
            <a href="/#programs">Programs</a>
            <a href="/#projects">Projects</a>
            <a href="/editor">IDE</a>
          </nav>
        </div>
      </footer>

    </div>
  );
};
