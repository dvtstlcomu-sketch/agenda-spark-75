export function renderErrorPage() {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Erro no Servidor</title>
      <style>
        body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #000; color: #fff; }
        .content { text-align: center; }
        h1 { font-size: 2rem; margin-bottom: 1rem; }
      </style>
    </head>
    <body>
      <div class="content">
        <h1>Ocorreu um erro inesperado</h1>
        <p>Tente recarregar a página.</p>
      </div>
    </body>
    </html>
  `;
}
