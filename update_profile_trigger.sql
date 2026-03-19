-- Normalizar el trigger para capturar full_name y faculty desde los metadatos de auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, faculty, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', ''), 
    COALESCE(new.raw_user_meta_data->>'faculty', ''),
    COALESCE(new.raw_user_meta_data->>'role', 'Estudiante')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql;

-- El trigger ya existe como "on_auth_user_created" del esquema anterior.
-- Esta función reemplaza la lógica anterior para incluir los nuevos campos.
