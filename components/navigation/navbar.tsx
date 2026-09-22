"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { ArrowUpRight, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Accueil" }, { href: "/about", label: "À propos" },
  { href: "/projects", label: "Projets" }, { href: "/experience", label: "Parcours" },
  { href: "/skills", label: "Expertise" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const scroll = useSpring(scrollY, { stiffness: 160, damping: 28 });
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scroll, "change", (v) => setScrolled(v > 70));

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .8, delay: .2 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8"
    >
      <motion.nav
        animate={{
          backgroundColor: scrolled ? "rgba(250,250,248,.92)" : "rgba(8,9,10,.08)",
          color: scrolled ? "#111" : "#fff",
          borderColor: scrolled ? "rgba(0,0,0,.08)" : "rgba(255,255,255,.18)",
          boxShadow: scrolled ? "0 18px 50px -35px rgba(0,0,0,.35)" : "none"
        }}
        transition={{duration:.35}}
        className="mx-auto flex h-[48px] max-w-[1500px] items-center justify-between border px-3 pl-4 backdrop-blur-xl"
      >
        <Link href="/" className="group flex items-center gap-3" aria-label="Alade Adechi — accueil">
          <span className="text-[12px] font-semibold tracking-[-.02em]">AA</span>
          <span className="hidden text-[11px] uppercase tracking-[.15em] sm:block">Alade Adechi</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map(link => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} onMouseEnter={()=>setHovered(link.href)} onMouseLeave={()=>setHovered(null)}
                className={cn("relative px-3 py-2 text-[10px] uppercase tracking-[.1em] transition-opacity", active ? "opacity-100" : "opacity-55 hover:opacity-100")}>
                {active && <motion.span layoutId="nav-active" className="absolute inset-0 -z-10 rounded-full bg-current/10" />}
                {hovered === link.href && !active && <motion.span layoutId="nav-line" className="absolute inset-x-3 bottom-0 h-px bg-current/60" />}
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <span className="text-[9px] uppercase tracking-[.16em] opacity-45">Disponible</span>
          <Link href="/contact" className={cn(buttonVariants({size:"sm"}), "h-8 rounded-full px-3 text-[10px] uppercase tracking-[.08em]")}>Contact <ArrowUpRight className="size-3" /></Link>
        </div>

        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="rounded-full md:hidden" aria-label="Ouvrir le menu" />}><Menu className="size-4" /></SheetTrigger>
          <SheetContent side="right" className="w-[min(88vw,390px)] border-l border-black/10 bg-white/96 backdrop-blur-2xl">
            <SheetHeader><SheetTitle className="text-left tracking-tight">Navigation</SheetTitle></SheetHeader>
            <div className="mt-8 flex flex-col gap-1 px-4">
              {links.map(link => {
                const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return <Link key={link.href} href={link.href} className={cn("rounded-xl px-4 py-3.5 text-base text-muted-foreground hover:bg-black/[.04] hover:text-foreground", active && "bg-black/[.05] font-medium text-foreground")}>{link.label}</Link>;
              })}
              <Link href="/contact" className={cn(buttonVariants({size:"lg"}), "mt-5 h-12 rounded-xl")}>Parlons d'un projet<ArrowUpRight className="size-4" /></Link>
            </div>
          </SheetContent>
        </Sheet>
      </motion.nav>
    </motion.header>
  );
}
