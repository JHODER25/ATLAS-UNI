-- Dummy Data for ATLAS UNI

-- 1. Insert Events
INSERT INTO public.events (title, description, category, date, location, image_url)
VALUES 
  ('Hackathon de Inteligencia Artificial', 'Participa en esta maratón de desarrollo de 48 horas resolviendo problemas reales utilizando Machine Learning y LLMs.', 'Hackathon', NOW() + INTERVAL '10 days', 'Pabellón Q, CTIC UNI', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1740&auto=format&fit=crop'),
  ('Taller de Ciberseguridad Defensiva', 'Aprende las mejores prácticas para asegurar aplicaciones web y defender infraestructuras críticas contra ataques modernos.', 'Taller', NOW() + INTERVAL '5 days', 'Laboratorio de Redes, FIIS', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1740&auto=format&fit=crop'),
  ('Conferencia: El Futuro del Desarrollo de Software', 'Destacados egresados de la UNI nos cuentan cómo la IA está cambiando la forma en la que escribimos código en las grandes empresas de tecnología.', 'Ponencia', NOW() + INTERVAL '15 days', 'Auditorio de la FIC', 'https://images.unsplash.com/photo-1475669698648-1f1db3cbce7e?q=80&w=1740&auto=format&fit=crop'),
  ('Feria de Proyectos Mecatrónica', 'Exhibición anual de robots autónomos y proyectos de automatización desarrollados por los estudiantes de los últimos ciclos.', 'Feria', NOW() + INTERVAL '20 days', 'Canchas de la FIM', 'https://images.unsplash.com/photo-1485686531765-ba63b07845a7?q=80&w=1740&auto=format&fit=crop');

-- 2. Insert Materials
INSERT INTO public.materials (faculty, course, title, file_url)
VALUES
  ('FIEE', 'Circuitos Digitales II', 'Solucionario Examen Parcial 2023-1', 'https://example.com/pdf1'),
  ('FIIS', 'Investigación de Operaciones', 'Resumen Teórico del Curso Completo', 'https://example.com/pdf2'),
  ('FIC', 'Estática', 'Práctica Dirigida 4 con respuestas', 'https://example.com/pdf3'),
  ('FC', 'Física Moderna', 'Diapositivas Semana 1 a 7 - Dr. Torres', 'https://example.com/pdf4');

-- 3. (Optional) We skip Forum posts because they require a valid user ID, which we don't have statically hardcoded. 
-- The user will be encouraged to create the first post.
