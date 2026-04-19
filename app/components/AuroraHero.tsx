"use client";

import Link from "next/link";
import { ArrowRight, Bot, Cpu, GalleryHorizontal, Trophy, Users, Wrench, Zap } from "lucide-react";

const metrics = [
  { value: "50+",    label: "Active members" },
  { value: "18+",    label: "Competition podiums" },
  { value: "Weekly", label: "Build sessions" },
];

const programs = [
  {
    icon: Cpu,
    title: "Foundation Workshops",
    copy: "Structured sessions on Arduino, sensors, CAD, embedded coding, and robotics fundamentals for new members.",
  },
  {
    icon: Bot,
    title: "Project Squads",
    copy: "Cross-functional teams build rovers, line followers, and autonomous systems with guided design reviews.",
  },
  {
    icon: Trophy,
    title: "Competition Prep",
    copy: "Focused test cycles, rapid iteration, and strategy drills for technical contests and live demos.",
  },
];

const projects = [
  {
    tag: "Navigation",
    title: "Autonomous Rover Build",
    copy: "Sensor fusion, route planning, and terrain-ready chassis integration for robust outdoor testing.",
    image: "/photos/repo/repo-workshop-09.jpg",
  },
  {
    tag: "Control Systems",
    title: "Line Follower Sprint Bot",
    copy: "PID tuning, compact electronics packaging, and speed-focused track stability for competition use.",
    image: "/photos/repo/repo-workshop-07.jpg",
  },
  {
    tag: "Education",
    title: "Workshop Robot Platform",
    copy: "A modular teaching bot used to introduce members to embedded systems, assembly, and debugging.",
    image: "/photos/repo/repo-workshop-03.jpg",
  },
];

const workflow = [
  { step: "01", label: "Apply and attend orientation" },
  { step: "02", label: "Choose a track: software, electronics, or mechanics" },
  { step: "03", label: "Build with a team under mentor guidance" },
  { step: "04", label: "Demo, compete, and publish your outcomes" },
];

const team = [
  { name: "Amit Chauhan",    role: "Head" },
  { name: "Ahmad Tarique",   role: "Co-Head" },
  { name: "Harsh Prajapati", role: "Software Team Lead" },
  { name: "Jatin Pandey",    role: "Software Team Co-Lead" },
  { name: "Vineeta",         role: "Circuit Designing Lead" },
  { name: "Lakshya Soni",    role: "Circuit Designing Co-Lead" },
];

const galleryImages = [
  { src: "/photos/repo/repo-event-workshop-2026.png",  alt: "Workshop inauguration 2026" },
  { src: "/photos/repo/repo-event-roboeminence.jpg",   alt: "Roboeminence event" },
  { src: "/photos/repo/repo-event-lecture-series.jpg", alt: "Lecture series" },
  { src: "/photos/repo/repo-workshop-03.jpg",          alt: "Build session" },
  { src: "/photos/repo/repo-workshop-07.jpg",          alt: "Robot testing" },
  { src: "/photos/workshop-whatsapp-04.jpeg",          alt: "Workshop activity" },
];

const techStack = ["VEX Robotics", "FIRST Tech", "Arduino", "ROS", "OpenCV", "ESP32"];

export const AuroraHero = () => (
  <div className="lr-site" id="top">

    {/* ── NOTIFICATION BANNER ── */}
    <div className="notif-bar">
      <div className="shell notif-bar__inner">
        <span className="notif-bar__dot" aria-hidden="true" />
        <p>
          <strong>Workshop 2026:</strong> Inauguration and talk on careers in space — February 21, 2026.
        </p>
        <a href="/#events" className="notif-bar__link">
          View details <ArrowRight size={13} />
        </a>
      </div>
    </div>

    {/* ── HERO ── */}
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="shell hero-grid">

        <div className="hero-copy">
          <p className="eyebrow">Life Robo · Robotics Club · FOET LU</p>
          <h1 id="hero-heading">
            Build real robots.<br />Learn fast. Compete.
          </h1>
          <p className="hero-lead">
            Life Robo is the student-led robotics club at the Faculty of Engineering &amp; Technology,
            University of Lucknow — where students learn by building, testing, competing, and mentoring
            each other across hardware, software, and circuits.
          </p>
          <div className="hero-actions">
            <a href="/#contact" className="btn-primary">
              Join the club <ArrowRight size={15} />
            </a>
            <a href="/#projects" className="btn-outline">
              Explore projects
            </a>
          </div>
          <ul className="hero-points" aria-label="Club highlights">
            <li><Users size={15} aria-hidden="true" /> Member-driven learning and mentorship</li>
            <li><Wrench size={15} aria-hidden="true" /> Hardware, coding, circuits, and testing</li>
            <li><GalleryHorizontal size={15} aria-hidden="true" /> Workshops, demos, and event showcases</li>
          </ul>
        </div>

        <div className="hero-panel" aria-label="Club metrics">
          <div className="hero-feature-card">
            <span className="hero-feature-card__kicker">
              <Zap size={13} aria-hidden="true" /> Student engineering · FOET LU
            </span>
            <h2>A serious robotics club with real competition experience.</h2>
            <p>
              50+ active members. Weekly build sessions. 18+ competition podiums across
              line-following, rover navigation, and combat categories.
            </p>
          </div>
          <div className="metrics-row">
            {metrics.map((m) => (
              <div key={m.value} className="metric-card">
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── ABOUT ── */}
    <section className="section section--muted" id="about" aria-labelledby="about-heading">
      <div className="shell two-col">
        <div>
          <p className="eyebrow">About</p>
          <h2 id="about-heading">A student engineering organization built around practical robotics work.</h2>
        </div>
        <p className="body-copy">
          We are a student-led community where innovators learn engineering, coding, and teamwork
          to build competitive robots and explore future technology. Every member contributes — whether
          in software, electronics, mechanics, or strategy — with guidance from senior mentors and
          hands-on lab access throughout the academic year.
        </p>
      </div>
    </section>

    {/* ── PROGRAMS ── */}
    <section className="section" id="programs" aria-labelledby="programs-heading">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">Programs</p>
          <h2 id="programs-heading">What members actually do here</h2>
        </div>
        <div className="card-grid-3">
          {programs.map(({ icon: Icon, title, copy }) => (
            <article key={title} className="info-card">
              <span className="info-card__icon" aria-hidden="true"><Icon size={20} /></span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* ── PROJECTS ── */}
    <section className="section section--muted" id="projects" aria-labelledby="projects-heading">
      <div className="shell">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow">Projects</p>
            <h2 id="projects-heading">Recent build themes</h2>
          </div>
          <p className="body-copy">
            Projects are the proof of what members learn. Every build goes through a full
            cycle — design, prototype, test, iterate, compete.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((p) => (
            <article key={p.title} className="project-card">
              <div className="project-card__img">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={600}
                  height={340}
                />
              </div>
              <div className="project-card__body">
                <span className="project-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* ── GALLERY ── */}
    <section className="section" id="gallery" aria-labelledby="gallery-heading">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">Gallery</p>
          <h2 id="gallery-heading">Workshops, sessions, and event moments</h2>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((img) => (
            <figure key={img.src} className="gallery-card" role="img" aria-label={img.alt}>
              <img src={img.src} alt={img.alt} loading="lazy" width={600} height={400} />
            </figure>
          ))}
        </div>
      </div>
    </section>

    {/* ── TEAM ── */}
    <section className="section section--muted" id="team" aria-labelledby="team-heading">
      <div className="shell">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow">Team</p>
            <h2 id="team-heading">Leadership &amp; technical leads</h2>
          </div>
          <p className="body-copy">
            The club is run by students across mechanical, software, electronics, and coordination
            functions — with mentorship chains so every new member has a direct senior to learn from.
          </p>
        </div>
        <div className="team-grid">
          {team.map(({ name, role }) => (
            <article key={name} className="team-card">
              <div className="team-card__avatar" aria-hidden="true">
                {name.charAt(0)}
              </div>
              <div>
                <h3>{name}</h3>
                <p>{role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* ── HOW WE BUILD ── */}
    <section className="section" id="workflow" aria-labelledby="workflow-heading">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">Member journey</p>
          <h2 id="workflow-heading">From interest to real contribution</h2>
        </div>
        <ol className="workflow-list" aria-label="Member journey steps">
          {workflow.map(({ step, label }) => (
            <li key={step} className="workflow-item">
              <span className="workflow-item__num" aria-hidden="true">{step}</span>
              <span>{label}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* ── TECH WE USE ── */}
    <section className="section section--muted" id="tech" aria-labelledby="tech-heading">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">Tech stack</p>
          <h2 id="tech-heading">Platforms and tools we use</h2>
        </div>
        <div className="tech-row" role="list">
          {techStack.map((t) => (
            <span key={t} className="tech-chip" role="listitem">{t}</span>
          ))}
        </div>
      </div>
    </section>

    {/* ── FOOTER / CONTACT ── */}
    <footer className="site-footer" id="contact" aria-labelledby="contact-heading">
      <div className="shell footer-grid">
        <div className="footer-copy">
          <p className="eyebrow eyebrow--light">Contact</p>
          <h2 id="contact-heading">Ready to build with Life Robo?</h2>
          <p>
            Reach out to join workshops, explore team roles, or collaborate on robotics events
            and technical projects at FOET, University of Lucknow.
          </p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/liferobo.foet.lu/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/in/roboticsclublu/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://x.com/liferobo_foet/" target="_blank" rel="noopener noreferrer">X / Twitter</a>
          </div>
          <Link href="/editor" className="footer-ide-link">
            Try the Online IDE →
          </Link>
        </div>

        <form className="contact-form" aria-label="Join interest form">
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" autoComplete="name" />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" autoComplete="email" />
          </label>
          <label>
            Your interest
            <textarea
              name="interest"
              placeholder="Tell us whether you are interested in software, electronics, mechanics, or competitions."
            />
          </label>
          <button type="button" className="btn-primary btn-primary--dark">
            Submit interest
          </button>
        </form>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} Life Robo Robotics Club · FOET, University of Lucknow</p>
        <p>Building future engineers.</p>
      </div>
    </footer>

  </div>
);
