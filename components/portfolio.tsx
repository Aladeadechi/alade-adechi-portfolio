"use client";

import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { LiquidField } from "@/components/three/liquid-field";
import { ArrowDown, ArrowUpRight, CalendarDays, Languages, Mail, MapPin, Menu, Moon, Sun, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const projects = [
  { n: "01", title: "Smart Mirror", type: "IoT / Edge / Vision", copy: "Une interface physique connectée autour d'un Raspberry Pi, de capteurs et de la domotique.", mark: "MIRROR" },
  { n: "02", title: "Legal AI", type: "RAG / IA / OHADA", copy: "Une architecture de recherche juridique pensée pour retrouver, contextualiser et citer les sources.", mark: "LAW" },
  { n: "03", title: "VoIP Systems", type: "SIP / PBX / Network", copy: "Des systèmes de communication conçus du besoin client jusqu'au déploiement.", mark: "VOICE" },
];

function Nav() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [themeReady, setThemeReady] = useState(false);
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  const [muted, setMuted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
  }, [theme, themeReady]);

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const sectionIds = ["top", "about", "projects", "path", "contact"];
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
    ? [["01", "À propos", "about"], ["02", "Projets", "projects"], ["03", "Parcours", "path"], ["04", "Contact", "contact"]]
    : [["01", "About", "about"], ["02", "Projects", "projects"], ["03", "Experience", "path"], ["04", "Contact", "contact"]];

  const toggleTheme = () => setTheme((current) => current === "dark" ? "light" : "dark");
  const toggleLanguage = () => setLanguage((current) => current === "fr" ? "en" : "fr");

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <nav className={`portfolio-nav mx-auto flex h-14 max-w-[1500px] items-center justify-between rounded-full border px-1 pl-2 shadow-[0_14px_45px_rgba(0,0,0,.16)] backdrop-blur-2xl transition-colors duration-300 sm:px-2 sm:pl-4 ${theme === "dark" ? "border-white/10 bg-[#08090a]/82 text-white" : "border-black/10 bg-[#f4f1eb]/92 text-[#111]"}`}>
        <a href="#top" className="group flex shrink-0 items-center gap-3" aria-label="Alade Adechi, accueil">
          <span className="portfolio-logo-mark flex size-7 items-center justify-center rounded-full"><svg viewBox="0 0 28 28" className="size-4" aria-hidden><path d="M4 21 9.5 7h2.8l5.5 14h-3l-1.2-3.2H8.8L7.6 21H4Zm5.7-5.6h3l-1.5-4.2-1.5 4.2ZM17.5 7h3.1c4 0 6.2 2.7 6.2 7s-2.2 7-6.2 7h-3.1V7Zm2.8 2.4v9.2h.5c2.1 0 3.2-1.5 3.2-4.6s-1.1-4.6-3.2-4.6h-.5Z" fill="currentColor"/></svg></span>
          <span className="hidden sm:flex sm:flex-col sm:gap-0.5"><span className="text-[10px] font-medium tracking-[.04em] text-white/80">Alade ADECHI</span><span className="text-[7px] uppercase tracking-[.16em] text-white/35">Ingénieur informatique</span></span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          <a href="#top" className={`relative px-3 py-2 text-[9px] uppercase tracking-[.13em] transition-all duration-300 after:absolute after:bottom-0 after:left-3 after:h-px after:w-[calc(100%-1.5rem)] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${activeSection === "top" ? "text-white" : "text-white/52 hover:text-white"}`}>
            {language === "fr" ? "Accueil" : "Home"}
          </a>
          {items.map(([, label, id]) => (
            <a key={id} href={`#${id}`} className={`relative px-3 py-2 text-[9px] uppercase tracking-[.13em] transition-all duration-300 after:absolute after:bottom-0 after:left-3 after:h-px after:w-[calc(100%-1.5rem)] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${activeSection === id ? "text-white" : "text-white/52 hover:text-white"}`}>
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-1.5 md:flex">
          <button type="button" onClick={toggleLanguage} aria-label={language === "fr" ? "Passer en anglais" : "Switch to French"} className="inline-flex h-9 items-center gap-1 border-l border-white/10 px-3 font-sans text-[9px] font-medium uppercase tracking-[.12em] text-white/58 transition hover:text-white">
            <Languages className="size-3 text-white/30" />{language.toUpperCase()}
          </button>
          <button type="button" onClick={() => setMuted((current) => !current)} aria-label={muted ? "Réactiver le son" : "Mettre le son en muet"} className="inline-flex size-9 items-center justify-center text-white/58 transition hover:text-white">
            {muted ? <VolumeX className="size-3.5" aria-hidden /> : <Volume2 className="size-3.5" aria-hidden />}
          </button>
          <button type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"} className="inline-flex size-9 items-center justify-center text-white/58 transition hover:text-white">
            {theme === "dark" ? <Sun className="size-3.5" aria-hidden /> : <Moon className="size-3.5" aria-hidden /> }
          </button>
          <a href="#contact" className="group inline-flex items-center gap-2 rounded-md border-l border-white/10 bg-white px-4 py-2.5 text-[9px] font-medium uppercase tracking-[.13em] text-black transition hover:bg-[#dfe3e8]">
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
                <a onClick={() => setMenuOpen(false)} href="#top" className="flex items-center gap-4 border-b border-current/10 px-4 py-4 text-[11px] uppercase tracking-[.13em]">
                  <span className="flex-1">{language === "fr" ? "Accueil" : "Home"}</span>
                  <ArrowUpRight className="size-3 opacity-45" />
                </a>
                {items.map(([, label, id]) => (
                  <a key={id} onClick={() => setMenuOpen(false)} href={"#" + id} className="flex items-center gap-4 border-b border-current/10 px-4 py-4 text-[11px] uppercase tracking-[.13em]">
                    <span className="flex-1">{label}</span>
                    <ArrowUpRight className="size-3 opacity-45" />
                  </a>
                ))}

                <div className="grid grid-cols-3 gap-2 p-2">
                  <button type="button" onClick={toggleLanguage} className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl bg-current/[.05] text-[8px] uppercase tracking-[.1em]">
                    <Languages className="size-3.5 opacity-60" />{language.toUpperCase()}
                  </button>
                  <button type="button" onClick={() => setMuted((current) => !current)} className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl bg-current/[.05] text-[8px] uppercase tracking-[.1em]">
                    {muted ? <VolumeX className="size-3.5 opacity-60" /> : <Volume2 className="size-3.5 opacity-60" />}{muted ? "Muet" : "Son"}
                  </button>
                  <button type="button" onClick={toggleTheme} className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl bg-current/[.05] text-[8px] uppercase tracking-[.1em]">
                    {theme === "dark" ? <Sun className="size-3.5 opacity-60" /> : <Moon className="size-3.5 opacity-60" />}{theme === "dark" ? "Clair" : "Sombre"}
                  </button>
                </div>

                <a onClick={() => setMenuOpen(false)} href="#contact" className={"mx-2 mb-2 flex items-center justify-between rounded-md px-4 py-3.5 text-[10px] font-medium uppercase tracking-[.13em] " + (theme === "dark" ? "bg-white text-black" : "bg-[#111] text-white")}>
                  <span>RDV</span>
                  <CalendarDays className="size-3" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}

function Signal() {
  return <div className="signal absolute right-[8vw] top-[17vh] hidden h-[58vh] w-[28vw] min-w-[330px] max-w-[480px] overflow-hidden border border-white/15 lg:block">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_42%,rgba(170,184,198,.16),transparent_30%),linear-gradient(145deg,rgba(255,255,255,.06),transparent_40%)]" />
    <svg viewBox="0 0 500 700" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
      <motion.path d="M-30 520 C70 470 70 260 170 320 S270 570 350 370 S420 170 530 220" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth="1.2" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:2.2,ease:[.16,1,.3,1]}} />
      <motion.path d="M-30 575 C80 520 120 380 205 425 S310 610 375 390 S430 110 530 155" fill="none" stroke="rgba(175,188,202,.65)" strokeWidth="1" strokeDasharray="3 12" animate={{strokeDashoffset:[0,-90]}} transition={{duration:3,repeat:Infinity,ease:"linear"}} />
    </svg>
    <motion.div className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl" animate={{x:["-100%","500%"]}} transition={{duration:4.5,repeat:Infinity,ease:"linear"}} />
    <div className="absolute inset-x-6 bottom-6 border-t border-white/15 pt-4 font-mono text-[8px] uppercase tracking-[.2em] text-white/40"><div className="flex justify-between"><span>Input</span><span>Logic</span><span>Reality</span></div><div className="mt-4 flex justify-between"><span>IoT</span><span>AI</span><span>EDGE</span><span>VOIP</span></div></div>
  </div>;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, .78], [1, 0]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(mx, { stiffness: 70, damping: 20 });
  const ry = useSpring(my, { stiffness: 70, damping: 20 });
  const fieldX = useTransform(rx, [-.5, .5], [-18, 18]);
  const fieldY = useTransform(ry, [-.5, .5], [-14, 14]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - .5);
    my.set((event.clientY - rect.top) / rect.height - .5);
  };

  const resetPointer = () => { mx.set(0); my.set(0); };

  return <section id="top" ref={ref} onPointerMove={handlePointerMove} onPointerLeave={resetPointer} className="relative min-h-screen overflow-hidden border-b border-white/10 bg-[#070809] text-white">
    <div className="noise absolute inset-0 opacity-30" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(210,198,176,.11),transparent_26%),radial-gradient(circle_at_85%_20%,rgba(140,150,165,.06),transparent_25%)]" />

    <motion.div style={{ y, opacity }} className="relative z-10 mx-auto min-h-screen max-w-[1500px] px-5 pb-7 pt-28 sm:px-8 lg:px-10">
      <div className="absolute left-5 top-28 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[.26em] text-white/38 sm:left-8 lg:left-10">
        <span className="h-px w-8 bg-white/40" /> Software engineering · Systems · AI · IoT
      </div>

      <div className="grid min-h-[calc(100vh-120px)] items-center gap-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-0">
        <div className="relative z-40 max-w-[610px] pb-14 pt-20 lg:pb-0 lg:pt-10">
          <p className="mb-6 font-mono text-[8px] uppercase tracking-[.24em] text-white/38">Alade ADECHI / Ingénieur informatique</p>
          <h1 className="text-white text-[clamp(3.2rem,6vw,7.1rem)] font-light leading-[.83] tracking-[-.07em]">
            <span className="block">Je construis.</span>
            <span className="block text-white/38">Je connecte.</span>
            <span className="block">Je rends réel.</span>
          </h1>
          <p className="mt-8 max-w-md text-[12px] leading-6 text-white/55">
            Logiciel, architecture système, automatisation et technologies connectées — du problème à une solution qui fonctionne réellement.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-mono text-[9px] uppercase tracking-[.14em] text-black transition hover:bg-white/90">Explorer <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-mono text-[9px] uppercase tracking-[.14em] text-white/70 transition hover:border-white/45 hover:text-white">Contact <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
          </div>
        </div>

        <div className="relative z-10 flex min-h-[540px] items-center justify-center lg:min-h-[720px]">
          <motion.div style={{ x: fieldX, y: fieldY }} className="relative aspect-square w-[min(82vw,720px)] overflow-hidden rounded-full">
            <LiquidField />
            <div className="absolute inset-[8%] rounded-full border border-white/[.10]" />
            <motion.div animate={{ rotate:360 }} transition={{ duration:26, repeat:Infinity, ease:"linear" }} className="absolute inset-[14%] rounded-full border border-dashed border-white/[.16]" />
            <motion.div animate={{ rotate:-360 }} transition={{ duration:36, repeat:Infinity, ease:"linear" }} className="absolute inset-[22%] rounded-full border border-white/[.10]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-mono text-[8px] uppercase tracking-[.3em] text-white/42">Engineering</div>
                <div className="mt-2 text-[clamp(2rem,4vw,4.6rem)] font-light tracking-[-.08em]">AD</div>
                <div className="mt-2 font-mono text-[7px] uppercase tracking-[.28em] text-white/28">Build · Connect · Evolve</div>
              </div>
            </div>
            <motion.span animate={{ rotate:360 }} transition={{ duration:14, repeat:Infinity, ease:"linear" }} className="absolute left-1/2 top-[5%] block size-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,.8)]" />
          </motion.div>

          <div className="pointer-events-none absolute bottom-[8%] right-[2%] hidden w-[290px] border-t border-white/15 pt-3 font-mono text-[7px] uppercase tracking-[.18em] text-white/30 lg:block">
            <div className="flex justify-between"><span>Software</span><span>Systems</span><span>AI</span></div>
            <div className="mt-3 flex justify-between"><span>IoT</span><span>Automation</span><span>VoIP</span></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-5 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[.18em] text-white/28 sm:left-8 lg:left-10"><ArrowDown className="size-3" /> Scroll to explore</div>
      <div className="absolute bottom-6 right-5 hidden font-mono text-[8px] uppercase tracking-[.18em] text-white/22 sm:block lg:right-10">Interactive field / 01</div>
    </motion.div>
  </section>;
}
function About() {
  return <section id="about" className="relative border-b border-white/10 bg-[#f0eee9] px-5 py-28 text-[#111] sm:px-8 lg:px-10 lg:py-40"><div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[.32fr_1fr]"><p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[.24em] text-black/42"><span className="h-px w-7 bg-black/25" />À propos</p><div><h2 className="max-w-5xl text-[clamp(2.4rem,5vw,6rem)] font-light leading-[.9] tracking-[-.06em]">Je travaille à l'endroit où <span className="font-medium text-[#222]">le logiciel</span> rencontre <span className="text-black/35">le réel.</span></h2><div className="mt-16 grid max-w-4xl gap-10 border-t border-black/15 pt-7 text-[13px] leading-6 text-black/55 md:grid-cols-2"><p>Formation en Informatique Industrielle et Maintenance, puis une pratique qui traverse développement, automatisation, électronique, IA et infrastructures.</p><p>Je construis des systèmes complets : comprendre le problème, concevoir l'architecture, prototyper, intégrer et rendre l'ensemble fiable.</p></div></div></div></section>;
}
function Projects() {
  const ref=useRef<HTMLElement>(null); const {scrollYProgress}=useScroll({target:ref,offset:["start start","end end"]}); const x=useTransform(scrollYProgress,[0,1],["0%","-66%"]); const progress=useSpring(scrollYProgress,{stiffness:80,damping:20});
  return <section id="projects" ref={ref} className="theme-dark-surface relative h-[320vh] bg-[#08090a] text-white"><div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden"><div className="mx-auto mb-8 w-full max-w-[1500px] px-5 sm:px-8 lg:px-10"><p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[.24em] text-white/38"><span className="h-px w-7 bg-white/50" />Selected work</p><h2 className="mt-3 text-[clamp(2.2rem,4.8vw,5.6rem)] font-light leading-none tracking-[-.06em]">Des systèmes en mouvement.</h2></div><motion.div style={{x}} className="flex gap-6 pl-5 sm:pl-8 lg:pl-[max(40px,calc((100vw-1500px)/2))]">{projects.map((p)=><article key={p.n} className={`group relative h-[61vh] min-h-[450px] shrink-0 overflow-hidden border border-white/15 bg-[#101214] ${p.n === "01" ? "w-[min(64vw,880px)]" : p.n === "02" ? "w-[min(74vw,980px)]" : "w-[min(60vw,820px)]"}`}><div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(180,180,180,.10),transparent_28%),linear-gradient(135deg,#111517,#08090a)]"/><div className="absolute inset-0 opacity-30 transition-transform duration-[1600ms] group-hover:scale-110"><div className="absolute left-[18%] top-[20%] h-[48%] w-[64%] border border-white/20"/><div className="absolute left-[28%] top-[32%] h-[32%] w-[44%] border border-white/10"/><motion.div className="absolute top-0 h-full w-px bg-white/40" animate={{x:["10%","900%"]}} transition={{duration:4,repeat:Infinity,ease:"linear"}}/></div><div className="absolute inset-x-7 top-7 flex justify-between font-mono text-[8px] uppercase tracking-[.2em] text-white/35 md:inset-x-10 md:top-10"><span>{p.n} / 03</span><span>{p.type}</span></div><div className="absolute bottom-7 left-7 right-7 md:bottom-10 md:left-10 md:right-10"><div className="mb-4 h-px w-10 bg-white/50 transition-all duration-700 group-hover:w-28"/><h3 className="text-[clamp(2.7rem,5vw,5.8rem)] font-light leading-[.85] tracking-[-.07em]">{p.title}</h3><p className="mt-5 max-w-xl text-[12px] leading-5 text-white/45">{p.copy}</p><div className="mt-6 flex items-center justify-between border-t border-white/12 pt-4"><span className="font-mono text-[8px] uppercase tracking-[.18em] text-white/35">{p.mark} / SYSTEM</span><ArrowUpRight className="size-4 text-white/60 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"/></div></div></article>)}</motion.div><div className="mx-auto mt-7 w-full max-w-[1500px] px-5 sm:px-8 lg:px-10"><div className="h-px bg-white/10"><motion.div style={{scaleX:progress}} className="h-full origin-left bg-white/50"/></div></div></div></section>;
}

function Path() {
  return <section id="path" className="border-b border-black/10 bg-[#d9d6cf] px-5 py-28 text-[#111] sm:px-8 lg:px-10 lg:py-36"><div className="mx-auto max-w-[1500px]"><div className="grid gap-14 lg:grid-cols-[.32fr_1fr]"><p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[.24em] text-black/42"><span className="h-px w-7 bg-black/25" />Parcours</p><div>{[["2026 · maintenant","KOBLI IT","Ingénieur VoIP · architecture, SIP, Yeastar, infrastructures"],["2026","UCAO-UUC","Projet de fin d'études · miroir connecté intelligent"],["2025","Port Autonome de Cotonou","Stage · maintenance électrique et électronique"]].map(([date,title,copy])=><div key={title} className="grid gap-4 border-t border-black/15 py-7 md:grid-cols-[.2fr_.3fr_1fr]"><span className="font-mono text-[9px] text-black/40">{date}</span><strong className="font-normal">{title}</strong><p className="text-[12px] leading-5 text-black/50">{copy}</p></div>)}</div></div></div></section>;
}

function Contact() {
  const footerLinks = [
    ["Accueil", "#top"],
    ["À propos", "#about"],
    ["Projets", "#projects"],
    ["Parcours", "#path"],
    ["Contact", "#contact"],
  ];

  return <section id="contact" className="theme-dark-surface relative overflow-hidden bg-[#08090a] px-5 py-28 text-white sm:px-8 lg:px-10 lg:py-36">
    <div className="mx-auto max-w-[1500px]">
      <div className="border-b border-white/10 pb-20">
        <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[.24em] text-white/38"><span className="h-px w-7 bg-white/50" />Contact</p>
        <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_.48fr] lg:items-end">
          <h2 className="max-w-5xl text-[clamp(3.3rem,7vw,8rem)] font-light leading-[.82] tracking-[-.075em]">
            Construisons<br /><span className="text-white/35">quelque chose</span><br />de réel.
          </h2>
          <div className="border-t border-white/15 pt-5">
            <p className="max-w-sm text-[12px] leading-5 text-white/45">Pour un projet, une collaboration technique, une opportunité professionnelle ou académique.</p>
            <a href="mailto:alade.adechi@gmail.com" className="group mt-8 inline-flex items-center gap-3 border-b border-white/25 pb-2 text-[11px] uppercase tracking-[.15em] transition-colors hover:border-white">alade.adechi@gmail.com <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/></a>
          </div>
        </div>
      </div>

      <footer className="pt-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.1fr_.65fr_.65fr_.8fr]">
          <div>
            <a href="#top" className="group inline-flex items-center gap-3" aria-label="Retour à l'accueil">
              <span className="portfolio-logo-mark flex size-9 items-center justify-center rounded-full text-black transition-transform duration-300 group-hover:scale-105">
                <span className="text-[11px] font-semibold tracking-[-.08em]">AD</span>
              </span>
              <span><span className="block text-[11px] font-medium tracking-[.04em]">Alade ADECHI</span><span className="mt-1 block font-mono text-[7px] uppercase tracking-[.17em] text-white/30">Ingénieur informatique</span></span>
            </a>
            <p className="mt-6 max-w-xs text-[11px] leading-5 text-white/35">Software · Systems · AI · IoT · Automation · VoIP</p>
          </div>

          <div>
            <p className="mb-4 font-mono text-[8px] uppercase tracking-[.22em] text-white/25">Navigation</p>
            <nav className="grid gap-2">
              {footerLinks.map(([label, href]) => <a key={href} href={href} className="w-fit text-[11px] text-white/55 transition-colors hover:text-white">{label}</a>)}
            </nav>
          </div>

          <div>
            <p className="mb-4 font-mono text-[8px] uppercase tracking-[.22em] text-white/25">Présence</p>
            <div className="space-y-3 text-[11px] text-white/45">
              <p className="flex items-center gap-2"><MapPin className="size-3 text-white/25" />Cotonou, Bénin</p>
              <a href="mailto:alade.adechi@gmail.com" className="flex items-center gap-2 transition-colors hover:text-white"><Mail className="size-3 text-white/25" />Email</a>
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-[8px] uppercase tracking-[.22em] text-white/25">Disponibilité</p>
            <p className="flex items-center gap-2 text-[11px] text-white/55"><span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,.55)]" />Ouvert aux opportunités</p>
            <p className="mt-3 max-w-[210px] text-[10px] leading-4 text-white/25">Projets techniques, collaborations et opportunités en ingénierie logicielle.</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-5 font-mono text-[8px] uppercase tracking-[.18em] text-white/24 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Alade Adechi. Tous droits réservés.</span>
          <a href="#top" className="group inline-flex items-center gap-2 transition-colors hover:text-white/60">Retour en haut <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
        </div>
      </footer>
    </div>
  </section>;
}

export function Portfolio() {
  return <div className={`portfolio-shell bg-[#08090a] text-white ${/* Nav controls are persisted; page theme follows the html color scheme. */ ""}`}><Nav/><main><Hero/><About/><Projects/><Path/><Contact/></main></div>;
}
