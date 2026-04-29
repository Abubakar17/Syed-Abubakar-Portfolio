import { useEffect, useMemo, useState } from "react";
import { HashRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";

const portrait =
  "https://raw.githubusercontent.com/Abubakar17/My_site_old/main/src/assets/fyppic.jpg";

const profile = {
  name: "Syed Muhammad Abubakar",
  role: "Machine Learning & Systems Engineer",
  email: "syedabubakar03@yahoo.com",
  github: "https://github.com/Abubakar17",
  linkedin: "https://www.linkedin.com/in/s-m-abubakar/",
  resume: `${import.meta.env.BASE_URL}SyedM.Abubakar_Resume.pdf`,
};

const navigation = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Achievements", path: "/achievements" },
  { label: "Contact", path: "/contact" },
];

const highlights = [
  {
    label: "Incoming Data Center Technician Intern",
    value: "Google Belgium",
    detail: "Summer 2026",
  },
  {
    label: "Scholarship",
    value: "Erasmus Mundus",
    detail: "Systems Engineering",
  },
  {
    label: "Foundation",
    value: "Electrical Engineering",
    detail: "Distinction, CGPA 3.62",
  },
];

const focusAreas = [
  "Machine learning systems",
  "Optimization and control",
  "Generative AI and RAG",
  "Computer vision for real-world modeling",
  "Data center systems and cloud infrastructure",
];

const typingWords = [
  "ML systems.",
  "optimization and control.",
  "simulation-ready engineering.",
];

const projects = [
  {
    title: "3D Pose Estimation from LiDAR",
    category: "Systems",
    problem:
      "Recover reliable pose estimates from sparse sensor data where camera-only assumptions break down.",
    approach:
      "Built a LiDAR-centered estimation pipeline with geometric preprocessing, model evaluation, and performance analysis for robotics-style perception workflows.",
    impact:
      "Converted raw spatial data into interpretable pose outputs and strengthened the bridge between perception, sensing, and deployed systems.",
    stack: ["Python", "LiDAR", "Computer Vision", "Geometry", "Deep Learning"],
    link: "https://github.com/Abubakar17/lidar_pose_estimation",
  },
  {
    title: "ChatWithPDF RAG Assistant",
    category: "ML",
    problem:
      "Make long documents searchable and conversational without losing source-grounded answers.",
    approach:
      "Designed a retrieval-augmented generation workflow with document chunking, embeddings, vector search, and LLM response orchestration.",
    impact:
      "Reduced document lookup friction and demonstrated practical LLM systems design for knowledge-heavy workflows.",
    stack: ["LangChain", "LLMs", "RAG", "Vector Search", "Python"],
    link: "https://github.com/Abubakar17",
  },
  {
    title: "Fish Biomass Estimation",
    category: "Research",
    problem:
      "Estimate fish biomass in unconstrained underwater videos where lighting, occlusion, and motion make measurement difficult.",
    approach:
      "Combined YOLOv8 detection, segmentation, tracking, depth estimation, and image enhancement methods across underwater datasets.",
    impact:
      "Reached 98% detection accuracy in experiments and contributed to research at the intersection of AI and marine science.",
    stack: ["YOLOv8", "OpenCV", "Depth Estimation", "PyTorch", "Research"],
    link: "https://github.com/Abubakar17/FYP-reports---",
  },
  {
    title: "Serverless AWS Workflow",
    category: "Systems",
    problem:
      "Design a cloud-native workflow that connects embedded/system events with scalable backend processing.",
    approach:
      "Built a serverless architecture using managed AWS services, event-driven execution, and lightweight integration patterns.",
    impact:
      "Demonstrated production-minded cloud design during the Japan METI internship, with emphasis on reliability and operational simplicity.",
    stack: ["AWS", "Serverless", "IoT", "Python", "Embedded Systems"],
    link: "https://github.com/Abubakar17",
  },
];

const experiences = [
  {
    company: "Google",
    role: "Incoming Data Center Technician Intern",
    period: "2026",
    location: "Baudour, Belgium",
    points: [
      "Incoming internship focused on data center operations, hardware reliability, system maintenance, and operational discipline.",
      "Connects my electrical engineering foundation with large-scale infrastructure, cloud systems, and reliability-focused engineering.",
    ],
  },
  {
    company: "Dcube Tech",
    role: "Machine Learning Engineer",
    period: "2024 - 2025",
    location: "Islamabad, Pakistan",
    points: [
      "Built ML systems around generative AI, LLM workflows, and production-oriented model pipelines.",
      "Worked across data preparation, model experimentation, deployment constraints, and MLOps practices.",
      "Connected research prototypes with usable engineering workflows for real product contexts.",
    ],
  },
  {
    company: "Japan METI Internship",
    role: "Embedded Systems + AWS Intern",
    period: "2025",
    location: "Tokyo, Japan",
    points: [
      "Developed embedded and cloud-connected systems with attention to reliability, interfaces, and deployment tradeoffs.",
      "Used AWS serverless patterns to model event-driven workflows and backend automation.",
      "Worked in a cross-cultural engineering environment with high expectations for clarity and execution.",
    ],
  },
  {
    company: "OPTIMAL Lab",
    role: "Research Assistant",
    period: "2023 - 2024",
    location: "Islamabad, Pakistan",
    points: [
      "Researched fish biomass estimation under unconstrained underwater imaging conditions.",
      "Evaluated detection, segmentation, tracking, and depth estimation techniques for measurement pipelines.",
      "Produced experiments using YOLO, OpenCV, deep learning, and research reporting workflows.",
    ],
  },
];

const achievements = [
  {
    title: "Incoming Data Center Technician Intern",
    organization: "Google Belgium",
    year: "Summer 2026",
    detail:
      "Selected for a data center infrastructure internship focused on hardware reliability, operations, system maintenance, and high-standard technical execution.",
    type: "Career",
  },
  {
    title: "Erasmus Mundus Joint Master's Scholarship",
    organization: "European Commission",
    year: "April 2025",
    detail:
      "Awarded a fully funded scholarship for the European Master in Sustainable Systems Engineering (EMSSE), recognizing academic merit, research potential, and leadership among top global applicants.",
    type: "Scholarship",
  },
  {
    title: "Fully Funded METI AI/IT Japan Internship",
    organization: "Japan METI",
    year: "November 2024",
    detail:
      "Awarded the internship as the only Pakistani selected from a global pool of 15,000 candidates.",
    type: "International",
  },
  {
    title: "FAST Sustainability Award",
    organization: "FAST Cables Ltd.",
    year: "October 2024",
    detail:
      "Received PKR 200,000 for the most sustainable undergraduate Final Year Project.",
    type: "Award",
  },
  {
    title: "Australian Government Research Grant",
    organization: "OPTIMAL Lab, Machine Vision Group, University of Western Australia",
    year: "March 2023",
    detail:
      "Received research grant support for real-time fish biomass estimation work at OPTIMAL Lab.",
    type: "Research",
  },
  {
    title: "24th National Physics Talent Contest",
    organization: "STEM Careers Programme, HEC Pakistan",
    year: "September 2019",
    detail:
      "Qualified for the national physics talent contest under the STEM Careers Programme sponsored by HEC Pakistan.",
    type: "Academic",
  },
];

const submissions = [
  {
    title: "Fish Biomass Estimation in Unconstrained Underwater Environments",
    venue: "ICES Journal of Marine Science",
    status: "Research manuscript",
    reference: "ICESJMS-2024-271",
    detail:
      "Computer vision and biomass estimation work for underwater videos under real-world imaging constraints, developed through detection, tracking, segmentation, and depth-estimation experiments.",
  },
  {
    title: "Medical Imaging / AI Research Manuscript",
    venue: "MICCAI",
    status: "Research manuscript",
    reference: "MICCAI 2025 paper submission",
    detail:
      "Led the active learning pipeline for dental X-ray disease detection, integrating LLM-generated feature descriptions, vector embeddings, and CORESet selection to optimize sample efficiency.",
  },
];

const terminalLines = [
  "$ focus --systems ml control simulation",
  "Building models that survive contact with real data.",
  "Optimizing for clarity, latency, reliability, and measurable impact.",
];

function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [location.pathname]);
}

function useTyping(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const word = words[wordIndex % words.length];
    if (text.length < word.length) {
      const timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), 55);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setText("");
      setWordIndex((index) => index + 1);
    }, 1800);
    return () => clearTimeout(timeout);
  }, [text, wordIndex, words]);

  return text;
}

function Layout() {
  const location = useLocation();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <header className="header">
      <Link className="brand" to="/">
        <span className="brand-mark">SMA</span>
        <span>Syed M. Abubakar</span>
      </Link>
      <div className="header-actions">
        <nav className="nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(nextTheme)}
          aria-label={`Switch to ${nextTheme} theme`}
          title={`Switch to ${nextTheme} theme`}
        >
          <span aria-hidden="true">{theme === "dark" ? "Dark" : "Light"}</span>
        </button>
      </div>
    </header>
  );
}

function Home() {
  const typedText = useTyping(typingWords);

  return (
    <>
      <section className="hero page-section" data-reveal>
        <div className="hero-inner">
          <div className="hero-content">
            <p className="eyebrow">Incoming Data Center Technician Intern @ Google Belgium, Summer 2026</p>
            <h1>{profile.name}</h1>
            <p className="hero-title">
              {profile.role} building <span>{typedText}</span>
              <span className="cursor" aria-hidden="true" />
            </p>
            <p className="hero-copy">
              Erasmus Mundus Scholar focused on machine learning systems, control,
              simulation, and real-world infrastructure. I connect ML, embedded systems,
              and cloud operations with a reliability-first engineering mindset.
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/projects">
                View Projects
              </Link>
              <a className="button" href={profile.resume} target="_blank" rel="noreferrer">
                Resume
              </a>
            </div>
          </div>

          <div className="portrait-card" aria-label="Portrait of Syed Muhammad Abubakar">
            <div className="portrait-flipper">
              <div className="portrait-face portrait-front">
                <img src={portrait} alt="Syed Muhammad Abubakar" />
              </div>
              <div className="portrait-face portrait-back">
                <span>insta:</span>
                <strong>bakar_03</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="highlight-grid" aria-label="Key highlights">
        {highlights.map((item) => (
          <article className="highlight-card" data-reveal key={item.label}>
            <p>{item.label}</p>
            <h2>{item.value}</h2>
            <span>{item.detail}</span>
          </article>
        ))}
      </section>

      <section className="split-section" data-reveal>
        <div>
          <p className="eyebrow">Engineering Direction</p>
          <h2>Built for problems where models, systems, and constraints meet.</h2>
        </div>
        <div className="focus-list">
          {focusAreas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </section>

      <Terminal />
    </>
  );
}

function About() {
  return (
    <section className="page-section narrow" data-reveal>
      <p className="eyebrow">About</p>
      <h1>Systems-minded ML engineer with a control and sensing foundation.</h1>
      <div className="prose">
        <p>
          I work best on problems where technical depth matters: uncertain data,
          constrained systems, imperfect sensors, and models that need to become
          reliable systems. My background in electrical engineering gave me a
          strong base in signals, systems, and mathematical modeling; my current
          focus extends that foundation into machine learning infrastructure,
          generative AI, optimization, and simulation.
        </p>
        <p>
          As an Erasmus Mundus Scholar in Systems Engineering and an incoming
          Google Data Center Technician intern, I am drawn to engineering cultures that value
          precision, clarity, and high execution standards. I like building
          things that are technically honest: measurable, explainable, and
          designed around the constraints of the real environment.
        </p>
        <p>
          The work I want more of sits at the intersection of ML systems,
          infrastructure, control, and applied research: retrieval systems that are
          trustworthy, perception pipelines that handle messy data, and operational
          systems that need reliability under real constraints.
        </p>
      </div>
    </section>
  );
}

function Projects() {
  const categories = ["All", "ML", "Systems", "Research"];
  const [active, setActive] = useState("All");
  const visibleProjects = useMemo(
    () => projects.filter((project) => active === "All" || project.category === active),
    [active]
  );

  return (
    <section className="page-section" data-reveal>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Projects</p>
          <h1>Selected engineering work with clear problem framing.</h1>
        </div>
        <div className="filters" aria-label="Project filters">
          {categories.map((category) => (
            <button
              className={active === category ? "active" : ""}
              key={category}
              onClick={() => setActive(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="project-grid">
        {visibleProjects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-topline">
              <span>{project.category}</span>
              <a href={project.link} target="_blank" rel="noreferrer" aria-label={`${project.title} repository`}>
                GitHub
              </a>
            </div>
            <h2>{project.title}</h2>
            <ProjectField label="Problem" text={project.problem} />
            <ProjectField label="Approach" text={project.approach} />
            <ProjectField label="Impact" text={project.impact} />
            <div className="tag-row">
              {project.stack.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectField({ label, text }) {
  return (
    <div className="project-field">
      <strong>{label}</strong>
      <p>{text}</p>
    </div>
  );
}

function Experience() {
  return (
    <section className="page-section" data-reveal>
      <p className="eyebrow">Experience</p>
      <h1>Impact across ML engineering, research, embedded systems, and cloud.</h1>
      <div className="timeline">
        {experiences.map((item) => (
          <article className="timeline-item" key={`${item.company}-${item.role}`}>
            <div className="timeline-meta">
              <span>{item.period}</span>
              <small>{item.location}</small>
            </div>
            <div className="timeline-content">
              <h2>{item.role}</h2>
              <p>{item.company}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section className="page-section" data-reveal>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Achievements</p>
          <h1>Signals of selection, research depth, and engineering trajectory.</h1>
        </div>
      </div>
      <div className="achievement-grid">
        {achievements.map((item) => (
          <article className="achievement-card" key={`${item.title}-${item.year}`}>
            <span>{item.type}</span>
            <h2>{item.title}</h2>
            <p className="achievement-org">{item.organization}</p>
            <p>{item.detail}</p>
            <strong>{item.year}</strong>
          </article>
        ))}
      </div>
      <ResearchSubmissions />
    </section>
  );
}

function ResearchSubmissions({ compact = false }) {
  return (
    <section className={compact ? "submissions compact" : "submissions"} data-reveal>
      <div className="submissions-heading">
        <p className="eyebrow">Research Manuscripts</p>
        <h2>Scientific writing and research work developed for selective venues.</h2>
      </div>
      <div className="submission-list">
        {submissions.map((paper) => (
          <article className="submission-card" key={`${paper.venue}-${paper.reference}`}>
            <div>
              <span>{paper.status}</span>
              <h3>{paper.title}</h3>
              <p>{paper.detail}</p>
            </div>
            <div className="submission-meta">
              <strong>{paper.venue}</strong>
              <small>{paper.reference}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="page-section contact-page" data-reveal>
      <p className="eyebrow">Contact</p>
      <h1>Open to high-impact software, ML systems, and applied research conversations.</h1>
      <div className="contact-grid">
        <a href={`mailto:${profile.email}`}>
          <span>Email</span>
          {profile.email}
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          <span>LinkedIn</span>
          /in/s-m-abubakar
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          <span>GitHub</span>
          github.com/Abubakar17
        </a>
      </div>
    </section>
  );
}

function Terminal() {
  return (
    <section className="terminal" data-reveal aria-label="Engineering terminal">
      <div className="terminal-chrome">
        <span />
        <span />
        <span />
      </div>
      <div className="terminal-body">
        {terminalLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>Syed Muhammad Abubakar</span>
      <div>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
}
