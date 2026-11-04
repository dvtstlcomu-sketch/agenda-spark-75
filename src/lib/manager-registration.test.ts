import { describe, expect, test } from "bun:test";
import { registerManager } from "./manager-registration";

describe("manager registration", () => {
  test("does not sign up or grant access when CEO authorization is denied", async () => {
    let signups = 0;
    await expect(registerManager({ approve: async () => ({ error: { message: "Apenas o CEO pode gerenciar gestores." } }), signUp: async () => { signups++; return { error: null }; } }, "manager@example.com", "12345678")).rejects.toThrow("Apenas o CEO");
    expect(signups).toBe(0);
  });
  test("approves the new account only after a successful signup", async () => {
    const calls: string[] = [];
    await registerManager({ approve: async (email) => { calls.push(`approve:${email}`); return { error: calls.length === 1 ? { message: "Cadastro não encontrado" } : null }; }, signUp: async () => { calls.push("signup"); return { error: null }; } }, " Manager@example.com ", "12345678");
    expect(calls).toEqual(["approve:manager@example.com", "signup", "approve:manager@example.com"]);
  });
  test("never approves access after a failed signup", async () => {
    let approvals = 0;
    await expect(registerManager({ approve: async () => { approvals++; return { error: { message: "Cadastro não encontrado" } }; }, signUp: async () => ({ error: { message: "Senha rejeitada" } }) }, "manager@example.com", "12345678")).rejects.toThrow("Senha rejeitada");
    expect(approvals).toBe(1);
  });
  test("does not overwrite the password of an existing manager", async () => {
    let signups = 0;
    await registerManager({ approve: async () => ({ error: null }), signUp: async () => { signups++; return { error: null }; } }, "manager@example.com", "12345678");
    expect(signups).toBe(0);
  });
});