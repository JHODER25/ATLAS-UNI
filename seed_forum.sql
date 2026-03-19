-- 1. Normalizar nombres de columnas para que coincidan con el código de la App (author_id -> user_id)
DO $$ 
BEGIN 
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='forum_posts' AND column_name='author_id') THEN
    ALTER TABLE public.forum_posts RENAME COLUMN author_id TO user_id;
  END IF;
END $$;

-- 2. Inyectar usuarios en la tabla base (auth.users)
-- Esto satisface el "foreign key" y desencadena nuestro Trigger automático para crear los perfiles públicos
INSERT INTO auth.users (id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
VALUES
  ('11111111-1111-4111-a111-111111111111', 'authenticated', 'authenticated', 'profesor.ramirez@uni.edu.pe', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Dr. Alberto Ramirez","faculty":"FIC","role":"Profesor"}', now(), now()),
  ('22222222-2222-4222-a222-222222222222', 'authenticated', 'authenticated', 'maria.gomez@uni.edu.pe', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Maria Gomez","faculty":"FIIS","role":"Estudiante"}', now(), now()),
  ('33333333-3333-4333-a333-333333333333', 'authenticated', 'authenticated', 'carlos.ruiz@uni.edu.pe', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Carlos Ruiz","faculty":"FIM","role":"Estudiante"}', now(), now())
ON CONFLICT (id) DO NOTHING;

-- 3. Actualizar los avatares que no se pasaron en el payload original
UPDATE public.profiles SET avatar_url = 'https://avatar.vercel.sh/alberto' WHERE id = '11111111-1111-4111-a111-111111111111';
UPDATE public.profiles SET avatar_url = 'https://avatar.vercel.sh/maria' WHERE id = '22222222-2222-4222-a222-222222222222';
UPDATE public.profiles SET avatar_url = 'https://avatar.vercel.sh/carlos' WHERE id = '33333333-3333-4333-a333-333333333333';

-- 4. Inyectar los posts de la comunidad
INSERT INTO forum_posts (id, user_id, title, content, image_url)
VALUES
  ('aaaa1111-bb22-cc33-dd44-eeee55556666', '11111111-1111-4111-a111-111111111111', 'Seminario de Estructuras Avanzadas', 'Estimados alumnos, el próximo jueves tendremos un seminario sobre diseño sismorresistente en el auditorio de la FIC. Dejo adjunto el cronograma. ¡Asistencia obligatoria para mis grupos de práctica!', null),
  ('bbbb2222-cc33-dd44-ee55-ffff66667777', '22222222-2222-4222-a222-222222222222', '¿Alguien tiene apuntes de Sistemas de Información?', 'Hola chicos, por temas de salud no pude asistir a las últimas dos clases del Ing. Mendoza. ¿Alguien sería tan amable de pasarme sus apuntes o fotos de la pizarra? Se los agradecería un montón 🙏', null),
  ('cccc3333-dd44-ee55-ff66-999977778888', '33333333-3333-4333-a333-333333333333', 'Hackathon UNI 2026 - ¡Buscamos equipo!', 'Estamos armando un equipo multidisciplinario para la Hackathon de este año. Ya tenemos dos programadores backend, buscamos a alguien que sea fuerte en Frontend (React/Nextjs) y preferiblemente alguien de Diseño Industrial o Arquitectura para la interfaz/hardware. Escríbanme al inbox si se animan.', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop')
ON CONFLICT (id) DO NOTHING;

-- 5. Simular likes en los posts
INSERT INTO forum_likes (id, post_id, user_id)
VALUES
  (gen_random_uuid(), 'aaaa1111-bb22-cc33-dd44-eeee55556666', '22222222-2222-4222-a222-222222222222'),
  (gen_random_uuid(), 'aaaa1111-bb22-cc33-dd44-eeee55556666', '33333333-3333-4333-a333-333333333333'),
  (gen_random_uuid(), 'cccc3333-dd44-ee55-ff66-999977778888', '11111111-1111-4111-a111-111111111111'),
  (gen_random_uuid(), 'cccc3333-dd44-ee55-ff66-999977778888', '22222222-2222-4222-a222-222222222222')
ON CONFLICT DO NOTHING;
