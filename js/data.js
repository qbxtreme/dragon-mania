/** Dragon Mania — full Dragon City element catalog & species */

/**
 * All 21 Dragon City elements.
 * `strong` / `weak` may be a string or string[] (attacker → defender).
 */
export const ELEMENTS = {
  terra: { id: "terra", name: "Terra", color: "#a67c4a", strong: ["flame", "electric"], weak: ["sea", "nature"] },
  flame: { id: "flame", name: "Flame", color: "#e85d2c", strong: ["nature", "ice", "metal"], weak: ["sea", "terra"] },
  sea: { id: "sea", name: "Sea", color: "#2b9fd9", strong: ["flame", "terra", "metal"], weak: ["nature", "electric"] },
  nature: { id: "nature", name: "Nature", color: "#3d9b4a", strong: ["sea", "terra", "light"], weak: ["flame", "ice"] },
  electric: { id: "electric", name: "Electric", color: "#e6b422", strong: ["sea", "metal"], weak: ["terra", "nature"] },
  ice: { id: "ice", name: "Ice", color: "#7ec8e3", strong: ["nature", "war"], weak: ["flame", "metal"] },
  metal: { id: "metal", name: "Metal", color: "#8a9aa8", strong: ["ice", "terra", "dark"], weak: ["flame", "electric", "war"] },
  dark: { id: "dark", name: "Dark", color: "#5b4a7a", strong: ["light", "pure"], weak: ["metal", "war"] },
  light: { id: "light", name: "Light", color: "#f0d78c", strong: ["dark", "war"], weak: ["nature", "pure"] },
  war: { id: "war", name: "War", color: "#c44b3a", strong: ["metal", "dark", "terra"], weak: ["ice", "light"] },
  pure: { id: "pure", name: "Pure", color: "#e8e4f8", strong: ["legend", "primal"], weak: ["dark", "light"] },
  legend: { id: "legend", name: "Legend", color: "#d4a017", strong: ["primal", "pure"], weak: ["time", "wind"] },
  primal: { id: "primal", name: "Primal", color: "#8b5a2b", strong: ["time", "wind"], weak: ["pure", "legend"] },
  wind: { id: "wind", name: "Wind", color: "#9fd4c4", strong: ["legend", "war"], weak: ["primal", "ice"] },
  time: { id: "time", name: "Time", color: "#6b7fd7", strong: ["legend", "wind"], weak: ["primal", "pure"] },
  // Ancient World
  magic: { id: "magic", name: "Magic", color: "#b06bd4", strong: ["chaos", "soul"], weak: ["happy", "beauty"] },
  chaos: { id: "chaos", name: "Chaos", color: "#8a2f4a", strong: ["happy", "dream"], weak: ["magic", "soul"] },
  happy: { id: "happy", name: "Happy", color: "#f0a8c8", strong: ["magic", "beauty"], weak: ["chaos", "dream"] },
  dream: { id: "dream", name: "Dream", color: "#7a8fd4", strong: ["happy", "soul"], weak: ["chaos", "beauty"] },
  beauty: { id: "beauty", name: "Beauty", color: "#e89ab0", strong: ["dream", "magic"], weak: ["happy", "soul"] },
  soul: { id: "soul", name: "Soul", color: "#5a9e9a", strong: ["beauty", "chaos"], weak: ["magic", "dream"] },
};

/** Map legacy Dragon Mania ids → Dragon City ids (save migration). */
export const ELEMENT_ALIASES = {
  fire: "flame",
  water: "sea",
  earth: "terra",
};

export function normalizeElement(id) {
  if (!id) return id;
  return ELEMENT_ALIASES[id] || id;
}

export const SPECIES = [
  // Terra
  { id: "pebble", name: "Pebblehorn", element: "terra", rarity: "common", baseAtk: 13, baseHp: 115, goldPerMin: 4 },
  { id: "quarry", name: "Quarrydrake", element: "terra", rarity: "rare", baseAtk: 19, baseHp: 145, goldPerMin: 7 },
  { id: "terragor", name: "Terragor", element: "terra", rarity: "epic", baseAtk: 25, baseHp: 175, goldPerMin: 11 },
  // Flame
  { id: "emberling", name: "Emberling", element: "flame", rarity: "common", baseAtk: 12, baseHp: 90, goldPerMin: 4 },
  { id: "blazewing", name: "Blazewing", element: "flame", rarity: "rare", baseAtk: 18, baseHp: 110, goldPerMin: 7 },
  { id: "inferna", name: "Inferna", element: "flame", rarity: "epic", baseAtk: 26, baseHp: 140, goldPerMin: 12 },
  // Sea
  { id: "ripple", name: "Ripple", element: "sea", rarity: "common", baseAtk: 11, baseHp: 100, goldPerMin: 4 },
  { id: "tidefang", name: "Tidefang", element: "sea", rarity: "rare", baseAtk: 17, baseHp: 125, goldPerMin: 7 },
  { id: "abyssara", name: "Abyssara", element: "sea", rarity: "epic", baseAtk: 24, baseHp: 155, goldPerMin: 12 },
  // Nature
  { id: "sprout", name: "Sproutling", element: "nature", rarity: "common", baseAtk: 10, baseHp: 105, goldPerMin: 5 },
  { id: "vinewyrm", name: "Vinewyrm", element: "nature", rarity: "rare", baseAtk: 16, baseHp: 130, goldPerMin: 8 },
  { id: "florax", name: "Florax", element: "nature", rarity: "epic", baseAtk: 23, baseHp: 160, goldPerMin: 13 },
  // Electric
  { id: "spark", name: "Sparklet", element: "electric", rarity: "common", baseAtk: 14, baseHp: 85, goldPerMin: 5 },
  { id: "voltail", name: "Voltail", element: "electric", rarity: "rare", baseAtk: 20, baseHp: 105, goldPerMin: 8 },
  { id: "stormarch", name: "Stormarch", element: "electric", rarity: "epic", baseAtk: 28, baseHp: 130, goldPerMin: 13 },
  // Ice
  { id: "frostbit", name: "Frostbit", element: "ice", rarity: "common", baseAtk: 12, baseHp: 100, goldPerMin: 5 },
  { id: "glacierfang", name: "Glacierfang", element: "ice", rarity: "rare", baseAtk: 18, baseHp: 125, goldPerMin: 8 },
  { id: "cryovex", name: "Cryovex", element: "ice", rarity: "epic", baseAtk: 26, baseHp: 150, goldPerMin: 13 },
  // Metal
  { id: "cogling", name: "Cogling", element: "metal", rarity: "rare", baseAtk: 19, baseHp: 135, goldPerMin: 9 },
  { id: "ironsoul", name: "Ironsoul", element: "metal", rarity: "epic", baseAtk: 27, baseHp: 170, goldPerMin: 15 },
  { id: "aegiron", name: "Aegiron", element: "metal", rarity: "legendary", baseAtk: 34, baseHp: 210, goldPerMin: 20 },
  // Dark
  { id: "shade", name: "Shadeling", element: "dark", rarity: "rare", baseAtk: 18, baseHp: 120, goldPerMin: 8 },
  { id: "nightmaw", name: "Nightmaw", element: "dark", rarity: "epic", baseAtk: 27, baseHp: 150, goldPerMin: 14 },
  { id: "voidrex", name: "Voidrex", element: "dark", rarity: "legendary", baseAtk: 36, baseHp: 190, goldPerMin: 22 },
  // Light
  { id: "gleam", name: "Gleamwing", element: "light", rarity: "rare", baseAtk: 17, baseHp: 125, goldPerMin: 8 },
  { id: "solara", name: "Solara", element: "light", rarity: "epic", baseAtk: 26, baseHp: 155, goldPerMin: 14 },
  { id: "mythara", name: "Mythara", element: "light", rarity: "legendary", baseAtk: 34, baseHp: 200, goldPerMin: 22 },
  // War
  { id: "skirmish", name: "Skirmish", element: "war", rarity: "rare", baseAtk: 20, baseHp: 120, goldPerMin: 9 },
  { id: "battleroar", name: "Battleroar", element: "war", rarity: "epic", baseAtk: 29, baseHp: 155, goldPerMin: 14 },
  { id: "warmonger", name: "Warmonger", element: "war", rarity: "legendary", baseAtk: 38, baseHp: 195, goldPerMin: 21 },
  // Pure
  { id: "lumenpup", name: "Lumenpup", element: "pure", rarity: "rare", baseAtk: 16, baseHp: 130, goldPerMin: 9 },
  { id: "crystalyn", name: "Crystalyn", element: "pure", rarity: "epic", baseAtk: 25, baseHp: 165, goldPerMin: 15 },
  { id: "sanctara", name: "Sanctara", element: "pure", rarity: "legendary", baseAtk: 33, baseHp: 210, goldPerMin: 23 },
  // Legend
  { id: "mythling", name: "Mythling", element: "legend", rarity: "epic", baseAtk: 30, baseHp: 170, goldPerMin: 16 },
  { id: "epicore", name: "Epicore", element: "legend", rarity: "legendary", baseAtk: 40, baseHp: 220, goldPerMin: 26 },
  // Primal
  { id: "rawscale", name: "Rawscale", element: "primal", rarity: "epic", baseAtk: 28, baseHp: 180, goldPerMin: 15 },
  { id: "primordial", name: "Primordial", element: "primal", rarity: "legendary", baseAtk: 37, baseHp: 230, goldPerMin: 24 },
  // Wind
  { id: "breezling", name: "Breezling", element: "wind", rarity: "rare", baseAtk: 17, baseHp: 110, goldPerMin: 8 },
  { id: "galehorn", name: "Galehorn", element: "wind", rarity: "epic", baseAtk: 26, baseHp: 140, goldPerMin: 13 },
  { id: "zephyrax", name: "Zephyrax", element: "wind", rarity: "legendary", baseAtk: 35, baseHp: 185, goldPerMin: 21 },
  // Time
  { id: "ticktock", name: "Ticktock", element: "time", rarity: "epic", baseAtk: 27, baseHp: 160, goldPerMin: 15 },
  { id: "chronovex", name: "Chronovex", element: "time", rarity: "legendary", baseAtk: 36, baseHp: 205, goldPerMin: 24 },
  // Ancient — Magic
  { id: "hexling", name: "Hexling", element: "magic", rarity: "epic", baseAtk: 28, baseHp: 155, goldPerMin: 16 },
  { id: "arcanara", name: "Arcanara", element: "magic", rarity: "legendary", baseAtk: 37, baseHp: 200, goldPerMin: 25 },
  // Chaos
  { id: "riftpup", name: "Riftpup", element: "chaos", rarity: "epic", baseAtk: 30, baseHp: 145, goldPerMin: 16 },
  { id: "pandemon", name: "Pandemon", element: "chaos", rarity: "legendary", baseAtk: 39, baseHp: 190, goldPerMin: 25 },
  // Happy
  { id: "cheerwyrm", name: "Cheerwyrm", element: "happy", rarity: "epic", baseAtk: 24, baseHp: 170, goldPerMin: 17 },
  { id: "jubilex", name: "Jubilex", element: "happy", rarity: "legendary", baseAtk: 32, baseHp: 215, goldPerMin: 26 },
  // Dream
  { id: "slumber", name: "Slumber", element: "dream", rarity: "epic", baseAtk: 25, baseHp: 165, goldPerMin: 16 },
  { id: "oneirom", name: "Oneirom", element: "dream", rarity: "legendary", baseAtk: 34, baseHp: 210, goldPerMin: 25 },
  // Beauty
  { id: "petaluxe", name: "Petaluxe", element: "beauty", rarity: "epic", baseAtk: 26, baseHp: 160, goldPerMin: 17 },
  { id: "opulyn", name: "Opulyn", element: "beauty", rarity: "legendary", baseAtk: 35, baseHp: 205, goldPerMin: 26 },
  // Soul
  { id: "spiritling", name: "Spiritling", element: "soul", rarity: "epic", baseAtk: 27, baseHp: 158, goldPerMin: 16 },
  { id: "animara", name: "Animara", element: "soul", rarity: "legendary", baseAtk: 36, baseHp: 208, goldPerMin: 25 },
];

export const HABITAT_TYPES = [
  { id: "terra_pit", name: "Terra Pit", element: "terra", capacity: 2, cost: 400 },
  { id: "flame_den", name: "Flame Den", element: "flame", capacity: 2, cost: 400 },
  { id: "sea_pool", name: "Sea Pool", element: "sea", capacity: 2, cost: 400 },
  { id: "nature_grove", name: "Nature Grove", element: "nature", capacity: 2, cost: 400 },
  { id: "storm_nest", name: "Storm Nest", element: "electric", capacity: 2, cost: 500 },
  { id: "frost_hollow", name: "Frost Hollow", element: "ice", capacity: 2, cost: 550 },
  { id: "forge_yard", name: "Forge Yard", element: "metal", capacity: 2, cost: 750 },
  { id: "shadow_lair", name: "Shadow Lair", element: "dark", capacity: 2, cost: 700 },
  { id: "radiant_spire", name: "Radiant Spire", element: "light", capacity: 2, cost: 700 },
  { id: "war_camp", name: "War Camp", element: "war", capacity: 2, cost: 800 },
  { id: "pure_sanctum", name: "Pure Sanctum", element: "pure", capacity: 2, cost: 900 },
  { id: "legend_hall", name: "Legend Hall", element: "legend", capacity: 2, cost: 1100 },
  { id: "primal_den", name: "Primal Den", element: "primal", capacity: 2, cost: 1100 },
  { id: "wind_cliff", name: "Wind Cliff", element: "wind", capacity: 2, cost: 850 },
  { id: "time_garden", name: "Time Garden", element: "time", capacity: 2, cost: 1200 },
  { id: "magic_circle", name: "Magic Circle", element: "magic", capacity: 2, cost: 1400 },
  { id: "chaos_rift", name: "Chaos Rift", element: "chaos", capacity: 2, cost: 1400 },
  { id: "happy_grove", name: "Happy Grove", element: "happy", capacity: 2, cost: 1400 },
  { id: "dream_cloud", name: "Dream Cloud", element: "dream", capacity: 2, cost: 1400 },
  { id: "beauty_garden", name: "Beauty Garden", element: "beauty", capacity: 2, cost: 1400 },
  { id: "soul_shrine", name: "Soul Shrine", element: "soul", capacity: 2, cost: 1400 },
];

/** Legacy habitat type ids from older saves. */
export const HABITAT_ALIASES = {
  fire_den: "flame_den",
  tide_pool: "sea_pool",
  grove: "nature_grove",
  quarry_pit: "terra_pit",
};

export function normalizeHabitatType(id) {
  if (!id) return id;
  return HABITAT_ALIASES[id] || id;
}

export const FOES = [
  { id: "scout", name: "Ash Scout", element: "flame", level: 1, atk: 10, hp: 70, gold: 80, food: 40 },
  { id: "wavebandit", name: "Wave Bandit", element: "sea", level: 2, atk: 14, hp: 95, gold: 120, food: 55 },
  { id: "briar", name: "Briar Guard", element: "nature", level: 3, atk: 18, hp: 120, gold: 180, food: 70 },
  { id: "boulder", name: "Boulder Knight", element: "terra", level: 4, atk: 22, hp: 150, gold: 250, food: 90 },
  { id: "sparkraider", name: "Spark Raider", element: "electric", level: 5, atk: 26, hp: 140, gold: 320, food: 110 },
  { id: "frostreaver", name: "Frost Reaver", element: "ice", level: 6, atk: 28, hp: 160, gold: 380, food: 125 },
  { id: "umbrage", name: "Umbrage", element: "dark", level: 7, atk: 30, hp: 170, gold: 420, food: 140 },
  { id: "aurora", name: "Aurora Sentinel", element: "light", level: 8, atk: 32, hp: 185, gold: 520, food: 160 },
  { id: "warmaster", name: "War Master", element: "war", level: 9, atk: 34, hp: 195, gold: 600, food: 180 },
  { id: "pureblade", name: "Pure Blade", element: "pure", level: 10, atk: 36, hp: 210, gold: 700, food: 200 },
  { id: "mythfoe", name: "Myth Foe", element: "legend", level: 11, atk: 40, hp: 230, gold: 850, food: 230 },
  { id: "ancientrift", name: "Ancient Rift", element: "chaos", level: 12, atk: 42, hp: 240, gold: 1000, food: 260 },
];

export const FOOD_PACKS = [
  { id: "snack", name: "Snack Pouch", food: 50, cost: 60 },
  { id: "feast", name: "Dragon Feast", food: 200, cost: 200 },
  { id: "banquet", name: "Royal Banquet", food: 600, cost: 520 },
];

export const EGG_OFFERS = [
  { id: "egg_flame", name: "Flame Egg", element: "flame", cost: 250, gems: 0 },
  { id: "egg_sea", name: "Sea Egg", element: "sea", cost: 250, gems: 0 },
  { id: "egg_nature", name: "Nature Egg", element: "nature", cost: 250, gems: 0 },
  { id: "egg_terra", name: "Terra Egg", element: "terra", cost: 250, gems: 0 },
  { id: "egg_electric", name: "Electric Egg", element: "electric", cost: 320, gems: 0 },
  { id: "egg_ice", name: "Ice Egg", element: "ice", cost: 350, gems: 0 },
  { id: "egg_mystery", name: "Mystery Egg", element: null, cost: 0, gems: 15 },
  { id: "egg_ancient", name: "Ancient Egg", element: null, cost: 0, gems: 40, ancient: true },
];

/** Elements unlocked via hybrid breeding (not starter commons). */
export const HYBRID_ELEMENTS = ["ice", "metal", "dark", "light", "war", "wind"];
export const RARE_HYBRID_ELEMENTS = ["pure", "primal", "time", "legend"];
export const ANCIENT_ELEMENTS = ["magic", "chaos", "happy", "dream", "beauty", "soul"];

export const RARITY_WEIGHT = {
  common: 55,
  rare: 30,
  epic: 12,
  legendary: 3,
};

export function speciesById(id) {
  return SPECIES.find((s) => s.id === id);
}

export function speciesForElement(element, rarityMin = null) {
  const el = normalizeElement(element);
  return SPECIES.filter((s) => {
    if (s.element !== el) return false;
    if (!rarityMin) return true;
    const order = ["common", "rare", "epic", "legendary"];
    return order.indexOf(s.rarity) >= order.indexOf(rarityMin);
  });
}

export function pickWeightedSpecies(pool) {
  const weights = pool.map((s) => RARITY_WEIGHT[s.rarity] || 1);
  const total = weights.reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

export function xpToLevel(level) {
  return Math.floor(40 + level * 28 + level * level * 4);
}

export function statsForDragon(dragon) {
  const sp = speciesById(dragon.speciesId);
  const lvl = dragon.level;
  return {
    atk: Math.round(sp.baseAtk + (lvl - 1) * 3.2),
    hp: Math.round(sp.baseHp + (lvl - 1) * 14),
    goldPerMin: +(sp.goldPerMin * (1 + (lvl - 1) * 0.12)).toFixed(2),
  };
}

export function elementMultiplier(attackerEl, defenderEl) {
  const a = ELEMENTS[normalizeElement(attackerEl)];
  const def = normalizeElement(defenderEl);
  if (!a) return 1;
  const strong = Array.isArray(a.strong) ? a.strong : [a.strong];
  const weak = Array.isArray(a.weak) ? a.weak : [a.weak];
  if (strong.includes(def)) return 1.4;
  if (weak.includes(def)) return 0.7;
  return 1;
}
