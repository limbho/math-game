# 🧮 Math Challenge

A lightweight Progressive Web App (PWA) designed to improve mental math skills and memorize physics formulas in a gamified way. Built entirely with vanilla HTML, CSS, and JavaScript.

**🔗 [Play the game here](https://limbho.github.io/math-game/)**

## 📲 Download for Android
[⬇️ Download the latest APK](https://github.com/limbho/math-game/raw/main/builds/MathChallenge_v1.0.apk)

## ✨ Features

- **Two Game Modes:** 
  - *Time Attack:* Solve as many questions as possible before the timer runs out.
  - *Survival:* You have 3 lives. Make a mistake and lose a heart!
- **Content Modes:** Choose between Arithmetic, Physics Formulas, or a Mix of both.
- **Dynamic Difficulty:** 
  - *Easy:* Simple numbers, basic formulas.
  - *Normal:* Standard numbers, all formulas.
  - *Hard:* Large numbers, and **two variables hidden** in formulas (you have to find the right one!).
- **Combo System:** Build up a streak of correct answers to earn score multipliers (up to ×4).
- **Beautiful Numbers:** Get a confetti explosion for hitting "beautiful" numbers (e.g., 100, 25, 121).
- **Themes:** Light, Dark, and System (auto-switches based on your OS).
- **Offline Ready:** Fully installable on Android/iOS and works completely offline.
- **Local Storage:** Your high score and preferences are saved directly in your browser.

## 🚀 The Evolution of the Project

This project was developed iteratively, starting as a simple script and evolving into a full-fledged PWA.

1. **The Core (v1.0):** 
   Started with basic HTML/CSS/JS to generate random arithmetic problems. The initial goal was to practice fast mental calculation.
2. **Adding Physics & Modules (v2.0):** 
   Implemented a modular physics formula database. Instead of hardcoding every question, the code dynamically generates variations (e.g., `F = m·a`, `? = m·a`, `F = ?·a`). Also introduced a "Smart Weight System" to prevent the same questions from appearing too often.
3. **Gamification (v3.0):** 
   Added score multipliers for streaks (Combo), a confetti effect for milestone numbers, and a local high-score tracker to boost replayability.
4. **UI/UX & Themes (v4.0):** 
   Redesigned the mobile layout. Moved the theme toggle to the corner, added an adaptive stats panel, and introduced smooth fade-in animations for new questions.
5. **Game Modes (v5.0):** 
   Introduced the "Survival" mode (3 lives) alongside the classic "Time Attack" mode.
6. **PWA & Android App (v6.0):** 
   Implemented a Service Worker for offline caching. Packaged the web app via PWABuilder into a Trusted Web Activity (TWA) for Android. Set up Digital Asset Links to remove the browser address bar, making it look and feel like a native app.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+).
- **PWA:** Web App Manifest, Service Worker (Network First strategy).
- **Libraries:** [canvas-confetti](https://github.com/catdad/canvas-confetti) (via CDN) for visual effects.
- **Hosting:** GitHub Pages.
- **Android Packaging:** PWABuilder (TWA).

## 📱 How to Install (Mobile)

1. Open the [game link](https://limbho.github.io/math-game/) in Chrome (Android) or Safari (iOS).
2. Tap the browser menu and select **"Add to Home Screen"** (or "Install App").
3. The game will appear on your device as a standalone application without browser UI.

## 👨‍💻 Author

**Ivan Ovcharov** (limbho)
*College Project*
