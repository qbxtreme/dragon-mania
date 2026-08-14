# Dragon Mania

A browser game inspired by **Dragon City** — raise dragons on your island, breed new species, and battle in the arena.

## Play

```bash
npx --yes serve . -p 4173
```

Then open **http://localhost:4173**.

Or open `index.html` via any static file server (needed for ES modules).

### On iPad

Open the live game in Safari (no install needed):

**https://qbxtreme.github.io/dragon-mania/**

Or edit the code on github.com in Safari / Working Copy, then refresh the Pages URL after changes publish.

## Features

- **Isle** — elemental habitats that generate gold over time
- **Dragons** — feed dragons to level them for battle
- **Breed** — combine two level-4+ dragons (500 gold)
- **Arena** — elemental matchups against escalating foes
- **Shop** — habitats, food, and eggs
- **Save** — progress in `localStorage`

## Stack

Vanilla HTML, CSS, and ES modules. No build step.
