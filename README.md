# What Matters — Values for Two (v2)

A two-device, realtime Progressive Web App for independently narrowing a values deck to three values each.

## What changed in v2

- **No forced quota inside a round.** You may keep every card, one card, or anything in between.
- The next round is generated from exactly what you kept.
- If more than 3 remain, another round starts automatically.
- If exactly 3 remain, those are your final three.
- If fewer than 3 remain, the app shows the values you released in that round and lets you restore as many as you like.
- If you keep every value in a round, the app simply gives you another pass through the same set. It never blocks later cards because an arbitrary quota was filled.
- Each person now uses **their own device**.
- One person creates a room, shares an 8-character room code/link, and the other joins it.
- Each person enters only their own name and sorts privately.
- Final results appear together only after both participants have finished.

## Why Firebase is needed

GitHub Pages can host the app, but it cannot itself store shared realtime state between two phones. This version uses Firebase Realtime Database plus anonymous Firebase Authentication. Neither participant needs to create an account or use a password.

## One-time Firebase setup

1. Go to https://console.firebase.google.com/ and create a Firebase project.
2. **Authentication** → **Sign-in method** → enable **Anonymous**.
3. **Realtime Database** → create a database.
4. Open **Realtime Database → Rules** and replace the rules with the contents of `firebase-rules.json`, then publish them.
5. **Project settings → Your apps → Web app**. Register a web app if needed.
6. Firebase will show a `firebaseConfig` object. Copy its values into `firebase-config.js`.
   - Make sure `databaseURL` is included. You can copy it from the Realtime Database page if Firebase does not include it automatically.
7. Upload all files in this folder to your GitHub Pages repository.

The app imports the Firebase Web SDK directly from Google's CDN, so there is no npm/build step.

## GitHub Pages

1. Create/open your GitHub repository.
2. Upload all files from this folder to the repository root.
3. GitHub → **Settings → Pages**.
4. Choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save and open the Pages URL.

All paths are relative, so a project URL such as `https://username.github.io/what-matters/` works.

## Typical use

1. Scott opens the PWA and taps **Enter a shared room → Create room**.
2. He enters `Scott` and receives a code such as `K7PX4QRM`.
3. He sends Laura the room link or code.
4. Laura opens the app on her own phone, enters `Laura`, and joins the room.
5. Both can press **Start my sort** and work independently at the same time.
6. Each round returns only values that person kept.
7. When each reaches three, their result is uploaded to the room.
8. Once both are finished, **Reveal our values** becomes available on both devices.

## Privacy / security model

- Room members sign in through Firebase anonymously.
- Database writes are limited by the supplied rules so a user can only write their own member record.
- The 8-character room code acts as the room's shared locator. Anyone who knows a valid room code and can anonymously authenticate could read that room, so do not use this app for highly sensitive/confidential information.
- Values and names remain in the Firebase room until you delete the room/database data. For a private couple exercise this is usually sufficient, but it is not designed as a clinical-record system.

## Local preview

If `firebase-config.js` has not been filled in yet, the app exposes **Preview sorting locally**. This lets you test the new unlimited-round behaviour on one device, but combined two-device results require Firebase.

## Research basis

This is a reflection and conversation tool, not a diagnostic or scored psychometric assessment. The deck and interaction are informed by values card-sort practice (including the public-domain Personal Values Card Sort) and Schwartz's theory of basic human values. Card descriptions in this app are newly written rather than copied from a clinical instrument.
