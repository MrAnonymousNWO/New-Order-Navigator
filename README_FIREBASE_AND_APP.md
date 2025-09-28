Firebase & App Distribution — Quick Setup

1) FIREBASE_TOKEN (CI token for firebase-tools)

Install firebase-tools locally and generate a CI token:

```bash
npm install -g firebase-tools
firebase login
firebase login:ci
```

Copy the token output and add it to GitHub repository secrets as `FIREBASE_TOKEN`.

2) FIREBASE_PROJECT

If you want to explicitly target a project in CI, add the project id as `FIREBASE_PROJECT` in your repository secrets. Otherwise `.firebaserc` contains the default project.

3) Firebase App Distribution (optional)

Create a Firebase App in the console and take its App ID (starts with `1:`...). Add it as `FIREBASE_APP_ID` in repository secrets to enable automatic distribution of built APKs.

4) Keystore for Android (if building signed release)

If you need to sign the APK, add the keystore file to secrets using GitHub Actions encrypted files or better: use a secure upload and load it during the workflow. You'll need `KEYSTORE_PASSWORD`, `KEY_ALIAS`, and `KEY_PASSWORD` as secrets and to modify `android/gradle.properties` during the workflow.

5) Trigger & Inspect

- The web deploy runs on push to `main`. Ensure `web/` has the Next.js project and the workflow will build and export it.
- The app workflow runs on push to `main` and on manual dispatch. It will upload APK artifact and distribute to Firebase App Distribution if `FIREBASE_TOKEN` and `FIREBASE_APP_ID` are set.

If you want, I can:
- Add keystore handling to the app workflow
- Create a release tagging flow that only builds when a GitHub Release is created
- Add Slack/Telegram notifications after deploys
