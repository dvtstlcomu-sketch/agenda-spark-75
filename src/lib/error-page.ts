// src/lib/error-page.ts
export function renderErrorPage() {
  return `
    <!DOCTYPE html>
    <html lang="pt-br">
      <head>
        <meta charset="utf-8">
        <title>Erro no Servidor</title>
        <style>
          body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0f172a; color: white; }
          .container { text-align: center; padding: 2rem; border-radius: 1rem; background: #1e293b; border: 1px solid #334155; }
          h1 { color: #facc15; }
          a { color: #38bdf8; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Ops! Algo deu errado.</h1>
          <p>Ocorreu um erro ao processar sua solicitação.</p>
          <a href="/">Voltar para o início</a>
        </div>
      </body>
    </html>
  `;
}
