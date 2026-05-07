# 🐍 Snake Rush
 
> A fast-paced, browser-based Snake game built with vanilla HTML, CSS, and JavaScript, with the twist of difficulty scaling and personalized appearance settings that make every run feel like yours.
 
---

## 🎮 About
 
Snake Rush is a classic Snake game with difficulty that scales with your snake length. In other words, the longer your snake becomes, the faster your snake moves and the harder it is to stay alive.

Before jumping in, players enter their name, age, and two favourite colours, which the game uses to customize the game appearance to your preferences and theme the snake, food, UI borders, and stat display in real time.
 
This project was one of the first official web apps I made while I was learning web development, HTML, CSS, and JavaScript. As a result, it was a hands-on deep dive into core web development concepts I hadn't worked with before, including DOM manipulation, sessionStorage, cell mapping with collision detection, and responsive design.

---
 
## ✨ Features

- 🎨 **Fully personalized theming** — your two favourite colours customize the snake, food, borders, and HUD
- 📱 **Mobile + desktop controls** — arrow keys on desktop, on-screen D-pad on mobile (with full touch event support)
- ⚡ **Progressive difficulty** — the snake speeds up as you grow in length, with an 80ms cap
- 🔄 **Round system** — every 20 segments earned advances you to a new round, announced with a 3-second overlay
- 💀 **Game over screen** — shows your final name, age, round, and snake length on collision
- 🏆 **Win condition** — fill the entire grid with your snake to trigger the win screen
- 📐 **Responsive grid** — the game board recalculates and reloads on window resize to always fit your screen
- ❓ **In-game help panel** — a toggleable instructions overlay available mid-game

---
 
## 🗂️ Project Structure

```
snakerush/
├── index.html              # Welcome screen and player profile form
├── css/
│   └── styles.css          # Styling for the home screen and game UI
├── js/
│   └── index.js            # Form handler that saves inputs to sessionStorage and redirects to game
└── game/
    ├── snakegame.html      # Game screen: grid, HUD, overlays, mobile controls
    └── snakegame.js        # Core game logic: movement, collision, rendering, speed, win/lose
```

---
 
## 🚀 Getting Started
 
### Run Locally
 
1. **Clone the repository**
   ```bash
   git clone https://github.com/jgebrete/snakerush.git
   cd snakerush
   ```
 
2. **Open in your browser**
   ```bash
   open index.html
   ```
   Or just double-click `index.html` — no server required.
   
### Play in the Browser
 
You can also host it instantly using [GitHub Pages](https://pages.github.com/) or drag the folder into [VS Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

[Snake Rush](https://jgebrete.github.io/snakerush) is currently already hosted on GitHub Pages.
 
---

## 🕹️ How to Play
 
1. Open `index.html` in your browser
2. Enter your **name**, **age**, and pick **two colours** (snake colour + food colour)
3. Click **Play**, so your settings are saved to session storage and you're redirected to the game
4. Steer your snake using **arrow keys** (desktop) or the **on-screen D-pad** (mobile)
5. Eat food to grow longer, with each piece eaten increasing your length and slightly increasing speed
6. Avoid the walls and your own body or fill the entire board to win!

---
 
## 🛠️ Tech Stack
 
| Technology | Role |
|------------|------|
| HTML5 | Structure, form UI inputs, game grid |
| CSS3 | Layout, overlays, theme styling |
| JavaScript (ES6+) | All game logic, DOM updates, session storage, event handling |
 
No build tools, no package managers, no libraries, no frameworks, just the web platform.
