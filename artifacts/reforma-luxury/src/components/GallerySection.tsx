import { motion } from "framer-motion";

const projects = [
  { img: "/images/gallery-1.png", title: "Cocina Slate", location: "Madrid Centro", className: "col-span-1 row-span-1 md:col-span-2 md:row-span-2" },
  { img: "/images/gallery-2.png", title: "Baño Onyx", location: "Marbella", className: "col-span-1 row-span-1" },
  { img: "/images/gallery-3.png", title: "Salón Zenith", location: "Barcelona", className: "col-span-1 row-span-1" },
  { img: "/images/gallery-4.png", title: "Comedor Aura", location: "Ibiza", className: "col-span-1 row-span-1 md:col-span-2" },
  { img: "/images/gallery-5.png", title: "Isla Pure", location: "Valencia", className: "col-span-1 row-span-1" },
  { img: "/images/gallery-6.png", title: "Suite Nocturne", location: "Mallorca", className: "col-span-1 row-span-1" },
];

export default function GallerySection() {
  return (
    <section id="proyectos" className="py-32 px-6 md:px-12 bg-card w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Portafolio</h2>
          <p className="text-muted-foreground max-w-2xl font-light text-lg">
            Obras maestras residenciales. Cada proyecto es un testimonio de nuestra obsesión por el detalle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[300px] gap-4 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden rounded-2xl group ${project.className} bg-background`}
              whileHover={{ 
                scale: 1.02, 
                rotateY: 2,
                rotateX: -2,
                transition: { type: "spring", stiffness: 300, damping: 20 } 
              }}
            >
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <motion.h4 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  className="text-2xl font-serif font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                >
                  {project.title}
                </motion.h4>
                <motion.p 
                  className="text-white/70 font-light tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75"
                >
                  {project.location}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
