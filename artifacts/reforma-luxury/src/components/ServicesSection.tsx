import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    index: "01",
    title: "Cocinas de Diseño",
    tag: "Gastronomía & Estética",
    description:
      "Espacios culinarios donde la funcionalidad se encuentra con la alta estética. Encimeras de piedra natural, electrodomésticos integrados de alta gama y cabinetería a medida ejecutada con precisión milimétrica.",
    price: "Desde 25.000 €",
    detail: "Porcelanosa · Silestone · Bulthaup · Gaggenau",
  },
  {
    index: "02",
    title: "Baños de Lujo",
    tag: "Bienestar & Ritual",
    description:
      "Santuarios de bienestar privados. Piedra natural, iluminación arquitectónica indirecta y grifería de autor que convierte cada mañana en un ritual de precisión y serenidad.",
    price: "Desde 15.000 €",
    detail: "Hansgrohe · Laufen · Dornbracht · Duravit",
  },
  {
    index: "03",
    title: "Reformas Integrales",
    tag: "Transformación Total",
    description:
      "Rediseño completo de la vivienda: redistribución de espacios, optimización de luz natural, instalaciones de última generación y acabados inmaculados. Del plano a la llave.",
    price: "Proyectos a medida",
    detail: "Consultoría · Arquitectura · Interiorismo · Gestión",
  },
];

function ServiceRow({ service, isOpen, onToggle }: {
  service: typeof services[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className="border-b border-white/[0.08] cursor-pointer group"
      onClick={onToggle}
      data-testid={`service-row-${service.index}`}
    >
      {/* Main row */}
      <div className="flex items-center gap-6 py-7 md:py-8">
        {/* Index */}
        <span className="text-xs tracking-[0.25em] text-slate-600 font-mono w-8 shrink-0">
          {service.index}
        </span>

        {/* Title */}
        <motion.h3
          className="flex-1 text-2xl md:text-3xl lg:text-4xl font-serif font-medium tracking-tight transition-colors duration-300"
          animate={{ color: isOpen ? "#ffffff" : "rgba(255,255,255,0.7)" }}
        >
          {service.title}
        </motion.h3>

        {/* Tag — visible on desktop when closed */}
        <span
          className={`hidden lg:block text-xs tracking-[0.2em] uppercase text-slate-500 transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
        >
          {service.tag}
        </span>

        {/* Arrow */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-white/30 transition-colors duration-300"
        >
          <ArrowUpRight size={15} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
        </motion.div>
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 pl-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
              {/* Description */}
              <p className="md:col-span-2 text-slate-400 font-light text-base leading-relaxed">
                {service.description}
              </p>

              {/* Price + materials */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-600 mb-1">Inversión</p>
                  <p className="text-white font-medium text-lg">{service.price}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-600 mb-2">Marcas</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{service.detail}</p>
                </div>
                <a
                  href="#contacto"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-200 group/cta"
                >
                  Solicitar info
                  <ArrowUpRight size={12} className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="servicios" className="py-32 px-6 md:px-16 bg-background w-full">
      <div className="max-w-6xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-8 bg-slate-600" />
              <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Servicios</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
              Nuestra<br />Experiencia
            </h2>
          </div>
          <p className="text-slate-500 font-light text-base max-w-xs leading-relaxed md:text-right">
            Un enfoque arquitectónico donde el diseño sirve al propósito y cada detalle tiene intención.
          </p>
        </div>

        {/* Top border */}
        <div className="border-t border-white/[0.08]" />

        {/* Service rows */}
        {services.map((service, i) => (
          <ServiceRow
            key={i}
            service={service}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
