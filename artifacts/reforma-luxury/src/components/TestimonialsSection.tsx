import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    quote: "La atención al detalle es asombrosa. Transformaron nuestro apartamento en una verdadera obra de arte arquitectónica.",
    name: "Elena M.",
    project: "Reforma Integral · Vitoria",
    index: "01",
  },
  {
    quote: "Profesionalismo de principio a fin. Materiales de una calidad exquisita y un diseño que supera nuestras expectativas diarias.",
    name: "Javier R.",
    project: "Cocina de Diseño · Bilbao",
    index: "02",
  },
  {
    quote: "Entendieron perfectamente nuestra visión y la ejecutaron con precisión milimétrica. El resultado es sencillamente perfecto.",
    name: "Sofía V.",
    project: "Baño de Lujo · Vitoria",
    index: "03",
  },
  {
    quote: "Un equipo que no hace concesiones con la calidad. La inversión ha valido cada céntimo. Resultado impecable.",
    name: "Carlos T.",
    project: "Reforma Integral · Álava",
    index: "04",
  },
];

const DURATION = 5000;

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(Date.now());

  const goTo = (i: number) => {
    setCurrent(i);
    setProgress(0);
    startRef.current = Date.now();
  };

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= DURATION) {
        setCurrent((c) => (c + 1) % testimonials.length);
        setProgress(0);
        startRef.current = Date.now();
      }
    };
    intervalRef.current = setInterval(tick, 30);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const t = testimonials[current];

  return (
    <section className="relative py-40 px-6 md:px-12 bg-background w-full overflow-hidden">

      {/* Giant decorative index number */}
      <div
        className="absolute right-10 top-1/2 -translate-y-1/2 font-serif font-bold text-white/[0.03] pointer-events-none select-none leading-none"
        style={{ fontSize: "clamp(12rem, 30vw, 26rem)" }}
        aria-hidden
      >
        {t.index}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-20">
          <div className="h-px w-10 bg-slate-600" />
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Testimonios</span>
        </div>

        {/* Quote */}
        <div className="min-h-[220px] flex items-start mb-16">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-white leading-[1.2] tracking-tight"
            >
              &ldquo;{t.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Author */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`author-${current}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center gap-5 mb-16"
          >
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center text-white text-sm font-medium shrink-0"
            >
              {t.name.charAt(0)}
            </div>
            <div>
              <p className="text-white font-medium text-sm tracking-wide">{t.name}</p>
              <p className="text-slate-500 text-xs tracking-widest uppercase mt-0.5">{t.project}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress tabs */}
        <div className="flex items-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              data-testid={`button-testimonial-${i}`}
              className="group relative h-px flex-1 bg-white/10 overflow-hidden cursor-pointer"
              aria-label={`Ver testimonio ${i + 1}`}
            >
              {i === current && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white"
                  style={{ width: `${progress}%` }}
                />
              )}
              {i < current && (
                <div className="absolute inset-0 bg-white/40" />
              )}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-200" />
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="flex justify-between mt-4 text-[11px] tracking-widest text-slate-600 uppercase">
          <span>{String(current + 1).padStart(2, "0")}</span>
          <span>{String(testimonials.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
