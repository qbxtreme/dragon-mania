/** Dragon Mania — element catalog & species */

export const ELEMENTS = {
  fire: { id: "fire", name: "Fire", color: "#e85d2c", strong: "nature", weak: "water" },
  water: { id: "water", name: "Water", color: "#2b9fd9", strong: "fire", weak: "electric" },
  nature: { id: "nature", name: "Nature", color: "#3d9b4a", strong: "earth", weak: "fire" },
  earth: { id: "earth", name: "Earth", color: "#a67c4a", strong: "electric", weak: "nature" },
  electric: { id: "electric", name: "Electric", color: "#e6b422", strong: "water", weak: "earth" },
  dark: { id: "dark", name: "Dark", color: "#5b4a7a", strong: "light", weak: "metal" },
  light: { id: "light", name: "Light", color: "#f0d78c", strong: "dark", weak: "metal" },
  metal: { id: "metal", name: "Metal", color: "#8a9aa8", strong: "dark", weak: "fire" },
};

export const SPECIES = [
  { id: "emberling", name: "Emberling", element: "fire", rarity: "common", baseAtk: 12, baseHp: 90, goldPerMin: 4 },
  { id: "blazewing", name: "Blazewing", element: "fire", rarity: "rare", baseAtk: 18, baseHp: 110, goldPerMin: 7 },
  { id: "inferna", name: "Inferna", element: "fire", rarity: "epic", baseAtk: 26, baseHp: 140, goldPerMin: 12 },
  { id: "ripple", name: "Ripple", element: "water", rarity: "common", baseAtk: 11, baseHp: 100, goldPerMin: 4 },
  { id: "tidefang", name: "Tidefang", element: "water", rarity: "rare", baseAtk: 17, baseHp: 125, goldPerMin: 7 },
  { id: "abyssara", name: "Abyssara", element: "water", rarity: "epic", baseAtk: 24, baseHp: 155, goldPerMin: 12 },
  { id: "sprout", name: "Sproutling", element: "nature", rarity: "common", baseAtk: 10, baseHp: 105, goldPerMin: 5 },
  { id: "vinewyrm", name: "Vinewyrm", element: "nature", rarity: "rare", baseAtk: 16, baseHp: 130, goldPerMin: 8 },
  { id: "florax", name: "Florax", element: "nature", rarity: "epic", baseAtk: 23, baseHp: 160, goldPerMin: 13 },
  { id: "pebble", name: "Pebblehorn", element: "earth", rarity: "common", baseAtk: 13, baseHp: 115, goldPerMin: 4 },
  { id: "quarry", name: "Quarrydrake", element: "earth", rarity: "rare", baseAtk: 19, baseHp: 145, goldPerMin: 7 },
  { id: "terragor", name: "Terragor", element: "earth", rarity: "epic", baseAtk: 25, baseHp: 175, goldPerMin: 11 },
  { id: "spark", name: "Sparklet", element: "electric", rarity: "common", baseAtk: 14, baseHp: 85, goldPerMin: 5 },
  { id: "voltail", name: "Voltail", element: "electric", rarity: "rare", baseAtk: 20, baseHp: 105, goldPerMin: 8 },
  { id: "stormarch", name: "Stormarch", element: "electric", rarity: "epic", baseAtk: 28, baseHp: 130, goldPerMin: 13 },
  { id: "shade", name: "Shadeling", element: "dark", rarity: "rare", baseAtk: 18, baseHp: 120, goldPerMin: 8 },
  { id: "nightmaw", name: "Nightmaw", element: "dark", rarity: "epic", baseAtk: 27, baseHp: 150, goldPerMin: 14 },
  { id: "gleam", name: "Gleamwing", element: "light", rarity: "rare", baseAtk: 17, baseHp: 125, goldPerMin: 8 },
  { id: "solara", name: "Solara", element: "light", rarity: "epic", baseAtk: 26, baseHp: 155, goldPerMin: 14 },
  { id: "cogling", name: "Cogling", element: "metal", rarity: "rare", baseAtk: 19, baseHp: 135, goldPerMin: 9 },
  { id: "ironsoul", name: "Ironsoul", element: "metal", rarity: "epic", baseAtk: 27, baseHp: 170, goldPerMin: 15 },
  { id: "mythara", name: "Mythara", element: "light", rarity: "legendary", baseAtk: 34, baseHp: 200, goldPerMin: 22 },
  { id: "voidrex", name: "Voidrex", element: "dark", rarity: "legendary", baseAtk: 36, baseHp: 190, goldPerMin: 22 },
];

export const HABITAT_TYPES = [
  { id: "fire_den", name: "Fire Den", element: "fire", capacity: 2, cost: 400 },
  { id: "tide_pool", name: "Tide Pool", element: "water", capacity: 2, cost: 400 },
  { id: "grove", name: "Sun Grove", element: "nature", capacity: 2, cost: 400 },
  { id: "quarry_pit", name: "Quarry Pit", element: "earth", capacity: 2, cost: 450 },
  { id: "storm_nest", name: "Storm Nest", element: "electric", capacity: 2, cost: 500 },
  { id: "shadow_lair", name: "Shadow Lair", element: "dark", capacity: 2, cost: 700 },
  { id: "radiant_spire", name: "Radiant Spire", element: "light", capacity: 2, cost: 700 },
  { id: "forge_yard", name: "Forge Yard", element: "metal", capacity: 2, cost: 750 },
];

export const FOES = [
  { id: "scout", name: "Ash Scout", element: "fire", level: 1, atk: 10, hp: 70, reward: 80, food: 40 },
  { id: "wavebandit", name: "Wave Bandit", element: "water", level: 2, atk: 14, hp: 95, reward: 120, food: 55 },
  { id: "briar", name: "Briar Guard", element: "nature", level: 3, atk: 18, hp: 120, gold: 180, food: 70 },
  { id: "boulder", name: "Boulder Knight", element: "earth", level: 4, atk: 22, hp: 150, gold: 250, food: 90 },
  { id: "sparkraider", name: "Spark Raider", element: "electric", level: 5, atk: 26, hp: 140, gold: 320, food: 110 },
  { id: "umbrage", name: "Umbrage", element: "dark", level: 6, atk: 30, hp: 170, gold: 420, food: 140 },
  { id: "aurora", name: "Aurora Sentinel", element: "light", level: 7, atk: 32, hp: 185, gold: 520, food: 160 },
];

export const FOOD_PACKS = [
  { id: "snack", name: "Snack Pouch", food: 50, cost: 60 },
  { id: "feast", name: "Dragon Feast", food: 200, cost: 200 },
  { id: "banquet", name: "Royal Banquet", food: 600, cost: 520 },
];

export const EGG_OFFERS = [
  { id: "egg_fire", name: "Fire Egg", element: "fire", cost: 250, gems: 0 },
  { id: "egg_water", name: "Water Egg", element: "water", cost: 250, gems: 0 },
  { id: "egg_nature", name: "Nature Egg", element: "nature", cost: 250, gems: 0 },
  { id: "egg_mystery", name: "Mystery Egg", element: null, cost: 0, gems: 15 },
];

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
  return SPECIES.filter((s) => {
    if (s.element !== element) return false;
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
  const a = ELEMENTS[attackerEl];
  if (!a) return 1;
  if (a.strong === defenderEl) return 1.4;
  if (a.weak === defenderEl) return 0.7;
  return 1;
}
