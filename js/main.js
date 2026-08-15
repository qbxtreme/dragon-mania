import {
  loadState,
  saveState,
  clearSave,
  defaultState,
  feedDragon,
  placeDragon,
  collectHabitat,
  buyHabitat,
  buyFood,
  buyEgg,
  doBreed,
  runBattle,
  pendingGold,
  ELEMENTS,
  HABITAT_TYPES,
  FOOD_PACKS,
  EGG_OFFERS,
  FOES,
  statsForDragon,
  speciesById,
  xpToLevel,
} from "./game.js";
import { dragonSvg, habitatSvg, eggSvg, foodSvg, coinSvg } from "./art.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

let state = loadState();
let breedPickSlot = null;
let selectedFoe = FOES[0].id;
let toastTimer;

const SPRITE_PX = { tiny: 48, med: 72, lg: 104 };

function spriteHtml(element, size = "med", { animate = true } = {}) {
  const px = SPRITE_PX[size] || SPRITE_PX.med;
  return `<div class="d-sprite ${size}" aria-hidden="true">${dragonSvg(element, { size: px, animate })}</div>`;
}

function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.hidden = false;
  requestAnimationFrame(() => el.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => { el.hidden = true; }, 250);
  }, 2200);
}

function openModal({ title, body, actions }) {
  const modal = $("#modal");
  $("#modal-title").textContent = title;
  $("#modal-body").innerHTML = body;
  const act = $("#modal-actions");
  act.innerHTML = "";
  for (const a of actions) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `btn ${a.primary ? "btn-primary" : "btn-ghost"}`;
    btn.textContent = a.label;
    btn.addEventListener("click", () => {
      modal.hidden = true;
      a.onClick?.();
    });
    act.appendChild(btn);
  }
  modal.hidden = false;
}

function closeModal() {
  $("#modal").hidden = true;
}

function persist() {
  saveState(state);
  renderHud();
}

function renderHud() {
  $("#res-gold").textContent = Math.floor(state.gold);
  $("#res-food").textContent = Math.floor(state.food);
  $("#res-gems").textContent = Math.floor(state.gems);
  $("#player-level").textContent = `Isle Lv ${state.isleLevel}`;
}

function showScreen(id) {
  $$(".screen").forEach((s) => {
    const on = s.id === id;
    s.classList.toggle("is-active", on);
    s.hidden = !on;
  });
}

function showPanel(name) {
  $$(".panel").forEach((p) => p.classList.toggle("is-active", p.id === `panel-${name}`));
  $$(".dock-btn").forEach((b) => b.classList.toggle("is-active", b.dataset.panel === name));
  if (name === "island") renderIsland();
  if (name === "dragons") renderDragons();
  if (name === "breed") renderBreed();
  if (name === "battle") renderBattleSetup();
  if (name === "shop") renderShop();
}

function dragonsById() {
  return Object.fromEntries(state.dragons.map((d) => [d.id, d]));
}

function renderIsland() {
  const grid = $("#habitat-grid");
  const map = dragonsById();
  grid.innerHTML = "";

  let totalGold = 0;
  for (const h of state.habitats) {
    const type = HABITAT_TYPES.find((t) => t.id === h.typeId);
    const el = ELEMENTS[h.element];
    const gold = pendingGold(h, map);
    totalGold += gold;
    const dragons = h.dragonIds.map((id) => map[id]).filter(Boolean);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `habitat el-${h.element}${gold > 0 ? " has-gold" : ""}`;
    btn.style.setProperty("--el", el.color);
    const dragonStack = dragons.length
      ? `<div class="hab-dragons">${dragons
          .slice(0, 2)
          .map((d, i) => `<div class="hab-d slot-${i}">${spriteHtml(d.element, "tiny")}</div>`)
          .join("")}</div>`
      : `<div class="hab-empty-label">Empty · ${h.dragonIds.length}/${type?.capacity || 2}</div>`;
    btn.innerHTML = `
      <div class="hab-build">${habitatSvg(h.element)}</div>
      ${dragonStack}
      <div class="hab-name">${type?.name || h.element}</div>
      <div class="hab-gold">${coinSvg(14)} +${gold}</div>
    `;
    btn.addEventListener("click", () => onHabitatTap(h, btn));
    grid.appendChild(btn);
  }

  const maxHabitats = 3 + state.isleLevel;
  if (state.habitats.length < maxHabitats) {
    const empty = document.createElement("button");
    empty.type = "button";
    empty.className = "habitat empty";
    empty.innerHTML = `<span class="empty-plus">+</span><span>Build habitat</span>`;
    empty.addEventListener("click", () => showPanel("shop"));
    grid.appendChild(empty);
  }

  $("#island-hint").textContent =
    totalGold > 0
      ? `${totalGold} gold ready — tap habitats to collect.`
      : "Dragons earn gold over time. Tap habitats to collect.";
}

function onHabitatTap(habitat, btn) {
  const map = dragonsById();
  const gold = pendingGold(habitat, map);
  if (gold > 0) {
    const res = collectHabitat(state, habitat.id);
    if (res.ok) {
      btn.classList.remove("pulse");
      void btn.offsetWidth;
      btn.classList.add("pulse");
      toast(res.msg);
      persist();
      renderIsland();
      return;
    }
  }

  const homeless = state.dragons.filter((d) => !d.habitatId && d.element === habitat.element);
  const type = HABITAT_TYPES.find((t) => t.id === habitat.typeId);
  const occupants = habitat.dragonIds.map((id) => map[id]).filter(Boolean);

  let body = `<p><strong>${type.name}</strong> · ${ELEMENTS[habitat.element].name}</p>`;
  body += `<p class="meta">Dragons: ${occupants.map((d) => d.name).join(", ") || "none"}</p>`;
  if (homeless.length) {
    body += `<p style="margin-top:.75rem">Place a dragon:</p><div style="display:grid;gap:.4rem;margin-top:.4rem">`;
    for (const d of homeless) {
      body += `<button type="button" class="btn btn-ghost place-d" data-id="${d.id}">${d.name} (Lv ${d.level})</button>`;
    }
    body += `</div>`;
  } else if (occupants.length >= (type?.capacity || 2)) {
    body += `<p>Habitat full. Collect gold when ready.</p>`;
  } else {
    body += `<p>No free ${ELEMENTS[habitat.element].name} dragons. Hatch eggs in the Shop or Breed.</p>`;
  }

  openModal({
    title: type.name,
    body,
    actions: [{ label: "Close", onClick: () => {} }],
  });

  $$(".place-d", $("#modal-body")).forEach((b) => {
    b.addEventListener("click", () => {
      const res = placeDragon(state, b.dataset.id, habitat.id);
      toast(res.msg);
      if (res.ok) {
        persist();
        closeModal();
        renderIsland();
      }
    });
  });
}

function renderDragons() {
  const list = $("#dragon-list");
  list.innerHTML = "";
  const sorted = [...state.dragons].sort((a, b) => b.level - a.level || a.name.localeCompare(b.name));
  for (const d of sorted) {
    const sp = speciesById(d.speciesId);
    const st = statsForDragon(d);
    const need = xpToLevel(d.level);
    const pct = Math.min(100, Math.round((d.xp / need) * 100));
    const feedCost = 10 + d.level * 5;
    const el = ELEMENTS[d.element];
    const row = document.createElement("article");
    row.className = "card-row";
    row.innerHTML = `
      ${spriteHtml(d.element, "med")}
      <div class="info">
        <h3>${d.name} <span class="el-badge" style="--el:${el.color}">${el.name}</span></h3>
        <p class="meta">${sp.rarity} · Lv ${d.level} · ATK ${st.atk} · HP ${st.hp}${d.habitatId ? "" : " · homeless"}</p>
        <div class="xp-bar"><i style="width:${pct}%"></i></div>
      </div>
      <div class="card-actions">
        <button type="button" class="btn btn-primary feed-btn">Feed (${feedCost})</button>
      </div>
    `;
    $(".feed-btn", row).addEventListener("click", () => {
      const res = feedDragon(state, d.id);
      toast(res.msg);
      if (res.ok) {
        persist();
        renderDragons();
        renderHud();
      }
    });
    list.appendChild(row);
  }
}

function renderBreed() {
  const fill = (slotEl, id) => {
    if (!id) {
      slotEl.classList.remove("filled");
      slotEl.innerHTML = `<span class="slot-label">${slotEl.dataset.slot === "a" ? "Parent A" : "Parent B"}</span>`;
      return;
    }
    const d = state.dragons.find((x) => x.id === id);
    if (!d) {
      slotEl.classList.remove("filled");
      return;
    }
    slotEl.classList.add("filled");
    slotEl.innerHTML = `${spriteHtml(d.element, "med")}<div style="font-weight:800;font-size:.8rem">${d.name}<br/>Lv ${d.level}</div>`;
  };
  fill($("#breed-slot-a"), state.breedSlotA);
  fill($("#breed-slot-b"), state.breedSlotB);
  const ready = state.breedSlotA && state.breedSlotB && state.breedSlotA !== state.breedSlotB;
  $("#btn-breed").disabled = !ready;
  $("#breed-result").hidden = true;
  $("#breed-picker").hidden = true;
}

function openBreedPicker(slot) {
  breedPickSlot = slot;
  const picker = $("#breed-picker");
  picker.hidden = false;
  picker.innerHTML = `<p style="color:#fff6e8;font-weight:800">Choose Parent ${slot.toUpperCase()} (Lv 4+)</p>`;
  const eligible = state.dragons.filter((d) => d.level >= 4);
  if (!eligible.length) {
    picker.innerHTML += `<p style="color:rgba(243,239,230,.8)">Feed dragons to level 4 first.</p>`;
    return;
  }
  for (const d of eligible) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "card-row";
    b.style.width = "100%";
    b.style.border = "none";
    b.innerHTML = `${spriteHtml(d.element, "tiny")}<div class="info"><h3>${d.name}</h3><p class="meta">Lv ${d.level} · ${ELEMENTS[d.element].name}</p></div>`;
    b.addEventListener("click", () => {
      if (slot === "a") state.breedSlotA = d.id;
      else state.breedSlotB = d.id;
      persist();
      renderBreed();
    });
    picker.appendChild(b);
  }
}

function renderBattleSetup() {
  $("#battle-setup").hidden = false;
  $("#battle-arena").hidden = true;
  const sel = $("#battle-dragon");
  sel.innerHTML = state.dragons
    .map((d) => {
      const st = statsForDragon(d);
      return `<option value="${d.id}">${d.name} · Lv ${d.level} · ATK ${st.atk}</option>`;
    })
    .join("");
  const row = $("#foe-row");
  row.innerHTML = "";
  for (const f of FOES) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `foe-card${selectedFoe === f.id ? " is-selected" : ""}`;
    b.innerHTML = `${spriteHtml(f.element, "tiny")}<div>${f.name}</div><div style="opacity:.8">Lv ${f.level}</div>`;
    b.addEventListener("click", () => {
      selectedFoe = f.id;
      renderBattleSetup();
    });
    row.appendChild(b);
  }
}

async function playBattle() {
  const dragonId = $("#battle-dragon").value;
  const result = runBattle(state, dragonId, selectedFoe);
  if (!result.ok) {
    toast(result.msg);
    return;
  }
  persist();
  $("#battle-setup").hidden = true;
  const arena = $("#battle-arena");
  arena.hidden = false;
  $("#btn-battle-done").hidden = true;

  const d = result.dragon;
  const foe = result.foe;
  $("#fighter-you").innerHTML = `${spriteHtml(d.element, "lg")}<div>${d.name}</div>`;
  $("#fighter-foe").innerHTML = `${spriteHtml(foe.element, "lg")}<div>${foe.name}</div>`;

  let youHp = result.youMax;
  let foeHp = result.foeMax;
  const setBars = () => {
    $("#hp-you").style.width = `${Math.max(0, (youHp / result.youMax) * 100)}%`;
    $("#hp-foe").style.width = `${Math.max(0, (foeHp / result.foeMax) * 100)}%`;
  };
  setBars();
  const logEl = $("#battle-log");
  logEl.textContent = "Battle begins…";

  // Replay approximate HP from log lines
  const hitRe = /hits for (\d+)/;
  for (const line of result.log) {
    await wait(550);
    logEl.textContent = line;
    const m = line.match(hitRe);
    if (!m) continue;
    const dmg = Number(m[1]);
    if (line.startsWith(d.name)) {
      foeHp = Math.max(0, foeHp - dmg);
      $("#fighter-foe").classList.remove("hit");
      void $("#fighter-foe").offsetWidth;
      $("#fighter-foe").classList.add("hit");
    } else {
      youHp = Math.max(0, youHp - dmg);
      $("#fighter-you").classList.remove("hit");
      void $("#fighter-you").offsetWidth;
      $("#fighter-you").classList.add("hit");
    }
    setBars();
  }
  youHp = result.youEnd;
  foeHp = result.foeEnd;
  setBars();
  logEl.textContent = result.log[result.log.length - 1];
  $("#btn-battle-done").hidden = false;
  toast(result.won ? "Victory!" : "Defeat");
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function renderShop() {
  const list = $("#shop-list");
  list.innerHTML = "";

  const section = (title) => {
    const h = document.createElement("h3");
    h.style.cssText = "margin:1rem 0 .4rem;color:#fff6e8;font-family:var(--font-display);font-weight:400";
    h.textContent = title;
    list.appendChild(h);
  };

  section("Habitats");
  for (const t of HABITAT_TYPES) {
    const el = ELEMENTS[t.element];
    const row = document.createElement("div");
    row.className = "card-row shop-item";
    row.innerHTML = `
      <div class="shop-thumb habitat-thumb">${habitatSvg(t.element)}</div>
      <div class="info"><h3>${t.name}</h3><p class="meta">${el.name} · holds ${t.capacity}</p><p class="price">${coinSvg(14)} ${t.cost}</p></div>
      <div class="card-actions"><button type="button" class="btn btn-primary">Build</button></div>
    `;
    $("button", row).addEventListener("click", () => {
      const res = buyHabitat(state, t.id);
      toast(res.msg);
      if (res.ok) {
        persist();
        renderShop();
      }
    });
    list.appendChild(row);
  }

  section("Food");
  for (const p of FOOD_PACKS) {
    const row = document.createElement("div");
    row.className = "card-row shop-item";
    row.innerHTML = `
      <div class="shop-thumb">${foodSvg(48)}</div>
      <div class="info"><h3>${p.name}</h3><p class="meta">+${p.food} food</p><p class="price">${coinSvg(14)} ${p.cost}</p></div>
      <div class="card-actions"><button type="button" class="btn btn-primary">Buy</button></div>
    `;
    $("button", row).addEventListener("click", () => {
      const res = buyFood(state, p.id);
      toast(res.msg);
      if (res.ok) {
        persist();
        renderShop();
      }
    });
    list.appendChild(row);
  }

  section("Eggs");
  for (const e of EGG_OFFERS) {
    const price = e.gems ? `${e.gems} gems` : `${e.cost} gold`;
    const row = document.createElement("div");
    row.className = "card-row shop-item";
    row.innerHTML = `
      <div class="shop-thumb">${eggSvg(e.element, 44)}</div>
      <div class="info"><h3>${e.name}</h3><p class="meta">Hatch a new dragon</p><p class="price">${price}</p></div>
      <div class="card-actions"><button type="button" class="btn btn-primary">Hatch</button></div>
    `;
    $("button", row).addEventListener("click", () => {
      const res = buyEgg(state, e.id);
      toast(res.msg);
      if (res.ok) {
        persist();
        renderShop();
        openModal({
          title: "New dragon!",
          body: `<div class="modal-hero">${spriteHtml(res.dragon.element, "lg")}</div><p style="text-align:center;font-weight:800;margin:.5rem 0 0">${res.dragon.name}</p><p style="text-align:center;color:var(--muted)">${ELEMENTS[res.dragon.element].name} · place them in a matching habitat</p>`,
          actions: [
            { label: "View dragons", primary: true, onClick: () => showPanel("dragons") },
            { label: "Nice", onClick: () => {} },
          ],
        });
      }
    });
    list.appendChild(row);
  }
}

function startGame(fresh = false) {
  if (fresh) {
    clearSave();
    state = defaultState();
    saveState(state);
  } else {
    state = loadState();
  }
  showScreen("screen-game");
  renderHud();
  showPanel("island");
}

function bind() {
  $("#btn-play").addEventListener("click", () => startGame(false));
  $("#btn-reset-save").addEventListener("click", () => {
    openModal({
      title: "Start over?",
      body: "<p>This erases your island, dragons, and resources.</p>",
      actions: [
        { label: "Cancel", onClick: () => {} },
        {
          label: "New Game",
          primary: true,
          onClick: () => startGame(true),
        },
      ],
    });
  });
  $("#btn-home").addEventListener("click", () => {
    persist();
    showScreen("screen-title");
  });
  $$(".dock-btn").forEach((b) => b.addEventListener("click", () => showPanel(b.dataset.panel)));
  $("#breed-slot-a").addEventListener("click", () => openBreedPicker("a"));
  $("#breed-slot-b").addEventListener("click", () => openBreedPicker("b"));
  $("#btn-breed").addEventListener("click", () => {
    const res = doBreed(state);
    if (!res.ok) {
      toast(res.msg);
      return;
    }
    persist();
    renderBreed();
    const box = $("#breed-result");
    box.hidden = false;
    box.innerHTML = `<div class="modal-hero">${spriteHtml(res.dragon.element, "lg")}</div><p style="font-weight:800;margin:.5rem 0 0">${res.msg}</p>`;
    toast(res.msg);
  });
  $("#btn-battle").addEventListener("click", () => playBattle());
  $("#btn-battle-done").addEventListener("click", () => renderBattleSetup());
  $("#modal").addEventListener("click", (e) => {
    if (e.target.id === "modal") closeModal();
  });

  // Refresh habitat gold badges without rebuilding SVG art
  setInterval(() => {
    if (!$("#panel-island")?.classList.contains("is-active") || $("#screen-game").hidden) return;
    const map = dragonsById();
    let totalGold = 0;
    const buttons = $$("#habitat-grid .habitat:not(.empty)");
    state.habitats.forEach((h, i) => {
      const gold = pendingGold(h, map);
      totalGold += gold;
      const btn = buttons[i];
      if (!btn) return;
      btn.classList.toggle("has-gold", gold > 0);
      const badge = $(".hab-gold", btn);
      if (badge) badge.innerHTML = `${coinSvg(14)} +${gold}`;
    });
    $("#island-hint").textContent =
      totalGold > 0
        ? `${totalGold} gold ready — tap habitats to collect.`
        : "Dragons earn gold over time. Tap habitats to collect.";
  }, 4000);
}

bind();
renderHud();

// Title-screen dragons (original SVG art)
const ta = document.getElementById("title-dragon-a");
const tb = document.getElementById("title-dragon-b");
if (ta) ta.innerHTML = dragonSvg("fire", { size: 88, animate: true });
if (tb) tb.innerHTML = dragonSvg("water", { size: 72, animate: true });
