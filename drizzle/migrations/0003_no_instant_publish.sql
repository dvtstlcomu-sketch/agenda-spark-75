drop policy "Visitors can submit properties" on public.properties;

-- Visitantes enviam anúncios sempre como pendentes; só a equipe aprova.
create policy "Visitors can submit properties"
on public.properties
for insert
to anon
with check ((created_by IS NULL) AND (char_length(title) <= 120) AND (validated IS NOT TRUE));