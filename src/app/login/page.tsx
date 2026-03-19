'use client';

import { login, signup, loginWithGoogle } from './actions'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-[#0a051d]">
      <div className="w-full max-w-md space-y-8 p-8 border border-white/10 rounded-3xl bg-[#130b2c] backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#d93340]/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#a6249d]/20 blur-3xl rounded-full" />

        <div className="text-center relative z-10">
          <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-full mb-6">
            <button 
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${isLogin ? 'bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
            >
              Iniciar sesión
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${!isLogin ? 'bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
            >
              Registrarse
            </button>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white">
            {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
          </h2>
          <p className="mt-2 text-sm text-white/60">
            {isLogin ? 'Accede a tu cuenta de ATLAS UNI' : 'Únete a la comunidad académica más grande'}
          </p>
        </div>

        {searchParams?.error && (
          <div className="p-3 text-sm text-red-400 bg-red-900/30 border border-red-500/20 rounded-xl text-center relative z-10">
            Error en la autenticación. Revisa tus datos.
          </div>
        )}

        <form className="mt-8 space-y-5 relative z-10">
          <div className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white/80" htmlFor="full_name">
                    Nombre y Apellidos
                  </Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    type="text"
                    required
                    className="rounded-xl border-white/10 bg-white/5 py-6 px-4 text-white placeholder:text-white/20 focus-visible:ring-[#d93340]"
                    placeholder="Escriba su nombre y apellidos"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white/80" htmlFor="faculty">
                    Facultad
                  </Label>
                  <Input
                    id="faculty"
                    name="faculty"
                    type="text"
                    required
                    className="rounded-xl border-white/10 bg-white/5 py-6 px-4 text-white placeholder:text-white/20 focus-visible:ring-[#a6249d]"
                    placeholder="Escriba su facultad a la que pertenece"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium text-white/80" htmlFor="email">
                Correo Institucional
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="rounded-xl border-white/10 bg-white/5 py-6 px-4 text-white placeholder:text-white/20 focus-visible:ring-[#d93340]"
                placeholder="ejemplo@uni.edu.pe"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-white/80" htmlFor="password">
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="rounded-xl border-white/10 bg-white/5 py-6 px-4 text-white placeholder:text-white/20 focus-visible:ring-[#a6249d]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            formAction={isLogin ? login : signup}
            className="w-full rounded-full bg-gradient-to-r from-[#d93340] to-[#a6249d] py-4 text-base font-bold text-white shadow-[0_0_20px_rgba(217,51,64,0.3)] hover:shadow-[0_0_30px_rgba(166,36,157,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            {isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#130b2c] px-2 text-white/40">O continuar con</span>
            </div>
          </div>

          <button
            type="submit"
            formAction={loginWithGoogle}
            className="w-full rounded-full bg-white/5 border border-white/10 py-4 text-base font-bold text-white hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>

          <div className="text-center">
             <button 
               type="button"
               onClick={() => setIsLogin(!isLogin)}
               className="text-xs font-medium text-white/40 hover:text-white transition-colors"
             >
               {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
             </button>
          </div>
        </form>
      </div>
    </div>
  )
}
