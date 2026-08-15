/** Painted cartoon sprites for Dragon Mania (original assets, Dragon City–inspired look). */

const DRAGON_SRC = {
  fire: "assets/dragons/fire.png",
  water: "assets/dragons/water.png",
  nature: "assets/dragons/nature.png",
  earth: "assets/dragons/earth.png",
  electric: "assets/dragons/electric.png",
  dark: "assets/dragons/dark.png",
  light: "assets/dragons/light.png",
  metal: "assets/dragons/metal.png",
};

const HABITAT_SRC = {
  fire: "assets/habitats/fire.png",
  water: "assets/habitats/water.png",
  nature: "assets/habitats/nature.png",
  earth: "assets/habitats/earth.png",
  electric: "assets/habitats/electric.png",
  dark: "assets/habitats/dark.png",
  light: "assets/habitats/light.png",
  metal: "assets/habitats/metal.png",
};

const PALETTE = {
  fire: { main: "#ff6b35", dark: "#c43a12", light: "#ffb347" },
  water: { main: "#3aadef", dark: "#1a6fa8", light: "#7ad4ff" },
  nature: { main: "#4caf50", dark: "#2e7d32", light: "#8bc34a" },
  earth: { main: "#b8895a", dark: "#7a5530", light: "#d4a574" },
  electric: { main: "#f5c518", dark: "#c49200", light: "#ffe566" },
  dark: { main: "#6b5b95", dark: "#3d2f5c", light: "#9b8bc4" },
  light: { main: "#f0d060", dark: "#d4a020", light: "#fff0a8" },
  metal: { main: "#90a4ae", dark: "#546e7a", light: "#cfd8dc" },
};

function p(el) {
  return PALETTE[el] || PALETTE.fire;
}

/** Painted dragon sprite (PNG). */
export function dragonSvg(element, { size = 72, animate = true } = {}) {
  const src = DRAGON_SRC[element] || DRAGON_SRC.fire;
  const cls = animate ? "dragon-art is-animated" : "dragon-art";
  return `<img class="${cls}" src="${src}" width="${size}" height="${size}" alt="" draggable="false" loading="lazy" />`;
}

/** Painted habitat building (PNG). */
export function habitatSvg(element) {
  const src = HABITAT_SRC[element] || HABITAT_SRC.fire;
  return `<img class="habitat-art" src="${src}" alt="" draggable="false" loading="lazy" />`;
}

export function eggSvg(element, size = 48) {
  const c = element ? p(element) : { main: "#c9a0ff", dark: "#7a4fb0", light: "#e8d4ff" };
  const id = `egg-${element || "m"}-${Math.random().toString(36).slice(2, 7)}`;
  return `<svg class="egg-art" viewBox="0 0 48 60" width="${size}" height="${Math.round(size * 1.25)}" aria-hidden="true">
    <defs>
      <radialGradient id="${id}" cx="35%" cy="28%" r="70%">
        <stop offset="0%" stop-color="#fff" stop-opacity=".7"/>
        <stop offset="45%" stop-color="${c.light}"/>
        <stop offset="100%" stop-color="${c.main}"/>
      </radialGradient>
      <filter id="${id}-s"><feDropShadow dx="0" dy="2" stdDeviation="1.4" flood-opacity=".3"/></filter>
    </defs>
    <g filter="url(#${id}-s)">
      <ellipse cx="24" cy="32" rx="18" ry="24" fill="url(#${id})" stroke="${c.dark}" stroke-width="2"/>
      <ellipse cx="17" cy="22" rx="6" ry="8" fill="#fff" opacity=".4"/>
      <path d="M12 34 Q24 26 36 36" fill="none" stroke="${c.dark}" stroke-width="1.6" opacity=".28"/>
      <path d="M14 44 Q24 38 32 46" fill="none" stroke="${c.dark}" stroke-width="1.3" opacity=".22"/>
      <circle cx="28" cy="40" r="3" fill="${c.light}" opacity=".55"/>
    </g>
  </svg>`;
}

export function foodSvg(size = 48) {
  return `<svg viewBox="0 0 48 48" width="${size}" height="${size}" aria-hidden="true">
    <defs>
      <radialGradient id="food-g" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#c5e063"/>
        <stop offset="100%" stop-color="#4caf50"/>
      </radialGradient>
    </defs>
    <ellipse cx="24" cy="40" rx="14" ry="4" fill="#2e5a20" opacity=".25"/>
    <ellipse cx="24" cy="26" rx="16" ry="12" fill="url(#food-g)" stroke="#2e7d32" stroke-width="1.6"/>
    <ellipse cx="24" cy="24" rx="10" ry="7" fill="#dcedc8" opacity=".85"/>
    <circle cx="18" cy="22" r="2.2" fill="#e85d2c"/>
    <circle cx="28" cy="20" r="1.8" fill="#e85d2c"/>
    <circle cx="24" cy="28" r="2" fill="#ffb347"/>
    <path d="M24 9 Q27 16 24 18 Q21 16 24 9" fill="#66bb6a" stroke="#2e7d32" stroke-width="1"/>
  </svg>`;
}

export function coinSvg(size = 20) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">
    <defs>
      <radialGradient id="coin-g" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#ffe9a0"/>
        <stop offset="100%" stop-color="#e0a820"/>
      </radialGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#coin-g)" stroke="#a87412" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="7" fill="none" stroke="#fff3c4" stroke-width="1.2"/>
    <text x="12" y="16" text-anchor="middle" font-size="10" font-weight="800" fill="#8a5a0a">G</text>
  </svg>`;
}

/** Preload painted assets so first paint is smooth. */
export function preloadArt() {
  const urls = [...Object.values(DRAGON_SRC), ...Object.values(HABITAT_SRC), "assets/island-bg.jpg"];
  for (const src of urls) {
    const img = new Image();
    img.src = src;
  }
}
