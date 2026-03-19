import { createClient } from '@/utils/supabase/server';
import { BookOpenIcon, SettingsIcon, HexagonIcon, FlaskConicalIcon, LineChartIcon, PickaxeIcon, CpuIcon, BuildingIcon, DatabaseIcon, AtomIcon } from 'lucide-react';
import Link from 'next/link';

const FACULTIES_INFO = {
  'FIC': { name: 'Ingeniería Civil', icon: BookOpenIcon, color: 'bg-blue-600', textColor: 'text-blue-500' },
  'FIM': { name: 'Ingeniería Mecánica', icon: SettingsIcon, color: 'bg-slate-800', textColor: 'text-slate-800' },
  'FIEE': { name: 'Ingeniería Eléctrica y Electrónica', icon: HexagonIcon, color: 'bg-amber-600', textColor: 'text-amber-500' },
  'FIQT': { name: 'Ingeniería Química y Textil', icon: FlaskConicalIcon, color: 'bg-red-500/10', textColor: 'text-white' }, // Adjusted for dark theme
  'FIIS': { name: 'Ingeniería Industrial y de Sistemas', icon: LineChartIcon, color: 'bg-indigo-500/10', textColor: 'text-white' },
  'FIGMM': { name: 'Ing. Geológica, Minera y Metalúrgica', icon: PickaxeIcon, color: 'bg-stone-500/10', textColor: 'text-white' },
  'FIA': { name: 'Arquitectura, Urbanismo y Artes', icon: BuildingIcon, color: 'bg-emerald-500/10', textColor: 'text-white' },
  'FC': { name: 'Ciencias', icon: AtomIcon, color: 'bg-cyan-500/10', textColor: 'text-white' },
  'FIP': { name: 'Ingeniería de Petróleo, Gas y Petroquímica', icon: DatabaseIcon, color: 'bg-orange-500/10', textColor: 'text-white' },
  'FIECS': { name: 'Ing. Económica, Estadística y CC.SS.', icon: LineChartIcon, color: 'bg-teal-500/10', textColor: 'text-white' },
};

export default async function MaterialesPage() {
  const supabase = await createClient();
  const { data: materials } = await supabase.from('materials').select('*');

  // Group materials by faculty
  const facultyStats: Record<string, { total: number, oficial: number, ayuda: number }> = {};
  
  Object.keys(FACULTIES_INFO).forEach(fac => {
    facultyStats[fac] = { total: 0, oficial: 0, ayuda: 0 };
  });

  if (materials) {
    materials.forEach(mat => {
      const fac = mat.faculty;
      if (facultyStats[fac]) {
        facultyStats[fac].total += 1;
        // Mocking the origin logic since we don't have an 'origin' column yet, 
        // we'll say if id is even it's official, else help, just for UI demonstration based on user request.
        // If we had 'origin', it would be: mat.origin === 'Oficial UNI'
        const isOfficial = mat.id.charCodeAt(0) % 2 === 0; 
        if (isOfficial) facultyStats[fac].oficial += 1;
        else facultyStats[fac].ayuda += 1;
      } else {
        // If faculty not in list, add it
        facultyStats[fac] = { total: 1, oficial: 1, ayuda: 0 };
        (FACULTIES_INFO as any)[fac] = { name: fac, icon: BookOpenIcon, color: 'bg-white/10', textColor: 'text-white' };
      }
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-white min-h-[calc(100vh-80px)]">
      {/* Header Section */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#d93340]/10 blur-[100px] rounded-full pointer-events-none" />
        <h1 className="text-5xl font-black mb-6 tracking-tight">
          Material Académico por <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93340] via-white to-[#a6249d]">Facultad</span>
        </h1>
        <p className="text-white/50 text-lg max-w-2xl mx-auto font-medium">
          La biblioteca digital más completa de la UNI. Encuentra material oficial y colaboraciones de alto nivel de la comunidad.
        </p>

        {/* Premium Search Experience */}
        <div className="mt-10 max-w-2xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#d93340] to-[#a6249d] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-[#130b2c]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="pl-6">
               <BookOpenIcon className="w-5 h-5 text-white/40" />
            </div>
            <input 
              type="text" 
              placeholder="¿Qué facultad o curso buscas hoy?"
              className="w-full bg-transparent border-none py-5 px-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-0 font-medium"
            />
            <div className="pr-4">
               <button className="bg-gradient-to-r from-[#d93340] to-[#a6249d] px-8 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#d93340]/20">
                 Buscar
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(FACULTIES_INFO).map(([code, info]) => {
          const stats = facultyStats[code];
          const Icon = info.icon;
          
          return (
            <Link key={code} href={`/materiales/${encodeURIComponent(code)}`} className="group outline-none">
              <div className="relative h-full">
                {/* Glow Background */}
                <div className={`absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm bg-gradient-to-br from-[#d93340] via-[#a6249d] to-transparent`} />
                
                <div className="relative h-full bg-[#130b2c]/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 hover:bg-[#130b2c]/60 transition-all duration-500 flex flex-col">
                  {/* Icon Section */}
                  <div className="p-8 flex items-start justify-between">
                    <div className={`p-4 rounded-2xl ${info.color} border border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-xl`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500 italic uppercase">
                      {code}
                    </span>
                  </div>

                  <div className="px-8 pb-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                      {info.name}
                    </h3>

                    <div className="space-y-3 mb-8">
                       <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/[0.08] transition-colors">
                          <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Contenido</span>
                          <span className="text-white font-black">{stats.total}</span>
                       </div>
                       <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-1">
                             <span className="text-emerald-400 text-[8px] font-black uppercase tracking-widest">Oficial</span>
                             <span className="text-emerald-400 font-bold">{stats.oficial}</span>
                          </div>
                          <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex flex-col gap-1">
                             <span className="text-yellow-400 text-[8px] font-black uppercase tracking-widest">Comunidad</span>
                             <span className="text-yellow-400 font-bold">{stats.ayuda}</span>
                          </div>
                       </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5">
                      <div className="flex items-center justify-between text-white/40 group-hover:text-white transition-colors duration-500">
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Explorar Catálogo</span>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#130b2c] transition-all">
                           <BookOpenIcon className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
