import { useRef, useState } from "react";
import { ChefHat, Bath, Home } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  price: string;
}

function ServiceCard({ title, description, icon: Icon, price }: ServiceCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative overflow-hidden rounded-2xl bg-card border border-card-border p-8 transition-transform hover:-translate-y-2 duration-500"
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59,130,246,0.15), transparent 40%)`,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-4 bg-background/50 w-fit rounded-xl mb-6">
          <Icon size={32} className="text-primary" />
        </div>
        
        <h3 className="text-2xl font-serif font-bold mb-4 bg-gradient-text bg-gradient-to-r from-white via-primary to-white text-transparent bg-clip-text">
          {title}
        </h3>
        
        <p className="text-muted-foreground font-light mb-8 flex-grow">
          {description}
        </p>
        
        <div className="text-sm font-medium tracking-wider text-muted-foreground uppercase border-t border-border/50 pt-4 mt-auto">
          {price}
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const services = [
    {
      title: "Cocinas de Diseño",
      description: "Espacios culinarios donde la funcionalidad se encuentra con la alta estética. Materiales nobles y electrodomésticos integrados.",
      icon: ChefHat,
      price: "Desde 25.000€"
    },
    {
      title: "Baños de Lujo",
      description: "Santuarios de bienestar privados. Piedra natural, iluminación arquitectónica y grifería de autor para un ritual diario perfecto.",
      icon: Bath,
      price: "Desde 15.000€"
    },
    {
      title: "Reformas Integrales",
      description: "Transformación completa de la vivienda. Rediseño de espacios, optimización de luz natural y acabados inmaculados.",
      icon: Home,
      price: "Proyectos a medida"
    }
  ];

  return (
    <section id="servicios" className="py-32 px-6 md:px-12 bg-background w-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Nuestra Experiencia</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light text-lg">
            Elevamos cada estancia a su máxima expresión. Un enfoque arquitectónico donde el diseño sirve al propósito.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
