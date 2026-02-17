# Specification

## Summary
**Goal:** Use the uploaded NCW Adventures emblem as the official app logo across the UI and as the browser/favicon app icon.

**Planned changes:**
- Copy the uploaded logo image into `frontend/public` under a stable, app-controlled path that can be referenced via a direct `/assets/...` URL.
- Update the landing page (PortalHome) to display the logo near the main heading without overlapping existing hero content.
- Update the in-app header (GamificationHeader) to show the logo on all non-landing views, including mobile-safe layout, and add appropriate English alt text.
- Add favicon/app icon `<link rel="icon">` (and related) tags in `frontend/index.html` pointing to logo-derived icon assets in `frontend/public`.
- Generate and include logo-derived icon variants in `frontend/public/assets/generated` for favicon/app icon usage.

**User-visible outcome:** The NCW Adventures logo is visible on the landing page and in the app header across the app, and the browser tab/favicon uses the NCW Adventures icon.
