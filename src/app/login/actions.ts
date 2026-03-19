'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data: signInData } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error("Login Error:", error.message)
    redirect('/login?error=true')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  console.log("Signup action triggered")
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string
  const faculty = formData.get('faculty') as string

  console.log("Form data:", { email, fullName, faculty })

  const { error, data: signUpData } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        faculty: faculty,
      }
    }
  })

  if (error) {
    console.error("Signup Error:", error.message)
    redirect('/login?error=true')
  }

  console.log("Signup successful")
  revalidatePath('/', 'layout')
  redirect('/')
}
