import {
  ELEMENTS,
  HABITAT_TYPES,
  SPECIES,
  speciesById,
  speciesForElement,
  pickWeightedSpecies,
  xpToLevel,
  statsForDragon,
  elementMultiplier,
  FOOD_PACKS,
  EGG_OFFERS,
  FOES,
  HYBRID_ELEMENTS,
  RARE_HYBRID_ELEMENTS,
  ANCIENT_ELEMENTS,
  normalizeElement,
  normalizeHabitatType,
} from "./data.js";

const SAVE_KEY = "dragon-mania-save-v1";
let uid = 0;
const nextId = (prefix) => `${prefix}_${Date.now().toString(36)}_${(++uid).toString(36)}`;

export function createDragon(speciesId, opts = {}) {
  const sp = speciesById(speciesId);
  if (!sp) throw new Error(`Unknown species ${speciesId}`);
  return {
    id: nextId("d"),
    speciesId,
    name: opts.name || sp.name,
    element: sp.element,
    level: opts.level || 1,
    xp: 0,
    habitatId: null,
    createdAt: Date.now(),
  };
}

export function hatchFromElement(element) {
  const pool = speciesForElement(element);
  const sp = pickWeightedSpecies(pool.length ? pool : SPECIES.filter((s) => s.rarity !== "legendary"));
  return createDragon(sp.id);
}

export function hatchMystery() {
  const pool = SPECIES.filter(
    (s) => !ANCIENT_ELEMENTS.includes(s.element) && (s.rarity !== "legendary" || Math.random() < 0.08)
  );
  return createDragon(pickWeightedSpecies(pool).id);
}

export function hatchAncient() {
  const el = ANCIENT_ELEMENTS[Math.floor(Math.random() * ANCIENT_ELEMENTS.length)];
  const pool = speciesForElement(el);
  return createDragon(pickWeightedSpecies(pool).id);
}

/** Breed two dragons → child species */
export function breedSpecies(parentA, parentB) {
  const sa = speciesById(parentA.speciesId);
  const sb = speciesById(parentB.speciesId);
  const sameEl = sa.element === sb.element;
  let element = sameEl ? sa.element : Math.random() < 0.5 ? sa.element : sb.element;

  // Hybrid chance toward rarer / ancient elements when parents differ
  if (!sameEl) {
    const roll = Math.random();
    if (roll < 0.06) {
      element = ANCIENT_ELEMENTS[Math.floor(Math.random() * ANCIENT_ELEMENTS.length)];
    } else if (roll < 0.14) {
      element = RARE_HYBRID_ELEMENTS[Math.floor(Math.random() * RARE_HYBRID_ELEMENTS.length)];
    } else if (roll < 0.28) {
      element = HYBRID_ELEMENTS[Math.floor(Math.random() * HYBRID_ELEMENTS.length)];
    }
  }

  let pool = speciesForElement(element);
  const avgRarity = rarityScore(sa.rarity) + rarityScore(sb.rarity);
  if (avgRarity >= 4) pool = pool.filter((s) => rarityScore(s.rarity) >= 1);
  if (avgRarity >= 6 && Math.random() < 0.25) {
    const legend = SPECIES.filter((s) => s.element === element && s.rarity === "legendary");
    if (legend.length) return legend[Math.floor(Math.random() * legend.length)];
  }
  if (!pool.length) pool = SPECIES.filter((s) => s.rarity === "common");
  return pickWeightedSpecies(pool);
}

function rarityScore(r) {
  return { common: 0, rare: 1, epic: 2, legendary: 3 }[r] ?? 0;
}

export function defaultState() {
  const d1 = createDragon("emberling");
  const d2 = createDragon("ripple");
  const h1 = {
    id: nextId("h"),
    typeId: "flame_den",
    element: "flame",
    dragonIds: [d1.id],
    lastCollectAt: Date.now(),
  };
  const h2 = {
    id: nextId("h"),
    typeId: "sea_pool",
    element: "sea",
    dragonIds: [d2.id],
    lastCollectAt: Date.now(),
  };
  d1.habitatId = h1.id;
  d2.habitatId = h2.id;
  return {
    gold: 800,
    food: 120,
    gems: 25,
    isleLevel: 1,
    dragons: [d1, d2],
    habitats: [h1, h2],
    emptySlots: 1,
    battlesWon: 0,
    breedSlotA: null,
    breedSlotB: null,
  };
}

/** Migrate legacy fire/water/earth ids and old habitat type ids. */
export function migrateState(data) {
  for (const d of data.dragons || []) {
    d.element = normalizeElement(d.element);
  }
  for (const h of data.habitats || []) {
    h.element = normalizeElement(h.element);
    h.typeId = normalizeHabitatType(h.typeId);
  }
  return data;
}

export function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultState();
    const data = JSON.parse(raw);
    if (!data?.dragons || !data?.habitats) return defaultState();
    return migrateState(data);
  } catch {
    return defaultState();
  }
}

export function saveState(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}

export function pendingGold(habitat, dragonsById) {
  const type = HABITAT_TYPES.find((h) => h.id === habitat.typeId);
  const elapsedMin = Math.min(240, (Date.now() - habitat.lastCollectAt) / 60000);
  let rate = 0;
  for (const id of habitat.dragonIds) {
    const d = dragonsById[id];
    if (d) rate += statsForDragon(d).goldPerMin;
  }
  if (!habitat.dragonIds.length && type) rate = 0.5;
  return Math.floor(rate * elapsedMin);
}

export function feedDragon(state, dragonId) {
  const d = state.dragons.find((x) => x.id === dragonId);
  if (!d) return { ok: false, msg: "Dragon not found." };
  const cost = 10 + d.level * 5;
  if (state.food < cost) return { ok: false, msg: `Need ${cost} food.` };
  if (d.level >= 20) return { ok: false, msg: "Max level reached." };
  state.food -= cost;
  d.xp += cost * 2;
  let leveled = false;
  while (d.xp >= xpToLevel(d.level) && d.level < 20) {
    d.xp -= xpToLevel(d.level);
    d.level += 1;
    leveled = true;
  }
  return { ok: true, msg: leveled ? `${d.name} reached level ${d.level}!` : `Fed ${d.name}.`, leveled };
}

export function placeDragon(state, dragonId, habitatId) {
  const d = state.dragons.find((x) => x.id === dragonId);
  const h = state.habitats.find((x) => x.id === habitatId);
  if (!d || !h) return { ok: false, msg: "Missing dragon or habitat." };
  if (d.element !== h.element) return { ok: false, msg: "Wrong element for this habitat." };
  const type = HABITAT_TYPES.find((t) => t.id === h.typeId);
  if (h.dragonIds.length >= type.capacity) return { ok: false, msg: "Habitat is full." };
  if (d.habitatId) {
    const old = state.habitats.find((x) => x.id === d.habitatId);
    if (old) old.dragonIds = old.dragonIds.filter((id) => id !== d.id);
  }
  d.habitatId = h.id;
  h.dragonIds.push(d.id);
  return { ok: true, msg: `${d.name} moved in.` };
}

export function collectHabitat(state, habitatId) {
  const h = state.habitats.find((x) => x.id === habitatId);
  if (!h) return { ok: false, msg: "No habitat." };
  const map = Object.fromEntries(state.dragons.map((d) => [d.id, d]));
  const amount = pendingGold(h, map);
  if (amount <= 0) return { ok: false, msg: "Nothing to collect yet." };
  state.gold += amount;
  h.lastCollectAt = Date.now();
  return { ok: true, msg: `Collected ${amount} gold!`, amount };
}

export function buyHabitat(state, typeId) {
  const type = HABITAT_TYPES.find((t) => t.id === typeId);
  if (!type) return { ok: false, msg: "Unknown habitat." };
  const maxHabitats = 3 + state.isleLevel;
  if (state.habitats.length >= maxHabitats) {
    return { ok: false, msg: `Isle full (max ${maxHabitats}). Win battles to level up.` };
  }
  if (state.gold < type.cost) return { ok: false, msg: "Not enough gold." };
  state.gold -= type.cost;
  state.habitats.push({
    id: nextId("h"),
    typeId: type.id,
    element: type.element,
    dragonIds: [],
    lastCollectAt: Date.now(),
  });
  return { ok: true, msg: `${type.name} built!` };
}

export function buyFood(state, packId) {
  const pack = FOOD_PACKS.find((p) => p.id === packId);
  if (!pack) return { ok: false, msg: "Unknown pack." };
  if (state.gold < pack.cost) return { ok: false, msg: "Not enough gold." };
  state.gold -= pack.cost;
  state.food += pack.food;
  return { ok: true, msg: `+${pack.food} food.` };
}

export function buyEgg(state, offerId) {
  const offer = EGG_OFFERS.find((o) => o.id === offerId);
  if (!offer) return { ok: false, msg: "Unknown egg." };
  if (offer.gems && state.gems < offer.gems) return { ok: false, msg: "Not enough gems." };
  if (offer.cost && state.gold < offer.cost) return { ok: false, msg: "Not enough gold." };
  state.gems -= offer.gems || 0;
  state.gold -= offer.cost || 0;
  let dragon;
  if (offer.element) dragon = hatchFromElement(offer.element);
  else if (offer.ancient) dragon = hatchAncient();
  else dragon = hatchMystery();
  state.dragons.push(dragon);
  return { ok: true, msg: `Hatched ${dragon.name}!`, dragon };
}

export function doBreed(state) {
  if (!state.breedSlotA || !state.breedSlotB) return { ok: false, msg: "Pick two parents." };
  if (state.breedSlotA === state.breedSlotB) return { ok: false, msg: "Need two different dragons." };
  if (state.gold < 500) return { ok: false, msg: "Breeding costs 500 gold." };
  const a = state.dragons.find((d) => d.id === state.breedSlotA);
  const b = state.dragons.find((d) => d.id === state.breedSlotB);
  if (!a || !b) return { ok: false, msg: "Parents missing." };
  if (a.level < 4 || b.level < 4) return { ok: false, msg: "Both parents must be level 4+." };
  state.gold -= 500;
  const childSp = breedSpecies(a, b);
  const child = createDragon(childSp.id);
  state.dragons.push(child);
  state.breedSlotA = null;
  state.breedSlotB = null;
  return { ok: true, msg: `Egg hatched into ${child.name}!`, dragon: child };
}

export function runBattle(state, dragonId, foeId) {
  const d = state.dragons.find((x) => x.id === dragonId);
  const foe = FOES.find((f) => f.id === foeId);
  if (!d || !foe) return { ok: false, msg: "Pick a dragon and foe." };
  const st = statsForDragon(d);
  let youHp = st.hp;
  let foeHp = foe.hp + Math.floor(state.battlesWon * 3);
  const log = [];
  const youAtk = () => {
    const mult = elementMultiplier(d.element, foe.element);
    const dmg = Math.max(1, Math.round((st.atk + Math.random() * 6) * mult));
    foeHp -= dmg;
    log.push(`${d.name} hits for ${dmg}${mult > 1 ? " (super!)" : mult < 1 ? " (resist)" : ""}.`);
  };
  const foeAtk = () => {
    const mult = elementMultiplier(foe.element, d.element);
    const dmg = Math.max(1, Math.round((foe.atk + Math.random() * 5) * mult));
    youHp -= dmg;
    log.push(`${foe.name} hits for ${dmg}.`);
  };
  // Simulate turn order for log; UI animates separately
  let turn = 0;
  const maxTurns = 30;
  while (youHp > 0 && foeHp > 0 && turn < maxTurns) {
    if (turn % 2 === 0) youAtk();
    else foeAtk();
    turn++;
  }
  const won = foeHp <= 0 && youHp > 0;
  if (won) {
    state.gold += foe.gold;
    state.food += foe.food;
    state.battlesWon += 1;
    if (state.battlesWon % 3 === 0) {
      state.isleLevel += 1;
      state.gems += 5;
    }
    d.xp += 25 + foe.level * 8;
    while (d.xp >= xpToLevel(d.level) && d.level < 20) {
      d.xp -= xpToLevel(d.level);
      d.level += 1;
    }
    log.push(`Victory! +${foe.gold} gold, +${foe.food} food.`);
  } else {
    log.push("Defeat… train harder and try again.");
  }
  return {
    ok: true,
    won,
    log,
    youMax: st.hp,
    foeMax: foe.hp + Math.floor((state.battlesWon - (won ? 1 : 0)) * 3),
    youEnd: Math.max(0, youHp),
    foeEnd: Math.max(0, foeHp),
    dragon: d,
    foe,
  };
}

export {
  ELEMENTS,
  HABITAT_TYPES,
  SPECIES,
  FOOD_PACKS,
  EGG_OFFERS,
  FOES,
  ANCIENT_ELEMENTS,
  statsForDragon,
  speciesById,
  xpToLevel,
};
