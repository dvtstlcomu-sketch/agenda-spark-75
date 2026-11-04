CREATE OR REPLACE FUNCTION public.list_manager_accounts()
RETURNS TABLE(id uuid, email text)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Apenas o CEO pode gerenciar gestores.' USING ERRCODE = '42501';
  END IF;
  RETURN QUERY SELECT u.id, u.email::text FROM auth.users u
    JOIN public.user_roles r ON r.user_id = u.id WHERE r.role = 'moderator' ORDER BY u.email;
END;
$$;
REVOKE ALL ON FUNCTION public.list_manager_accounts() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.list_manager_accounts() TO authenticated;

CREATE OR REPLACE FUNCTION public.approve_manager_account(manager_email text)
RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE target_id uuid;
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Apenas o CEO pode gerenciar gestores.' USING ERRCODE = '42501';
  END IF;
  SELECT u.id INTO target_id FROM auth.users u WHERE lower(u.email) = lower(trim(manager_email));
  IF target_id IS NULL THEN RAISE EXCEPTION 'Cadastro não encontrado. Peça ao gestor para criar sua conta e tente novamente.'; END IF;
  IF target_id = auth.uid() OR public.has_role(target_id, 'admin') THEN
    RAISE EXCEPTION 'Esta conta já possui acesso de CEO.';
  END IF;
  IF NOT public.has_role(target_id, 'moderator') THEN
    INSERT INTO public.user_roles(user_id, role) VALUES (target_id, 'moderator');
  END IF;
  RETURN target_id;
END;
$$;
REVOKE ALL ON FUNCTION public.approve_manager_account(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.approve_manager_account(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.revoke_manager_access(manager_id uuid)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Apenas o CEO pode gerenciar gestores.' USING ERRCODE = '42501';
  END IF;
  IF manager_id = auth.uid() OR public.has_role(manager_id, 'admin') THEN
    RAISE EXCEPTION 'Você não pode remover o acesso de um CEO.';
  END IF;
  DELETE FROM public.user_roles WHERE user_id = manager_id AND role = 'moderator';
END;
$$;
REVOKE ALL ON FUNCTION public.revoke_manager_access(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.revoke_manager_access(uuid) TO authenticated;