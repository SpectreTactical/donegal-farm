# Donegal Farm – admin setup (remaining steps)

These steps are already done: the Firebase project `donegal-farm`, the web app, Email/Password sign-in,
`spectretactical.github.io` as an authorised domain, and Firestore (Standard, africa-south1, production mode).
The app's `FIREBASE_CONFIG` has been filled in at the top of `index.html`, in the block marked `FIREBASE CONFIG`.

## 1. Publish the security rules
1. Go to https://console.firebase.google.com → project **donegal-farm** → **Firestore Database** → **Rules** tab.
2. Delete everything in the editor and paste the full contents of `firestore.rules` from this folder.
3. Click **Publish**.
   The first line should be `rules_version = '2';` and it ends with the `match /{document=**}` deny-all block.

   (CLI alternative: `firebase deploy --only firestore:rules --project donegal-farm`, run from a folder that holds `firestore.rules` and a `firebase.json` with `{"firestore":{"rules":"firestore.rules"}}`.)

## 2. Upload the app to GitHub Pages
1. Upload `index.html`, `sw.js`, `README.md`, `firestore.rules` and `ADMIN-SETUP.md` to the root of the
   `SpectreTactical/donegal-farm` repository, on the main branch.
2. Repository **Settings → Pages**: Source **Deploy from a branch**, branch **main**, folder **/ (root)**.
3. Open https://spectretactical.github.io/donegal-farm/. The sign-in screen should show **Herd Tracker v2.0**.

## 3. Gideon registers in the app
1. Open https://spectretactical.github.io/donegal-farm/ → **Create an account**, using your name, email and a password.
2. You'll land on **Waiting for approval**. Leave that page open.
   The app has just created your request, `members/{your uid}`, with `role: "member"` and `approved: false`.

## 4. Make Gideon the first admin, by hand (one time only)
1. In the Firebase console → **Firestore Database** → **Data** tab, open the **members** collection.
2. Click the single document in it; its ID is your uid. You can confirm it under **Authentication → Users**, in the
   **User UID** column next to your email.
3. Edit the fields:
   - `approved`: click the value and change it to **true** (type stays *boolean*).
   - `role`: change the value from `member` to **admin** (type stays *string*).
   Leave `name`, `email` and `createdAt` unchanged. Don't add any other fields.
4. Save. The waiting page opens the app by itself within a second or two, and a **Members** tab appears.

From then on, nothing needs the console:
- New family members register in the app and appear on **Members → Waiting for approval**. Tap **Approve** or **Reject**.
- Use **Make admin** to make a second admin (for example Dad), so the farm never depends on a single admin.
- **Remove** cuts a person's access at once; the records they entered are kept.
  Their login itself can be deleted under **Authentication → Users** if wanted.
- Admins can't demote or remove themselves, so the farm can't end up without an admin by accident.

## 5. Move over the old local-only data (if any)
Sign in as admin on the device that has the old v1 app data, which lives in that browser's storage.
The app offers **Upload to farm database** and skips duplicates and example records.
A v1 JSON backup can also be uploaded under **Data → Upload from backup file…**.
