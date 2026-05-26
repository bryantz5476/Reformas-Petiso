import { Instagram, Linkedin } from "lucide-react";
import { SiHouzz } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-background py-12 px-6 md:px-12 border-t border-border/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-2xl font-serif font-bold tracking-wider uppercase text-white">
          Reformas Petiso
        </div>
        
        <div className="flex gap-8 text-sm font-medium tracking-widest text-muted-foreground uppercase">
          <a href="#servicios" className="hover:text-primary transition-colors">Servicios</a>
          <a href="#proyectos" className="hover:text-primary transition-colors">Proyectos</a>
          <a href="#contacto" className="hover:text-primary transition-colors">Contacto</a>
        </div>
        
        <div className="flex gap-6 text-muted-foreground">
          <a href="#" className="hover:text-white transition-colors" data-testid="link-instagram">
            <Instagram size={24} />
          </a>
          <a href="#" className="hover:text-white transition-colors" data-testid="link-houzz">
            <SiHouzz size={24} />
          </a>
          <a href="#" className="hover:text-white transition-colors" data-testid="link-linkedin">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground/50">
        <p>&copy; {new Date().getFullYear()} Reformas Petiso. Todos los derechos reservados.</p>
        <p className="mt-2 md:mt-0">Diseñado con precisión.</p>
      </div>
    </footer>
  );
}
