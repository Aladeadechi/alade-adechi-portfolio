"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { useRef } from "react";
import { CinematicField } from "@/components/three/cinematic-field";

function Magnetic({ href, children, filled = false }: { href: string; children: React.ReactNode; filled?: boolean }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 24 });
  const sy = useSpring(y, { stiffness: 280, damping: 24 });
  return <motion.div style={{ x: sx, y: sy }} onMouseMove={(e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * .16); y.set((e.clientY - r.top - r.height / 2) * .16);
  }} onMouseLeave={() => { x.set(0); y.set(0); }}>
    <Link href={href} className={`group inline-flex h-10 items-center gap-3 rounded-full border px-4 text-[10px] uppercase tracking-[.14em] transition-all duration-500 ${filled ? "border-white bg-white text-black" : "border-white/25 text-white hover:border-white/60 hover:bg-white/8"}`}>
      {children}<ArrowUpRight className="size-3 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
    </Link>
  </motion.div>;
}

function SignalStage() {
  return <div className="relative aspect-[.86] w-full overflow-hidden border border-white/16 bg-white/[.025]">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(205,155,86,.16),transparent_44%),radial-gradient(ellipse_at_25%_75%,rgba(110,145,165,.12),transparent_42%)]" />
    <motion.div animate={{ x: ["-15%", "105%"], opacity: [0, .8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }} className="absolute top-0 h-full w-[18%] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl" />
    <svg viewBox="0 0 600 700" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <motion.path d="M20 540 C120 460 100 300 220 330 S300 540 380 420 S460 180 580 230" fill="none" stroke="rgba(255,255,255,.48)" strokeWidth="1.4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, delay: .5, ease: "easeInOut" }} />
      <motion.path d="M0 610 C130 560 130 390 250 430 S370 600 440 390 S520 120 600 150" fill="none" stroke="rgba(207,166,104,.58)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.8, delay: .8, ease: "easeInOut" }} />
      <motion.path d="M30 180 C120 250 190 160 270 210 S380 340 460 270 S530 210 590 290" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="1" strokeDasharray="4 10" animate={{ strokeDashoffset: [0, -70] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
      {[{x:220,y:330},{x:380,y:420},{x:460,y:180}].map((p,i) => <motion.circle key={i} cx={p.x} cy={p.y} r="4" fill="white" animate={{ r:[3,7,3], opacity:[.35,1,.35] }} transition={{ duration: 1.8, delay:i*.35, repeat:Infinity }} />)}
    </svg>
    <div className="absolute left-5 top-5 flex items-center gap-3 text-[8px] uppercase tracking-[.22em] text-white/45"><span className="size-1.5 rounded-full bg-[#d4a45f] shadow-[0_0_14px_#d4a45f]" />Live system / 01</div>
    <div className="absolute bottom-5 left-5 right-5">
      <div className="flex items-end justify-between border-b border-white/12 pb-3"><span className="font-mono text-[9px] uppercase tracking-[.16em] text-white/40">Input → Logic → Reality</span><MoveUpRight className="size-4 text-white/60" /></div>
      <div className="mt-3 flex justify-between font-mono text-[8px] uppercase tracking-[.18em] text-white/35"><span>IoT</span><span>AI</span><span>EDGE</span><span>VOIP</span></div>
    </div>
  </div>;
}

export function Hero() {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 55, damping: 24 });
  const y = useSpring(my, { stiffness: 55, damping: 24 });
  const titleX = useTransform(x, [-600, 600], [-3, 3]);
  const titleY = useTransform(y, [-400, 400], [-2, 2]);
  const ref = useRef<HTMLElement>(null);

  return <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-[#070809] text-white" onMouseMove={(e) => { mx.set(e.clientX - window.innerWidth / 2); my.set(e.clientY - window.innerHeight / 2); }}>
    <CinematicField />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,5,6,.72),rgba(4,5,6,.18)_55%,rgba(4,5,6,.34))]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_48%,transparent_0,rgba(0,0,0,.04)_30%,rgba(0,0,0,.34)_100%)]" />
    <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-5 pb-6 pt-[88px] sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute left-5 top-[94px] flex items-center gap-3 text-[8px] uppercase tracking-[.28em] text-white/42 sm:left-8 lg:left-10"><span className="h-px w-7 bg-white/30" /> Creative engineering</div>
      <div className="flex flex-1 items-center py-10 lg:py-14">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1.18fr)_minmax(300px,.62fr)] lg:gap-20">
          <motion.div style={{ x: titleX, y: titleY }}>
            <div className="mb-6 flex items-center gap-3 text-[9px] uppercase tracking-[.2em] text-white/50"><span className="h-px w-8 bg-white/30" /> Alade Adechi · Ingénieur informatique</div>
            <h1 className="max-w-[700px] text-[clamp(2.9rem,5.3vw,5.8rem)] font-light leading-[.87] tracking-[-.07em]">
              <span className="block overflow-hidden"><motion.span initial={{ y:"110%" }} animate={{ y:0 }} transition={{ duration:1, ease:[.16,1,.3,1] }} className="block">Je construis</motion.span></span>
              <span className="ml-[4.5vw] block overflow-hidden text-white/62"><motion.span initial={{ y:"110%" }} animate={{ y:0 }} transition={{ duration:1, delay:.08, ease:[.16,1,.3,1] }} className="block">des systèmes</motion.span></span>
              <span className="ml-[1.5vw] block overflow-hidden"><motion.span initial={{ y:"110%" }} animate={{ y:0 }} transition={{ duration:1, delay:.16, ease:[.16,1,.3,1] }} className="block">qui deviennent réels.</motion.span></span>
            </h1>
            <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:.48, duration:.8 }} className="mt-7 max-w-xl text-[13px] leading-6 text-white/48">Je transforme des idées techniques en expériences, produits et infrastructures qui existent au-delà de l'écran.</motion.p>
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.62, duration:.8 }} className="mt-7 flex flex-wrap gap-2.5"><Magnetic href="/projects" filled>Voir les projets</Magnetic><Magnetic href="/about">Mon parcours</Magnetic></motion.div>
          </motion.div>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.45, duration:.8 }} className="hidden min-w-0 lg:block"><SignalStage /></motion.div>
        </div>
      </div>
      <div className="flex items-end justify-between border-t border-white/12 pt-3 text-[8px] uppercase tracking-[.18em] text-white/38"><div className="flex gap-5"><span>2026</span><span className="hidden sm:block">Cotonou, Bénin</span><span className="hidden sm:block">Software · IoT · Automation · VoIP</span></div><motion.div animate={{ y:[0,4,0], opacity:[.45,1,.45] }} transition={{ duration:1.8, repeat:Infinity }} className="flex items-center gap-2"><ArrowDown className="size-3" /> Scroll to enter</motion.div></div>
    </div>
  </section>;
}
