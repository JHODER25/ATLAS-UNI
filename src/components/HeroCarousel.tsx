"use client";

import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
    title: "Todo lo que necesitas en la",
    highlight: "Universidad Nacional de Ingeniería",
    subtitle: "Encuentra y aprovecha todos los eventos exclusivos, material de estudio por facultad y conecta con la comunidad en el foro oficial de ATLAS UNI."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    title: "Participa en los mejores",
    highlight: "Eventos y Hackathons",
    subtitle: "Descubre talleres, conferencias y retos organizados por las distintas facultades y agrupaciones estudiantiles de toda la universidad."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    title: "Accede a nuestro",
    highlight: "Repositorio Académico",
    subtitle: "Descarga exámenes pasados, libros digitales, apuntes y ejercicios compartidos por la misma comunidad de estudiantes."
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="w-full relative py-24 lg:py-32 flex flex-col items-center justify-center text-center overflow-hidden min-h-[600px]">
      {/* Background Images with Crossfade */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out -z-20 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
          {/* Dark Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a051d]/80 via-[#0a051d]/60 to-[#0a051d] backdrop-blur-[2px]" />
        </div>
      ))}
      
      {/* Fallback Radial Gradient (shows while loading or behind dark overlay) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1f1244]/50 via-transparent to-transparent -z-10 mix-blend-overlay" />
      
      {/* Carousel Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all z-10 hidden md:flex"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all z-10 hidden md:flex"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Content Area */}
      <div className="max-w-4xl px-4 space-y-8 z-10 relative">
        {/* Dynamic Text with fade up transition */}
        <div key={currentSlide} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
            {slides[currentSlide].title} <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-[#d93340] to-[#a6249d] bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(217,51,64,0.3)]">
              {slides[currentSlide].highlight}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 drop-shadow-md font-medium">
            {slides[currentSlide].subtitle}
          </p>
        </div>

        {/* Primary Search Bar */}
        <div className="relative max-w-2xl mx-auto flex items-center bg-white/10 border border-white/20 rounded-full p-2 backdrop-blur-md shadow-2xl transition-all focus-within:ring-2 focus-within:ring-[#d93340]/50 z-20">
          <Search className="absolute left-6 w-5 h-5 text-white/70" />
          <Input 
            type="text" 
            placeholder="Buscar eventos, cursos o temas en el foro..." 
            className="pl-14 pr-32 h-14 bg-transparent border-none text-white placeholder:text-white/60 text-lg focus-visible:ring-0 rounded-full"
          />
          <Button className="absolute right-2 h-10 px-6 rounded-full bg-gradient-to-r from-[#d93340] to-[#a6249d] hover:shadow-lg hover:shadow-[#d93340]/30 text-white font-bold transition-all">
            Explorar
          </Button>
        </div>
        
        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-[#d93340]' : 'w-2 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
