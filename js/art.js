/** Original cartoon art for Dragon Mania (Dragon City–inspired style, not DC assets). */

const PALETTE = {
  fire: { main: "#ff6b35", dark: "#c43a12", light: "#ffb347", accent: "#ffe08a", wing: "#ff8f5a" },
  water: { main: "#3aadef", dark: "#1a6fa8", light: "#7ad4ff", accent: "#d4f2ff", wing: "#5bc4f5" },
  nature: { main: "#4caf50", dark: "#2e7d32", light: "#8bc34a", accent: "#dcedc8", wing: "#66bb6a" },
  earth: { main: "#b8895a", dark: "#7a5530", light: "#d4a574", accent: "#efe0c8", wing: "#c9a06e" },
  electric: { main: "#f5c518", dark: "#c49200", light: "#ffe566", accent: "#fff8c4", wing: "#ffd54f" },
  dark: { main: "#6b5b95", dark: "#3d2f5c", light: "#9b8bc4", accent: "#ddd6f0", wing: "#8574ad" },
  light: { main: "#f0d060", dark: "#d4a020", light: "#fff0a8", accent: "#fffceb", wing: "#ffe082" },
  metal: { main: "#90a4ae", dark: "#546e7a", light: "#cfd8dc", accent: "#eceff1", wing: "#b0bec5" },
};

function p(el) {
  return PALETTE[el] || PALETTE.fire;
}

/** Cute side-facing dragon SVG — chubby body, big eyes, flapping wing. */
export function dragonSvg(element, { size = 72, animate = true } = {}) {
  const c = p(element);
  const id = `d-${element}-${Math.random().toString(36).slice(2, 7)}`;
  const bob = animate
    ? `<animateTransform attributeName="transform" type="translate" values="0 0; 0 -3; 0 0" dur="1.8s" repeatCount="indefinite"/>`
    : "";
  const flap = animate
    ? `<animateTransform attributeName="transform" type="rotate" values="-8 28 34; 12 28 34; -8 28 34" dur="0.9s" repeatCount="indefinite"/>`
    : "";

  // Element flair (horn / crest / fin)
  const crest =
    element === "fire"
      ? `<path d="M52 22 L56 8 L60 22" fill="${c.accent}" stroke="${c.dark}" stroke-width="1.2" stroke-linejoin="round"/>`
      : element === "water"
        ? `<path d="M54 18 Q60 10 58 24" fill="${c.light}" stroke="${c.dark}" stroke-width="1"/>`
        : element === "nature"
          ? `<ellipse cx="56" cy="16" rx="5" ry="8" fill="${c.light}" stroke="${c.dark}" stroke-width="1"/><ellipse cx="56" cy="14" rx="2" ry="3" fill="${c.accent}"/>`
          : element === "electric"
            ? `<path d="M54 20 L58 6 L56 14 L62 4 L58 22Z" fill="${c.accent}" stroke="${c.dark}" stroke-width="1"/>`
            : element === "dark"
              ? `<path d="M50 20 L48 8 L54 18 M58 18 L62 6 L56 20" fill="none" stroke="${c.dark}" stroke-width="2.5" stroke-linecap="round"/>`
              : element === "light"
                ? `<circle cx="56" cy="12" r="5" fill="${c.accent}" opacity=".9"/><circle cx="56" cy="12" r="2.5" fill="#fff"/>`
                : element === "metal"
                  ? `<rect x="52" y="10" width="10" height="8" rx="2" fill="${c.light}" stroke="${c.dark}" stroke-width="1.2"/>`
                  : `<path d="M52 20 L55 10 L58 20" fill="${c.accent}" stroke="${c.dark}" stroke-width="1"/>`;

  return `<svg class="dragon-art" viewBox="0 0 80 64" width="${size}" height="${Math.round(size * 0.8)}" aria-hidden="true">
    <defs>
      <radialGradient id="${id}-b" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stop-color="${c.light}"/>
        <stop offset="70%" stop-color="${c.main}"/>
        <stop offset="100%" stop-color="${c.dark}"/>
      </radialGradient>
      <filter id="${id}-s"><feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-opacity=".28"/></filter>
    </defs>
    <g filter="url(#${id}-s)">
      <g>${bob}
        <!-- tail -->
        <path d="M18 42 Q6 36 8 48 Q14 52 22 46" fill="${c.main}" stroke="${c.dark}" stroke-width="1.4" stroke-linejoin="round"/>
        <!-- wing -->
        <g transform="translate(0,0)">
          <g>${flap}
            <path d="M28 34 Q10 8 4 28 Q12 36 28 38Z" fill="${c.wing}" stroke="${c.dark}" stroke-width="1.4" stroke-linejoin="round" opacity=".95"/>
            <path d="M26 34 Q14 18 10 28" fill="none" stroke="${c.dark}" stroke-width="1" opacity=".35"/>
          </g>
        </g>
        <!-- belly / body -->
        <ellipse cx="36" cy="40" rx="18" ry="14" fill="url(#${id}-b)" stroke="${c.dark}" stroke-width="1.6"/>
        <ellipse cx="38" cy="44" rx="10" ry="7" fill="${c.accent}" opacity=".85"/>
        <!-- legs -->
        <ellipse cx="28" cy="52" rx="5" ry="4" fill="${c.dark}"/>
        <ellipse cx="42" cy="52" rx="5" ry="4" fill="${c.dark}"/>
        <!-- head -->
        <ellipse cx="54" cy="30" rx="13" ry="12" fill="url(#${id}-b)" stroke="${c.dark}" stroke-width="1.6"/>
        ${crest}
        <!-- snout -->
        <ellipse cx="64" cy="34" rx="7" ry="5" fill="${c.light}" stroke="${c.dark}" stroke-width="1.2"/>
        <ellipse cx="67" cy="34" rx="1.4" ry="1.1" fill="${c.dark}"/>
        <!-- eye -->
        <circle cx="52" cy="28" r="5" fill="#fff"/>
        <circle cx="53.5" cy="28.5" r="2.6" fill="#1a2430"/>
        <circle cx="54.5" cy="27.5" r="1" fill="#fff"/>
        <!-- cheek -->
        <ellipse cx="48" cy="34" rx="3" ry="2" fill="#ff8a80" opacity=".45"/>
        <!-- ear / horn stub -->
        <path d="M46 20 Q44 10 50 18" fill="${c.main}" stroke="${c.dark}" stroke-width="1.2" stroke-linejoin="round"/>
      </g>
    </g>
  </svg>`;
}

/** Isometric-ish habitat building for the island map. */
export function habitatSvg(element) {
  const c = p(element);
  const id = `h-${element}-${Math.random().toString(36).slice(2, 7)}`;

  const roof =
    element === "water"
      ? `<ellipse cx="64" cy="36" rx="34" ry="10" fill="${c.light}" opacity=".55"/>
         <ellipse cx="64" cy="40" rx="28" ry="8" fill="${c.main}" opacity=".35"/>`
      : element === "nature"
        ? `<path d="M64 8 L96 36 L64 28 L32 36Z" fill="${c.light}" stroke="${c.dark}" stroke-width="1.5"/>
           <circle cx="64" cy="22" r="10" fill="${c.main}" stroke="${c.dark}" stroke-width="1"/>
           <circle cx="64" cy="20" r="4" fill="${c.accent}"/>`
        : element === "electric"
          ? `<path d="M64 6 L100 38 L64 30 L28 38Z" fill="${c.accent}" stroke="${c.dark}" stroke-width="1.5"/>
             <path d="M58 18 L66 8 L64 20 L72 10 L62 28Z" fill="${c.light}" stroke="${c.dark}" stroke-width="1"/>`
          : `<path d="M64 10 L102 40 L64 32 L26 40Z" fill="${c.light}" stroke="${c.dark}" stroke-width="1.5"/>
             <path d="M64 18 L90 38 L64 34 L38 38Z" fill="${c.main}" opacity=".5"/>`;

  const door =
    element === "dark" || element === "metal"
      ? `<path d="M56 58 L56 72 L72 72 L72 58 Q64 52 56 58" fill="${c.dark}" opacity=".75"/>`
      : `<ellipse cx="64" cy="68" rx="8" ry="10" fill="${c.dark}" opacity=".55"/>`;

  return `<svg class="habitat-art" viewBox="0 0 128 96" width="100%" height="100%" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    <defs>
      <linearGradient id="${id}-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${c.light}"/>
        <stop offset="100%" stop-color="${c.main}"/>
      </linearGradient>
      <linearGradient id="${id}-s" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c.main}"/>
        <stop offset="100%" stop-color="${c.dark}"/>
      </linearGradient>
    </defs>
    <!-- ground pad -->
    <ellipse cx="64" cy="82" rx="48" ry="12" fill="${c.dark}" opacity=".28"/>
    <!-- left face -->
    <path d="M26 40 L64 58 L64 86 L26 68Z" fill="url(#${id}-s)" stroke="${c.dark}" stroke-width="1.2"/>
    <!-- right face -->
    <path d="M64 58 L102 40 L102 68 L64 86Z" fill="${c.main}" stroke="${c.dark}" stroke-width="1.2"/>
    <!-- top / roof -->
    ${roof}
    <!-- window glow -->
    <ellipse cx="48" cy="58" rx="5" ry="4" fill="${c.accent}" opacity=".9"/>
    <ellipse cx="80" cy="58" rx="5" ry="4" fill="${c.accent}" opacity=".7"/>
    ${door}
    <!-- elemental sparkle -->
    <circle cx="64" cy="46" r="3" fill="#fff" opacity=".65"/>
  </svg>`;
}

export function eggSvg(element, size = 48) {
  const c = element ? p(element) : { main: "#c9a0ff", dark: "#7a4fb0", light: "#e8d4ff", accent: "#fff" };
  const id = `egg-${element || "m"}-${Math.random().toString(36).slice(2, 7)}`;
  return `<svg class="egg-art" viewBox="0 0 48 60" width="${size}" height="${Math.round(size * 1.25)}" aria-hidden="true">
    <defs>
      <radialGradient id="${id}" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#fff" stop-opacity=".55"/>
        <stop offset="40%" stop-color="${c.light}"/>
        <stop offset="100%" stop-color="${c.main}"/>
      </radialGradient>
    </defs>
    <ellipse cx="24" cy="32" rx="18" ry="24" fill="url(#${id})" stroke="${c.dark}" stroke-width="1.8"/>
    <ellipse cx="18" cy="22" rx="5" ry="7" fill="#fff" opacity=".35"/>
    <path d="M14 36 Q24 30 34 38" fill="none" stroke="${c.dark}" stroke-width="1.4" opacity=".35"/>
    <path d="M16 44 Q24 40 30 46" fill="none" stroke="${c.dark}" stroke-width="1.2" opacity=".3"/>
  </svg>`;
}

export function foodSvg(size = 48) {
  return `<svg viewBox="0 0 48 48" width="${size}" height="${size}" aria-hidden="true">
    <ellipse cx="24" cy="40" rx="14" ry="4" fill="#2e5a20" opacity=".25"/>
    <ellipse cx="24" cy="26" rx="16" ry="12" fill="#7bc043" stroke="#3d8b2a" stroke-width="1.5"/>
    <ellipse cx="24" cy="24" rx="10" ry="7" fill="#c5e063"/>
    <circle cx="18" cy="22" r="2" fill="#e85d2c"/>
    <circle cx="28" cy="20" r="1.6" fill="#e85d2c"/>
    <circle cx="24" cy="28" r="1.8" fill="#ffb347"/>
    <path d="M24 10 Q26 16 24 18 Q22 16 24 10" fill="#4caf50" stroke="#2e7d32" stroke-width="1"/>
  </svg>`;
}

export function coinSvg(size = 20) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#f0c84a" stroke="#c4891a" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="7" fill="none" stroke="#ffe9a0" stroke-width="1.2"/>
    <text x="12" y="16" text-anchor="middle" font-size="10" font-weight="800" fill="#9a6a10">G</text>
  </svg>`;
}
