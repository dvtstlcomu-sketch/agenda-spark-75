# Plan - Restore Missing Sections and Finalize Order

Restore the missing "Imóveis" and "FAQ" sections to the website and ensure they follow the user's specific order.

## Proposed Changes

### Frontend Implementation
- Re-insert the `Imóveis` section after `Vozes da Experiência`.
- Re-insert the `FAQ` (Dúvidas Frequentes) section after `Imóveis`.
- Ensure all navigation links correctly anchor to these sections.
- Verify the final sequence:
  1. Início (Hero)
  2. Nossa História (CEO/Bio)
  3. Especialidades (Services)
  4. Projetos & Tecnologia (3D/Drone)
  5. Análise e Perícia (Lead Form)
  6. Vozes da Experiência (Testimonials)
  7. Imóveis (Property Grid)
  8. Dúvidas Frequentes (FAQ)
  9. Footer

### Content Updates
- Restore the property grid with 21 fictional properties (or a slice for the showcase).
- Restore the FAQ content regarding appraisals, technical mapping, and real estate services.

## Technical Details
- Use `code--write` to overwrite `src/routes/index.tsx` to ensure a clean JSX structure and avoid fragment/nesting errors from iterative edits.
- Maintain existing styles and animations (glassmorphism, scroll reveals).
- Ensure mobile responsiveness for the newly added sections.
