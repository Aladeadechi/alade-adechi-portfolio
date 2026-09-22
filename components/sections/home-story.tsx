"use client";

import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const projects = [
  { n:"01", title:"Smart Mirror", meta:"IoT · Edge · Computer Vision", text:"Un miroir connecté qui transforme une surface physique en interface vivante : informations, domotique et interaction naturelle.", kind:"mirror" },
  { n:"02", title:"Benin Legal AI", meta:"RAG · IA · OHADA", text:"Un assistant juridique conçu autour des sources : recherche documentaire, récupération de contexte et réponses traçables.", kind:"legal" },
  { n:"03", title:"VoIP Systems", meta:"SIP · Yeastar · Infrastructure", text:"Des architectures de communication pensées depuis le besoin client jusqu'à l'intégration, la sécurité et le déploiement.", kind:"voip" },
];

function SceneVisual({ kind }: { kind:string }) {
  if (kind === "mirror") return <div className="absolute inset-0 overflow-hidden bg-[#0d1112]">
    <motion.div animate={{ y:[0,-12,0] }} transition={{ duration:6, repeat:Infinity, ease:"easeInOut" }} className="absolute inset-[11%] border border-white/18 bg-[#121819] shadow-[0_30px_100px_rgba(0,0,0,.5)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_25%,rgba(218,172,103,.22),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.06),transparent_42%)]" />
      <div className="absolute left-[8%] top-[9%] font-mono text-[9px] uppercase tracking-[.2em] text-white/40">Cotonou / 07:42</div>
      <div className="absolute right-[8%] top-[9%] text-[9px] text-white/35">24°</div>
      <div className="absolute bottom-[9%] left-[8%] right-[8%] border-t border-white/10 pt-3 font-mono text-[8px] uppercase tracking-[.16em] text-white/35"><span>HOME</span><span className="ml-8">LIGHTS 04</span><span className="ml-8">VOICE READY</span></div>
      <motion.div animate={{ x:[0,140,0], opacity:[.15,.65,.15] }} transition={{ duration:4, repeat:Infinity }} className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/8 to-transparent blur-lg" />
    </motion.div>
  </div>;
  if (kind === "legal") return <div className="absolute inset-0 overflow-hidden bg-[#11100e]">
    <motion.div initial={{ rotate:-3 }} animate={{ rotate:[-3,-1,-3], y:[0,-8,0] }} transition={{ duration:7, repeat:Infinity }} className="absolute left-[15%] top-[12%] h-[76%] w-[70%] bg-[#e9e4d8] p-[8%] text-[#171614] shadow-[0_35px_90px_rgba(0,0,0,.55)]">
      <div className="font-mono text-[8px] uppercase tracking-[.18em] opacity-45">OHADA · source</div><div className="mt-8 h-2 w-2/3 bg-black/75" /><div className="mt-3 h-1 w-full bg-black/15" /><div className="mt-2 h-1 w-5/6 bg-black/15" /><div className="mt-10 space-y-2"><div className="h-1 w-full bg-black/12" /><div className="h-1 w-11/12 bg-black/12" /><div className="h-1 w-4/5 bg-black/12" /><div className="h-1 w-full bg-black/12" /></div>
      <motion.div animate={{ y:[0,180,0] }} transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }} className="absolute left-0 right-0 top-0 h-px bg-[#a86f2c] shadow-[0_0_18px_rgba(168,111,44,.65)]" />
    </motion.div>
  </div>;
  return <div className="absolute inset-0 overflow-hidden bg-[#0a0e12]">
    <div className="absolute inset-x-[10%] top-1/2 h-px bg-white/10" />
    <motion.div animate={{ x:["-10%","110%"] }} transition={{ duration:3.2, repeat:Infinity, ease:"linear" }} className="absolute left-0 top-1/2 h-px w-[24%] bg-gradient-to-r from-transparent via-[#d0a260] to-transparent shadow-[0_0_18px_rgba(208,162,96,.8)]" />
    <svg viewBox="0 0 900 420" className="absolute inset-[8%] h-[84%] w-[84%]" preserveAspectRatio="none"><motion.path d="M0 230 C90 220 90 90 180 120 S280 330 370 250 S470 50 560 170 S670 340 760 220 S830 130 900 160" fill="none" stroke="rgba(255,255,255,.52)" strokeWidth="2" initial={{ pathLength:0 }} animate={{ pathLength:1 }} transition={{ duration:2.5, ease:"easeInOut" }} /><motion.path d="M0 230 C90 220 90 90 180 120 S280 330 370 250 S470 50 560 170 S670 340 760 220 S830 130 900 160" fill="none" stroke="rgba(208,162,96,.75)" strokeWidth="1" strokeDasharray="6 14" animate={{ strokeDashoffset:[0,-100] }} transition={{ duration:2.8, repeat:Infinity, ease:"linear" }} /></svg>
    <div className="absolute bottom-[12%] left-[10%] right-[10%] flex justify-between font-mono text-[8px] uppercase tracking-[.18em] text-white/35"><span>SIP / UDP</span><span>PBX ONLINE</span><span>LATENCY 12ms</span></div>
  </div>;
}

function ProjectScene({ project }: { project: typeof projects[number] }) {
  return <article className="group relative h-[72vh] min-h-[520px] w-[min(78vw,1040px)] shrink-0 overflow-hidden border border-white/14 bg-[#101214]">
    <SceneVisual kind={project.kind} />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/15" />
    <div className="absolute left-7 top-7 right-7 flex justify-between font-mono text-[8px] uppercase tracking-[.2em] text-white/40 md:left-10 md:right-10 md:top-10"><span>{project.n} / 03</span><span>Case study</span></div>
    <div className="absolute bottom-7 left-7 right-7 md:bottom-10 md:left-10 md:right-10">
      <div className="mb-4 h-px w-12 bg-white/45 transition-all duration-700 group-hover:w-28" />
      <h2 className="max-w-3xl text-[clamp(2.8rem,5.5vw,6rem)] font-light leading-[.86] tracking-[-.07em]">{project.title}</h2>
      <p className="mt-4 max-w-xl text-[12px] leading-5 text-white/55 md:text-[13px]">{project.text}</p>
      <div className="mt-6 flex items-center justify-between border-t border-white/12 pt-4"><span className="font-mono text-[8px] uppercase tracking-[.16em] text-white/40">{project.meta}</span><Link href="/projects" className="flex size-10 items-center justify-center border border-white/20 transition-all duration-500 group-hover:bg-white group-hover:text-black"><ArrowUpRight className="size-4" /></Link></div>
    </div>
  </article>;
}

export function HomeStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start start","end end"] });
  const progress = useSpring(scrollYProgress, { stiffness:70, damping:20 });
  const x = useTransform(progress, [0,1], ["0%","-69%"]);
  const line = useTransform(progress, [0,1], ["0%","100%"]);

  return <main className="bg-[#08090a] text-white">
    <section id="story" ref={ref} className="relative h-[330vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-20">
        <div className="mx-auto mb-7 flex w-full max-w-[1500px] items-end justify-between px-5 sm:px-8 lg:px-10"><div><p className="mb-2 font-mono text-[8px] uppercase tracking-[.25em] text-white/35">01 / Selected work</p><h2 className="text-[clamp(2.2rem,4.2vw,4.8rem)] font-light leading-none tracking-[-.06em]">Des systèmes <span className="text-white/35">en mouvement.</span></h2></div><span className="hidden font-mono text-[8px] uppercase tracking-[.18em] text-white/30 md:block">Scroll / traverse</span></div>
        <motion.div style={{ x }} className="flex gap-5 pl-5 sm:pl-8 lg:pl-[max(40px,calc((100vw-1500px)/2))]">{projects.map((p)=><ProjectScene key={p.n} project={p} />)}</motion.div>
        <div className="mx-auto mt-7 flex w-full max-w-[1500px] items-center gap-4 px-5 sm:px-8 lg:px-10"><div className="h-px flex-1 bg-white/10"><motion.div style={{ width:line }} className="h-full origin-left bg-white/55" /></div><span className="font-mono text-[8px] uppercase tracking-[.16em] text-white/30">03 projets</span></div>
      </div>
    </section>
    <section className="border-y border-white/10 px-5 py-32 sm:px-8 lg:px-10"><div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[.7fr_1.3fr]"><p className="font-mono text-[8px] uppercase tracking-[.24em] text-white/30">02 / Philosophy</p><div><p className="max-w-5xl text-[clamp(2rem,4.3vw,5rem)] font-light leading-[.94] tracking-[-.06em]">Je ne veux pas seulement montrer du code. <span className="text-white/35">Je veux montrer ce qu&apos;il provoque dans le monde réel.</span></p><div className="mt-12 grid gap-6 border-t border-white/10 pt-6 text-[12px] text-white/48 md:grid-cols-3"><div><span className="font-mono text-[9px] text-white/70">01</span><p className="mt-3">Concevoir l&apos;expérience</p></div><div><span className="font-mono text-[9px] text-white/70">02</span><p className="mt-3">Construire le système</p></div><div><span className="font-mono text-[9px] text-white/70">03</span><p className="mt-3">Le rendre fiable</p></div></div></div></div></section>
  </main>;
}
