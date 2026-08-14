# Plan - Reorder Website Sections

Reorganize the layout of `src/routes/index.tsx` to follow the user's requested narrative flow.

## Proposed Changes

### Content Reordering
- Move "Nossa História" (CEO & Story) to the top position after the Hero.
- Position "Nossas Especialidades" immediately after history.
- Place the "Imóveis" (Curadoria) section next.
- Follow with "Análise e Perícia" (Lead Generation).
- Include the "FAQ" (Dúvidas Frequentes) section.
- Move "Projetos & Tecnologia" to the final content position before the footer.
- Relocate "Testemunhos" to follow Projects.

### Navigation Updates
- Update the desktop header menu links to match the new order: Início, Nossa História, Especialidades, Imóveis, Projetos, Dúvidas.
- Update the mobile menu dropdown links to maintain consistency.

### Section Refinements
- Ensure anchors (`id`) and section headers are consistent with the new hierarchy.
- Verify visual transitions (gradients, borders) between reordered sections.

## Technical Details
- The implementation involves moving large JSX blocks within the `Index` component in `src/routes/index.tsx`.
- Anchor links (`href="#..."`) will be updated to reflect the logical flow.
- "Analise Pericial" is mapped to the existing Lead Generation section.
- "Curadoria" is mapped to the existing Property Showcase section.
