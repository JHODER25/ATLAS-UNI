-- Phase 4: Advanced App Replication Schema Additions

-- 1. Extend Profiles Table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'Estudiante'; -- E.g., Estudiante, Profesor, Admin

-- 2. Event Comments Table
CREATE TABLE IF NOT EXISTS public.event_comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.event_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view event comments" ON event_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create event comments" ON event_comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 3. Event Ratings Table
CREATE TABLE IF NOT EXISTS public.event_ratings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(event_id, user_id) -- One rating per user per event
);

ALTER TABLE public.event_ratings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view event ratings" ON event_ratings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can rate events" ON event_ratings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update their own ratings" ON event_ratings FOR UPDATE USING (auth.uid() = user_id);

-- 4. Forum Likes Table
CREATE TABLE IF NOT EXISTS public.forum_likes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid REFERENCES public.forum_posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(post_id, user_id) -- One like per user per post
);

ALTER TABLE public.forum_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view forum likes" ON forum_likes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can like posts" ON forum_likes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can unlike posts" ON forum_likes FOR DELETE USING (auth.uid() = user_id);

-- 5. Extend Forum Posts and Materials support tracking
ALTER TABLE public.forum_posts ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.materials ADD COLUMN IF NOT EXISTS type text; -- 'Examen', 'Libro', 'Apunte', 'Ejercicio'
