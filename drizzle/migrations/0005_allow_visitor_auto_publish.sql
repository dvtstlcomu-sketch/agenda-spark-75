DROP POLICY IF EXISTS "Visitors can submit properties" ON public.properties;
CREATE POLICY "Visitors can submit properties" ON public.properties FOR INSERT TO anon, authenticated
WITH CHECK ((created_by IS NULL) AND (char_length(title) <= 120));