import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const text = "Arquitectura de Lujo";

export default function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotateX: 90,
    },
  };

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-background text-foreground flex flex-col justify-center items-center">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/70 backdrop-blur-md border-b border-border/50 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="text-xl font-serif font-bold tracking-wider uppercase">
            Estudio V
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
            <a href="#servicios" className="hover:text-primary transition-colors">Servicios</a>
            <a href="#proyectos" className="hover:text-primary transition-colors">Proyectos</a>
            <a href="#contacto" className="hover:text-primary transition-colors">Contacto</a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} data-testid="button-menu-toggle">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center space-y-8 text-2xl font-serif">
          <a href="#servicios" onClick={() => setIsMenuOpen(false)}>Servicios</a>
          <a href="#proyectos" onClick={() => setIsMenuOpen(false)}>Proyectos</a>
          <a href="#contacto" onClick={() => setIsMenuOpen(false)}>Contacto</a>
        </div>
      )}

      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full backdrop-blur-[100px] z-10" />
        <motion.div
          className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[80px]"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[100px]"
          animate={{
            x: [0, -150, 50, 0],
            y: [0, 100, -100, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          className="flex flex-wrap justify-center overflow-hidden mb-6"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={child}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight"
              style={{ display: "inline-block", paddingRight: letter === " " ? "0.3em" : "0" }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-lg md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto mb-12"
        >
          Transformamos espacios en experiencias inmersivas. Perfección en cada detalle, textura y acabado.
        </motion.p>

        <motion.a
          href="#contacto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="relative overflow-hidden group bg-white text-black px-8 py-4 rounded-full font-medium text-lg tracking-wide transition-transform hover:scale-105"
          data-testid="link-hero-cta"
        >
          <span className="relative z-10">Inicia tu Proyecto</span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent group-hover:animate-[glare_1s_ease-in-out_infinite]" />
          <style>{`
            @keyframes glare {
              100% { transform: translateX(100%); }
            }
          `}</style>
        </motion.a>
      </div>
    </section>
  );
}
