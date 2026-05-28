import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    index: "01",
    title: "Cocinas de Diseño",
    subtitle: "Gastronomía & Estética",
    description:
      "Espacios culinarios donde la funcionalidad se funde con la alta estética. Encimeras de piedra natural, cabinetería a medida y electrodomésticos de alta gama perfectamente integrados.",
    brands: ["Encimeras", "Azulejos", "Muebles a Medida", "Electrodomésticos"],
    image: "/images/gallery-1.png",
  },
  {
    index: "02",
    title: "Baños de Lujo",
    subtitle: "Bienestar & Ritual",
    description:
      "Santuarios de bienestar privados. Piedra natural, iluminación arquitectónica indirecta y grifería de autor que convierte cada mañana en un ritual de precisión y serenidad.",
    brands: ["Sanitarios", "Grifería", "Revestimientos", "Iluminación"],
    image: "/images/gallery-2.png",
  },
  {
    index: "03",
    title: "Reformas Integrales",
    subtitle: "Transformación Total",
    description:
      "Rediseño completo del hogar. Redistribución de espacios, optimización de luz natural, instalaciones de nueva generación y acabados inmaculados. Del plano a la llave en manos.",
    brands: ["Arquitectura", "Interiorismo", "Gestión", "Llave en mano"],
    image: "/images/gallery-3.png",
  },
  {
    index: "04",
    title: "Fontanería",
    subtitle: "Instalaciones & Precisión",
    description:
      "Instalación, reparación y renovación completa de redes de agua. Grifería de alta gama, sistemas de calefacción, tuberías y saneamiento ejecutados con la máxima precisión y garantía.",
    brands: ["Grifería", "Tuberías", "Calefacción", "Saneamiento"],
    image: "/images/fontaneria.jpg",
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="servicios" className="bg-background w-full py-32 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-8 bg-slate-600" />
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Servicios</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-20 leading-tight">
          Nuestra Experiencia
        </h2>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-white/[0.07] rounded-3xl overflow-hidden">

          {/* LEFT — service tabs */}
          <div className="lg:col-span-2 flex flex-col border-r border-white/[0.07]">
            {services.map((s, i) => {
              const isActive = active === i;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  data-testid={`service-tab-${i}`}
                  className={`relative text-left px-8 py-8 border-b border-white/[0.07] last:border-b-0 transition-colors duration-300 group ${
                    isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-white"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={`text-[10px] tracking-[0.25em] uppercase font-mono mb-3 transition-colors duration-200 ${isActive ? "text-slate-400" : "text-slate-600"}`}>
                        {s.index}
                      </p>
                      <h3 className={`text-xl md:text-2xl font-serif font-medium leading-tight transition-colors duration-200 ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}>
                        {s.title}
                      </h3>
                      <p className={`text-xs mt-2 tracking-wide transition-colors duration-200 ${isActive ? "text-slate-400" : "text-slate-600"}`}>
                        {s.subtitle}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className={`shrink-0 mt-1 transition-all duration-200 ${isActive ? "text-white opacity-100" : "text-slate-600 opacity-0 group-hover:opacity-100"}`}
                    />
                  </div>
                </button>
              );
            })}

            {/* Bottom CTA */}
            <div className="mt-auto px-8 py-8 border-t border-white/[0.07]">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors duration-200 group"
                data-testid="link-services-cta"
              >
                Solicitar presupuesto
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>
          </div>

          {/* RIGHT — content panel */}
          <div className="lg:col-span-3 relative overflow-hidden min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col"
              >
                {/* Image top half */}
                <div className="relative flex-1 overflow-hidden">
                  <motion.img
                    src={current.image}
                    alt={current.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ scale: 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d16] via-[#080d16]/20 to-transparent" />


                </div>

                {/* Text bottom */}
                <div className="p-8 md:p-10 bg-[#080d16]">
                  <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed mb-7">
                    {current.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {current.brands.map((brand, i) => (
                      <span
                        key={i}
                        className="text-[10px] uppercase tracking-[0.2em] text-slate-500 border border-white/[0.08] rounded-full px-3 py-1"
                      >
                        {brand}
                      </span>
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
