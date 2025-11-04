# Portfolio — MBZUAI Application

This is a single-page portfolio designed to support an application to MBZUAI (Mohammed bin Zayed University for AI). It has a dark, game-like visual style with neon accents and interactive elements.

Files added:
- `index.html` — main page
- `assets/css/style.css` — styles and color tokens
- `assets/js/script.js` — lightweight interactions (orb, parallax, project tilt)
Additional files added for the gamified implementation:
- `assets/css/gamification.css` — styles for HUD, modals, notifications
- `assets/js/gamification-engine.js` — lightweight gamification engine (demo)
- `assets/js/skill-tree.js` — skill-tree placeholder
- `assets/js/achievement-system.js` — achievement system placeholder
- `assets/js/interaction-manager.js` — interaction manager placeholder
- `implementation.html` — condensed implementation notes and next steps

How to preview:
1. Open `index.html` in any modern browser (Chrome/Edge/Firefox).
2. Edit the placeholder text (Your Name, email, and links) to your real details.

See `implementation.html` for a summary of the implementation plan and where each gamification file lives.

Customizing tips:
- Replace the avatar image with your photo (update the `img` src in `index.html`).
- Replace project descriptions and GitHub/LinkedIn links.
- To change main accent colors, edit variables at the top of `assets/css/style.css`.

Accessibility & notes:
- The design focuses on visuals — ensure alt text and contrast for key elements if you change colors.
- This is intentionally lightweight (no build tools required). Just open the HTML file.
