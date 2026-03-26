"use client";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Festas de Verão em Albergaria",
    description: "Os melhores concertos ao ar livre estão de volta.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070",
    link: "/eventos/1"
  },
  {
    id: 2,
    title: "Workshop de Gastronomia Regional",
    description: "Aprenda a cozinhar os pratos típicos da nossa terra.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070",
    link: "/eventos/2"
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden rounded-[40px] shadow-2xl mt-4 bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20" />
          
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="h-full w-full object-cover"
          />
          
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight">
              {slide.title}
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl font-medium">
              {slide.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/40 transition-all hover:-translate-y-1">
                Comprar Bilhete
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-10 py-4 rounded-2xl font-bold transition-all">
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Indicadores (Pontinhos) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              current === i ? "w-8 bg-blue-500" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}