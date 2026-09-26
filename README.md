# What Matters — Values for Two

A private, offline-first Progressive Web App for a two-person values card-sort conversation.

## Deploy to GitHub Pages

1. Create a new GitHub repository (for example `what-matters`).
2. Upload every file in this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)`, then Save.
6. Open the Pages URL GitHub gives you.

Because every asset uses relative paths, it works from a project URL such as:
`https://yourname.github.io/what-matters/`

## Install on iPhone

Open the site in Safari → Share → **Add to Home Screen**.

## App structure

- Two people take turns on the same device.
- Default deck: 48 balanced values.
- Each person narrows the deck through four rounds: 48 → 24 → 12 → 6 → 3.
- Right = keep; left = let go.
- Exact round sizes are enforced so the game always reaches three.
- Undo is available.
- First person's final choices remain hidden while the second person sorts.
- Final screens show each person's three and a combined conversation view.
- Screenshot Mode hides controls for a clean keepsake screenshot.
- Custom values can be added before the game.
- No server, account, analytics, or external JavaScript libraries.
- A service worker provides offline use after the first successful load.

## Research basis

The experience is a reflection tool, not a diagnostic or psychometric test.

It is informed by:
- Miller, W. R., C’de Baca, J., Matthews, D. B., & Wilbourne, P. L. (2001), Personal Values Card Sort, University of New Mexico (public domain).
- Schwartz and colleagues' theory/refined theory of basic human values, which emphasizes broad motivational coverage and tensions among values.

The wording in this app is newly written for this experience rather than reproducing a clinical instrument verbatim.
