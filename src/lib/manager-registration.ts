type RegistrationServices = {
  approve: (email: string) => Promise<{ error: { message: string } | null }>;
  signUp: (email: string, password: string) => Promise<{ error: { message: string } | null }>;
};

export async function registerManager(services: RegistrationServices, emailInput: string, password: string) {
  const email = emailInput.trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Email inválido.");
  if (password.length < 8) throw new Error("A senha precisa ter pelo menos 8 caracteres.");
  const existing = await services.approve(email);
  if (!existing.error) return;
  if (!existing.error.message.includes("Cadastro não encontrado")) throw new Error(existing.error.message);
  const created = await services.signUp(email, password);
  if (created.error) throw new Error(created.error.message);
  const approved = await services.approve(email);
  if (approved.error) throw new Error(approved.error.message);
}