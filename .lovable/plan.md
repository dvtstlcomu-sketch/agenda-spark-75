# Plano de Implementação - Territorial Imóveis

Atualização completa do portal para refletir a autoridade da Territorial Imóveis e do CEO Silvio Moura, com novo design system, imagens de alta qualidade e recursos de conversão.

## Alterações Visuais e Design

- **Design System Moderno**: Transição para um background com degradê acinzentado sofisticado e acentos em amarelo ouro vibrante.
- **Tipografia Premium**: Implementação das fontes **Syne** (títulos impactantes) e **Instrument Sans** (corpo de texto elegante e legível).
- **Hero Section Revisitada**: 
    - Fundo com imagem de fazenda de alto padrão com baixa opacidade para um look técnico e sofisticado.
    - Foco total na marca institucional "Territorial Imóveis".
- **Identidade Visual**: Atualização da foto do CEO Silvio Moura para o novo retrato profissional fornecido.

## Conteúdo e Funcionalidades

- **Narrativa Institucional**: Criação de uma história envolvente para a Territorial Imóveis, focando em segurança jurídica, inteligência territorial e pioneirismo.
- **Correção de Dados**: Ajuste do CRECI de Silvio Moura para **151545** (removendo o sufixo 'F' conforme solicitado) e manutenção do CRECI 38258J da imobiliária.
- **WhatsApp Direto**: Implementação de um botão flutuante e chamadas para ação vinculadas ao número **(11) 2405-0300**.
- **CEO & Perito**: Nova seção dedicada à expertise de Silvio Moura com botão "Saiba mais sobre o CEO".
- **Estrutura Dinâmica**: Melhoria na organização do site para uma navegação mais fluida e interativa.

## Detalhes Técnicos

- Atualização das variáveis `@theme` no `src/styles.css`.
- Injeção das novas Google Fonts no `src/routes/__root.tsx`.
- Refatoração dos componentes de Seção no `src/routes/index.tsx` para suporte ao novo layout.
- Otimização das imagens de propriedades com foco em rural e alto padrão.
