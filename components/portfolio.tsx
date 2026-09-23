"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { Globe } from "@/registry/magicui/globe";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { AnimatedList } from "@/components/ui/animated-list";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Bot, BriefcaseBusiness, CalendarDays, ChevronDown, Code2, Cpu, Droplets, GraduationCap, Languages, Mail, Menu, School, Sparkles, Trophy, Volume2, VolumeX, Wrench, X, type LucideIcon } from "lucide-react";
import { siArduino, siC, siCplusplus, siDocker, siEspressif, siGithub, siIntel, siLinux, siNextdotjs, siPython, siRaspberrypi, siRos, siTypescript } from "simple-icons";
import { useEffect, useRef, useState } from "react";

function Nav() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [themeReady, setThemeReady] = useState(false);
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  const [muted, setMuted] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pathOpen, setPathOpen] = useState(false);
  const [networksOpen, setNetworksOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    const savedLanguage = window.localStorage.getItem("portfolio-language") as "fr" | "en" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setTheme(savedTheme ?? systemTheme);
    setThemeReady(true);
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    window.localStorage.setItem("portfolio-theme", theme);
    document.documentElement.style.colorScheme = theme;
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, themeReady]);

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const sectionIds = ["top", "projects", "path", "contact", "services", "networks"];
    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.42;
      let current = "top";
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = id;
      }
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const items = language === "fr"
    ? [["01", "Projets", "projects"], ["02", "Parcours", "path"], ["03", "Services", "services"], ["04", "Réseaux", "networks"]]
    : [["01", "Projects", "projects"], ["02", "Experience", "path"], ["03", "Services", "services"], ["04", "Networks", "networks"]];

  const toggleLanguage = () => setLanguage((current) => current === "fr" ? "en" : "fr");

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      audio.volume = 0.10;
      audio.play().then(() => setMuted(false)).catch(() => setMuted(false));
    } else {
      audio.pause();
      setMuted(true);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <nav className={`portfolio-nav mx-auto flex h-14 max-w-[1500px] items-center justify-between rounded-full border px-1 pl-2 shadow-[0_14px_45px_rgba(0,0,0,.16)] backdrop-blur-2xl transition-colors duration-300 sm:px-2 sm:pl-4 ${theme === "dark" ? "border-white/10 bg-[#08090a]/82 text-white" : "border-black/10 bg-[#f4f1eb]/92 text-[#111]"}`}>
        <a href="#top" className="group flex shrink-0 items-center gap-3" aria-label="Alade ADECHI, accueil">
          <span className="portfolio-logo-mark flex size-7 items-center justify-center rounded-full"><svg viewBox="0 0 28 28" className="size-4" aria-hidden><path d="M4 21 9.5 7h2.8l5.5 14h-3l-1.2-3.2H8.8L7.6 21H4Zm5.7-5.6h3l-1.5-4.2-1.5 4.2ZM17.5 7h3.1c4 0 6.2 2.7 6.2 7s-2.2 7-6.2 7h-3.1V7Zm2.8 2.4v9.2h.5c2.1 0 3.2-1.5 3.2-4.6s-1.1-4.6-3.2-4.6h-.5Z" fill="currentColor"/></svg></span>
          <span className="hidden sm:flex sm:flex-col sm:gap-0.5"><span className="text-[10px] font-medium tracking-[.04em] text-white/80">Alade ADECHI</span><span className="text-[7px] uppercase tracking-[.16em] text-white/35">Ingénieur IT</span></span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          <a href="#projects" className="relative px-3 py-2 text-[9px] uppercase tracking-[.13em] text-white/52 transition hover:text-white">Projets</a>

          <div className="relative" onMouseEnter={() => setPathOpen(true)} onMouseLeave={() => setPathOpen(false)}>
            <button
              type="button"
              onClick={() => setPathOpen((value) => !value)}
              className={activeSection === "path" ? "inline-flex items-center gap-1 px-3 py-2 text-[9px] uppercase tracking-[.13em] text-white" : "inline-flex items-center gap-1 px-3 py-2 text-[9px] uppercase tracking-[.13em] text-white/52 transition hover:text-white"}
            >
              Parcours
              <ChevronDown className={"size-3 transition-transform " + (pathOpen ? "rotate-180" : "")} />
            </button>

            <AnimatePresence>
              {pathOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute left-1/2 top-[calc(100%+10px)] w-[230px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#101214]/96 p-2 text-white shadow-[0_22px_60px_rgba(0,0,0,.25)] backdrop-blur-2xl"
                >
                  <p className="px-3 pb-2 pt-2 font-mono text-[7px] uppercase tracking-[.18em] text-white/35">Parcours</p>
                  {[["Académique", "path-academic"], ["Extra-scolaire", "path-extra"], ["Professionnel", "path-professional"]].map(([label, href], index) => (
                    <a key={href} href={"#" + href} onClick={() => setPathOpen(false)} className="group flex items-center gap-3 rounded-xl px-3 py-3 text-[10px] uppercase tracking-[.12em] transition hover:bg-white/[.06]">
                      <span className="font-mono text-[8px] text-white/30">0{index + 1}</span>
                      <span className="flex-1">{label}</span>
                      <ArrowUpRight className="size-3 text-white/25 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/70" />
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#services" className="relative px-3 py-2 text-[9px] uppercase tracking-[.13em] text-white/52 transition hover:text-white">Services</a>

          <div className="relative" onMouseEnter={() => setNetworksOpen(true)} onMouseLeave={() => setNetworksOpen(false)}>
            <button
              type="button"
              onClick={() => setNetworksOpen((value) => !value)}
              className={activeSection === "networks" ? "inline-flex items-center gap-1 px-3 py-2 text-[9px] uppercase tracking-[.13em] text-white" : "inline-flex items-center gap-1 px-3 py-2 text-[9px] uppercase tracking-[.13em] text-white/52 transition hover:text-white"}
            >
              Réseaux
              <ChevronDown className={"size-3 transition-transform " + (networksOpen ? "rotate-180" : "")} />
            </button>

            <AnimatePresence>
              {networksOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute left-1/2 top-[calc(100%+10px)] w-[210px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#101214]/96 p-2 text-white shadow-[0_22px_60px_rgba(0,0,0,.25)] backdrop-blur-2xl"
                >
                  <p className="px-3 pb-2 pt-2 font-mono text-[7px] uppercase tracking-[.18em] text-white/35">Réseaux</p>
                  {[
                    ["GitHub", "https://github.com/Aladeadechi"],
                    ["LinkedIn", "https://www.linkedin.com"],
                    ["WhatsApp", "https://wa.me/22959087678"],
                    ["Email", "mailto:aladeadechi100@gmail.com"],
                  ].map(([label, href]) => (
                    <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" onClick={() => setNetworksOpen(false)} className="group flex items-center gap-3 rounded-xl px-3 py-3 text-[10px] uppercase tracking-[.12em] transition hover:bg-white/[.06]">
                      <span className="flex-1">{label}</span>
                      <ArrowUpRight className="size-3 text-white/25 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/70" />
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden items-center gap-1.5 md:flex">
          <button type="button" onClick={toggleLanguage} aria-label={language === "fr" ? "Passer en anglais" : "Switch to French"} className="inline-flex h-9 items-center gap-1 border-l border-white/10 px-3 font-sans text-[9px] font-medium uppercase tracking-[.12em] text-white/58 transition hover:text-white">
            <Languages className="size-3 text-white/30" />{language.toUpperCase()}
          </button>
          <button type="button" onClick={toggleSound} aria-label={muted ? "Réactiver le son" : "Mettre le son en muet"} className="inline-flex size-9 items-center justify-center text-white/58 transition hover:text-white">
            {muted ? <VolumeX className="size-3.5" aria-hidden /> : <Volume2 className="size-3.5" aria-hidden />}
          </button>
          <AnimatedThemeToggler
            theme={themeReady ? theme : "dark"}
            onThemeChange={setTheme}
            variant="circle"
            className="inline-flex size-9 items-center justify-center text-white/58 transition hover:text-white [&_svg]:size-3.5"
            aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}
            title={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}
          />
          <a href="#contact" className="group inline-flex items-center gap-2 rounded-full border-l border-white/10 bg-white px-4 py-2.5 text-[9px] font-medium uppercase tracking-[.13em] text-black transition hover:bg-[#dfe3e8]">
            RDV
            <CalendarDays className="size-3" />
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-controls="mobile-portfolio-menu"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className={"flex size-10 items-center justify-center rounded-full border transition-colors " + (theme === "dark" ? "border-white/15 text-white" : "border-black/15 text-[#111]")}
          >
            {menuOpen ? <X className="size-4" strokeWidth={1.6} aria-hidden /> : <Menu className="size-4" strokeWidth={1.6} aria-hidden />}
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                id="mobile-portfolio-menu"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={"absolute right-0 top-[calc(100%+12px)] w-[min(92vw,360px)] overflow-hidden rounded-[24px] border p-2 shadow-[0_24px_70px_rgba(0,0,0,.24)] backdrop-blur-2xl " + (theme === "dark" ? "border-white/10 bg-[#101214]/95 text-white" : "border-black/10 bg-[#f4f1eb]/98 text-[#111]")}
              >
                <a onClick={() => setMenuOpen(false)} href="#projects" className="flex items-center gap-4 border-b border-current/10 px-4 py-4 text-[11px] uppercase tracking-[.13em]">
                  <span className="flex-1">Projets</span><ArrowUpRight className="size-3 opacity-45" />
                </a>
                <button type="button" onClick={() => setPathOpen((value) => !value)} className="flex w-full items-center gap-4 border-b border-current/10 px-4 py-4 text-[11px] uppercase tracking-[.13em]">
                  <span className="flex-1 text-left">Parcours</span>
                  <ChevronDown className={"size-3 transition-transform " + (pathOpen ? "rotate-180" : "")} />
                </button>
                <AnimatePresence initial={false}>
                  {pathOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      {[["Académique", "path-academic"], ["Extra-scolaire", "path-extra"], ["Professionnel", "path-professional"]].map(([label, href]) => (
                        <a key={href} onClick={() => { setMenuOpen(false); setPathOpen(false); }} href={"#" + href} className="flex items-center gap-3 px-5 py-3 font-mono text-[8px] uppercase tracking-[.13em] text-white/55">
                          {label}<ArrowUpRight className="size-3" />
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <a onClick={() => setMenuOpen(false)} href="#services" className="flex items-center gap-4 border-b border-current/10 px-4 py-4 text-[11px] uppercase tracking-[.13em]">
                  <span className="flex-1">Services</span><ArrowUpRight className="size-3 opacity-45" />
                </a>
                <button type="button" onClick={() => setNetworksOpen((value) => !value)} className="flex w-full items-center gap-4 border-b border-current/10 px-4 py-4 text-[11px] uppercase tracking-[.13em]">
                  <span className="flex-1 text-left">Réseaux</span>
                  <ChevronDown className={"size-3 transition-transform " + (networksOpen ? "rotate-180" : "")} />
                </button>
                <AnimatePresence initial={false}>
                  {networksOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      {[
                        ["GitHub", "https://github.com/Aladeadechi"],
                        ["LinkedIn", "https://www.linkedin.com"],
                        ["WhatsApp", "https://wa.me/22959087678"],
                        ["Email", "mailto:aladeadechi100@gmail.com"],
                      ].map(([label, href]) => (
                        <a key={label} onClick={() => { setMenuOpen(false); setNetworksOpen(false); }} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-3 px-5 py-3 font-mono text-[8px] uppercase tracking-[.13em] text-white/55">
                          <span className="flex-1">{label}</span><ArrowUpRight className="size-3" />
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-3 gap-2 p-2">
                  <button type="button" onClick={toggleLanguage} className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl bg-current/[.05] text-[8px] uppercase tracking-[.1em]">
                    <Languages className="size-3.5 opacity-60" />{language.toUpperCase()}
                  </button>
                  <button type="button" onClick={toggleSound} className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl bg-current/[.05] text-[8px] uppercase tracking-[.1em]">
                    {muted ? <VolumeX className="size-3.5 opacity-60" /> : <Volume2 className="size-3.5 opacity-60" />}{muted ? "Muet" : "Son"}
                  </button>
                  <AnimatedThemeToggler
                    theme={themeReady ? theme : "dark"}
                    onThemeChange={setTheme}
                    variant="circle"
                    className="flex min-h-11 flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-current/[.05] text-[8px] uppercase tracking-[.1em] [&_svg]:size-3.5"
                    aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}
                    title={theme === "dark" ? "Clair" : "Sombre"}
                  />
                </div>

                <a onClick={() => setMenuOpen(false)} href="#contact" className={"mx-2 mb-2 flex items-center justify-between rounded-full px-4 py-3.5 text-[10px] font-medium uppercase tracking-[.13em] " + (theme === "dark" ? "bg-white text-black" : "bg-[#111] text-white")}>
                  <span>RDV</span>
                  <CalendarDays className="size-3" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
      <audio ref={audioRef} src="/audio/portfolio-ambient-03.mp3" loop preload="auto" aria-hidden="true" />
    </header>
  );
}

function TechMarquee() {
  const techs = [
    ["Next.js", siNextdotjs],
    ["TypeScript", siTypescript],
    ["Arduino", siArduino],
    ["ROS", siRos],
    ["C", siC],
    ["C++", siCplusplus],
    ["Quartus Prime", siIntel],
    ["Raspberry Pi", siRaspberrypi],
    ["Python", siPython],
    ["Docker", siDocker],
    ["ESP32", siEspressif],
    ["Linux", siLinux],
    ["GitHub", siGithub],
  ] as const;
  const loop = [...techs, ...techs];

  return (
    <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 bg-[#08090a]/92 backdrop-blur-md">
      <div className="flex h-16 items-center">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex min-w-max"
        >
          {loop.map(([name, icon], index) => (
            <div key={name + index} className="mx-5 flex items-center gap-2.5 sm:mx-7">
              <svg viewBox="0 0 24 24" className="size-4 shrink-0" style={{ color: "#" + icon.hex }} aria-hidden="true">
                <path d={icon.path} fill="currentColor" />
              </svg>
              <span className="whitespace-nowrap font-mono text-[8px] uppercase tracking-[.16em] text-white/55">{name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <>
      <section id="top" className="relative overflow-hidden border-b border-white/10 bg-[#08090a] px-5 pt-24 text-white sm:px-8 sm:pt-28 lg:px-10">
        <div className="relative mx-auto flex min-h-[calc(100svh-96px)] max-w-[1500px] flex-col overflow-hidden">
          <div className="relative flex min-h-[680px] flex-1 flex-col overflow-hidden">
            <div className="absolute left-1/2 top-4 z-20 h-[75%] w-[min(94vw,570px)] -translate-x-1/2 sm:top-6 sm:h-[78%] md:top-10 md:h-[80%]">
              <div className="absolute bottom-0 left-1/2 h-[78%] w-[105%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(10,102,194,.18),transparent_66%)]" />
              <img
                src="/images/julien-hero.png"
                alt="Portrait temporaire"
                className="absolute inset-0 h-full w-full object-contain object-top grayscale contrast-[1.06] brightness-[1.02]"
              />
            </div>

          </div>
        </div>
      </section>

      <TechMarquee />
    </>
  );
}
const projectItems = [
  {
    n: "01",
    title: "Smart Mirror",
    type: "Réel / IoT",
    category: "Électronique",
    image: "/images/reference-projects/creator-dashboard.svg",
    copy: "Miroir intelligent connecté basé sur Raspberry Pi : visualisation d'informations, capteurs et pilotage domotique.",
    tags: ["Raspberry Pi", "ESP32", "Domotique"],
  },
  {
    n: "02",
    title: "Legal AI",
    type: "Concept / IA",
    category: "IA",
    image: "/images/reference-projects/course-platform.svg",
    copy: "Assistant juridique orienté Bénin et OHADA avec recherche augmentée, contextualisation des sources et réponses spécialisées.",
    tags: ["RAG", "LLM", "OHADA"],
  },
  {
    n: "03",
    title: "VoIP Systems",
    type: "Réel / Réseau",
    category: "IT",
    image: "/images/reference-projects/local-marketplace.svg",
    copy: "Architecture de communication IP : SIP, PBX, réseau et intégration de solutions pensées pour les besoins métier.",
    tags: ["SIP", "PBX", "IT"],
  },
  {
    n: "04",
    title: "Gestion d'eau en temps réel",
    type: "Réel / IoT",
    category: "Électronique",
    image: "/images/reference-projects/motion-lab.svg",
    copy: "Système de suivi du niveau d'eau par capteur ultrasonique et remontée des données en temps réel.",
    tags: ["Ultrason", "Capteurs", "Temps réel"],
  },
  {
    n: "05",
    title: "Éclairage automatique",
    type: "Réel / Système",
    category: "Électronique",
    image: "/images/reference-projects/queue-monitor.svg",
    copy: "Commande automatique d'une lampe à partir de la détection de présence et de la logique embarquée.",
    tags: ["PIR", "Arduino", "Automatisation"],
  },
  {
    n: "06",
    title: "TRC25 · Robotique",
    type: "Réel / Robotique",
    category: "Électronique",
    image: "/images/reference-projects/savings-app.svg",
    copy: "Projet robotique autour du défi TekBot Robotics Challenge et du thème Résilience urbaine.",
    tags: ["Robotique", "IT", "TRC25"],
  },
];

function ProjectVisual({ project }: { project: (typeof projectItems)[number] }) {
  return (
    <div className="absolute inset-0 bg-[#151515]">
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
      />
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState("Tous");
  const filters = ["Tous", "IA", "Logiciel", "IT", "Électronique"];
  const filteredProjects = projectItems.filter((project) => filter === "Tous" || project.category === filter);

  return (
    <section id="projects" className="theme-dark-surface border-b border-white/10 bg-[#08090a] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="relative text-center">
          <h2 className="text-[clamp(2.4rem,6.5vw,5rem)] font-light leading-none tracking-[-.06em]">
            / PROJETS
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 md:mt-14">
          <div className="flex gap-1 rounded-full border border-white/10 bg-white/[.035] p-1">
            {filters.map((item) => {
              const active = item === filter;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className="relative rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[.11em] transition-colors sm:text-[11px]"
                  aria-pressed={active}
                >
                  {active && <span className="absolute inset-0 rounded-full bg-white" />}
                  <span className={"relative " + (active ? "text-black" : "text-white/45 hover:text-white")}>{item}</span>
                </button>
              );
            })}
          </div>


        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 md:gap-5">
          {filteredProjects.map((project) => (
            <article key={project.n} className="group mx-auto w-full max-w-[590px] overflow-hidden rounded-xl border border-white/10 bg-[#0b0d0f] shadow-[0_18px_50px_-35px_rgba(0,0,0,.65)]">
              <div className="block">
                <div className="relative aspect-[16/9] overflow-hidden bg-[#151515]">
                  <ProjectVisual project={project} />
                  <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-[#08090a]/70 px-3 py-1 font-mono text-[7px] font-medium uppercase tracking-[.14em] text-white/70 backdrop-blur-md">
                    {project.type.startsWith("Réel") ? "Projet réel" : "Exploration"}
                  </span>
                </div>

                <div className="px-4 pb-5 pt-4 sm:px-5 sm:pb-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[clamp(1.35rem,2vw,1.9rem)] font-light leading-tight tracking-[-.045em]">
                      {project.title}
                    </h3>
                  </div>
                  <p className="mt-2 line-clamp-2 max-w-xl text-[10px] leading-5 text-white/42">
                    {project.copy}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/[.025] px-2.5 py-1 font-mono text-[6px] uppercase tracking-[.12em] text-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Path() {
  type PathItem = readonly [string, string, string, LucideIcon];

  const categories: {
    code: string;
    label: string;
    intro: string;
    items: PathItem[];
  }[] = [
    {
      code: "01",
      label: "Parcours académique",
      intro: "Une formation construite entre informatique industrielle, systèmes connectés et apprentissage continu.",
      items: [
        ["Août · déc. 2026", "TCB", "Formation en anglais pour renforcer la communication professionnelle", Languages],
        ["2026", "Projet de fin d'études", "Miroir intelligent connecté · visualisation d'informations · pilotage domotique", Cpu],
        ["2022 · 2026", "UCAO-UUC", "Licence · Informatique Industrielle et Maintenance", GraduationCap],
        ["2022", "Lycée Houffon d'Abomey", "Baccalauréat C", School],
      ],
    },
    {
      code: "02",
      label: "Activité extra-scolaire",
      intro: "Des engagements technologiques qui m'ont permis de passer de l'apprentissage à la conception et au travail en équipe.",
      items: [
        ["2026", "UCAO-TECH", "Chef de projet · membre du comité d'organisation", BriefcaseBusiness],
        ["2026", "Projets techniques", "Système de gestion d'eau en temps réel par ultrason · allumage automatique d'une lampe par détection de présence", Droplets],
        ["2025", "TRC25 · TekBot Robotics Challenge", "Chef du pôle IT de l'équipe UCAO-TECH · représentation du Bénin · thème : Résilience urbaine", Trophy],
        ["2023", "TekBot · Club TechBot", "Membre · participation à des projets technologiques", Bot],
      ],
    },
    {
      code: "03",
      label: "Expérience professionnelle",
      intro: "Des premières expériences de terrain à l'activité freelance, avec une approche centrée sur la réalisation de solutions concrètes.",
      items: [
        ["2026 · après la licence", "Freelance", "Développement logiciel · conception et réalisation de solutions numériques", Code2],
        ["2026", "Certifications", "Gestion de projet · Google · IA · formations à venir en cloud computing (AWS, Azure, Google) · GitHub · ressources humaines", BadgeCheck],
        ["Mars · mai 2026", "Port Autonome de Cotonou · DREF", "Stage de 3 mois · maintenance électrique et électronique · département des remorqueurs et engins flottants", Wrench],
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState(0);
  const current = categories[activeCategory];
  const pathRef = useRef<HTMLElement>(null);
  const autoStoppedRef = useRef(false);
  const autoStartRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoStepRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const syncFromHash = () => {
      const map: Record<string, number> = {
        "path-academic": 0,
        "path-extra": 1,
        "path-professional": 2,
      };
      const value = map[window.location.hash.slice(1)];
      if (value !== undefined) {
        stopAuto();
        setActiveCategory(value);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const stopAuto = () => {
    autoStoppedRef.current = true;
    if (autoStartRef.current) {
      clearTimeout(autoStartRef.current);
      autoStartRef.current = null;
    }
    if (autoStepRef.current) {
      clearInterval(autoStepRef.current);
      autoStepRef.current = null;
    }
  };

  useEffect(() => {
    const section = pathRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || autoStoppedRef.current) return;

        if (autoStartRef.current) clearTimeout(autoStartRef.current);
        autoStartRef.current = setTimeout(() => {
          if (autoStoppedRef.current || activeCategory >= categories.length - 1) return;

          setActiveCategory((value) => Math.min(value + 1, categories.length - 1));
          autoStepRef.current = setInterval(() => {
            setActiveCategory((value) => {
              if (autoStoppedRef.current || value >= categories.length - 1) {
                if (autoStepRef.current) clearInterval(autoStepRef.current);
                autoStepRef.current = null;
                return value;
              }
              return value + 1;
            });
          }, 6000);
        }, 4500);
      },
      { threshold: 0.45 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (autoStartRef.current) clearTimeout(autoStartRef.current);
      if (autoStepRef.current) clearInterval(autoStepRef.current);
    };
  }, []);

  return (
    <section
      id="path"
      ref={pathRef}
      className="border-b border-white/10 bg-[#08090a] px-5 py-28 text-white sm:px-8 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="min-w-0">
          <div className="text-center">
            <h2 className="text-[clamp(2.4rem,6.5vw,5rem)] font-light leading-none tracking-[-.06em]">
              / PARCOURS
            </h2>
          </div>

          <div className="mt-14 grid min-w-0 gap-12 lg:grid-cols-[.32fr_1fr] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mt-6 max-w-[310px] text-[12px] leading-6 text-white/40">
              Chaque étape de mon parcours m’a rapproché du même objectif : comprendre les systèmes, expérimenter sur le terrain et transformer les idées en solutions concrètes.
            </p>

            <div className="mt-10 flex gap-6 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((category, index) => {
                const active = index === activeCategory;

                return (
                  <div id={index === 0 ? "path-academic" : index === 1 ? "path-extra" : "path-professional"} key={category.code} className="shrink-0 py-1 lg:shrink">
                    <button
                      type="button"
                      onClick={() => {
                        stopAuto();
                        setActiveCategory(index);
                      }}
                      className="group flex w-full items-baseline gap-3 text-left"
                      aria-pressed={active}
                    >
                      <span
                        className={active
                          ? "font-mono text-[9px] tracking-[.18em] text-white/75"
                          : "font-mono text-[9px] tracking-[.18em] text-white/22 transition-colors group-hover:text-white/50"}
                      >
                        [{category.code}]
                      </span>
                      {active ? (
                        <>
                          <AnimatedShinyText className="!mx-0 text-[14px] font-normal tracking-[-.02em] !text-white">
                            {category.label}
                          </AnimatedShinyText>
                          <span className="relative -top-1 rounded-full bg-[#0A66C2] px-1.5 py-0.5 font-mono text-[6px] font-semibold uppercase tracking-[.14em] text-white shadow-[0_4px_14px_rgba(10,102,194,.28)]">
                            Actif
                          </span>
                        </>
                      ) : (
                        <span className="text-[13px] font-light tracking-[-.015em] text-white/30 transition-colors group-hover:text-white/60">
                          {category.label}
                        </span>
                      )}
                    </button>

                    <AnimatePresence initial={false} mode="wait">
                      {active && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -4 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -4 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="hidden overflow-hidden lg:block"
                        >
                          <div className="ml-8 mt-4 max-w-[290px] pb-4">
                            <p className="text-[11px] leading-5 text-white/42">
                              {category.intro}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.code + "-mobile-intro"}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="mt-4 max-w-[310px] lg:hidden"
              >
                <p className="text-[11px] leading-5 text-white/42">{current.intro}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative min-w-0 max-w-full overflow-hidden lg:min-h-[430px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.code}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative w-full min-w-0 max-w-full touch-pan-y"
                drag="x"
                onDragStart={stopAuto}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) setActiveCategory((value) => Math.min(value + 1, categories.length - 1));
                  if (info.offset.x > 60) setActiveCategory((value) => Math.max(value - 1, 0));
                }}
              >
                <div className="relative min-w-0 max-w-full pt-8">
                  <div className="pointer-events-none absolute left-0 right-0 top-0 flex items-center">
                    <span className="w-[24px] text-center font-mono text-[9px] tracking-[.18em] text-white/45 sm:w-[32px]">
                      {current.code}
                    </span>
                    <motion.div
                      animate={activeCategory === 0 ? { x: [0, 4, 0] } : { x: 0 }}
                      transition={activeCategory === 0 ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
                      className="pointer-events-auto ml-auto flex items-center gap-1"
                    >
                      {activeCategory > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            stopAuto();
                            setActiveCategory((value) => Math.max(value - 1, 0));
                          }}
                          aria-label="Parcours précédent"
                          className="group flex size-7 items-center justify-center rounded-full text-white/35 transition hover:bg-white/10 hover:text-white sm:size-8"
                        >
                          <ArrowLeft className="size-3" />
                        </button>
                      )}
                      {activeCategory < categories.length - 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            stopAuto();
                            setActiveCategory((value) => Math.min(value + 1, categories.length - 1));
                          }}
                          aria-label="Parcours suivant"
                          className="group flex size-7 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white sm:size-8"
                        >
                          <ArrowRight className="size-3" />
                        </button>
                      )}
                    </motion.div>
                  </div>
                  <div className="pointer-events-none absolute bottom-0 left-[11px] top-8 w-px bg-white/10 sm:left-[15px]" />

                  <AnimatedList delay={500} className="w-full min-w-0 max-w-full items-stretch gap-0">
                    {current.items.map(([date, title, copy, Icon]) => (
                      <article
                        key={date + "-" + title}
                        className="group relative grid w-full min-w-0 grid-cols-[32px_minmax(0,1fr)] gap-5 py-7 sm:grid-cols-[40px_minmax(0,1fr)] sm:gap-7"
                      >
                        <div className="relative z-10 flex size-[23px] items-center justify-center rounded-full border border-white/15 bg-[#08090a] text-white/45 transition-all duration-500 group-hover:border-white/50 group-hover:bg-white group-hover:text-black sm:size-[31px]">
                          <Icon className="size-2.5 sm:size-3" strokeWidth={1.7} />
                        </div>

                        <div className="border-t border-white/10 pt-5 transition-transform duration-500 group-hover:translate-x-1 sm:pt-6">
                          <div className="flex flex-wrap items-baseline justify-between gap-4">
                            <h3 className="min-w-0 break-words text-[clamp(1.5rem,2.4vw,2.5rem)] font-light leading-none tracking-[-.05em]">
                              {title}
                            </h3>
                            <span className="max-w-full break-words text-right font-mono text-[8px] uppercase tracking-[.18em] text-white/35">
                              {date}
                            </span>
                          </div>
                          <p className="mt-4 max-w-2xl break-words text-[12px] leading-5 text-white/45">
                            {copy}
                          </p>
                        </div>
                      </article>
                    ))}
                  </AnimatedList>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const confettiPieces = [
  [-18, 0, -16, 26], [-10, -8, 12, 34], [0, -3, -8, 30], [10, -10, 18, 38],
  [18, -2, -12, 28], [-24, 8, 20, 42], [24, 7, -20, 36], [-6, 12, 24, 44],
  [7, 5, -24, 32], [14, 14, 10, 46], [-15, 5, 28, 40], [2, 15, -18, 48],
];

function Services() {
  const services = [
    ["01", "Développement logiciel", "Applications web, interfaces métier et outils numériques conçus pour être maintenables et utiles.", Code2, ["Web", "TypeScript", "Next.js"]],
    ["02", "IoT & systèmes embarqués", "Intégration de capteurs, actionneurs et systèmes connectés du matériel au logiciel.", Cpu, ["ESP32", "Arduino", "Raspberry Pi"]],
    ["03", "IA & automatisation", "RAG, assistants spécialisés et automatisation de workflows autour de données métier.", Sparkles, ["RAG", "LLM", "Automation"]],
    ["04", "VoIP & réseaux", "Architecture et intégration de solutions SIP, PBX, réseau et communication d'entreprise.", BriefcaseBusiness, ["SIP", "PBX", "Network"]],
  ] as const;

  return (
    <section id="services" className="border-b border-white/10 bg-[#0a0b0c] px-5 py-28 text-white sm:px-8 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="text-center">
          <h2 className="text-[clamp(2.4rem,6.5vw,5rem)] font-light leading-none tracking-[-.06em]">
            / SERVICES
          </h2>
        </div>
        <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-4xl text-[clamp(2.4rem,5vw,5.8rem)] font-light leading-[.86] tracking-[-.07em]">
            Transformer une idée<br /><span className="text-white/30">en solution exploitable.</span>
          </h2>
          <p className="max-w-xs text-[11px] leading-5 text-white/35">Une approche qui relie conception, intégration et réalité terrain.</p>
        </div>

        <div className="mt-14 border-t border-white/10">
          {services.map(([n, title, copy, Icon, tags]) => (
            <article key={n} className="group grid gap-6 border-b border-white/10 py-7 transition-colors duration-300 hover:bg-white/[.02] sm:py-8 lg:grid-cols-[70px_1fr_1.25fr_220px_auto] lg:items-center">
              <span className="font-mono text-[9px] tracking-[.18em] text-white/25">{n}</span>
              <div className="flex items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/45 transition-colors group-hover:border-white/35 group-hover:text-white">
                  <Icon className="size-4" strokeWidth={1.4} />
                </span>
                <h3 className="text-[clamp(1.25rem,2.2vw,2rem)] font-light tracking-[-.045em]">{title}</h3>
              </div>
              <p className="max-w-xl text-[11px] leading-5 text-white/38">{copy}</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[7px] uppercase tracking-[.13em] text-white/35">{tag}</span>)}
              </div>
              <ArrowUpRight className="hidden size-4 text-white/25 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white lg:block" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [confetti, setConfetti] = useState(false);
  const footerLinks = [
    ["Projets", "#projects"],
    ["Parcours", "#path"],
    ["Services", "#services"],
  ];

  return <section id="contact" className="theme-dark-surface relative overflow-hidden bg-[#08090a] px-5 pt-28 pb-3 text-white sm:px-8 sm:pt-28 lg:px-10 lg:pt-36 lg:pb-4">
    <div className="mx-auto max-w-[1500px]">
      <div className="relative overflow-hidden border-b border-white/10 pb-16 sm:pb-20">
        <div className="relative z-20 text-center">
          <h2 className="text-[clamp(2.4rem,6.5vw,5rem)] font-light leading-none tracking-[-.06em]">
            / CONTACT
          </h2>
        </div>

        <Globe className="!inset-auto !right-[2%] !top-1/2 !h-[430px] !w-[430px] !-translate-y-1/2 opacity-55 sm:!right-[1%] sm:!h-[500px] sm:!w-[500px] xl:!right-[2%] xl:!h-[570px] xl:!w-[570px]" />

        <div className="relative z-10 mt-14 max-w-3xl">
          <div>
            <p className="max-w-xl text-[10px] uppercase tracking-[.16em] text-white/28">
              Construire · intégrer · faire évoluer
            </p>
            <h2 className="mt-6 max-w-2xl text-[clamp(2.2rem,4vw,4.6rem)] font-light leading-[.9] tracking-[-.065em]">
              Un projet à<br />
              <span className="text-white/32">concrétiser ?</span>
            </h2>
            <p className="mt-9 max-w-lg text-[13px] leading-6 text-white/48">
              Les projets n’ont pas de frontières. Je collabore avec des équipes et des entreprises, au Bénin comme ailleurs, pour donner vie à des solutions numériques et techniques pensées pour le réel.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <div className="relative inline-block">
              {confetti && <div className="pointer-events-none absolute inset-0 z-30 overflow-visible">
                {confettiPieces.map(([x, y, drift, drop], i) => <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 h-1.5 w-1 rounded-[1px] bg-white"
                  initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                  animate={{ opacity: 0, x: x * 3 + drift, y: y * 2 + drop * 2, rotate: (i % 2 ? 1 : -1) * 180 }}
                  transition={{ duration: .9 + (i % 3) * .12, ease: "easeOut" }}
                />)}
              </div>}
              <a
                href="https://wa.me/22959087678?text=Bonjour%20Alade%20Adechi"
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  setConfetti(true);
                  window.setTimeout(() => setConfetti(false), 1200);
                }}
                className="group inline-flex items-center gap-3 rounded-full bg-white py-3 pl-5 pr-3 text-[10px] font-medium uppercase tracking-[.13em] text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                Me contacter
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-md border-l border-white/10 bg-white px-4 py-2.5 text-[9px] font-medium uppercase tracking-[.13em] text-black transition hover:bg-[#dfe3e8]"
            >
              RDV
              <CalendarDays className="size-3" />
              <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

      </div>

      <footer className="pt-10 sm:pt-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-[1.3fr_.75fr_.95fr_.95fr_.9fr] lg:gap-10">
          <div className="col-span-2 lg:col-span-1">
            <a href="#top" className="group inline-flex items-center gap-3" aria-label="Retour à l'accueil">
              <span className="portfolio-logo-mark flex size-9 items-center justify-center rounded-full text-black transition-transform duration-300 group-hover:scale-105">
                <span className="text-[11px] font-semibold tracking-[-.08em]">AD</span>
              </span>
              <span>
                <span className="block text-[11px] font-medium tracking-[.04em]">Alade ADECHI</span>
                <span className="mt-1 block font-mono text-[7px] uppercase tracking-[.17em] text-white/30">Ingénieur IT</span>
              </span>
            </a>
            <p className="mt-5 max-w-[210px] text-[9px] leading-4 text-white/28">Comprendre le monde qui m’entoure, imaginer de nouvelles possibilités et construire des solutions qui ont un réel impact.</p>
          </div>

          <div>
            <p className="mb-3 font-mono text-[8px] uppercase tracking-[.22em] text-white/35">Navigation</p>
            <nav className="grid gap-2">
              {footerLinks.map(([label, href]) => <a key={label} href={href} className="group w-fit text-[10px] text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-white sm:text-[11px]">{label}</a>)}
            </nav>
          </div>

          <div className="scroll-mt-24">
            <p className="mb-3 font-mono text-[8px] uppercase tracking-[.22em] text-white/35">Services</p>
            <nav className="grid gap-2">
              <a href="#projects" className="group w-fit text-[10px] text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-white sm:text-[11px]">Développement web</a>
              <a href="#projects" className="group w-fit text-[10px] text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-white sm:text-[11px]">IoT & systèmes embarqués</a>
              <a href="#projects" className="group w-fit text-[10px] text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-white sm:text-[11px]">IA & automatisation</a>
              
            </nav>
          </div>

          <div>
            <p className="mb-3 font-mono text-[8px] uppercase tracking-[.22em] text-white/35">Découvrir</p>
            <nav className="grid gap-2">
              <span className="flex w-fit items-center gap-1.5 text-[10px] text-white/35 sm:text-[11px]" aria-label="Yisin.ai en cours"><span>Yisin.ai</span><span className="relative -top-1 rounded-full bg-[#0A66C2] px-1.5 py-0.5 font-mono text-[7px] font-semibold leading-none tracking-[.12em] text-white shadow-[0_4px_14px_rgba(10,102,194,.28)]">En cours</span></span>
              <span className="flex w-fit items-center gap-1.5 text-[10px] text-white/35 sm:text-[11px]" aria-label="DNS Corporate en cours"><span>DNS Corporate</span><span className="relative -top-1 rounded-full bg-[#0A66C2] px-1.5 py-0.5 font-mono text-[7px] font-semibold leading-none tracking-[.12em] text-white shadow-[0_4px_14px_rgba(10,102,194,.28)]">En cours</span></span>
              <a href="https://ucaotech.ucaobenin.org" target="_blank" rel="noreferrer" className="group flex w-fit items-center gap-2 text-[10px] text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-white sm:text-[11px]"><span>UCAO-TECH</span><ArrowUpRight className="size-3 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-70" /></a>
              <span className="flex w-fit items-center gap-1.5 text-[10px] text-white/35 sm:text-[11px]" aria-label="NOKIVI bientôt"><span>NOKIVI</span><span className="relative -top-1 rounded-full bg-[#0A66C2] px-1.5 py-0.5 font-mono text-[7px] font-semibold leading-none tracking-[.12em] text-white shadow-[0_4px_14px_rgba(10,102,194,.28)]">Bientôt</span></span>
            </nav>
          </div>

          <div id="networks" className="scroll-mt-24">
            <p className="mb-3 font-mono text-[8px] uppercase tracking-[.22em] text-white/35">Réseaux</p>
            <div className="grid gap-2.5">
              <a href="https://github.com/Aladeadechi" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" className="group flex w-fit items-center gap-2 text-[10px] text-white/55 transition-all duration-300 hover:translate-x-1 hover:text-white sm:text-[11px]">
                <svg viewBox="0 0 24 24" className="size-3.5 shrink-0 fill-current" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.25c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.46 11.46 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.57A12 12 0 0 0 12 .5Z"/></svg><span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" className="group flex w-fit items-center gap-2 text-[10px] text-white/55 transition-all duration-300 hover:translate-x-1 hover:text-white sm:text-[11px]">
                <svg viewBox="0 0 24 24" className="size-3.5 shrink-0 fill-current" aria-hidden="true"><path d="M5.02 3.5a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6ZM3.1 9h3.84v12H3.1V9Zm6.25 0h3.68v1.64h.05c.51-.97 1.75-1.99 3.62-1.99 3.87 0 4.58 2.55 4.58 5.86V21h-3.84v-5.76c0-1.37-.03-3.13-1.91-3.13-1.92 0-2.21 1.5-2.21 3.03V21H9.35V9Z"/></svg><span>LinkedIn</span><span className="relative -top-1 rounded-full bg-[#0A66C2] px-1.5 py-0.5 font-mono text-[7px] font-semibold leading-none tracking-[.12em] text-white shadow-[0_4px_14px_rgba(10,102,194,.28)]">NEW</span>
              </a>
              <a href="https://wa.me/22959087678?text=Bonjour%20Alade%20Adechi" target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp" className="group flex w-fit items-center gap-2 text-[10px] text-white/55 transition-all duration-300 hover:translate-x-1 hover:text-white sm:text-[11px]">
                <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" aria-hidden="true"><circle cx="12" cy="11.5" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M8.8 19.1 8 21.8l2.7-1.3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.2 8.9c.15-.38.33-.4.58-.4h.48c.14 0 .3.05.4.31l.67 1.7c.08.2.06.36-.05.51l-.38.51c-.1.13-.09.26-.02.39.28.48 1.08 1.58 2.33 2.2.16.08.28.06.39-.07l.52-.6c.12-.14.28-.18.47-.09l1.62.77c.19.09.27.22.24.43-.05.35-.2.99-.72 1.26-.57.29-1.34.32-2.17.05-.68-.22-1.52-.69-2.48-1.53-.86-.75-1.5-1.58-1.98-2.35-.44-.7-.82-1.55-.81-2.28 0-.42.13-.82.31-1.21Z" fill="currentColor"/></svg><span>WhatsApp</span>
              </a>
              <a href="mailto:aladeadechi100@gmail.com" aria-label="Email" title="Email" className="group flex w-fit items-center gap-2 text-[10px] text-white/55 transition-all duration-300 hover:translate-x-1 hover:text-white sm:text-[11px]">
                <Mail className="size-3.5 shrink-0" /><span>Email</span>
              </a>
            </div>
          </div>

        </div>

        <div className="mt-10 grid gap-4 border-t border-white/10 pt-5 font-mono text-[8px] uppercase tracking-[.18em] text-white/35 sm:mt-12 sm:grid-cols-3 sm:items-center">
          <span className="text-center normal-case sm:text-left">© 2026 Alade ADECHI. Tous droits réservés.</span>
          <span className="text-center text-white/25">Conçu avec Next.js · TypeScript · Tailwind CSS</span>
          <a href="#top" className="group inline-flex items-center justify-center gap-2 transition-all duration-300 hover:translate-x-1 hover:text-white/70 sm:justify-self-end">Retour en haut <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
        </div>

        <div className="-mx-4 mt-12 overflow-hidden sm:-mx-6 sm:mt-16 lg:-mx-8">
          <div aria-label="Alade ADECHI" className="w-full select-none whitespace-nowrap text-center font-sans text-[15vw] font-semibold leading-[.68] tracking-[-.085em] text-white/[.055] sm:text-[12vw] lg:text-[10vw]">
            Alade ADECHI
          </div>
        </div>
      </footer>
    </div>
  </section>;
}

export function Portfolio() {
  return (
    <div className="portfolio-shell bg-[#08090a] text-white">
      <Nav />
      <main><Hero/><Projects/><Path/><Services/><Contact/></main>
    </div>
  );
}
