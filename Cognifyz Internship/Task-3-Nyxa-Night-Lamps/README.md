# Nyxa — Night Lamps

A single-page storefront for Nyxa, a small-batch night lamp shop. Every lamp card runs its own live light behavior in the browser — tap a lamp and watch it breathe, flicker, drift, ripple, or twinkle in real time.

**Live demo:** [task-3-nyxa-site.onrender.com](https://task-3-nyxa-site.onrender.com)

## Features

- Responsive product grid (Bootstrap 5) showcasing 8 lamps, each with a distinct animated glow effect
- Interactive lamp cards — click or press Enter/Space to toggle a lamp on/off
- Shipping & returns info section
- Contact section with phone and address
- No build step — plain HTML, CSS, and JS

## Project structure

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    ├── halo.jpg
    ├── drift.jpg
    ├── ember.jpg
    ├── lull.jpg
    ├── nova.jpg
    ├── tide.jpg
    ├── pulse.jpg
    └── mono.jpg
```

## The lamps

| Lamp | Price | Behavior |
|------|-------|----------|
| Halo | ₹300 | Breathing glow · 4.5s cycle |
| Drift | ₹250 | Hue cycle · 10s loop |
| Ember | ₹150 | Candle flicker · irregular |
| Lull | ₹400 | Ripple pulse · 3.2s cycle |
| Nova | ₹550 | Twinkle field · random |
| Tide | ₹500 | Vertical wash · 6s cycle |
| Pulse | ₹400 | Steady · no animation |
| Mono | ₹300 | Steady · no animation |

## Running locally

Just open `index.html` in a browser — no server or build tools required. For local development with live reload, you can use any static file server, e.g.:

```bash
npx serve .
```

## Deployment

Deployed as a static site on [Render](https://render.com):

1. Push this repo to GitHub
2. Create a new Static Site on Render, connect the repo
3. Build command: leave blank
4. Publish directory: `.`

Live at: **https://task-3-nyxa-site.onrender.com**

## Tech

- HTML5 / CSS3
- Vanilla JavaScript
- [Bootstrap 5.3.3](https://getbootstrap.com/) (via CDN)
- Google Fonts: Newsreader, Inter

---

© 2026 Nyxa — small-batch night lamps
