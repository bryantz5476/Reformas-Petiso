import { Instagram, Linkedin, Mail } from "lucide-react";
import { SiHouzz } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-background py-16 px-6 md:px-12 border-t border-border/30">
      <div className="max-w-7xl mx-auto">

        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-14">

          {/* Brand + contact */}
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="text-2xl font-serif font-bold tracking-wider uppercase text-white">
              Reformas Petizo
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Arquitectura de interiores de lujo en Vitoria‑Gasteiz y Bilbao.
            </p>
            <a
              href="mailto:bryanzevallospersonal@gmail.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors duration-200 mt-1"
            >
              <Mail size={14} className="shrink-0" />
              bryanzevallospersonal@gmail.com
            </a>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground/50 font-semibold mb-1">
              Navegación
            </p>
            <a href="#inicio"    className="text-sm text-muted-foreground hover:text-white transition-colors duration-200">Inicio</a>
            <a href="#servicios" className="text-sm text-muted-foreground hover:text-white transition-colors duration-200">Servicios</a>
            <a href="#proyectos" className="text-sm text-muted-foreground hover:text-white transition-colors duration-200">Proyectos</a>
            <a href="#contacto"  className="text-sm text-muted-foreground hover:text-white transition-colors duration-200">Contacto</a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground/50 font-semibold mb-1">
              Síguenos
            </p>
            <div className="flex gap-5 text-muted-foreground">
              <a href="#" aria-label="Instagram" className="hover:text-white transition-colors duration-200" data-testid="link-instagram">
                <Instagram size={22} />
              </a>
              <a href="#" aria-label="Houzz" className="hover:text-white transition-colors duration-200" data-testid="link-houzz">
                <SiHouzz size={22} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors duration-200" data-testid="link-linkedin">
                <Linkedin size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground/50">
          <p>&copy; {new Date().getFullYear()} Reformas Petizo. Todos los derechos reservados.</p>
          <p>
            Desarrollado por{" "}
            <span className="text-muted-foreground/80 font-semibold tracking-wide">Clip Code</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
