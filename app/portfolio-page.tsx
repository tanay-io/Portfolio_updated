"use client";

import { useEffect, useRef, useState } from "react";
import { LoadingScreen } from "../components/loading-screen";

type ExperienceItem = {
  dates: string;
  role: string;
  company: string;
  description: string[];
  tags: string[];
};

type ProjectItem = {
  number: string;
  title: string;
  subtitle: string;
  description: string[];
  label: string;
  stack: string[];
  liveHref: string;
  codeHref: string;
  active?: boolean;
};

type CertificationItem = {
  title: string[];
  date: string;
};

type SkillGroup = {
  label: string;
  items: string[];
};

const NAV_ITEMS = [
  { href: "intro", label: "Intro" },
  { href: "work", label: "Work" },
  { href: "projects", label: "Projects" },
  { href: "certifications", label: "Certs" },
  { href: "skills", label: "Skills" },
  { href: "education", label: "Education" },
  { href: "contact", label: "Contact" },
];

const EXPERIENCES: ExperienceItem[] = [
  {
    dates: "Aug 2025 - Present",
    role: "Full Stack Intern",
    company: "Convivity Technologies - Delaware, USA - Remote",
    description: [
      "Built a real-time calendar scheduling backend using Node.js",
      "(Hono framework) deployed on Cloudflare Workers. Designed",
      "RESTful APIs for user and event management with JWT and",
      "OAuth authentication. Optimized PostgreSQL queries using",
      "Prisma ORM, reducing average query latency by ~30%. Worked",
      "within a microservices-based backend architecture.",
    ],
    tags: [
      "hono",
      "cloudflare workers",
      "postgresql",
      "prisma",
      "jwt",
      "oauth",
    ],
  },
  {
    dates: "Jul 2025 - Aug 2025",
    role: "Full Stack Intern",
    company: "VetikalLabs - Bangalore - Remote",
    description: [
      "Developed a full-stack Job Summarizer application using",
      "Next.js and Node.js. Integrated file storage with AWS S3.",
      "Added logging and testing to improve application reliability.",
    ],
    tags: ["next.js", "node.js", "aws s3", "jest"],
  },
  {
    dates: "Jun 2025 - Aug 2025",
    role: "Open Source Web Developer",
    company: "GirlScript Summer of Code (GSSoC) - Remote",
    description: [
      "Contributed to open-source projects by resolving issues,",
      "implementing new features, and optimizing performance.",
      "Collaborated with maintainers to enhance full-stack applications.",
    ],
    tags: ["open source", "full stack", "collaboration"],
  },
];

const PROJECTS: ProjectItem[] = [
  {
    number: "01",
    title: "Real-Time Chat Application",
    subtitle: "High-performance encrypted messaging system.",
    description: [
      "WebSocket-based real-time communication with AES-encrypted",
      "message payloads and JWT authentication. Managed user",
      "presence, message delivery, and persistence.",
    ],
    label: "Stack",
    stack: ["MERN", "Socket.io", "JWT", "AES Encryption", "WebSockets"],
    liveHref: "#",
    codeHref: "#",
  },
  {
    number: "02",
    title: "AI Notes Summarizer",
    subtitle: "PDF-to-intelligence pipeline.",
    description: [
      "Notes summarization tool with flashcard generation from",
      "PDF uploads. Integrated Gemini API for summarization.",
      "Reduced manual note processing time by ~70%.",
    ],
    label: "Stack",
    stack: ["Next.js", "Gemini API", "JWT", "MongoDB"],
    liveHref: "#",
    codeHref: "#",
  },
  {
    number: "03",
    title: "Zaprun - Workflow Execution Engine",
    subtitle: "Deterministic, fault-tolerant workflow engine.",
    description: [
      "API-first execution engine with durable state. Event-driven",
      "step orchestration via Kafka. Outbox pattern for guaranteed",
      "event publishing and failure recovery. Designed for retries,",
      "replay, and full auditability.",
    ],
    label: "Architecture",
    stack: [
      "TypeScript",
      "Express",
      "Kafka",
      "PostgreSQL",
      "Prisma",
      "Outbox Pattern",
      "Microservices",
    ],
    liveHref: "#",
    codeHref: "#",
    active: true,
  },
  {
    number: "04",
    title: "NovelGrab",
    subtitle: "Web novel downloader with containerized architecture.",
    description: [
      "Multi-container Docker stack for downloading and managing",
      "web novels. Built for reliability and scalability.",
    ],
    label: "Stack",
    stack: ["Next.js", "Node.js", "Redis", "MongoDB", "Docker"],
    liveHref: "#",
    codeHref: "#",
  },
  {
    number: "05",
    title: "3-to-8 Decoder on Spartan-6 FPGA",
    subtitle: "Hardware logic on silicon.",
    description: [
      "Designed and implemented a 3-to-8 decoder in Digital System",
      "Design lab using Verilog. Demonstrated practical understanding",
      "of digital circuits and hardware logic synthesis.",
    ],
    label: "Stack",
    stack: ["Verilog", "Spartan-6 FPGA", "Digital Systems"],
    liveHref: "#",
    codeHref: "#",
  },
];

const HERO_NAME_LINES = ["TANAY", "SACHDEVA"];

const CERTIFICATIONS: CertificationItem[] = [
  {
    title: [
      "Geometrical Shape Detection and Recognition",
      "using Python in Image Processing",
    ],
    date: "April 23, 2024",
  },
  {
    title: ["PCB Design and Fabrication"],
    date: "April 23, 2024",
  },
  {
    title: ["HDL Implementation of Digital Clock"],
    date: "January 28, 2026",
  },
];

const SKILL_GROUPS: SkillGroup[] = [
  { label: "Languages", items: ["C++", "JavaScript", "TypeScript", "Python"] },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "Hono",
      "REST APIs",
      "WebSockets",
      "JWT",
      "OAuth",
    ],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "TailwindCSS", "HTML", "CSS"],
  },
  { label: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL", "SQLite"] },
  {
    label: "Cloud & Infra",
    items: ["AWS S3", "AWS Lambda", "Cloudflare Workers", "Docker", "Redis"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Postman", "Jest", "Prisma ORM", "VS Code"],
  },
  {
    label: "Hardware & Systems",
    items: ["Verilog", "FPGA", "Digital System Design", "Image Processing"],
  },
  {
    label: "Concepts",
    items: [
      "Microservices",
      "Event-Driven Architecture",
      "Outbox Pattern",
      "Distributed Systems",
      "Kafka",
      "System Design",
    ],
  },
];

function MultiLineText({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="line-block">
          {line || "\u00A0"}
        </span>
      ))}
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="section-eyebrow">{eyebrow}</p>
      <div className="section-line" />
      <h2>{title}</h2>
      {description ? (
        <p className="section-description">{description}</p>
      ) : null}
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M11.25 4.25H15.75V8.75M15.25 4.75L9 11M8.25 5.25H5.75C4.92157 5.25 4.25 5.92157 4.25 6.75V14.25C4.25 15.0784 4.92157 15.75 5.75 15.75H13.25C14.0784 15.75 14.75 15.0784 14.75 14.25V11.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 1400);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      const root = document.documentElement;
      const maxScroll = root.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${progress})`;
      }

      document.querySelectorAll<HTMLElement>("[data-drift]").forEach((node) => {
        const speed = Number(node.dataset.drift ?? "0.15");
        node.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const draw = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      hero.style.setProperty("--mx", currentX.toFixed(2));
      hero.style.setProperty("--my", currentY.toFixed(2));
      frame = window.requestAnimationFrame(draw);
    };

    const handleMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 36;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 20;
    };

    frame = window.requestAnimationFrame(draw);
    hero.addEventListener("mousemove", handleMove);

    return () => {
      window.cancelAnimationFrame(frame);
      hero.removeEventListener("mousemove", handleMove);
    };
  }, []);

  const handleProjectMove = (event: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 10;
    const rotateX = (0.5 - py) * 10;

    node.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
    node.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
    node.style.setProperty("--spot-x", `${(px * 100).toFixed(2)}%`);
    node.style.setProperty("--spot-y", `${(py * 100).toFixed(2)}%`);
  };

  const handleProjectLeave = (event: React.MouseEvent<HTMLElement>) => {
    const node = event.currentTarget;
    node.style.setProperty("--tilt-x", "0deg");
    node.style.setProperty("--tilt-y", "0deg");
    node.style.setProperty("--spot-x", "50%");
    node.style.setProperty("--spot-y", "50%");
  };

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText("tanaysachdeva873@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 350);
  };

  return (
    <>
      <div className={`loading-screen${loading ? " active" : ""}`}>
        <div className="loading-rune">TS</div>
        <p>Loading....</p>
      </div>

      <div className="scroll-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>

      <header className="site-header">
        <a className="site-mark" href="#intro">
          Tanay Sachdeva
        </a>
        <nav className="site-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={`#${item.href}`}>
              {item.label}
            </a>
          ))}
          <a
            className="site-nav-download"
            href="https://drive.google.com/uc?export=download&id=1UPDSFW1X6py45Jh_OeJeTcZ62uXuqNz3"
          >
            Download Resume
          </a>
        </nav>
      </header>

      <main className="page-shell">
        <section
          id="intro"
          ref={heroRef}
          className="hero reveal visible"
          data-reveal
        >
          <div className="hero-fog hero-fog-one" data-drift="0.06" />
          <div className="hero-fog hero-fog-two" data-drift="0.12" />
          <div className="hero-orbit"></div>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-label">
                Electronics &amp; Computer Engineering
              </p>

              <div className="hero-name" aria-label="Tanay Sachdeva">
                {HERO_NAME_LINES.map((line, lineIndex) => (
                  <span key={line} className="hero-name-line">
                    {line.split("").map((char, charIndex) => {
                      const delay = 420 + lineIndex * 420 + charIndex * 80;

                      return (
                        <span
                          key={`${line}-${char}-${charIndex}`}
                          className="hero-char"
                          style={{ transitionDelay: `${delay}ms` }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                ))}
              </div>

              <div className="hero-brush" aria-hidden="true">
                <svg viewBox="0 0 320 70" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 51 C42 18, 88 10, 144 24 S251 62, 305 29" />
                </svg>
              </div>

              <p className="hero-role">
                Backend Engineer · Full Stack Developer{" "}
              </p>
              <div className="hero-rule" />

              <p className="hero-text">
                <MultiLineText
                  lines={[
                    "Undergraduate at Thapar Institute of Engineering and Technology.",
                    "Building fault-tolerant backends, distributed systems, and",
                    "things that work correctly the first time - and when they do not,",
                    "recover gracefully.",
                    "",
                    "8.18 cgpa(until 5th sem)",

                    "99.02  Percentile in JEE Mains Mathematics.",
                  ]}
                />
              </p>

              <div className="hero-meta">
                <span>tanaysachdeva873@gmail.com</span>
                <span>+91-8168272148</span>
                <span>Haryana, India</span>
              </div>

              <div className="hero-links">
                <a href="https://github.com/tanay-io/">GitHub</a>
                <a href="https://www.linkedin.com/in/tanay-sachdeva-7119672b1/">LinkedIn</a>
                <a href="#">Portfolio</a>
                <a
                  className="site-nav-download"
                  href="https://drive.google.com/uc?export=download&id=1UPDSFW1X6py45Jh_OeJeTcZ62uXuqNz3"
                >
                  Resume
                </a>
              </div>
            </div>

            <aside className="hero-panel">
              <p className="panel-label">Current Focus</p>
              <h2>Systems built to survive pressure.</h2>
              <p>
                Building real-time, scalable web applications with modern tech
                stacks. Focused on clean architecture, performance, and seamless
                user experiences
              </p>
              <div className="hero-stats">
                <div>
                  <strong>2</strong>
                  <span>internships</span>
                </div>
                <div>
                  <strong>5</strong>
                  <span>projects</span>
                </div>
                <div>
                  <strong>99.02</strong>
                  <span>math percentile</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="work" className="section reveal" data-reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Internships"
            description="Backend-first work across real-time scheduling, microservices, APIs, and reliability."
          />

          <div className="timeline">
            {EXPERIENCES.map((item, index) => (
              <article
                key={`${item.role}-${item.company}-${item.dates}`}
                className="timeline-card"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="timeline-date">{item.dates}</div>
                <div className="timeline-content">
                  <h3>{item.role}</h3>
                  <p className="timeline-company">{item.company}</p>
                  <p className="body-copy">
                    <MultiLineText lines={item.description} />
                  </p>
                  <div className="tag-row">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section reveal" data-reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Engines, channels, and systems with teeth."
            description="Every project card is now native Next source, editable, and responsive on mobile."
          />

          <div className="project-grid">
            {PROJECTS.map((project, index) => (
              <article
                key={project.title}
                className="project-card"
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseMove={handleProjectMove}
                onMouseLeave={handleProjectLeave}
              >
                <div className="project-glare" />
                <div className="project-top">
                  <span>{project.number}</span>
                  {project.active ? (
                    <span className="project-active">
                      <i />
                      In Active Development
                    </span>
                  ) : null}
                </div>
                <h3>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="body-copy">
                  <MultiLineText lines={project.description} />
                </p>
                <p className="stack-label">{project.label}</p>
                <div className="tag-row">
                  {project.stack.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.liveHref}>
                    <ExternalIcon />
                    Visit
                  </a>
                  <a href={project.codeHref}>Code</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="section reveal" data-reveal>
          <SectionHeading
            eyebrow="Certifications"
            title="Proof in exact fragments."
            description="Institution-backed work in image processing, PCB fabrication, and digital hardware."
          />

          <div className="cert-grid">
            {CERTIFICATIONS.map((item, index) => (
              <article
                key={`${item.date}-${index}`}
                className="cert-card"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <p className="cert-top">THAPAR INSTITUTE</p>
                <p className="cert-subtop">
                  ELC - Experiential Learning Centre
                </p>
                <h3>
                  <MultiLineText lines={item.title} />
                </h3>
                <p className="cert-date">{item.date}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section reveal" data-reveal>
          <SectionHeading
            eyebrow="Skills"
            title="Tools kept sharp."
            description="The stack remains broad, but the center of gravity is backend reliability and systems thinking."
          />

          <div className="skills-grid">
            {SKILL_GROUPS.map((group, index) => (
              <article
                key={group.label}
                className="skill-card"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <p className="skill-top">{group.label}</p>
                <div className="skill-items">
                  {group.items.map((item, itemIndex) => (
                    <span
                      key={item}
                      className="skill-pill"
                      style={{ transitionDelay: `${itemIndex * 40}ms` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section reveal" data-reveal>
          <SectionHeading
            eyebrow="Education"
            title="Formal training, practical obsession."
          />

          <article className="education-card">
            <p className="education-school">
              Thapar Institute of Engineering and Technology
            </p>
            <p className="education-city">Patiala, India</p>
            <div className="education-line" />
            <h3>B.E. in Electronics and Computer Engineering</h3>
            <p className="education-date">Aug 2023 - Present</p>
            <p className="education-score">
              JEE Mains 2023 · 99.02 Percentile in Mathematics
            </p>
          </article>
        </section>

        <section id="contact" className="section reveal" data-reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let us build something precise."
            description="Available for internships, collaborations, and conversations about systems that work."
          />

          <div className="contact-card">
            <button
              className={`mail-link${copied ? " copied" : ""}`}
              onClick={handleCopyEmail}
            >
              tanaysachdeva873@gmail.com
            </button>
            <p>+91-8168272148</p>
            <p>Haryana, India</p>
            <div className="hero-links contact-links">
              <a href="https://github.com/tanay-io/">GitHub</a>
              <a href="https://www.linkedin.com/in/tanay-sachdeva-7119672b1/">
                LinkedIn
              </a>
              <a href="#">Portfolio</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        © 2026 · Tanay Sachdeva · forged in shadow
      </footer>
    </>
  );
}
