"use client";

import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { LiquidField } from "@/components/three/liquid-field";
import { Globe } from "@/registry/magicui/globe";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { ArrowDown, ArrowUpRight, CalendarDays, Languages, Mail, MapPin, Menu, Volume2, VolumeX, X } from "lucide-react";
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
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, themeReady]);

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const sectionIds = ["top", "about", "projects", "path", "contact", "services", "networks"];
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <nav className={`portfolio-nav mx-auto flex h-14 max-w-[1500px] items-center justify-between rounded-full border px-1 pl-2 shadow-[0_14px_45px_rgba(0,0,0,.16)] backdrop-blur-2xl transition-colors duration-300 sm:px-2 sm:pl-4 ${theme === "dark" ? "border-white/10 bg-[#08090a]/82 text-white" : "border-black/10 bg-[#f4f1eb]/92 text-[#111]"}`}>
        <a href="#top" className="group flex shrink-0 items-center gap-3" aria-label="Alade ADECHI, accueil">
          <span className="portfolio-logo-mark flex size-7 items-center justify-center rounded-full"><svg viewBox="0 0 28 28" className="size-4" aria-hidden><path d="M4 21 9.5 7h2.8l5.5 14h-3l-1.2-3.2H8.8L7.6 21H4Zm5.7-5.6h3l-1.5-4.2-1.5 4.2ZM17.5 7h3.1c4 0 6.2 2.7 6.2 7s-2.2 7-6.2 7h-3.1V7Zm2.8 2.4v9.2h.5c2.1 0 3.2-1.5 3.2-4.6s-1.1-4.6-3.2-4.6h-.5Z" fill="currentColor"/></svg></span>
          <span className="hidden sm:flex sm:flex-col sm:gap-0.5"><span className="text-[10px] font-medium tracking-[.04em] text-white/80">Alade ADECHI</span><span className="text-[7px] uppercase tracking-[.16em] text-white/35">Ingénieur informatique</span></span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
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
          <AnimatedThemeToggler
            theme={themeReady ? theme : "dark"}
            onThemeChange={setTheme}
            variant="circle"
            className="inline-flex size-9 items-center justify-center text-white/58 transition hover:text-white [&_svg]:size-3.5"
            aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}
            title={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}
          />
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
                  <AnimatedThemeToggler
                    theme={themeReady ? theme : "dark"}
                    onThemeChange={setTheme}
                    variant="circle"
                    className="flex min-h-11 flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-current/[.05] text-[8px] uppercase tracking-[.1em] [&_svg]:size-3.5"
                    aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"}
                    title={theme === "dark" ? "Clair" : "Sombre"}
                  />
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
function Projects() {
  const ref=useRef<HTMLElement>(null); const {scrollYProgress}=useScroll({target:ref,offset:["start start","end end"]}); const x=useTransform(scrollYProgress,[0,1],["0%","-66%"]); const progress=useSpring(scrollYProgress,{stiffness:80,damping:20});
  return <section id="projects" ref={ref} className="theme-dark-surface relative h-[320vh] bg-[#08090a] text-white"><div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden"><div className="mx-auto mb-8 w-full max-w-[1500px] px-5 sm:px-8 lg:px-10"><p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[.24em] text-white/38"><span className="h-px w-7 bg-white/50" />Selected work</p><h2 className="mt-3 text-[clamp(2.2rem,4.8vw,5.6rem)] font-light leading-none tracking-[-.06em]">Des systèmes en mouvement.</h2></div><motion.div style={{x}} className="flex gap-6 pl-5 sm:pl-8 lg:pl-[max(40px,calc((100vw-1500px)/2))]">{projects.map((p)=><article key={p.n} className={`group relative h-[61vh] min-h-[450px] shrink-0 overflow-hidden border border-white/15 bg-[#101214] ${p.n === "01" ? "w-[min(64vw,880px)]" : p.n === "02" ? "w-[min(74vw,980px)]" : "w-[min(60vw,820px)]"}`}><div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(180,180,180,.10),transparent_28%),linear-gradient(135deg,#111517,#08090a)]"/><div className="absolute inset-0 opacity-30 transition-transform duration-[1600ms] group-hover:scale-110"><div className="absolute left-[18%] top-[20%] h-[48%] w-[64%] border border-white/20"/><div className="absolute left-[28%] top-[32%] h-[32%] w-[44%] border border-white/10"/><motion.div className="absolute top-0 h-full w-px bg-white/40" animate={{x:["10%","900%"]}} transition={{duration:4,repeat:Infinity,ease:"linear"}}/></div><div className="absolute inset-x-7 top-7 flex justify-between font-mono text-[8px] uppercase tracking-[.2em] text-white/35 md:inset-x-10 md:top-10"><span>{p.n} / 03</span><span>{p.type}</span></div><div className="absolute bottom-7 left-7 right-7 md:bottom-10 md:left-10 md:right-10"><div className="mb-4 h-px w-10 bg-white/50 transition-all duration-700 group-hover:w-28"/><h3 className="text-[clamp(2.7rem,5vw,5.8rem)] font-light leading-[.85] tracking-[-.07em]">{p.title}</h3><p className="mt-5 max-w-xl text-[12px] leading-5 text-white/45">{p.copy}</p><div className="mt-6 flex items-center justify-between border-t border-white/12 pt-4"><span className="font-mono text-[8px] uppercase tracking-[.18em] text-white/35">{p.mark} / SYSTEM</span><ArrowUpRight className="size-4 text-white/60 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"/></div></div></article>)}</motion.div><div className="mx-auto mt-7 w-full max-w-[1500px] px-5 sm:px-8 lg:px-10"><div className="h-px bg-white/10"><motion.div style={{scaleX:progress}} className="h-full origin-left bg-white/50"/></div></div></div></section>;
}

function Path() {
  const categories = [
    {
      code: "01",
      label: "Parcours académique",
      intro: "La formation et les projets qui ont construit mes bases techniques.",
      items: [
        ["2026", "UCAO-UUC", "Licence · Informatique Industrielle et Maintenance"],
        ["2026", "Projet de fin d'études", "Miroir connecté intelligent · IoT · domotique"],
      ],
    },
    {
      code: "02",
      label: "Activité extra-scolaire",
      intro: "Les engagements et projets qui prolongent la formation par la technologie et l'innovation.",
      items: [
        ["2026", "UCAO-TECH", "Association scientifique · technologie · innovation"],
        ["2026", "Robotique UCAO", "Participation à des projets autour de l'innovation"],
      ],
    },
    {
      code: "03",
      label: "Expérience professionnelle",
      intro: "Les expériences de terrain et les systèmes sur lesquels je travaille aujourd'hui.",
      items: [
        ["2026 · maintenant", "KOBLI IT", "Ingénieur VoIP · architecture, SIP, Yeastar, infrastructures"],
        ["2025", "Port Autonome de Cotonou", "Stage · maintenance électrique et électronique"],
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState(0);
  const current = categories[activeCategory];

  return (
    <section
      id="path"
      className="border-b border-white/10 bg-[#08090a] px-5 py-28 text-white sm:px-8 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 lg:grid-cols-[.32fr_1fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[9px] uppercase tracking-[.24em] text-white/42">
              Parcours
            </p>

            <div className="mt-10 space-y-1">
              {categories.map((category, index) => {
                const active = index === activeCategory;

                return (
                  <div key={category.code} className="py-1">
                    <button
                      type="button"
                      onClick={() => setActiveCategory(index)}
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
                      <span
                        className={active
                          ? "text-[14px] font-normal tracking-[-.02em] text-white"
                          : "text-[13px] font-light tracking-[-.015em] text-white/30 transition-colors group-hover:text-white/60"}
                      >
                        {category.label}
                      </span>
                    </button>

                    <AnimatePresence initial={false} mode="wait">
                      {active && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -4 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -4 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="ml-8 mt-4 max-w-[290px] pb-4">
                            <p className="text-[11px] leading-5 text-white/42">
                              {category.intro}
                            </p>
                            <span className="mt-4 block font-mono text-[8px] uppercase tracking-[.18em] text-white/20">
                              Dossier actif
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[430px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.code}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative">
                  <div className="pointer-events-none absolute bottom-0 left-[11px] top-0 w-px bg-white/10 sm:left-[15px]" />

                  <div>
                    {current.items.map(([date, title, copy], index) => (
                      <article
                        key={date + "-" + title}
                        className="group relative grid grid-cols-[32px_1fr] gap-5 py-7 sm:grid-cols-[40px_1fr] sm:gap-7"
                      >
                        <div className="relative z-10 size-[23px] rounded-full border border-white/15 bg-[#08090a] transition-all duration-500 group-hover:border-white/50 group-hover:bg-white sm:size-[31px]" />

                        <div className="border-t border-white/10 pt-5 transition-transform duration-500 group-hover:translate-x-1 sm:pt-6">
                          <div className="flex flex-wrap items-baseline justify-between gap-4">
                            <h3 className="text-[clamp(1.5rem,2.4vw,2.5rem)] font-light leading-none tracking-[-.05em]">
                              {title}
                            </h3>
                            <span className="font-mono text-[8px] uppercase tracking-[.18em] text-white/35">
                              {date}
                            </span>
                          </div>
                          <p className="mt-4 max-w-2xl text-[12px] leading-5 text-white/45">
                            {copy}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
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
        <Globe className="!inset-auto !right-[2%] !top-1/2 !h-[430px] !w-[430px] !-translate-y-1/2 opacity-55 sm:!right-[1%] sm:!h-[500px] sm:!w-[500px] xl:!right-[2%] xl:!h-[570px] xl:!w-[570px]" />

        <div className="relative z-10 max-w-3xl">
          <p className="font-mono text-[14px] uppercase tracking-[.20em] text-white/55">/ Contact</p>
          <div className="mt-10">
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

          <div id="services" className="scroll-mt-24">
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
  return <div className={`portfolio-shell bg-[#08090a] text-white ${/* Nav controls are persisted; page theme follows the html color scheme. */ ""}`}><Nav/><main><Hero/><Projects/><Path/><Contact/></main></div>;
}
