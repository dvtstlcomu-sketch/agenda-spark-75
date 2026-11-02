import { createClient } from "@supabase/supabase-js";

// Endereço exato do seu projeto Supabase (enthethwinrmgrndwzh)
const SUPABASE_URL = "https://enthethwinrmgrndwzh.supabase.co";

// Chave pública de publicação
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_hJPoKQ7CWW1MpyQ1lVb8XA_4FxJ6XZC";

// Instância única resiliente - impede exceções e avisos vermelhos na interface
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
