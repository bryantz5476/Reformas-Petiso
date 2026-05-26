import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";
import { useCallback } from "react";

const testimonials = [
  {
    name: "Elena M.",
    quote: "La atención al detalle es asombrosa. Transformaron nuestro apartamento en una verdadera obra de arte arquitectónica.",
  },
  {
    name: "Javier R.",
    quote: "Profesionalismo de principio a fin. Materiales de una calidad exquisita y un diseño que supera nuestras expectativas diarias.",
  },
  {
    name: "Sofía V.",
    quote: "El diseño de la cocina es un sueño. Entendieron perfectamente nuestra visión y la ejecutaron con precisión milimétrica.",
  },
  {
    name: "Carlos T.",
    quote: "Un equipo que no hace concesiones con la calidad. La inversión ha valido cada céntimo. Impecable.",
  }
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-32 px-6 md:px-12 bg-card w-full">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Clientes Satisfechos</h2>
        <p className="text-muted-foreground font-light text-lg">
          La confianza de quienes exigen lo mejor.
        </p>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4">
                <div className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-8 h-full flex flex-col select-none">
                  <div className="flex gap-1 mb-6 text-primary">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-lg font-serif italic text-white/90 flex-grow mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="text-sm tracking-wider uppercase text-muted-foreground font-medium border-t border-border/50 pt-4">
                    {testimonial.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={scrollPrev}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
            data-testid="button-prev-testimonial"
          >
            ←
          </button>
          <button 
            onClick={scrollNext}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
            data-testid="button-next-testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
