import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  { img: "/images/gallery-1.png", title: "Cocina Slate",    location: "Vitoria-Gasteiz", className: "col-span-1 row-span-1 md:col-span-2 md:row-span-2" },
  { img: "/images/gallery-2.png", title: "Baño Onyx",       location: "Bilbao",          className: "col-span-1 row-span-1" },
  { img: "/images/gallery-3.png", title: "Salón Zenith",    location: "Vitoria",         className: "col-span-1 row-span-1" },
  { img: "/images/gallery-4.png", title: "Comedor Aura",    location: "Álava",           className: "col-span-1 row-span-1 md:col-span-2" },
  { img: "/images/gallery-5.png", title: "Cocina Pure",     location: "Bilbao",          className: "col-span-1 row-span-1" },
  { img: "/images/gallery-6.png", title: "Suite Nocturne",  location: "Vitoria",         className: "col-span-1 row-span-1" },
];

function Lightbox({ index, onClose, onPrev, onNext }: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const project = projects[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Imagen */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-contain rounded-xl max-h-[75vh]"
          draggable={false}
        />

        {/* Info */}
        <div className="mt-4 text-center">
          <p className="text-white font-serif text-xl font-semibold">{project.title}</p>
          <p className="text-white/50 text-sm tracking-widest uppercase mt-1">{project.location}</p>
        </div>
      </motion.div>

      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
        aria-label="Cerrar"
      >
        <X size={22} />
      </button>

      {/* Anterior */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft size={26} />
      </button>

      {/* Siguiente */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight size={26} />
      </button>

      {/* Contador */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {projects.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/30"}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);

  const handlePrev = useCallback(() =>
    setSelected(i => i !== null ? (i - 1 + projects.length) % projects.length : null), []);
  const handleNext = useCallback(() =>
    setSelected(i => i !== null ? (i + 1) % projects.length : null), []);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section id="proyectos" className="py-32 px-6 md:px-12 bg-card w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Portafolio</h2>
          <p className="text-muted-foreground max-w-2xl font-light text-lg">
            Obras maestras residenciales. Cada proyecto es un testimonio de nuestra obsesión por el detalle.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[300px] gap-3 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${project.className} bg-background`}
              onClick={() => setSelected(i)}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={project.img}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay hover desktop + siempre visible en móvil al tocar */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 md:p-8">
                <h4 className="text-lg md:text-2xl font-serif font-bold text-white mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {project.title}
                </h4>
                <p className="text-white/70 text-sm font-light tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {project.location}
                </p>
              </div>

              {/* Icono lupa — siempre visible en móvil */}
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-1.5 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <Lightbox
            index={selected}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
