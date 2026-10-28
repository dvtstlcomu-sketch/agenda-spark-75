CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','moderator'))
$$;

ALTER TABLE public.properties ALTER COLUMN validated SET DEFAULT false;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS manager_reply text;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS replied_at timestamptz;

CREATE OR REPLACE FUNCTION public.force_pending_listing()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT public.is_staff(auth.uid()) THEN
    NEW.validated := false;
    NEW.manager_reply := NULL;
    NEW.replied_at := NULL;
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_force_pending_listing ON public.properties;
CREATE TRIGGER trg_force_pending_listing BEFORE INSERT ON public.properties
FOR EACH ROW EXECUTE FUNCTION public.force_pending_listing();

DROP POLICY IF EXISTS "Admins can delete properties" ON public.properties;
DROP POLICY IF EXISTS "Admins can update properties" ON public.properties;
DROP POLICY IF EXISTS "Authenticated can view own properties" ON public.properties;
CREATE POLICY "Staff can delete properties" ON public.properties FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Staff can update properties" ON public.properties FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Authenticated can view own or staff properties" ON public.properties FOR SELECT TO authenticated USING (created_by = auth.uid() OR public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Admins delete property photos" ON storage.objects;
CREATE POLICY "Staff delete property photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'property-photos' AND public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Admins can read all roles" ON public.user_roles;
CREATE POLICY "Admins can read all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));