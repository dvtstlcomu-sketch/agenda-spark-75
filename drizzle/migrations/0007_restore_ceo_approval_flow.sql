CREATE OR REPLACE FUNCTION public.force_pending_listing()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
BEGIN
  -- Anúncios enviados por visitantes/clientes começam pendentes e só aparecem
  -- no site depois da aprovação do CEO/gestor no painel.
  IF TG_OP = 'INSERT' THEN
    IF auth.uid() IS NULL OR NOT public.is_staff(auth.uid()) THEN
      NEW.validated := false;
      NEW.manager_reply := NULL;
      NEW.replied_at := NULL;
    END IF;
  ELSIF auth.uid() IS NULL OR NOT public.is_staff(auth.uid()) THEN
    NEW.validated := OLD.validated;
    NEW.manager_reply := OLD.manager_reply;
    NEW.replied_at := OLD.replied_at;
  END IF;
  RETURN NEW;
END $function$;