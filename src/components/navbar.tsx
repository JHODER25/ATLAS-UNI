import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { LogOut, User as UserIcon, Globe2Icon } from "lucide-react";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a051d]/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 group">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#d93340] to-[#a6249d] p-1.5 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#a6249d]/20">
              <Globe2Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
              ATLAS<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93340] to-[#a6249d]">UNI</span>
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2 bg-white/5 rounded-full p-1 border border-white/10">
          <Link href="/eventos" className="px-5 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">
            Eventos
          </Link>
          <Link href="/materiales" className="px-5 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">
            Material académico
          </Link>
          <Link href="/foro" className="px-5 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">
            Foro de ayuda
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center flex-row gap-4">
              <Link href="/perfil" className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white/5 border border-white/10 hover:border-[#a6249d]/50 transition-all group">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 bg-gradient-to-br from-[#d93340] to-[#a6249d] flex-shrink-0">
                  <img 
                    src={profile?.avatar_url || `https://avatar.vercel.sh/${user.email}`} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-bold text-white group-hover:text-[#a6249d] transition-colors max-w-[120px] truncate">
                  {profile?.full_name?.split(' ')[0] || "Usuario"}
                </span>
              </Link>
              <form action="/auth/signout" method="post">
                <Button variant="outline" type="submit" size="icon" className="rounded-full bg-white/5 border-white/10 text-white hover:bg-[#d93340]/20 hover:text-white hover:border-[#d93340]/50 hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(217,51,64,0.4)]">
                  <LogOut className="w-4 h-4" />
                </Button>
              </form>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="default" className="rounded-full bg-gradient-to-r from-[#d93340] to-[#a6249d] hover:opacity-90 transition-all duration-300 text-white border-0 shadow-[0_0_15px_rgba(217,51,64,0.4)] hover:shadow-[0_0_25px_rgba(166,36,157,0.6)] hover:scale-105 active:scale-95 font-bold tracking-wide">
                Iniciar Sesión
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
