import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

function StatCounter({ end, label, suffix = "+" }: { end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const controls = animate(0, end, {
            duration: 2,
            ease: "easeOut",
            onUpdate: (v) => setCount(Math.floor(v)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col">
      <span className="text-3xl md:text-4xl font-serif font-bold text-white tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-xs uppercase tracking-[0.2em] text-slate-400 mt-1">{label}</span>
    </div>
  );
}

const GlareButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
  };

  return (
    <motion.a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative overflow-hidden inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-medium text-sm tracking-widest uppercase rounded-full cursor-pointer"
      data-testid="link-hero-cta"
      style={{ position: "relative" }}
    >
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <ArrowRight size={16} />
      </span>
      {hovered && (
        <motion.div
          className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none"
          style={{ left: x }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}
    </motion.a>
  );
};

export default function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, 80]);
  const imageScale = useTransform(scrollY, [0, 600], [1, 1.08]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const lineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { scaleX: 1, transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 } },
  };

  const wipeVariants = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: (delay: number) => ({
      clipPath: "inset(0 0% 0 0)",
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay },
    }),
  };

  const imageReveal = {
    hidden: { clipPath: "inset(100% 0 0 0)" },
    visible: {
      clipPath: "inset(0% 0 0 0)",
      transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#060b14] text-foreground flex flex-col"
    >
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 border-b transition-[background,backdrop-filter,padding,border-color] duration-500 ${
          isScrolled
            ? "bg-[#060b14]/90 backdrop-blur-xl border-white/[0.07] py-4"
            : "bg-transparent backdrop-blur-none border-transparent py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="text-xs font-sans font-medium tracking-[0.18em] uppercase text-white/90"
          >
            Reformas Petiso
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="hidden md:flex items-center space-x-10 text-xs font-medium tracking-[0.2em] uppercase text-slate-300"
          >
            <a href="#servicios" className="hover:text-white transition-colors duration-200">Servicios</a>
            <a href="#proyectos" className="hover:text-white transition-colors duration-200">Proyectos</a>
            <a href="#contacto" className="hover:text-white transition-colors duration-200">Contacto</a>
          </motion.div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-menu-toggle"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-[#060b14]/98 backdrop-blur-sm flex flex-col items-center justify-center space-y-10 text-2xl font-serif text-white"
        >
          <a href="#servicios" onClick={() => setIsMenuOpen(false)}>Servicios</a>
          <a href="#proyectos" onClick={() => setIsMenuOpen(false)}>Proyectos</a>
          <a href="#contacto" onClick={() => setIsMenuOpen(false)}>Contacto</a>
        </motion.div>
      )}

      {/* Main layout: split screen */}
      <div className="flex flex-col md:flex-row min-h-[100dvh]">

        {/* LEFT PANEL */}
        <div className="relative z-10 flex flex-col justify-end pb-16 px-6 md:px-24 pt-28 md:pt-0 w-full md:w-[55%] bg-[#060b14]">

          {/* Decorative oversized background label */}
          <div
            className="absolute top-[50%] left-8 md:left-14 -translate-y-1/2 text-[clamp(5rem,15vw,13rem)] font-serif font-bold text-white/[0.03] pointer-events-none select-none leading-none"
            aria-hidden
          >
            REFORMA
          </div>

          {/* Accent line */}
          <div className="mb-12">
            <motion.div
              className="h-px bg-gradient-to-r from-slate-400 to-transparent w-32"
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            />
          </div>

          {/* Pre-label */}
          <motion.p
            custom={0.4}
            variants={wipeVariants}
            initial="hidden"
            animate="visible"
            className="text-xs uppercase tracking-[0.2em] md:tracking-[0.35em] text-slate-400 mb-6 whitespace-nowrap"
          >
            Arquitectura de Interiores
          </motion.p>

          {/* Main headline */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              custom={0.55}
              variants={wipeVariants}
              initial="hidden"
              animate="visible"
              className="text-[clamp(3.2rem,7vw,6rem)] font-serif font-bold text-white leading-[1.05] tracking-tight"
            >
              Espacios
            </motion.h1>
          </div>
          <div className="mb-10">
            <motion.h1
              custom={0.75}
              variants={wipeVariants}
              initial="hidden"
              animate="visible"
              className="text-[clamp(3.2rem,7vw,6rem)] font-serif font-bold leading-[1.05] tracking-tight"
              style={{
                background: "linear-gradient(135deg, #c8d4e8 0%, #7a9cc4 40%, #e2e8f0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Singulares.
            </motion.h1>
          </div>

          {/* Subline */}
          <motion.p
            custom={1}
            variants={wipeVariants}
            initial="hidden"
            animate="visible"
            className="text-slate-400 font-light text-base md:text-lg max-w-md leading-relaxed mb-14"
          >
            Transformamos cada espacio en una experiencia. Perfección en cada
            material, textura y acabado desde la primera reunión hasta la entrega.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
            className="mb-20"
          >
            <GlareButton href="#contacto">Inicia tu Proyecto</GlareButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8"
          >
            <StatCounter end={15} label="Años" />
            <StatCounter end={320} label="Proyectos" />
            <StatCounter end={100} label="Satisfacción" suffix="%" />
          </motion.div>
        </div>

        {/* RIGHT PANEL — image */}
        <div className="relative w-full md:w-[45%] min-h-[50vh] md:min-h-[100dvh] overflow-hidden">
          <motion.div
            variants={imageReveal}
            initial="hidden"
            animate="visible"
            className="absolute inset-0"
          >
            <motion.img
              src="/images/gallery-1.png"
              alt="Proyecto de reforma de lujo"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ y: imageY, scale: imageScale }}
            />
            {/* Dark gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#060b14] via-transparent to-transparent md:via-[#060b14]/10" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#060b14]/60 to-transparent" />
          </motion.div>

          {/* Floating location pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="absolute bottom-10 left-6 md:left-8 z-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 text-xs tracking-[0.2em] uppercase text-slate-300"
          >
            Vitoria · Bilbao · Álava
          </motion.div>
        </div>
      </div>

    </section>
  );
}
