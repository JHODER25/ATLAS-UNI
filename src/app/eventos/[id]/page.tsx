import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { CalendarIcon, MapPinIcon, MailIcon } from 'lucide-react';
import { EventFeedback } from '@/components/EventFeedback';

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase.from('events').select('*').eq('id', id).single();

  if (!event) {
    notFound();
  }

  // En un caso de uso real de producción, no usaríamos any para los perfiles devueltos del join
  const { data: comments } = await supabase
    .from('event_comments')
    .select('*, profiles(email, full_name, avatar_url, role)')
    .eq('event_id', id)
    .order('created_at', { ascending: false });

  // Calculate average rating
  const { data: ratings } = await supabase.from('event_ratings').select('rating').eq('event_id', id);
  const avgRating = ratings && ratings.length > 0 
    ? (ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length).toFixed(1)
    : 'N/A';

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-white min-h-[calc(100vh-80px)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Event details and feedback */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="flex gap-6 items-start mb-8">
            <div className="bg-[#a6249d] text-white p-4 rounded-3xl flex flex-col items-center justify-center min-w-24 min-h-24 shadow-lg shadow-[#a6249d]/20">
              <span className="text-3xl font-black">{new Date(event.date).getDate()}</span>
              <span className="text-sm font-semibold uppercase">{new Date(event.date).toLocaleString('es-PE', { month: 'short' })}</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
              <div className="flex flex-col sm:flex-row gap-4 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#d93340]" />
                  <span>{new Date(event.date).toLocaleString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-[#d93340]" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Banner Image */}
          <div 
            className="w-full h-80 rounded-[2.5rem] mb-8 bg-cover bg-center border border-white/10 shadow-2xl overflow-hidden relative group"
            style={{ 
              backgroundImage: `url(${event.image_url || 
                (event.category === 'Taller' ? 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200' :
                 event.category === 'Ponencia' ? 'https://images.unsplash.com/photo-1475721027187-402ad2989a3b?auto=format&fit=crop&q=80&w=1200' :
                 event.category === 'Hackathon' ? 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200' :
                 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200')})` 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a051d] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 z-10">
               <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                 {event.category}
               </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Descripción</h2>
            <p className="text-white/70 leading-relaxed whitespace-pre-wrap">{event.description}</p>
          </div>

          {/* Comments & Ratings */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d93340]/10 rounded-full blur-3xl rounded-tl-none -mr-32 -mt-32 pointer-events-none"></div>
            
            <h2 className="text-2xl font-bold mb-6">Comentarios</h2>
            
            <EventFeedback 
              eventId={id} 
              initialAvgRating={avgRating} 
              totalVotes={ratings?.length || 0} 
            />

            {/* Comments List */}
            <div className="flex flex-col gap-6 mt-8 border-t border-white/10 pt-8">
              {(!comments || comments.length === 0) ? (
                <p className="text-white/40 text-center italic">Sé el primero en comentar.</p>
              ) : (
                comments.map((comment: any) => (
                  <div key={comment.id} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d93340] to-[#a6249d] flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {comment.profiles?.avatar_url ? (
                         // eslint-disable-next-line @next/next/no-img-element
                        <img src={comment.profiles.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        comment.profiles?.email?.charAt(0).toUpperCase() || 'U'
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">{comment.profiles?.full_name || comment.profiles?.email?.split('@')[0]}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70">{comment.profiles?.role || 'Estudiante'}</span>
                        <span className="text-xs text-white/40 ml-2">{new Date(comment.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-white/70 text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Map Placeholder */}
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-bold">Ubicación</h3>
            </div>
            <div className="h-64 relative bg-[#1a1235] overflow-hidden">
              {/* Real Interactive OpenStreetMap Iframe */}
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src={`https://www.openstreetmap.org/export/embed.html?bbox=-77.0583, -12.0284, -77.0436, -12.0150&layer=mapnik&marker=-12.0217,-77.0510`} 
                className="absolute inset-0 z-10 opacity-90 mix-blend-screen"
                title="Mapa del Evento UNI"
              ></iframe>
              {/* Optional overlay to keep it dark themed */}
              <div className="absolute inset-0 bg-[#0a051d]/40 pointer-events-none z-20" />
            </div>
            {event.location && (
              <div className="p-4 bg-[#130b2c] text-sm text-center text-white/70 flex items-center justify-center gap-2">
                <MapPinIcon className="w-4 h-4" />
                {event.location}
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-bold">Contacto</h3>
            </div>
            <p className="text-sm text-white/60 mb-6">¿Tienes dudas sobre este evento? Escríbenos.</p>
            
            <div className="space-y-4">
              <div className="relative">
                <MailIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="email" 
                  placeholder="tu.correo@uni.edu.pe" 
                  className="w-full bg-[#130b2c] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#d93340] transition-colors"
                />
              </div>
              <button className="w-full border border-white/20 hover:border-white/50 hover:bg-white/5 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm">
                Enviar correo
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4">Etiquetas</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">{event.category}</span>
              <span className="px-3 py-1 border border-[#a6249d]/50 text-[#a6249d] rounded-full text-xs font-semibold cursor-pointer hover:bg-[#a6249d]/10 transition-colors">UNI</span>
              <span className="px-3 py-1 border border-[#d93340]/50 text-[#d93340] rounded-full text-xs font-semibold cursor-pointer hover:bg-[#d93340]/10 transition-colors">Académico</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
