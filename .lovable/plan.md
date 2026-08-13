# Plano de Modernização Premium - Territorial Imóveis

Elevação do portal para um padrão de excelência internacional, com foco em requinte, modernidade e alta conversão.

## Design & Experiência do Usuário (UX/UI)

- **Identidade Visual Refinada**: 
    - Transição para um esquema de cores "Midnight & Champagne Gold" (Navy profundo com detalhes em dourado acetinado).
    - Aplicação de **Glassmorphism** e **Neumorphism** sutis para profundidade.
- **Tipografia de Luxo**: 
    - Implementação de **Cormorant Garamond** ou similar para títulos clássicos/serifados sofisticados contrastando com **Manrope** ou **Plus Jakarta Sans** para corpo técnico.
- **Navegação Inteligente**: 
    - Reformulação total dos botões do menu e índice, usando animações de hover personalizadas e micro-interações.
- **Seção "Cidade" (Guarulhos)**: 
    - Criação de uma seção moderna e dinâmica sobre a atuação estratégica em Guarulhos, com estatísticas e imagens de drones.

## Novas Funcionalidades & Páginas

- **Página de Serviços Dedicada**: Expansão dos serviços técnicos (Perícia, Topografia, Administração) em uma estrutura detalhada.
- **Página de Projetos Exclusiva**: Galeria interativa de cases de sucesso e medições técnicas.
- **Formulário de Leads Avançado**: 
    - Implementação de um formulário de captação de leads (Leds) otimizado com campos condicionais e design premium.
- **SEO & Performance**: 
    - Configuração de **Rich Snippets** (JSON-LD) para imóveis e serviços periciais.
    - Otimização de meta tags dinâmicas para cada seção.

## Detalhes Técnicos

- Atualização das variáveis `@theme` no `src/styles.css` com novos tokens de cor e sombra.
- Reestruturação das rotas TanStack para suportar `/servicos` e `/projetos`.
- Implementação de animações de scroll avançadas com `framer-motion` (ou Tailwind transitions otimizadas).
