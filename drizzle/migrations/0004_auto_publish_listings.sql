CREATE OR REPLACE FUNCTION public.force_pending_listing()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
BEGIN
  -- Temporário: anúncios de visitantes são publicados direto, sem aprovação.
  IF auth.uid() IS NULL OR NOT public.is_staff(auth.uid()) THEN
    NEW.validated := true;
    NEW.manager_reply := NULL;
    NEW.replied_at := NULL;
  END IF;
  RETURN NEW;
END $function$;