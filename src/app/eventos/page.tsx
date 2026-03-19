import { createClient } from '@/utils/supabase/server';
import { CalendarIcon, MapPinIcon, TagIcon } from 'lucide-react';
import Link from 'next/link';

export default async function EventosPage() {
  const supabase = await createClient();
  const { data: events } = await supabase.from('events').select('*').order('date', { ascending: true });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-white text-center min-h-[calc(100vh-80px)]">
      <h1 className="text-4xl font-bold mb-6">Explorador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93340] to-[#a6249d]">Eventos</span></h1>
      <p className="text-white/60 max-w-2xl mx-auto mb-12">
        Descubre los próximos talleres, conferencias y ferias organizadas en las diferentes facultades de la UNI.
      </p>
      
      {(!events || events.length === 0) ? (
        <div className="mt-12 p-12 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm border-dashed text-white/40 flex flex-col items-center justify-center">
          <CalendarIcon className="w-12 h-12 mb-4 opacity-50" />
          <p>Aún no hay eventos registrados.</p>
          <p className="text-sm mt-2">Vuelve pronto para descubrir nuevas actividades.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {events.map((event) => (
            <Link href={`/eventos/${event.id}`} key={event.id} className="bg-[#130b2c]/80 border border-white/10 rounded-3xl overflow-hidden hover:border-[#a6249d]/50 hover:shadow-[0_0_30px_rgba(166,36,157,0.15)] transition-all duration-500 hover:-translate-y-2 group block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d93340]/0 to-[#a6249d]/0 group-hover:from-[#d93340]/5 group-hover:to-[#a6249d]/5 transition-colors duration-500 pointer-events-none" />
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={event.image_url || 
                       (event.category === 'Taller' ? 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800' :
                        event.category === 'Ponencia' ? 'https://images.unsplash.com/photo-1475721027187-402ad2989a3b?auto=format&fit=crop&q=80&w=800' :
                        event.category === 'Hackathon' ? 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800' :
                        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800')} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#a6249d] uppercase tracking-wider mb-2">
                  <TagIcon className="w-3 h-3" />
                  {event.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#d93340] transition-colors">{event.title}</h3>
                <p className="text-sm text-white/60 mb-6 line-clamp-2">{event.description}</p>
                <div className="flex flex-col gap-2 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#d93340]" />
                    <span>{new Date(event.date).toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-[#d93340]" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
