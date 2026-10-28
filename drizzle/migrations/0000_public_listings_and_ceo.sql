ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS owner_name text, ADD COLUMN IF NOT EXISTS owner_phone text, ADD COLUMN IF NOT EXISTS documentation text, ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
ALTER TABLE public.properties ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE public.properties ALTER COLUMN validated SET DEFAULT true;
GRANT SELECT, INSERT ON public.properties TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.properties TO authenticated;
GRANT ALL ON public.properties TO service_role;
CREATE POLICY "Visitors can submit properties" ON public.properties FOR INSERT TO anon WITH CHECK (created_by IS NULL AND char_length(title) <= 120);
CREATE POLICY "Signed in can view validated properties" ON public.properties FOR SELECT TO authenticated USING (validated = true);

CREATE OR REPLACE FUNCTION public.assign_first_admin() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles(user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.assign_first_admin();

CREATE POLICY "Anyone can upload property photos" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'property-photos');
CREATE POLICY "Anyone can view property photos" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'property-photos');
CREATE POLICY "Admins delete property photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'property-photos' AND public.has_role(auth.uid(), 'admin'));