-- 1. Create Profiles table (links to Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  faculty text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policy for users to see their own profile
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

-- Create policy for users to update their own profile
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- Automate profile creation on user signup
create function public.handle_new_user()
returns trigger
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Create Events table
create table public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  category text not null, -- 'Taller', 'Ponencia', 'Hackathon', etc.
  date timestamp with time zone not null,
  location text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Read-only for all, write for admins ideally, but read-only for now)
alter table public.events enable row level security;
create policy "Anyone can view events" on events for select using (true);


-- 3. Create Academic Materials table
create table public.materials (
  id uuid default gen_random_uuid() primary key,
  faculty text not null,
  course text not null,
  title text not null,
  file_url text not null,
  uploaded_by uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.materials enable row level security;
create policy "Anyone can view materials" on materials for select using (true);
create policy "Authenticated users can upload materials" on materials 
  for insert with check (auth.role() = 'authenticated');

-- 4. Create Forum Posts table
create table public.forum_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  author_id uuid references public.profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.forum_posts enable row level security;
create policy "Anyone can view forum posts" on forum_posts for select using (true);
create policy "Authenticated users can create posts" on forum_posts 
  for insert with check (auth.role() = 'authenticated');
