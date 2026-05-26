export default function InfiniteBanner() {
  const brands = [
    "Porcelanosa", "Silestone", "Dekton", "Hansgrohe", "Laufen",
    "Dornbracht", "Bulthaup", "Gaggenau", "Miele", "V-Zug"
  ];

  return (
    <section className="w-full py-12 bg-background border-y border-border/40 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="flex w-[200%] animate-marquee">
        <div className="flex w-1/2 justify-around items-center">
          {brands.map((brand, i) => (
            <span key={i} className="text-2xl md:text-3xl font-serif text-muted-foreground/50 mx-8 uppercase tracking-widest whitespace-nowrap">
              {brand}
            </span>
          ))}
        </div>
        <div className="flex w-1/2 justify-around items-center">
          {brands.map((brand, i) => (
            <span key={`dup-${i}`} className="text-2xl md:text-3xl font-serif text-muted-foreground/50 mx-8 uppercase tracking-widest whitespace-nowrap">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
