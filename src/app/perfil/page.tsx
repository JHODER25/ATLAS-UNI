import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User, Settings, Shield, Award, Heart } from "lucide-react";

export default async function PerfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-[#0a051d] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Profile Header */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#130b2c] p-8 md:p-12 shadow-2xl">
          {/* Background glows */}
          <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-[#a6249d]/10 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[40%] h-full bg-gradient-to-r from-[#d93340]/10 to-transparent blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/10 overflow-hidden bg-gradient-to-br from-[#130b2c] to-[#1a1135] shadow-2xl shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-500">
                <img
                  src={profile?.avatar_url || `https://avatar.vercel.sh/${profile?.email || 'user'}`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#d93340] to-[#a6249d] p-3 rounded-full shadow-lg border-4 border-[#130b2c]">
                <Settings className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="space-y-1">
                <span className="text-[#a6249d] text-sm font-bold uppercase tracking-[0.2em]">Mi Perfil</span>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  {profile?.full_name || "Estudiante UNI"}
                </h1>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-white/60 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#d93340]" />
                  <span>{profile?.faculty || "Sin facultad"}</span>
                </div>
                <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-white/60 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#a6249d]" />
                  <span>{profile?.role || "Estudiante"}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="rounded-full bg-white/5 border border-white/10 text-white px-8 hover:bg-white/10 transition-all font-bold">
                  Editar Perfil
                </Button>
                <Button className="rounded-full bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white px-8 shadow-lg shadow-[#d93340]/20 hover:scale-105 transition-all font-bold">
                  Mis Materiales
                </Button>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-center gap-4 bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-sm">
              <div className="text-center">
                <span className="block text-2xl font-black text-white">12</span>
                <span className="text-[10px] text-white/40 uppercase font-black tracking-widest leading-none">Intereses</span>
              </div>
              <div className="w-full h-[1px] bg-white/10" />
              <div className="text-center">
                <span className="block text-2xl font-black text-white">05</span>
                <span className="text-[10px] text-white/40 uppercase font-black tracking-widest leading-none">Favoritos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Temas de Interés */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-[#d93340]" />
            <h2 className="text-2xl font-black text-white">Temas Interesantes</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['IA', 'DATA', 'SOFTWARE', 'CIBERSEGURIDAD'].map((tema, i) => (
              <div 
                key={tema}
                className={`group cursor-pointer relative overflow-hidden h-32 rounded-3xl border border-white/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-2
                  ${i === 0 ? 'bg-[#d93340]/10 hover:border-[#d93340]/50' : 
                    i === 1 ? 'bg-blue-500/10 hover:border-blue-500/50' : 
                    i === 2 ? 'bg-[#a6249d]/10 hover:border-[#a6249d]/50' : 
                    'bg-cyan-500/10 hover:border-cyan-500/50'}`}
              >
                <span className={`text-xl font-black tracking-tighter group-hover:scale-110 transition-transform
                   ${i === 0 ? 'text-[#d93340]' : 
                     i === 1 ? 'text-blue-400' : 
                     i === 2 ? 'text-[#a6249d]' : 
                     'text-cyan-400'}`}>
                  {tema}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Eventos Sugeridos */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-[#a6249d]" />
              <h2 className="text-2xl font-black text-white">Eventos sugeridos para ti</h2>
            </div>
            <Button variant="link" className="text-[#a6249d] hover:text-[#d93340] font-black uppercase text-xs tracking-widest">
              Ver todos →
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="bg-[#130b2c] border-white/5 overflow-hidden flex flex-col hover:border-[#a6249d]/50 transition-all duration-500 group rounded-[2rem]">
                <div className="h-40 relative w-full overflow-hidden">
                  <img 
                    src={item === 1 ? 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800' :
                         item === 2 ? 'https://images.unsplash.com/photo-1475721027187-402ad2989a3b?auto=format&fit=crop&q=80&w=800' :
                         item === 3 ? 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800' :
                         'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'}
                    alt="Evento"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">
                      {item === 1 ? 'Taller' : item === 2 ? 'Ponencia' : item === 3 ? 'Hackathon' : 'Feria'}
                    </span>
                  </div>
                </div>
                <CardContent className="p-5 flex-1 flex flex-col relative">
                  <h3 className="text-base font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                    {item === 1 ? 'Workshop de IA Avanzada' : item === 2 ? 'Liderazgo Tecnológico' : item === 3 ? 'Hackathon Interfacultades' : 'Feria de Proyectos'}
                  </h3>
                  <div className="space-y-1.5 mb-6">
                    <div className="flex items-center text-[10px] text-white/40 gap-2 uppercase font-black tracking-widest">
                      <Calendar className="w-3 h-3 text-[#d93340]" />
                      <span>Diciembre {20 + item}</span>
                    </div>
                  </div>
                  <Button className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-[#a6249d] hover:border-transparent transition-all">
                    Ver más detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Support Section */}
        <div className="rounded-[3rem] bg-gradient-to-r from-[#d93340] to-[#a6249d] p-1 shadow-2xl">
          <div className="bg-[#0a051d] rounded-[2.9rem] p-12 text-center space-y-4">
            <h3 className="text-3xl font-black text-white italic">¿Necesitas ayuda?</h3>
            <p className="text-white/60 max-w-xl mx-auto">Nuestro equipo de soporte está disponible 24/7 para resolver cualquier duda académica o técnica.</p>
            <div className="pt-4">
              <Button className="rounded-full bg-gradient-to-r from-[#d93340] to-[#a6249d] px-12 py-6 text-base font-black uppercase tracking-widest shadow-xl shadow-[#d93340]/30 hover:scale-105 transition-all">
                Contactar Soporte
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
