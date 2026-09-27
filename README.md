# What Matters — Values Reflection (v3)

A private, offline-first Progressive Web App for independently narrowing a research-informed values deck to three values.

## How it works

- Each person opens the same GitHub Pages app on their own device.
- Enter only your own name. No accounts, room codes, Firebase, database, or server are used.
- Swipe **right / Keep** or **left / Let go**.
- There is **no quota** during a round. You may keep as many cards as you like.
- The next round consists only of the cards you kept.
- Rounds continue for as long as needed until exactly three values remain.
- If you keep fewer than three, the app lets you restore values from that round.
- If you keep every value, you simply go through the same set again.
- When exactly three remain, the app **always shows all three as large final cards before Finish is available**.
- **Screenshot mode** hides the interface so the three-card result can be saved cleanly.
- After finishing, **View my three again** returns to the screenshot screen.

## GitHub Pages

Upload these files to the repository root:

- `index.html`
- `app.js`
- `manifest.webmanifest`
- `sw.js`
- `icon-192.png`
- `icon-512.png`

Then go to **Settings → Pages → Deploy from a branch → main → /(root)**.

## Privacy

The app is entirely static. Choices are processed only in the browser and are not transmitted or stored in a remote database. Each user keeps their result by taking a screenshot.

## Research basis

This is a reflection and conversation tool, not a diagnostic or scored psychometric assessment. Its deck and interaction are informed by values card-sort practice, including the public-domain Personal Values Card Sort, and Schwartz's theory of basic human values. Card descriptions are original wording for this app.
