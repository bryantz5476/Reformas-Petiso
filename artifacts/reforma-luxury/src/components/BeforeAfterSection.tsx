import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BeforeAfterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const blurValue = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  return (
    <section className="py-32 bg-background w-full overflow-hidden" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">La Transformación</h2>
          <p className="text-muted-foreground font-light text-lg">
            Del potencial crudo a la elegancia absoluta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
          <div className="relative h-[50vh] md:h-[80vh] overflow-hidden group">
            <div className="absolute top-6 left-6 z-20 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white/80 text-sm tracking-widest uppercase border border-white/10">
              Antes
            </div>
            <img 
              src="/images/before.png" 
              alt="Antes de la reforma" 
              className="w-full h-full object-cover filter grayscale opacity-70"
            />
          </div>
          
          <div className="relative h-[50vh] md:h-[80vh] overflow-hidden">
            <div className="absolute top-6 right-6 z-20 bg-white px-4 py-2 rounded-full text-black text-sm tracking-widest uppercase font-medium shadow-lg">
              Después
            </div>
            <motion.div 
              className="w-full h-full"
              style={{ 
                filter: useTransform(blurValue, v => `blur(${v}px)`),
                opacity: opacityValue
              }}
            >
              <img 
                src="/images/after.png" 
                alt="Después de la reforma" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
