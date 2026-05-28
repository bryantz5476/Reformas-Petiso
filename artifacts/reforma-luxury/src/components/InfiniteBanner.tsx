const brands = [
  "Reformas", "Construcción", "Diseño de Interiores", "Acabados de Lujo", "Reforma Integral",
  "Cocinas", "Baños", "Gestión de Obras", "Llave en Mano", "Calidad Premium",
];

const Separator = () => (
  <span className="text-slate-600 mx-8 select-none" aria-hidden>·</span>
);

const Track = () => (
  <div className="flex items-center flex-nowrap shrink-0" aria-hidden>
    {brands.map((brand, i) => (
      <span key={i} className="flex items-center">
        <span className="text-sm md:text-base font-medium tracking-[0.25em] uppercase text-slate-400 whitespace-nowrap">
          {brand}
        </span>
        <Separator />
      </span>
    ))}
  </div>
);

export default function InfiniteBanner() {
  return (
    <section className="w-full py-10 bg-background overflow-hidden relative border-y border-white/5">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="marquee-track flex items-center">
        <Track />
        <Track />
        <Track />
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.3333%); }
        }
        .marquee-track {
          animation: marquee-scroll 5s linear infinite;
        }
        @media (min-width: 768px) {
          .marquee-track {
            animation-duration: 25s;
          }
        }
      `}</style>
    </section>
  );
}
