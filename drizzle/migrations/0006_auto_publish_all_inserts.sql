CREATE OR REPLACE FUNCTION public.force_pending_listing()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
BEGIN
  -- Temporário: todo anúncio novo é publicado direto, sem aprovação.
  IF TG_OP = 'INSERT' THEN
    NEW.validated := true;
    IF auth.uid() IS NULL OR NOT public.is_staff(auth.uid()) THEN
      NEW.manager_reply := NULL;
      NEW.replied_at := NULL;
    END IF;
  ELSIF auth.uid() IS NULL OR NOT public.is_staff(auth.uid()) THEN
    NEW.validated := OLD.validated;
  END IF;
  RETURN NEW;
END $function$;