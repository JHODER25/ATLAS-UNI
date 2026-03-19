import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { BookOpenIcon, BuildingIcon } from 'lucide-react';
import Link from 'next/link';

export default async function FacultyCoursesPage({ params }: { params: Promise<{ faculty: string }> }) {
  const { faculty } = await params;
  const decodedFaculty = decodeURIComponent(faculty);
  
  const supabase = await createClient();
  const { data: materials } = await supabase
    .from('materials')
    .select('course')
    .eq('faculty', decodedFaculty);

  // Extract unique courses for this faculty
  const uniqueCourses = Array.from(new Set(materials?.map(m => m.course) || []));

  return (
    <div className="min-h-screen bg-[#0a051d] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
          <Link 
            href="/materiales" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest"
          >
            ← Volver al Catálogo
          </Link>
        </div>

        {/* Faculty Header Banner */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#130b2c] p-8 md:p-12 shadow-2xl mb-12 animate-in fade-in zoom-in-95 duration-700">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#a6249d]/10 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-tr from-[#d93340]/10 to-transparent blur-[100px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl shadow-2xl group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#d93340]/20 to-[#a6249d]/20 transition-opacity duration-500" />
               <BuildingIcon className="w-10 h-10 md:w-12 md:h-12 text-white relative z-10" />
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <span className="text-[#a6249d] text-xs font-black uppercase tracking-[0.3em] block italic">Catálogo de Cursos</span>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight italic">
                {decodedFaculty}
              </h1>
              <p className="text-white/40 font-medium">Materiales organizados por especialidad académica</p>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {uniqueCourses.length === 0 ? (
          <div className="p-20 border border-white/10 rounded-[3rem] bg-white/5 border-dashed text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
             <BookOpenIcon className="w-12 h-12 text-white/10 mx-auto mb-4" />
             <p className="text-white/40 font-black uppercase tracking-widest text-sm italic">No hay cursos disponibles aún</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {uniqueCourses.map((course, idx) => (
              <Link 
                key={course}
                href={`/materiales/${encodeURIComponent(decodedFaculty)}/${encodeURIComponent(course)}`}
                className="group relative animate-in fade-in slide-in-from-bottom-8 duration-700 h-full"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#d93340] to-[#a6249d] rounded-[2rem] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm" />
                <div className="relative h-full bg-[#130b2c]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 hover:border-white/20 hover:bg-[#130b2c]/80 transition-all duration-300 flex flex-col overflow-hidden">
                  
                  <div className="mb-8 flex items-start justify-between">
                     <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <BookOpenIcon className="w-6 h-6" />
                     </div>
                     <span className="text-white/5 font-black text-6xl group-hover:text-white/10 transition-colors duration-500 italic">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                     </span>
                  </div>

                  <div className="space-y-3">
                     <h3 className="text-2xl font-black text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all font-mono italic">
                        {course}
                     </h3>
                     <p className="text-sm text-white/40 font-medium leading-relaxed">
                        Accede a exámenes pasados, libros PDF y apuntes compartidos.
                     </p>
                  </div>

                  <div className="mt-auto pt-8 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#a6249d]">
                     <span className="flex items-center gap-2 group-hover:text-white transition-colors">
                        Ver Materiales <span className="group-hover:translate-x-1 transition-transform">→</span>
                     </span>
                     <div className="bg-white/5 px-3 py-1 rounded-full border border-white/5 text-white/30 italic">
                        Ciclo General
                     </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
