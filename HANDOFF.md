# Handoff: Dragon Mania

## What this is
Browser game inspired by **Dragon City** (not Minecraft). Vanilla HTML/CSS/JS under the repo root. Progress saves in `localStorage` key `dragon-mania-save-v1`.

## How to run
```bash
npx --yes serve . -p 4173
```
Open http://localhost:4173

## Layout
- `index.html` — title screen + game shell (Isle / Dragons / Breed / Arena / Shop)
- `css/styles.css` — teal/ember island look, Lilita One + Nunito, floating-isle map
- `js/art.js` — original SVG dragons, habitats, eggs, food (Dragon City–inspired, not copied)
- `js/data.js` — elements, species, habitats, foes, shop offers
- `js/game.js` — state, economy, breed, battle, save/load
- `js/main.js` — UI wiring

## Gameplay loop
1. Habitats earn gold over time → tap to collect
2. Shop: food, eggs, more habitats
3. Feed dragons to level (breed needs both parents level 4+)
4. Breed for 500 gold; hybrid chance can unlock dark/light/metal
5. Arena: elemental advantage/resist; wins grant gold/food; every 3 wins raises isle level + gems

## Suggested next features (if asked)
- More species / animations
- Habitat capacity upgrades
- Offline-friendly PWA / GitHub Pages deploy
- Sound, tutorial overlay, mobile safe-areas polish
