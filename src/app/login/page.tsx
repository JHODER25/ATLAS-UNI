'use client';

import { login, signup } from './actions'
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
