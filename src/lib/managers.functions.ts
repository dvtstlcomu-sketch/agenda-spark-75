import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(supabase: any, userId: string) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (!data) throw new Error("Apenas o CEO pode gerenciar gestores.");
}

export const listManagers = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roles } = await supabaseAdmin.from("user_roles").select("user_id").eq("role", "moderator");
    const out: { id: string; email: string }[] = [];
    for (const r of roles ?? []) {
      const { data } = await supabaseAdmin.auth.admin.getUserById(r.user_id);
      if (data.user) out.push({ id: data.user.id, email: data.user.email ?? "" });
    }
    return out;
  });

export const createManager = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { email: string; password: string }) => {
    const email = String(input.email ?? "").trim().toLowerCase();
    const password = String(input.password ?? "");
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Email inválido.");
    if (password.length < 8) throw new Error("A senha precisa ter pelo menos 8 caracteres.");
    return { email, password };
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });
    if (error || !created.user) throw new Error(error?.message ?? "Não foi possível criar o gestor.");
    // first-user trigger may not apply; ensure only moderator role
    await supabaseAdmin.from("user_roles").delete().eq("user_id", created.user.id).eq("role", "admin");
    const { error: roleErr } = await supabaseAdmin.from("user_roles").insert({ user_id: created.user.id, role: "moderator" });
    if (roleErr) throw new Error(roleErr.message);
    return { ok: true };
  });

export const removeManager = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => ({ id: String(input.id) }))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    if (data.id === context.userId) throw new Error("Você não pode remover a própria conta.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: isMod } = await supabaseAdmin.from("user_roles").select("id").eq("user_id", data.id).eq("role", "moderator").maybeSingle();
    if (!isMod) throw new Error("Usuário não é gestor.");
    await supabaseAdmin.auth.admin.deleteUser(data.id);
    return { ok: true };
  });
