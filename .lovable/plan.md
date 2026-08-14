# Plano de Responsividade Mobile - Territorial Imóveis

Ajustar o layout e a tipografia do site para garantir uma visualização perfeita em dispositivos móveis, corrigindo elementos que estão "fora de tamanho" ou desalinhados no celular.

## Alterações

### Navegação (Header)
- Implementar um menu mobile (hambúrguer) ou simplificar a barra de navegação para telas pequenas.
- Ajustar o tamanho da logo e do texto "TERRITORIAL IMÓVEIS" para não quebrar em telas estreitas.
- Reduzir a altura do header (`h-32` para `h-20` ou similar) no mobile.

### Seção Hero
- Ajustar o tamanho da fonte do título principal e da frase de impacto para que não transbordem ou fiquem excessivamente grandes no celular.
- Reorganizar a barra de busca para que os campos fiquem empilhados verticalmente no mobile.
- Ajustar o preenchimento (padding) para melhor aproveitamento do espaço.

### Grid de Serviços e Imóveis
- Garantir que os cards ocupem a largura total da tela em dispositivos pequenos (1 coluna).
- Ajustar os tamanhos de ícones e espaçamentos internos para melhor legibilidade.

### Seção Nossa História (CEO)
- Reorganizar o layout de Silvio Moura: a foto de fundo e o texto precisam se adaptar para que um não oculte o outro no formato vertical.
- Ajustar a citação da missão para melhor ajuste em telas pequenas.

### Rodapé (Footer)
- Corrigir a disposição dos ícones e textos de contato para evitar sobreposição (encavalamento).
- Ajustar o tamanho dos botões de WhatsApp e Call to Action.

## Detalhes Técnicos
- Uso extensivo de classes utilitárias do Tailwind (ex: `text-2xl md:text-5xl`, `flex-col md:flex-row`).
- Ajuste de `gap` e `padding` responsivos.
- Implementação de estado `isOpen` para o menu mobile (se necessário).
- Verificação de `overflow-hidden` em containers pai para evitar scroll horizontal.
