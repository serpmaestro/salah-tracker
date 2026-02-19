# 🕌 Qaza Tracker — PWA Installation Guide

A beautiful, fully offline Islamic prayer tracker you can install on any phone like a native app.

---

## 📱 How to Install on Your Phone

### Option A — Easiest: Use GitHub Pages (Free Hosting)

1. Create a free account at [github.com](https://github.com)
2. Create a new **public repository** (e.g., `qaza-tracker`)
3. Upload **all files from this folder** into the repository
4. Go to repository **Settings → Pages → Source → main branch → / (root)**
5. GitHub will give you a URL like: `https://yourusername.github.io/qaza-tracker/`
6. Open that URL on your phone and follow the install steps below ↓

---

### Android — Chrome
1. Open the app URL in **Chrome**
2. Tap the **⋮ menu** (top right)
3. Tap **"Add to Home screen"** or **"Install app"**
4. Tap **Install** → Done! The app icon appears on your home screen

### iPhone / iPad — Safari
1. Open the app URL in **Safari** (must be Safari, not Chrome)
2. Tap the **Share button** (box with arrow at bottom)
3. Scroll down → tap **"Add to Home Screen"**
4. Tap **Add** → Done!

---

## 🔄 Backup, Export & Import (Switching Phones)

All data is saved **locally on your device**. Use the built-in backup system to move data between phones.

### Before changing phones:
1. Open the app → go to **Settings** tab (bottom nav)
2. Tap **📥 Export Backup**
3. A file named `qaza-tracker-backup-YYYY-MM-DD.json` will be saved to your Downloads
4. Send this file to yourself (WhatsApp, email, Google Drive, etc.)

### On the new phone:
1. Install the app (follow steps above)
2. Go to **Settings** tab → tap **📤 Import Backup**
3. Select the `.json` file you transferred
4. All your prayer data will be restored instantly ✓

---

## 📂 File Structure

```
qaza-tracker-pwa/
├── index.html        ← The full app (works offline)
├── manifest.json     ← Makes it installable as PWA
├── sw.js             ← Service worker (enables offline use)
├── icons/
│   ├── icon-192.png  ← App icon
│   └── icon-512.png  ← Splash screen icon
└── README.md         ← This file
```

---

## ✨ Features

- 🕌 Track 5 daily prayers: Fajr, Dhuhr, Asr, Maghrib, Isha
- 📊 Mark each prayer as: On Time ✓ | Qaza 🕌 | Missed ✗
- 👥 Multiple profiles (for family members)
- 📅 Calendar view to navigate dates
- 📈 Weekly & Monthly reports with PDF export
- 🔄 Full backup & restore (JSON file)
- 📶 Works 100% offline after first load
- 💾 All data stays on YOUR device (no cloud, no account needed)

---

## 🔒 Privacy

All data is stored locally using your browser's `localStorage`. Nothing is sent to any server. Your prayer data is yours alone.

---

*May Allah accept your prayers and make your Qaza easy. آمین*
