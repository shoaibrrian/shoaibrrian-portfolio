import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { BookOpen } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "react-hot-toast";
import {
  Github,
  Mail,
  Phone,
  Linkedin,
  ExternalLink,
  ArrowRight,
  Download,
  Code2,
  Database,
  Wrench,
  Globe,
  Server,
  GraduationCap,
  MapPin,
  Calendar,
  Menu,
  X,
  Heart,
  Activity,
  Leaf,
  Send,
  CheckCircle,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import profileImage from "@/imports/IMG_3542-removebg-preview.png";

// ─── data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const ROLES = [
  "Web Developer",
  "Building Exceptional Experiences",
  "Turning Ideas Into Reality",
  "Creating Modern Web Solutions",
];

const MARQUEE_TECHS = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "JavaScript",
  "Python",
  "Figma",
  "Git",
  "REST APIs",
  "React.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "JavaScript",
  "Python",
  "Figma",
  "Git",
  "REST APIs",
];

const SKILLS = {
  frontend: {
    icon: <Globe size={16} />,
    color: "#8b5cf6",
    items: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "React-Bootstrap",
      "MaterialUI",
      "Chakra-UI",
      "Shadcn",
    ],
  },
  backend: {
    icon: <Server size={16} />,
    color: "#06b6d4",
    items: ["Node.js", "Express.js"],
  },
  database: {
    icon: <Database size={16} />,
    color: "#10b981",
    items: ["MongoDB"],
  },
  languages: {
    icon: <Code2 size={16} />,
    color: "#f59e0b",
    items: ["JavaScript", "TypeScript", "C", "C++", "Java", "Python"],
  },
  tools: {
    icon: <Wrench size={16} />,
    color: "#ec4899",
    items: [
      "VSCode",
      "Figma",
      "Framer",
      "Jira/Trello",
      "Github",
      "Postman",
      "Intellij IDEA",
      "Pycharm",
      "Arduino",
      "Cisco",
    ],
  },
};

const PROJECTS = [
  {
    id: "01",
    name: "Orpon",
    subtitle: "Donation Transparency Platform",
    role: "Team Contributor",
    color: "#8b5cf6",
    colorB: "#a78bfa",
    description:
      "A full-stack donation transparency platform built for secure online fundraising. Developed responsive and reusable frontend interfaces, implemented campaign pages, authentication, donation workflow, and role-based dashboard interfaces.",
    features: [
      "Secure authentication & role-based dashboards",
      "Campaign pages with donation workflow",
      "RESTful API integration",
      "Responsive reusable components",
    ],
    tech: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "JavaScript",
      "Node.js",
      "Express.js",
    ],
    github: "https://github.com/shoaibrrian",
    gradient: "from-violet-900/40 via-purple-900/20 to-transparent",
    icon: <Heart size={48} className="text-violet-400/30" />,
  },
  {
    id: "02",
    name: "UIU Health Care",
    subtitle: "Student Healthcare Support Web App",
    role: "Full Stack Developer",
    color: "#06b6d4",
    colorB: "#22d3ee",
    description:
      "A full-stack student healthcare support web application with secure authentication and role-based User/Admin dashboards. Implemented Emergency SOS, First Aid Guidelines, Mental Health Support, Health Awareness, and Google Maps integration.",
    features: [
      "Emergency SOS & First Aid Guidelines",
      "Mental Health Support system",
      "Nearby Hospital Finder with Google Maps",
      "Secure role-based User/Admin dashboards",
    ],
    tech: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Google Maps API",
    ],
    github: "https://github.com/shoaibrrian",
    gradient: "from-cyan-900/40 via-teal-900/20 to-transparent",
    icon: <Activity size={48} className="text-cyan-400/30" />,
  },
];

const ML_MODELS = [
  { name: "Random Forest", accuracy: "96.42%", highlight: true },
  { name: "Extra Trees Classifier", accuracy: "~94%", highlight: false },
  { name: "Gradient Boosting", accuracy: "~92%", highlight: false },
  { name: "SVM", accuracy: "~89%", highlight: false },
  { name: "KNN", accuracy: "~87%", highlight: false },
  { name: "Logistic Regression", accuracy: "~82%", highlight: false },
  { name: "Naive Bayes", accuracy: "~78%", highlight: false },
];

// ─── hooks ─────────────────────────────────────────────────────────────────────

function useMousePosition() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return pos;
}

function useTypewriter(words: string[], speed = 85, pause = 2000) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx];
    const t = setTimeout(
      () => {
        if (!del) {
          if (txt.length < word.length) setTxt(word.slice(0, txt.length + 1));
          else setTimeout(() => setDel(true), pause);
        } else {
          if (txt.length > 0) setTxt(txt.slice(0, -1));
          else {
            setDel(false);
            setIdx((i) => (i + 1) % words.length);
          }
        }
      },
      del ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [txt, del, idx, words, speed, pause]);
  return txt;
}

// ─── loading screen ────────────────────────────────────────────────────────────

function LoadingScreen({ done }: { done: () => void }) {
  useEffect(() => {
    const t = setTimeout(done, 2600);
    return () => clearTimeout(t);
  }, [done]);
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="font-display font-black text-3xl text-white tracking-widest">
          SRR<span className="text-violet-500">.</span>
        </div>
        <div className="w-48 h-px bg-white/10 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-mono text-xs text-white/30 tracking-[0.3em] uppercase"
        >
          Initializing portfolio...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// ─── custom cursor ─────────────────────────────────────────────────────────────

function CustomCursor() {
  const { x, y } = useMousePosition();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const over = () => setHovered(true);
    const out = () => setHovered(false);
    const els = document.querySelectorAll("a, button, [data-cursor]");
    els.forEach((el) => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });
    return () =>
      els.forEach((el) => {
        el.removeEventListener("mouseenter", over);
        el.removeEventListener("mouseleave", out);
      });
  });

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#0f0f0f",
            color: "#fff",
            border: "1px solid rgba(139,92,246,.25)",
            borderRadius: "14px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: hovered ? 48 : 32,
          height: hovered ? 48 : 32,
          border: "1.5px solid rgba(139,92,246,0.6)",
          mixBlendMode: "normal",
        }}
        animate={{
          x: x - (hovered ? 24 : 16),
          y: y - (hovered ? 24 : 16),
          scale: hovered ? 1 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.6 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-1.5 h-1.5 rounded-full bg-violet-400"
        animate={{ x: x - 3, y: y - 3 }}
        transition={{ type: "spring", stiffness: 800, damping: 50, mass: 0.1 }}
      />
    </>
  );
}

// ─── background ────────────────────────────────────────────────────────────────

function Background() {
  const { x, y } = useMousePosition();
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(139,92,246,0.5) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      {/* mouse spotlight */}
      <div
        className="absolute inset-0 transition-[background] duration-500"
        style={{
          background: `radial-gradient(700px circle at ${x}px ${y}px, rgba(139,92,246,0.08), transparent 60%)`,
        }}
      />
      {/* aurora blobs */}
      <div
        className="aurora-blob absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="aurora-blob absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #06b6d4, transparent 70%)",
          filter: "blur(100px)",
          animationDelay: "-7s",
        }}
      />
      <div
        className="aurora-blob absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #7c3aed, transparent 70%)",
          filter: "blur(120px)",
          animationDelay: "-14s",
        }}
      />
      {/* noise */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

// ─── nav ───────────────────────────────────────────────────────────────────────

function Nav({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5 px-4"
    >
      <div
        className={`glass rounded-2xl px-3 py-2 flex items-center gap-1 transition-all duration-500 ${scrolled ? "shadow-[0_0_30px_rgba(139,92,246,0.15)]" : ""}`}
      >
        <a
          href="#"
          className="font-display font-black text-sm text-white px-3 py-1.5 mr-2"
        >
          SRR<span className="text-violet-400">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 ${
                active === l.id
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                  : "text-white/50 hover:text-white/90"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:flex ml-2 items-center gap-1.5 px-4 py-1.5 rounded-xl bg-violet-500 text-white text-xs font-semibold hover:bg-violet-400 transition-all duration-300"
        >
          Hire me <ArrowRight size={11} />
        </a>
        <button
          className="md:hidden p-1.5 text-white/70"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-[72px] left-4 right-4 glass rounded-2xl p-4 flex flex-col gap-2"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}

// ─── hero ───────────────────────────────────────────────────────────────────────

function Hero() {
  const role = useTypewriter(ROLES);
  const name1 = "SHOAIB".split("");
  const name2 = "RAHMAN".split("");
  const name3 = "RIAN".split("");

  const letterVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 2.8 + i * 0.045,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const renderName = (
    letters: string[],
    offset: number,
    gradient?: boolean,
  ) => (
    <div className="overflow-hidden flex">
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          custom={i + offset}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className={`inline-block tracking-tight leading-none ${
            gradient ? "gradient-text" : "text-white"
          }`}
        >
          {ch}
        </motion.span>
      ))}
    </div>
  );

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">
        {/* left */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7, duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs text-white/40 tracking-[0.25em] uppercase">
              Available for opportunities
            </span>
          </motion.div>

          <div className="font-display font-black text-[clamp(3rem,9vw,7rem)] select-none mb-4">
            {renderName(name1, 0)}
            {renderName(name2, 6, true)}
            {renderName(name3, 12)}
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.4, duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-8 bg-violet-500" />
            <span className="font-mono text-sm text-violet-300 min-w-[220px]">
              {role}
              <span className="blink-cursor ml-0.5">_</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-violet-500 text-white text-sm font-semibold hover:bg-violet-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
            >
              View Projects
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="/files/Shoaib-Rahman-Rian_CV.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 rounded-2xl glass text-white/80 text-sm font-semibold hover:text-white hover:border-violet-500/40 transition-all duration-300 border border-white/10"
            >
              <Download size={15} />
              Download CV
            </a>
          </motion.div>

          {/* social row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 0.6 }}
            className="flex items-center gap-4 mt-10"
          >
            {[
              {
                icon: <Github size={16} />,
                href: "https://github.com/shoaibrrian",
                label: "GitHub",
              },
              {
                icon: <Linkedin size={16} />,
                href: "https://www.linkedin.com/in/shoaibrahmanrian",
                label: "LinkedIn",
              },
              {
                icon: <Mail size={16} />,
                href: "mailto:shoaibrian@gmail.com",
                label: "Email",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="flex items-center gap-1.5 text-white/40 hover:text-violet-300 transition-colors duration-300 text-xs font-mono"
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* right – profile image */}
        <div className="flex items-center justify-center lg:justify-end relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* outer glow ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
                transform: "scale(1.4)",
                filter: "blur(30px)",
              }}
            />
            {/* spinning dashed ring */}
            <div className="absolute inset-0 m-[-20px] rounded-full border border-dashed border-violet-500/20 spin-slow" />
            {/* glass frame */}
            <div
              className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[380px] rounded-[2rem] overflow-hidden float-anim"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.08))",
                border: "1px solid rgba(139,92,246,0.3)",
                boxShadow:
                  "0 0 60px rgba(139,92,246,0.25), 0 0 120px rgba(139,92,246,0.1), inset 0 0 60px rgba(139,92,246,0.05)",
              }}
            >
              <ImageWithFallback
                src={profileImage}
                alt="Shoaib Rahman Rian — Web Developer"
                className="w-full h-full object-cover object-top"
              />
              {/* glass overlay bottom */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#050505]/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass rounded-xl px-3 py-2 border border-white/10">
                  <div className="font-mono text-xs text-white/50">
                    @shoaibrrian
                  </div>
                  <div className="font-display font-bold text-sm text-white">
                    Shoaib Rahman Rian
                  </div>
                </div>
              </div>
            </div>
            {/* floating stat chips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.5, duration: 0.5 }}
              className="absolute -right-6 top-10 glass rounded-xl px-3 py-2 border border-violet-500/20 neon-glow"
            >
              <div className="font-display font-black text-xl text-white">
                5+
              </div>
              <div className="font-mono text-[10px] text-white/40">
                projects
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.7, duration: 0.5 }}
              className="absolute -left-6 top-1/2 glass rounded-xl px-3 py-2 border border-cyan-500/20"
            >
              <div className="font-display font-black text-xl text-cyan-400">
                10+
              </div>
              <div className="font-mono text-[10px] text-white/40">
                Technologies
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.9, duration: 0.5 }}
              className="absolute -bottom-4 left-8 glass rounded-xl px-3 py-2 border border-emerald-500/20"
            >
              <div className="font-mono text-[10px] text-white/40 mb-0.5">
                currently
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="font-mono text-[10px] text-emerald-400">
                  Open to work
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-white/25 tracking-[0.3em] uppercase">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-violet-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ─── about ─────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-28 max-w-7xl mx-auto px-6">
      <SectionHeader label="about me" title="Who I Am" />

      <div className="grid lg:grid-cols-5 gap-10 mt-16">
        {/* main bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-3 glass rounded-3xl p-8 border border-white/8"
        >
          <p className="text-white/65 text-base leading-[1.9] mb-6">
            I'm{" "}
            <span className="text-white font-semibold">Shoaib Rahman Rian</span>
            , a Computer Science and Engineering graduate from{" "}
            <span className="text-violet-300">
              United International University
            </span>
            , Dhaka, with a passion for building modern, performant and
            user-focused web applications.
          </p>

          <p className="text-white/65 text-base leading-[1.9] mb-6">
            My primary focus is full-stack web development, where I enjoy
            crafting intuitive user interfaces and developing scalable,
            efficient web applications using modern technologies. I thrive in
            both independent and collaborative environments, with a strong
            commitment to continuous learning, writing maintainable code and
            delivering high-quality solutions.
          </p>

          <p className="text-white/65 text-base leading-[1.9] mb-6">
            Alongside web development, I conducted undergraduate research in
            machine learning for agricultural soil analysis, which strengthened
            my analytical thinking and problem-solving abilities.
          </p>

          <p className="text-white/65 text-base leading-[1.9]">
            Beyond technology, I served as a{" "}
            <span className="text-white font-medium">Senior Scout</span> with
            Bangladesh Scouts for six years (2011–2017), an experience that
            shaped my leadership, teamwork, discipline and adaptability in
            real-world situations.
          </p>

          {/* languages */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { lang: "Bengali", level: "Native" },
              { lang: "English", level: "Professional" },
            ].map((l) => (
              <div
                key={l.lang}
                className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2 border border-white/8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span className="text-white/70 text-sm font-medium">
                  {l.lang}
                </span>
                <span className="font-mono text-xs text-white/35">
                  {l.level}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* stats column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {[
            { value: "5+", label: "Shipped Projects", color: "#8b5cf6" },
            { value: "96.42%", label: "ML Model Accuracy", color: "#06b6d4" },
            { value: "6 yrs", label: "Scout Leadership", color: "#10b981" },
            { value: "10+", label: "Technologies Mastered", color: "#f59e0b" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-5 border border-white/8 group hover:border-violet-500/30 transition-all duration-300"
            >
              <div
                className="font-display font-black text-3xl mb-1 transition-all duration-300"
                style={{ color: s.color }}
              >
                {s.value}
              </div>
              <div className="text-white/50 text-sm">{s.label}</div>
              <div
                className="mt-3 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: s.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── skills ────────────────────────────────────────────────────────────────────

function Skills() {
  const categories = Object.entries(SKILLS) as [
    keyof typeof SKILLS,
    (typeof SKILLS)[keyof typeof SKILLS],
  ][];
  return (
    <section
      id="skills"
      className="py-28 border-y border-white/5 overflow-hidden"
    >
      {/* marquee */}
      <div className="overflow-hidden mb-20">
        <div className="marquee-track flex gap-10 w-max">
          {MARQUEE_TECHS.map((t, i) => (
            <span
              key={i}
              className={`font-display font-black text-5xl tracking-tighter whitespace-nowrap ${
                i % 4 === 0
                  ? "text-white/80"
                  : i % 4 === 1
                    ? "text-violet-500/30"
                    : i % 4 === 2
                      ? "text-white/20"
                      : "text-cyan-500/20"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader label="technical skills" title="Tools of the Trade" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {categories.map(([key, cat], ci) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.08 }}
              className="glass rounded-3xl p-6 border border-white/8 group hover:border-opacity-40 transition-all duration-300"
              style={{ "--cat-color": cat.color } as React.CSSProperties}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="p-2.5 rounded-xl"
                  style={{
                    background: `${cat.color}15`,
                    color: cat.color,
                    border: `1px solid ${cat.color}25`,
                  }}
                >
                  {cat.icon}
                </div>
                <div>
                  <div className="font-display font-bold text-white text-base capitalize">
                    {key}
                  </div>
                  <div className="font-mono text-xs text-white/35">
                    {cat.items.length} tools
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1.5 rounded-full border transition-all duration-300 hover:scale-105"
                    style={{
                      background: `${cat.color}08`,
                      color: `${cat.color}cc`,
                      borderColor: `${cat.color}20`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div
                className="mt-5 h-px w-0 group-hover:w-full transition-all duration-700 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${cat.color}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── projects ──────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" className="py-28 max-w-7xl mx-auto px-6">
      <SectionHeader label="featured projects" title="Things I've Built" />

      <div className="flex flex-col gap-8 mt-16">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProjectCard project={p} flipped={i % 2 === 1} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project: p,
  flipped,
}: {
  project: (typeof PROJECTS)[number];
  flipped: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`glass rounded-3xl overflow-hidden border border-white/8 group transition-all duration-500 ${hovered ? "border-opacity-40" : ""}`}
      style={{
        borderColor: hovered ? `${p.color}40` : undefined,
        boxShadow: hovered ? `0 0 60px ${p.color}15` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`grid lg:grid-cols-2 ${flipped ? "lg:grid-flow-dense" : ""}`}
      >
        {/* visual */}
        <div
          className={`relative h-64 lg:h-auto flex items-center justify-center overflow-hidden ${flipped ? "lg:col-start-2" : ""}`}
          style={{
            background: `linear-gradient(135deg, ${p.color}20, transparent)`,
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />
          {/* decorative grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div style={{ color: `${p.color}60` }}>{p.icon}</div>
            <div
              className="font-display font-black text-6xl"
              style={{ color: `${p.color}20` }}
            >
              {p.id}
            </div>
          </div>
          {/* animated border */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5"
            style={{
              background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
            }}
            initial={{ width: "0%" }}
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 0.6 }}
          />
        </div>
        {/* content */}
        <div className="p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div
                  className="font-mono text-xs tracking-[0.25em] uppercase mb-2"
                  style={{ color: p.color }}
                >
                  {p.role}
                </div>
                <h3 className="font-display font-black text-3xl text-white">
                  {p.name}
                </h3>
                <p className="text-white/40 text-sm mt-1">{p.subtitle}</p>
              </div>
              <span className="font-mono text-xs glass rounded-lg px-2 py-1 text-white/30 border border-white/8">
                {p.id}
              </span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              {p.description}
            </p>
            <div className="space-y-2 mb-6">
              {p.features.map((f) => (
                <div key={f} className="flex items-start gap-2.5">
                  <div
                    className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: p.color }}
                  />
                  <span className="text-white/50 text-sm">{f}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-2.5 py-1 rounded-lg border border-white/8 text-white/40 bg-white/3"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all duration-300"
            >
              <Github size={14} /> GitHub
            </a>
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg"
              style={{
                background: `${p.color}20`,
                color: p.color,
                border: `1px solid ${p.color}30`,
              }}
            >
              <ExternalLink size={14} /> Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── research ──────────────────────────────────────────────────────────────────

function Research() {
  return (
    <section id="research" className="py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader label="thesis / research" title="Academic Research" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 glass rounded-3xl overflow-hidden border border-violet-500/15"
          style={{ boxShadow: "0 0 60px rgba(139,92,246,0.08)" }}
        >
          {/* header */}
          <div
            className="relative p-8 lg:p-10 border-b border-white/5"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(16,185,129,0.06), transparent)",
            }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(139,92,246,0.4) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="relative">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Undergraduate Thesis
                  </div>
                  <h3 className="font-display font-black text-2xl lg:text-3xl text-white leading-tight max-w-2xl">
                    Agricultural Soil Nutrient Analysis, Classification and Crop
                    Suitability Prediction Using Machine Learning
                  </h3>
                </div>
                <div className="glass rounded-2xl px-6 py-4 border border-emerald-500/20 text-center">
                  <div className="font-display font-black text-4xl text-emerald-400">
                    96.42%
                  </div>
                  <div className="font-mono text-xs text-white/40 mt-1">
                    Best Accuracy
                  </div>
                  <div className="font-mono text-[10px] text-emerald-400/60 mt-0.5">
                    Random Forest
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* body */}
          <div className="p-8 lg:p-10 grid lg:grid-cols-3 gap-10">
            {/* overview */}
            <div className="lg:col-span-2">
              <h4 className="font-mono text-xs text-white/40 uppercase tracking-[0.2em] mb-4">
                Overview
              </h4>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Developed a machine learning-based system for soil nutrient
                analysis, classification, and crop suitability prediction using
                Python and Scikit-learn. Performed comprehensive data
                preprocessing, exploratory data analysis, feature engineering,
                and visualization on agricultural soil datasets.
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                Evaluated 7 machine learning models and achieved{" "}
                <span className="text-emerald-400 font-semibold">
                  96.42% classification accuracy
                </span>{" "}
                using an optimized Random Forest model with 10-fold
                cross-validation and comprehensive performance evaluation.
              </p>

              {/* tech stack */}
              <div className="mt-6">
                <div className="font-mono text-xs text-white/40 uppercase tracking-[0.2em] mb-3">
                  Technologies
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python",
                    "Scikit-learn",
                    "Pandas",
                    "NumPy",
                    "Matplotlib",
                    "Jupyter Notebook",
                  ].map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="https://github.com/shoaibrrian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium glass border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all duration-300"
                >
                  <Github size={14} /> View on GitHub
                </a>
              </div>
            </div>

            {/* model accuracy table */}
            <div>
              <h4 className="font-mono text-xs text-white/40 uppercase tracking-[0.2em] mb-4">
                ML Models Evaluated
              </h4>
              <div className="space-y-2">
                {ML_MODELS.map((m, i) => (
                  <motion.div
                    key={m.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                      m.highlight
                        ? "bg-emerald-500/10 border-emerald-500/30"
                        : "bg-white/3 border-white/6 hover:border-white/12"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {m.highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      )}
                      <span
                        className={`text-xs font-medium ${m.highlight ? "text-emerald-300" : "text-white/50"}`}
                      >
                        {m.name}
                      </span>
                    </div>
                    <span
                      className={`font-mono text-xs font-bold ${m.highlight ? "text-emerald-400" : "text-white/35"}`}
                    >
                      {m.accuracy}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── education ─────────────────────────────────────────────────────────────────

function Education() {
  return (
    <section id="education" className="py-28 max-w-7xl mx-auto px-6">
      <SectionHeader label="education" title="Academic Background" />

      <div className="mt-16 relative">
        {/* timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-violet-500/20 to-transparent hidden sm:block" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="sm:pl-24 relative"
        >
          {/* timeline dot */}
          <div className="hidden sm:flex absolute left-[22px] top-8 w-5 h-5 rounded-full border-2 border-violet-500 bg-[#050505] items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-violet-500" />
          </div>

          <div
            className="glass rounded-3xl p-8 lg:p-10 border border-violet-500/15 group hover:border-violet-500/30 transition-all duration-500"
            style={{ boxShadow: "0 0 40px rgba(139,92,246,0.06)" }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap size={16} className="text-violet-400" />
                  <span className="font-mono text-xs text-violet-400 tracking-[0.2em] uppercase">
                    Bachelor of Science
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl lg:text-3xl text-white mb-2 leading-tight">
                  Computer Science & Engineering
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-violet-400/60" />
                    United International University
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-white/30" />
                    United City, Madani Ave, Dhaka, Bangladesh
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-3">
                <div className="flex items-center gap-1.5 font-mono text-xs text-white/40 bg-white/5 rounded-xl px-4 py-2 border border-white/8">
                  <Calendar size={12} className="text-violet-400" />
                  Jan 2020 — Jun 2026
                </div>
                <div className="glass rounded-xl px-4 py-2 border border-violet-500/20">
                  <div className="font-mono text-xs text-white/40">CGPA</div>
                  <div className="font-display font-black text-2xl text-violet-400">
                    2.49
                  </div>
                </div>
              </div>
            </div>

            {/* coursework highlights */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="font-mono text-xs text-white/30 uppercase tracking-[0.2em] mb-3">
                Key Areas of Study
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Data Structure & Algorithms",
                  "System Analysis and Design",
                  "Web Programming",
                  "Software Testing",
                  "Software Engineering",
                  "Software Architecture",
                ].map((c) => (
                  <span
                    key={c}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/4 text-white/45 border border-white/8 hover:border-violet-500/30 hover:text-white/70 transition-all duration-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="sm:pl-24 relative mt-10"
        >
          {/* timeline dot */}
          <div className="hidden sm:flex absolute left-[22px] top-8 w-5 h-5 rounded-full border-2 border-violet-500 bg-[#050505] items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-violet-500" />
          </div>

          <div
            className="glass rounded-3xl p-8 lg:p-10 border border-violet-500/15 group hover:border-violet-500/30 transition-all duration-500"
            style={{ boxShadow: "0 0 40px rgba(139,92,246,0.06)" }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap size={16} className="text-violet-400" />
                  <span className="font-mono text-xs text-violet-400 tracking-[0.2em] uppercase">
                    Higher Secondary Certificate
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl lg:text-3xl text-white mb-2 leading-tight">
                  Dhaka Imperial College
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-violet-400/60" />
                    Jahurul Islam City, Aftab Nagar, Badda, Dhaka
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-white/55">
                  <BookOpen size={15} className="text-violet-400/70" />
                  <span>
                    Group: <span className="text-white/80">Science</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-3">
                <div className="flex items-center gap-1.5 font-mono text-xs text-white/40 bg-white/5 rounded-xl px-4 py-2 border border-white/8">
                  <Calendar size={12} className="text-violet-400" />
                  2017 — 2019
                </div>

                <div className="glass rounded-xl px-4 py-2 border border-violet-500/20">
                  <div className="font-mono text-xs text-white/40">GPA</div>
                  <div className="font-display font-black text-2xl text-violet-400">
                    4.67
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="sm:pl-24 relative mt-10"
        >
          {/* timeline dot */}
          <div className="hidden sm:flex absolute left-[22px] top-8 w-5 h-5 rounded-full border-2 border-violet-500 bg-[#050505] items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-violet-500" />
          </div>

          <div
            className="glass rounded-3xl p-8 lg:p-10 border border-violet-500/15 group hover:border-violet-500/30 transition-all duration-500"
            style={{ boxShadow: "0 0 40px rgba(139,92,246,0.06)" }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap size={16} className="text-violet-400" />
                  <span className="font-mono text-xs text-violet-400 tracking-[0.2em] uppercase">
                    Secondary School Certificate
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl lg:text-3xl text-white mb-2 leading-tight">
                  Faizur Rahman Ideal Institute
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-violet-400/60" />
                    Malibagh Chowdhury Para, Khilgaon, Dhaka
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-white/55">
                  <BookOpen size={15} className="text-violet-400/70" />
                  <span>
                    Group: <span className="text-white/80">Science</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-3">
                <div className="flex items-center gap-1.5 font-mono text-xs text-white/40 bg-white/5 rounded-xl px-4 py-2 border border-white/8">
                  <Calendar size={12} className="text-violet-400" />
                  2015 — 2017
                </div>

                <div className="glass rounded-xl px-4 py-2 border border-violet-500/20">
                  <div className="font-mono text-xs text-white/40">GPA</div>
                  <div className="font-display font-black text-2xl text-violet-400">
                    5.00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── contact ───────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [website, setWebsite] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (website.trim() !== "") {
      console.warn("Spam bot detected.");
      return;
    }

    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (form.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters.";
    }

    if (form.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters.";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setSent(true);

      toast.success("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full bg-white/4 border border-white/8 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300";

  return (
    <section id="contact" className="py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader label="contact" title="Let's Connect" />

        <div className="mt-16 grid lg:grid-cols-5 gap-10">
          {/* info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="glass rounded-3xl p-8 border border-white/8">
              <h3 className="font-display font-bold text-xl text-white mb-2">
                Get In Touch
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                I'm currently open to full-stack web developer roles,
                internships and freelance projects. Let's build something great
                together.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: <Mail size={15} />,
                    value: "shoaibrian@gmail.com",
                    href: "mailto:shoaibrian@gmail.com",
                    label: "Email",
                  },
                  {
                    icon: <Phone size={15} />,
                    value: "+880 1931 117198",
                    href: "tel:+8801931117198",
                    label: "Phone",
                  },
                  {
                    icon: <Linkedin size={15} />,
                    value: "shoaibrahmanrian",
                    href: "https://www.linkedin.com/in/shoaibrahmanrian",
                    label: "LinkedIn",
                  },
                  {
                    icon: <Github size={15} />,
                    value: "shoaibrrian",
                    href: "https://github.com/shoaibrrian",
                    label: "GitHub",
                  },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/4 transition-all duration-300"
                  >
                    <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/15 group-hover:bg-violet-500/20 transition-colors">
                      {c.icon}
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                        {c.label}
                      </div>
                      <div className="text-sm text-white/60 group-hover:text-white/90 transition-colors">
                        {c.value}
                      </div>
                    </div>
                    <ExternalLink
                      size={12}
                      className="ml-auto text-white/20 group-hover:text-white/50 transition-colors"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* location */}
            <div className="glass rounded-3xl p-6 border border-white/8">
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin size={14} className="text-violet-400" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-white/50 text-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                Open to remote & onsite opportunities
              </div>
            </div>
          </motion.div>

          {/* form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-8 border border-white/8 h-full">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center gap-4 py-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle size={56} className="text-emerald-400" />
                  </motion.div>
                  <h3 className="font-display font-black text-2xl text-white">
                    Message Sent Successfully!
                  </h3>

                  <p className="text-white/50 text-sm max-w-md leading-relaxed">
                    Thank you for reaching out! Your message has been delivered
                    successfully. I'll review it and get back to you as soon as
                    possible.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-4 h-full"
                >
                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                    className="hidden"
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        className={`${inputCls} ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => {
                          const value = e.target.value;

                          setForm({
                            ...form,
                            name: value,
                          });

                          setErrors({
                            ...errors,
                            name:
                              value.trim().length < 2
                                ? "Name must be at least 2 characters."
                                : "",
                          });
                        }}
                        required
                      />

                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        className={`${inputCls} ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                        type="text"
                        placeholder="Email address"
                        value={form.email}
                        onChange={(e) => {
                          const value = e.target.value;

                          setForm({
                            ...form,
                            email: value,
                          });

                          setErrors({
                            ...errors,
                            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                              ? ""
                              : "Please enter a valid email address.",
                          });
                        }}
                        required
                      />

                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <input
                    className={`${inputCls} ${errors.subject ? "border-red-500 focus:border-red-500" : ""}`}
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => {
                      const value = e.target.value;

                      setForm({
                        ...form,
                        subject: value,
                      });

                      setErrors({
                        ...errors,
                        subject:
                          value.trim().length < 5
                            ? "Subject must be at least 5 characters."
                            : "",
                      });
                    }}
                    required
                  />

                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.subject}
                    </p>
                  )}

                  <textarea
                    className={`${inputCls} resize-none min-h-[160px] ${errors.message ? "border-red-500 focus:border-red-500" : ""}`}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={(e) => {
                      const value = e.target.value;

                      setForm({
                        ...form,
                        message: value,
                      });

                      setErrors({
                        ...errors,
                        message:
                          value.trim().length < 20
                            ? "Message must be at least 20 characters."
                            : "",
                      });
                    }}
                  />

                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-violet-500 text-white text-sm font-semibold hover:bg-violet-400 disabled:opacity-60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="font-display font-black text-xl text-white">
              SRR<span className="text-violet-500">.</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div>
              <div className="text-white/60 text-sm font-medium">
                Shoaib Rahman Rian
              </div>
              <div className="font-mono text-xs text-white/30">
                Web Developer
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="text-white/30 hover:text-white/70 text-xs font-medium transition-colors hidden sm:block"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {[
              {
                icon: <Github size={15} />,
                href: "https://github.com/shoaibrrian",
                label: "GitHub Profile",
              },
              {
                icon: <Linkedin size={15} />,
                href: "https://www.linkedin.com/in/shoaibrahmanrian",
                label: "LinkedIn Profile",
              },
              {
                icon: <Mail size={15} />,
                href: "mailto:shoaibrian@gmail.com",
                label: "Send Email",
              },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="p-2.5 glass rounded-xl text-white/40 hover:text-violet-300 border border-white/6 hover:border-violet-500/30 transition-all duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-xs text-white/20">
            © {new Date().getFullYear()} Shoaib Rahman Rian. All rights
            reserved.
          </p>
          <p className="font-mono text-xs text-white/15">Dhaka, Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}

// ─── section header ────────────────────────────────────────────────────────────

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="font-mono text-xs text-violet-400 tracking-[0.3em] uppercase mb-3">
        // {label}
      </div>
      <h2 className="font-display font-black text-4xl lg:text-5xl text-white tracking-tight">
        {title}
      </h2>
    </motion.div>
  );
}

// ─── app ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { threshold: 0.35 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [loading]);

  return (
    <div
      className="bg-[#050505] text-white min-h-screen hide-scrollbar"
      style={{ fontFamily: "'Onest', sans-serif" }}
    >
      <style>{`
        * { cursor: none !important; }
        ::selection { background: rgba(139,92,246,0.3); color: #fff; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #8b5cf6; border-radius: 2px; }
        .hide-scrollbar { scrollbar-width: thin; scrollbar-color: #8b5cf6 #050505; }
        .font-display { font-family: 'Outfit', sans-serif; }
        .font-mono    { font-family: 'JetBrains Mono', monospace; }
        .glass { background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .neon-glow { box-shadow: 0 0 20px rgba(139,92,246,0.3), 0 0 60px rgba(139,92,246,0.1); }
        .gradient-text {
          background: linear-gradient(135deg, #8b5cf6, #c4b5fd 50%, #06b6d4);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 4s ease infinite;
        }
        @keyframes aurora {
          0%,100% { transform: translate(0,0) rotate(0deg) scale(1); }
          33%      { transform: translate(4%,-4%) rotate(120deg) scale(1.1); }
          66%      { transform: translate(-4%,4%) rotate(240deg) scale(0.92); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-14px); }
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gradient-shift {
          0%,100% { background-position: 0% 50%; }
          50%     { background-position: 100% 50%; }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50%     { opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .aurora-blob  { animation: aurora 18s ease-in-out infinite; }
        .float-anim   { animation: float 5s ease-in-out infinite; }
        .marquee-track { animation: marquee 35s linear infinite; }
        .blink-cursor  { animation: blink 1s step-end infinite; }
        .spin-slow     { animation: spin-slow 25s linear infinite; }
      `}</style>

      {loading && <LoadingScreen done={() => setLoading(false)} />}

      {!loading && (
        <>
          <CustomCursor />
          <Background />
          <Nav active={active} />
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Research />
            <Education />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
