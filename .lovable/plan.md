# Plan: Responding to "Possível se transformar em app?"

The user is asking if it's possible to transform the website into an app ("possível se transformar em app?"). In modern web development, this is highly achievable using Progressive Web App (PWA) technology, which allows the website to be installed on home screens and function like a native app.

## Proposed Changes

### 1. Add PWA support
- Update the application metadata to support mobile "app" features.
- Configure manifest-like settings in the root layout to allow "Add to Home Screen" behavior.
- Add specific iOS/Android meta tags for status bars, splash screens, and app naming.

### 2. Implement "Install App" UI
- Add a subtle "Instalar App" button or prompt in the navigation/footer to guide users on how to add the site to their devices.

### 3. Respond to User
- Confirm that it is indeed possible and that PWA features have been enabled to provide an app-like experience.

## Technical Details

- **Meta Tags**: Add `mobile-web-app-capable`, `apple-mobile-web-app-capable`, and `apple-mobile-web-app-status-bar-style` to `src/routes/__root.tsx`.
- **Icons**: Ensure brand icons are correctly mapped for home screen use.
- **Service Worker**: (Optional/Future) If offline support is needed, a service worker could be added, but for now, "web app" capabilities focus on UI/UX integration.
