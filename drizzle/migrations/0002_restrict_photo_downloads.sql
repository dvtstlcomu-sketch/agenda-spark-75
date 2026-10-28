drop policy if exists "Anyone can view property photos" on storage.objects;

-- Leitura direta pelo Storage fica restrita à equipe (CEO/gestores).
-- O site público continua mostrando as fotos por links temporários gerados no servidor.
create policy "Staff can view property photos"
on storage.objects
for select
to authenticated
using (bucket_id = 'property-photos' and public.is_staff(auth.uid()));