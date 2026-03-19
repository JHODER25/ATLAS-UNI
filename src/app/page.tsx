import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Search, Calendar, MapPin, Sparkles, Navigation } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HeroCarousel } from "@/components/HeroCarousel";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <HeroCarousel />

      {/* Featured Categories / Modules */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Explora tu universidad</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/eventos" className="group">
            <Card className="bg-[#130b2c] border-white/5 hover:border-[#d93340]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(217,51,64,0.15)] h-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d93340]/0 to-[#d93340]/5 group-hover:from-[#d93340]/10 transition-colors duration-500" />
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500/30 transition-all duration-300">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-2xl text-white group-hover:text-[#d93340] transition-colors">Eventos</CardTitle>
                <CardDescription className="text-white/60 text-base">Talleres, hackathons y ponencias.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          
          <Link href="/materiales" className="group">
            <Card className="bg-[#130b2c] border-white/5 hover:border-[#a6249d]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(166,36,157,0.15)] h-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#a6249d]/0 to-[#a6249d]/5 group-hover:from-[#a6249d]/10 transition-colors duration-500" />
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-purple-500/30 transition-all duration-300">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-2xl text-white group-hover:text-[#a6249d] transition-colors">Material Académico</CardTitle>
                <CardDescription className="text-white/60 text-base">Exámenes pasados y lecturas por facultad.</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/foro" className="group">
            <Card className="bg-[#130b2c] border-white/5 hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] h-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/5 group-hover:from-orange-500/10 transition-colors duration-500" />
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-orange-500/30 transition-all duration-300">
                  <Navigation className="w-6 h-6 text-orange-400" />
                </div>
                <CardTitle className="text-2xl text-white group-hover:text-orange-400 transition-colors">Foro de Ayuda</CardTitle>
                <CardDescription className="text-white/60 text-base">Resuelve tus dudas con la comunidad.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>

      {/* Featured Events Snapshot */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Eventos Destacados</h2>
            <p className="text-white/60">No te pierdas de lo último en la UNI.</p>
          </div>
          <Link href="/eventos" className="text-[#d93340] hover:text-[#a6249d] transition-colors font-medium">
            Ver todos los eventos →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="bg-[#130b2c] border-white/5 overflow-hidden flex flex-col hover:border-[#a6249d]/50 hover:shadow-[0_0_30px_rgba(166,36,157,0.15)] transition-all duration-500 group rounded-[2rem]">
              <div className="h-48 relative w-full overflow-hidden">
                <img 
                  src={item === 1 ? 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800' : 
                       item === 2 ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800' : 
                       'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800'} 
                  alt="Evento"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">
                    {item === 1 ? 'Taller' : item === 2 ? 'Ponencia' : 'Hackathon'}
                  </span>
                </div>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#a6249d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300 relative z-10">
                  {item === 1 ? 'Inteligencia Artificial Aplicada' : item === 2 ? 'Data Science con Python' : 'Desarrollo Web Moderno'}
                </h3>
                <div className="space-y-2 mb-6 relative z-10">
                  <div className="flex items-center text-[10px] text-white/40 gap-2 uppercase font-black tracking-widest">
                    <Calendar className="w-4 h-4 text-[#d93340]" />
                    <span>Diciembre {15 + item}, 2025</span>
                  </div>
                  <div className="flex items-center text-[10px] text-white/40 gap-2 uppercase font-black tracking-widest">
                    <MapPin className="w-4 h-4 text-[#a6249d]" />
                    <span>Auditorio {item === 1 ? 'Central' : 'FIIS'}</span>
                  </div>
                </div>
                <div className="mt-auto relative z-10">
                  <Button variant="outline" className="w-full border-white/10 text-white hover:bg-gradient-to-r hover:from-[#d93340] hover:to-[#a6249d] hover:border-transparent hover:scale-105 active:scale-95 transition-all duration-300 rounded-full font-bold">
                    Ver Evento
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
