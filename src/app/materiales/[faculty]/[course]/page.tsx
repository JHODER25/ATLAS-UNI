import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { SearchIcon, DownloadIcon, FileTextIcon, BookOpenIcon, Edit3Icon, ClipboardListIcon, GraduationCapIcon, CalendarIcon, User } from 'lucide-react';
import Link from 'next/link';

export default async function CourseDetailPage({ params }: { params: Promise<{ faculty: string, course: string }> }) {
  const { faculty, course } = await params;
  const decodedFaculty = decodeURIComponent(faculty);
  const decodedCourse = decodeURIComponent(course);
  
  const supabase = await createClient();
  const { data: materials } = await supabase
    .from('materials')
    .select('*')
    .eq('course', decodedCourse)
    .order('created_at', { ascending: false });

  // Calculate stats
  const stats = {
    examenes: materials?.filter(m => m.title.toLowerCase().includes('examen') || m.title.toLowerCase().includes('práctica')).length || 0,
    libros: materials?.filter(m => m.title.toLowerCase().includes('libro')).length || 0,
    apuntes: materials?.filter(m => m.title.toLowerCase().includes('apunte') || m.title.toLowerCase().includes('resumen') || m.title.toLowerCase().includes('diapositiva')).length || 0,
    ejercicios: materials?.filter(m => m.title.toLowerCase().includes('ejercicio')).length || 0,
  };

  return (
    <div className="min-h-screen bg-[#0a051d] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
          <Link 
            href={`/materiales/${encodeURIComponent(decodedFaculty)}`} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest"
          >
            <BookOpenIcon className="w-3 h-3" />
            Volver a {decodedFaculty}
          </Link>
        </div>

        {/* Course Header Banner */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#130b2c] p-8 md:p-12 shadow-2xl mb-12 animate-in fade-in zoom-in-95 duration-700">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ea580c]/10 to-transparent blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center shadow-2xl shadow-orange-500/20 shrink-0">
              <GraduationCapIcon className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <span className="text-[#f97316] text-xs font-black uppercase tracking-[0.3em] block">Contenido Académico</span>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{decodedCourse}</h1>
              <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                 <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white/60">
                    Facultad de {decodedFaculty}
                 </div>
                 <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white/60">
                    Ciclo General
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <section className="bg-[#130b2c]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 space-y-8">
              <h2 className="text-xl font-black text-white italic">Filtros Avanzados</h2>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Origen</label>
                  <div className="grid grid-cols-1 gap-2">
                    {['Todos', 'Oficial UNI', 'Comunidad'].map((opt) => (
                      <button key={opt} className={`text-left px-4 py-3 rounded-2xl text-xs font-bold border transition-all ${opt === 'Todos' ? 'bg-gradient-to-r from-[#d93340] to-[#a6249d] border-transparent text-white' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Tipo de Archivo</label>
                   <select className="w-full bg-[#130b2c] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white/80 focus:outline-none focus:border-[#d93340] appearance-none cursor-pointer">
                      <option>Todos los formatos</option>
                      <option>Documento PDF</option>
                      <option>Presentación PPT</option>
                      <option>Imagen / Foto</option>
                   </select>
                </div>

                <div className="pt-4">
                  <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                    Limpiar Filtros
                  </button>
                </div>
              </div>
            </section>

            {/* Contribution Box */}
            <div className="bg-gradient-to-br from-[#d93340] to-[#a6249d] p-0.5 rounded-[2rem] shadow-xl shadow-[#d93340]/10">
               <div className="bg-[#0a051d] rounded-[1.9rem] p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto border border-white/10">
                     <FileTextIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-black text-white">¿Tienes material?</h3>
                  <p className="text-xs text-white/40 leading-relaxed">Colabora con la comunidad y ayuda a miles de estudiantes.</p>
                  <button className="w-full py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                     Subir Material
                  </button>
               </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3 space-y-12">
            
            {/* Quick Access Folders */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-8 duration-700 delay-300">
               {[
                 { label: 'Exámenes', count: stats.examenes, icon: ClipboardListIcon, color: 'from-blue-600 to-indigo-600' },
                 { label: 'Libros', count: stats.libros, icon: BookOpenIcon, color: 'from-emerald-500 to-teal-600' },
                 { label: 'Apuntes', count: stats.apuntes, icon: FileTextIcon, color: 'from-purple-500 to-indigo-700' },
                 { label: 'Ejercicios', count: stats.ejercicios, icon: Edit3Icon, color: 'from-orange-500 to-red-600' }
               ].map((folder) => (
                 <div key={folder.label} className="group cursor-pointer">
                    <div className={`relative overflow-hidden rounded-[2rem] p-6 bg-gradient-to-br ${folder.color} shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:shadow-2xl`}>
                       <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                          <folder.icon className="w-24 h-24 text-white" />
                       </div>
                       <folder.icon className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform" />
                       <div className="relative z-10">
                          <h4 className="font-black text-white text-sm">{folder.label}</h4>
                          <p className="text-[10px] text-white/80 font-bold uppercase tracking-wider">{folder.count} items</p>
                       </div>
                    </div>
                 </div>
               ))}
            </section>

            {/* List with Glassmorphism */}
            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-white italic">Explorando Archivos</h2>
                  <div className="flex bg-white/5 border border-white/10 rounded-full p-1">
                     <button className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 text-white">Recientes</button>
                     <button className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Populares</button>
                  </div>
               </div>

               {(!materials || materials.length === 0) ? (
                 <div className="p-20 border border-white/10 rounded-[3rem] bg-white/5 border-dashed text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10">
                       <FileTextIcon className="w-8 h-8 text-white/20" />
                    </div>
                    <p className="text-white/40 font-black uppercase tracking-widest">No hay archivos en esta sección</p>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 gap-4">
                    {materials.map((mat) => {
                      const isOfficial = mat.id.charCodeAt(0) % 2 === 0;
                      return (
                        <div key={mat.id} className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d93340] to-[#a6249d] rounded-[2rem] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm" />
                          <div className="relative bg-[#130b2c]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 transition-all duration-300 group-hover:bg-[#130b2c]">
                             
                             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${isOfficial ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-[#a3e635]/10 text-[#a3e635] border border-[#a3e635]/20'}`}>
                                <FileTextIcon className="w-7 h-7" />
                             </div>

                             <div className="flex-1 text-center md:text-left space-y-2">
                                <div className="flex flex-col md:flex-row md:items-center gap-3">
                                   <h3 className="text-xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all font-mono">
                                      {mat.title}
                                   </h3>
                                   {isOfficial ? (
                                     <span className="inline-flex px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-cyan-400 text-white mx-auto md:mx-0">OFICIAL UNI</span>
                                   ) : (
                                     <span className="inline-flex px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-[#a3e635] text-lime-900 mx-auto md:mx-0">APORTE COMUNIDAD</span>
                                   )}
                                </div>
                                <div className="flex items-center justify-center md:justify-start gap-4 text-[10px] font-black uppercase tracking-widest text-white/20">
                                   <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> Prof. Anónimo</span>
                                   <span className="w-1 h-1 rounded-full bg-white/10" />
                                   <span className="flex items-center gap-1.5"><CalendarIcon className="w-3 h-3" /> {new Date(mat.created_at).toLocaleDateString()}</span>
                                </div>
                             </div>

                             <div className="shrink-0 w-full md:w-auto">
                                <a 
                                  href={mat.file_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all group/btn w-full"
                                >
                                  <DownloadIcon className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
                                  Cargar Archivo
                                </a>
                             </div>
                          </div>
                        </div>
                      )
                    })}
                 </div>
               )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
