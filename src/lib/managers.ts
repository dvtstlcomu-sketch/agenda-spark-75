import { createClient } from "@supabase/supabase-js";
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/integrations/supabase/client";
import { registerManager } from "./manager-registration";

export async function listManagers() {
  const { data, error } = await supabase.rpc("list_manager_accounts");
  if (error) throw new Error(error.message);
  return (data ?? []) as { id: string; email: string }[];
}

export async function createManager(input: { email: string; password: string }) {
  await registerManager({
    approve: (email) => supabase.rpc("approve_manager_account", { manager_email: email }),
    signUp: async (email, password) => {
      // Sign-up must not replace the CEO's stored session or auth listeners.
      const registration = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false, storageKey: "territorial-manager-registration" },
      });
      return registration.auth.signUp({ email, password });
    },
  }, input.email, input.password);
}

export async function removeManager(id: string) {
  const { error } = await supabase.rpc("revoke_manager_access", { manager_id: id });
  if (error) throw new Error(error.message);
}