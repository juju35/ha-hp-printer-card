import assert from "node:assert/strict";
import { test } from "node:test";
import { loadCard } from "./load.mjs";

const { PrinterCard, PrinterCardEditor, PrinterMiniCard, PrinterMiniCardEditor, hpHpInks, hpEsc, hpFill, hpPictureFor, customElements, listeners } = loadCard("printer-card.js", [
  "PrinterCard",
  "PrinterCardEditor",
  "PrinterMiniCard",
  "PrinterMiniCardEditor",
  "hpPictureFor",
  "hpHpInks",
  "hpEsc",
  "hpFill",
]);

const st = (state, attributes = {}, extra = {}) => ({ state, attributes, ...extra });
const STATUS_OPTIONS = ["ready", "inpowersave", "processing", "scanprocessing", "stopped"];

// A HP Printer device (p) with one cartridge sub-device per color, without slot sensors.
function mockHass({ status = "ready", totalPages = "12345", lastChanged } = {}) {
  const states = {
    "sensor.printer_status": st(status, { options: STATUS_OPTIONS }, { last_changed: lastChanged }),
    "sensor.printer_total_pages": st(totalPages, { unit_of_measurement: "pages", state_class: "total_increasing" }),
  };
  const entities = {
    "sensor.printer_status": { entity_id: "sensor.printer_status", device_id: "p" },
    "sensor.printer_total_pages": { entity_id: "sensor.printer_total_pages", device_id: "p_counters" },
  };
  const devices = { p: { name: "OfficeJet", manufacturer: "HP" }, p_counters: { name: "OfficeJet Printer", via_device_id: "p" } };
  for (const color of ["yellow", "black", "cyan", "magenta"]) {
    const id = `sensor.${color}_level`;
    states[id] = st("50", { unit_of_measurement: "%" });
    entities[id] = { entity_id: id, device_id: `ink_${color}` };
    devices[`ink_${color}`] = { name: `OfficeJet ${color} cartridge`, via_device_id: "p" };
  }
  return { language: "en", states, entities, devices };
}

function render(hass, config = { device_id: "p" }, Card = PrinterCard) {
  const card = new Card();
  card.setConfig(config);
  card.hass = hass;
  return card;
}

test("black comes first when cartridges have no slot sensor", () => {
  const hass = mockHass();
  const inks = hpHpInks(hass, ["ink_yellow", "ink_black", "ink_cyan", "ink_magenta"]);
  assert.equal(inks.map((i) => i.color).join(","), "black,cyan,magenta,yellow");
});

test("a non-numeric total pages state is escaped", () => {
  const html = render(mockHass({ totalPages: "<b onmouseover=alert(1)>x</b>" })).shadowRoot.innerHTML;
  assert.doesNotMatch(html, /<b onmouseover/);
  assert.match(html, /&lt;b onmouseover=alert\(1\)&gt;x&lt;\/b&gt; pages printed/);
});

test("the 'last seen' text follows the clock while the printer is offline", (t) => {
  const t0 = Date.parse("2026-10-24T10:00:00Z");
  t.mock.timers.enable({ apis: ["Date"], now: t0 + 5 * 60000 });
  const card = render(mockHass({ status: "unavailable", lastChanged: new Date(t0).toISOString() }));
  assert.ok(card.shadowRoot.innerHTML.includes("5 minutes ago"), "5 minutes ago");
  t.mock.timers.setTime(t0 + 2 * 3600000);
  card._update(); // what the one-minute interval does
  assert.ok(card.shadowRoot.innerHTML.includes("2 hours ago"), "2 hours ago");
});

test("an online printer is not re-rendered by the clock alone", () => {
  const card = render(mockHass());
  const before = card.shadowRoot.innerHTML;
  card.shadowRoot.innerHTML = "untouched";
  card._update();
  assert.equal(card.shadowRoot.innerHTML, "untouched");
  assert.ok(before.length > 0);
});

test("discovery is reused until the registry changes", () => {
  const hass = mockHass();
  const card = render(hass);
  const first = card._resolve();
  card._hass = { ...hass, states: { ...hass.states } };
  assert.equal(card._resolve(), first);
  card._hass = { ...hass, entities: { ...hass.entities } };
  assert.notEqual(card._resolve(), first);
});

// The IPP integration may load after HP Printer: its sensor is missing, then unavailable, then ready.
function withIpp(hass, ippState) {
  const out = { ...hass, states: { ...hass.states }, entities: { ...hass.entities }, devices: { ...hass.devices } };
  out.devices.p = { ...out.devices.p, model: "OfficeJet Pro 9010" };
  out.devices.ipp_dev = { name: "OfficeJet IPP", model: "OfficeJet Pro 9010" };
  out.entities["sensor.ipp_printer"] = { entity_id: "sensor.ipp_printer", device_id: "ipp_dev" };
  if (ippState) out.states["sensor.ipp_printer"] = ippState;
  return out;
}
const IPP_READY = st("idle", { uri_supported: "ipp://printer.local/ipp/print", state_reason: "media-empty-error" });

for (const [label, first] of [["absent", undefined], ["unavailable", st("unavailable", {})]]) {
  test(`the IPP sensor is found once it becomes ready (${label} on the first render)`, () => {
    const base = withIpp(mockHass(), first);
    const card = render(base);
    assert.equal(card._resolve().ipp, undefined);
    assert.doesNotMatch(card.shadowRoot.innerHTML, /Paper tray empty/);
    // Only the IPP state changes: same registry objects.
    card.hass = { ...base, states: { ...base.states, "sensor.ipp_printer": IPP_READY } };
    assert.equal(card._resolve().ipp, "sensor.ipp_printer");
    assert.match(card.shadowRoot.innerHTML, /Paper tray empty/);
  });
}

test("a printer without IPP sensor does not redo the whole discovery on each update", () => {
  const hass = mockHass();
  const card = render(hass);
  const first = card._resolve();
  card._hass = { ...hass, states: { ...hass.states } };
  assert.equal(card._resolve(), first);
});

test("hpEsc escapes HTML text and attributes", () => {
  assert.equal(hpEsc(`<"'&>`), "&lt;&quot;&#39;&amp;&gt;");
});

test("admin_url only becomes a link with an http(s) scheme", () => {
  const html = (admin_url) => render(mockHass(), { device_id: "p", admin_url }).shadowRoot.innerHTML;
  assert.match(html("http://printer.local/"), /<a class="pic[^"]*" href="http:\/\/printer\.local\/"/);
  assert.doesNotMatch(html("javascript:alert(1)"), /javascript:/);
});

test("hpFill replaces placeholders of any length", () => {
  assert.equal(hpFill("{n} of {total}", { n: 1, total: 3 }), "1 of 3");
  assert.equal(hpFill("{missing}", {}), "{missing}");
});

test("editor labels follow the language option", () => {
  const label = (config, language = "en") => {
    const ed = new PrinterCardEditor();
    ed.setConfig(config);
    ed.hass = { language };
    return ed._form.computeLabel({ name: "name" });
  };
  assert.equal(label({}), "Name");
  assert.equal(label({ language: "fr" }), "Nom");
  assert.equal(label({ language: "en" }, "fr"), "Name");
});

// A focused link (picture or HP logo) keeps the keyboard focus when innerHTML rebuilds the card.
for (const cls of ["pic", "logo"]) {
  test(`the focused ${cls} link keeps the focus after a re-render`, () => {
    const hass = mockHass();
    const card = render(hass, { device_id: "p", admin_url: "http://printer.local", show_logo: true });
    const root = card.shadowRoot;
    const link = (c) => ({ tagName: "A", classList: { contains: (k) => c.split(" ").includes(k) } });
    root.activeElement = link(`${cls} busy`);
    const focused = [];
    root.querySelector = (sel) => (sel === `a.${cls}` ? { focus: (o) => focused.push([sel, o]) } : null);
    card.hass = { ...hass, states: { ...hass.states, "sensor.printer_status": st("processing", { options: STATUS_OPTIONS }) } };
    assert.match(root.innerHTML, /Printing|processing/i);
    assert.deepEqual(JSON.parse(JSON.stringify(focused)), [[`a.${cls}`, { preventScroll: true }]]);
  });
}

test("an unfocused card does not take the focus on a re-render", () => {
  const hass = mockHass();
  const card = render(hass, { device_id: "p", admin_url: "http://printer.local" });
  let called = false;
  card.shadowRoot.querySelector = () => ({ focus: () => { called = true; } });
  card.hass = { ...hass, states: { ...hass.states, "sensor.printer_status": st("processing", { options: STATUS_OPTIONS }) } };
  assert.equal(called, false);
});

// IPP-only printer of another brand: a printer sensor and one sensor per toner cartridge.
function ippHass({ state = "idle", reason = "none", manufacturer = "Brother", model = "HL-L2350DW" } = {}) {
  const states = {
    "sensor.brother_printer": st(state, { uri_supported: "ipp://brother.local/ipp/print", state_reason: reason, options: ["idle", "printing", "stopped"] }),
    "sensor.brother_black_toner": st("42", { unit_of_measurement: "%", marker_type: "toner-cartridge", friendly_name: "Black toner" }),
  };
  const entities = {
    "sensor.brother_printer": { entity_id: "sensor.brother_printer", device_id: "b" },
    "sensor.brother_black_toner": { entity_id: "sensor.brother_black_toner", device_id: "b" },
  };
  return { language: "en", states, entities, devices: { b: { name: "Brother HL-L2350DW", manufacturer, model } } };
}

test("an IPP printer of another brand gets the generic picture, its toner and no HP logo", () => {
  const html = render(ippHass(), { device_id: "b" }).shadowRoot.innerHTML;
  assert.match(html, /class="art art-generic"/);
  assert.match(html, /Toner levels/);
  assert.match(html, /42<small>%<\/small>/);
  assert.doesNotMatch(html, /class="logo"/);
});

test("IPP states and state reasons drive the status and alerts", () => {
  const html = render(ippHass({ state: "printing", reason: "media-jam-error" }), { device_id: "b" }).shadowRoot.innerHTML;
  assert.match(html, /Printing/);
  assert.match(html, /Paper jam/);
  assert.match(html, /class="pic busy"|class="pic busy /);
});

test("an HP printer through IPP only keeps the HP logo", () => {
  const html = render(ippHass({ manufacturer: "HP", model: "LaserJet Pro M404dn" }), { device_id: "b" }).shadowRoot.innerHTML;
  assert.match(html, /class="logo"/);
  assert.match(html, /art-laserjet/);
});

test("the picture follows the model", () => {
  const pic = (model, manufacturer = "HP", kind = "hp") => hpPictureFor({ manufacturer, model }, kind);
  assert.equal(pic("HP OfficeJet Pro 9012"), "officejet");
  assert.equal(pic("OfficeJet Pro 8020"), "officejet");
  assert.equal(pic("Color LaserJet Pro MFP M479fdw"), "laserjet");
  assert.equal(pic("DeskJet 2720e"), "deskjet");
  assert.equal(pic("Smart Tank 7305"), "smart_tank");
  assert.equal(pic("ET-2850", "EPSON", "ipp"), "generic");
});

test("the generic picture hides the HP logo, even for an HP printer", () => {
  const hass = mockHass();
  assert.match(render(hass).shadowRoot.innerHTML, /class="logo"/);
  assert.doesNotMatch(render(hass, { device_id: "p", picture: "generic" }).shadowRoot.innerHTML, /class="logo"/);
});

test("the picture option overrides detection, and a custom image overrides both", () => {
  const hass = mockHass();
  assert.match(render(hass, { device_id: "p", picture: "generic" }).shadowRoot.innerHTML, /art-generic/);
  const custom = render(hass, { device_id: "p", picture: "generic", image: "/local/p.png" }).shadowRoot.innerHTML;
  assert.match(custom, /<img src="\/local\/p.png"/);
  assert.doesNotMatch(custom, /class="art/);
});


test("the card and its editor are registered under their new names only", () => {
  assert.equal(customElements.get("printer-card"), PrinterCard);
  assert.ok(customElements.get("printer-card-editor"));
  assert.equal(customElements.get("hp-printer-card"), undefined);
  assert.equal(customElements.get("printer-mini-card"), PrinterMiniCard);
  assert.equal(customElements.get("printer-mini-card-editor"), PrinterMiniCardEditor);
});

// ── Mini card ────────────────────────────────────────────────────────────────
const mini = (hass, config = {}) => render(hass, { device_id: "p", ...config }, PrinterMiniCard);
const levels = (hass, values) => {
  const states = { ...hass.states };
  for (const [color, v] of Object.entries(values)) states[`sensor.${color}_level`] = st(String(v), { unit_of_measurement: "%" });
  return { ...hass, states };
};
// Clicks the detail button: the card wires it on each render through shadowRoot.querySelector(".zoom").
function clickZoom(card, detail = 1) {
  let onClick;
  const focused = [];
  card.shadowRoot.querySelector = (sel) =>
    sel === ".zoom" ? { addEventListener: (_t, fn) => { onClick = fn; }, focus: () => focused.push(sel) } : null;
  card._sig = null;
  card._update();
  const ev = { detail, stopped: false, stopPropagation() { this.stopped = true; } };
  onClick(ev);
  return { ev, focused };
}
const documentClick = (path) => {
  for (const [type, fn, capture] of listeners) if (type === "click" && capture) fn({ composedPath: () => path });
};

test("the mini card shows the name, the status and one chip per cartridge, tinted when low", () => {
  const html = mini(levels(mockHass(), { yellow: 3, cyan: 12 })).shadowRoot.innerHTML;
  assert.match(html, /<ha-card class="mini">/);
  assert.match(html, /<div class="name">OfficeJet<\/div>/);
  assert.match(html, /<div class="status">.*Ready/);
  assert.equal((html.match(/class="dot"/g) || []).length, 4);
  assert.match(html, /<span class="r error"[^>]*><span class="dot"[^>]*><\/span>3 %/);
  assert.match(html, /<span class="r warn"[^>]*><span class="dot"[^>]*><\/span>12 %/);
  assert.match(html, /<span class="r"[^>]*><span class="dot"[^>]*><\/span>50 %/);
  // Neither the full card's sections nor an ink alert chip repeating the cartridge.
  assert.doesNotMatch(html, /Ink levels|class="tank"|ink low/);
});

test("the mini card shows a chip per active alert", () => {
  const html = mini(withIpp(mockHass(), IPP_READY)).shadowRoot.innerHTML;
  assert.match(html, /<span class="r error"><ha-icon icon="mdi:paper-roll-outline"><\/ha-icon>Paper tray empty<\/span>/);
});

test("the mini card says offline, without chips, when the printer is off", () => {
  const html = mini(mockHass({ status: "unavailable" })).shadowRoot.innerHTML;
  assert.match(html, /<ha-card class="offline mini">/);
  assert.match(html, /Offline/);
  assert.doesNotMatch(html, /class="dot"/);
});

test("the mini card keeps the HP logo rule of the full card", () => {
  assert.match(mini(mockHass()).shadowRoot.innerHTML, /class="logo"/);
  assert.doesNotMatch(mini(mockHass(), { picture: "generic" }).shadowRoot.innerHTML, /class="logo"/);
});

test("the detail button shows the full card, then the compact view again", () => {
  const card = mini(mockHass());
  assert.match(card.shadowRoot.innerHTML, /<button class="zoom" title="Show the full card"><ha-icon icon="mdi:arrow-expand">/);
  assert.equal(card.getCardSize(), 2);
  const { ev } = clickZoom(card);
  assert.equal(ev.stopped, true);
  const full = card.shadowRoot.innerHTML;
  // The full card's content: picture, status, ink tanks, alerts, and the button back.
  assert.match(full, /class="art art-officejet"/);
  assert.match(full, /Ready/);
  assert.match(full, /Ink levels/);
  assert.equal((full.match(/class="tank"/g) || []).length, 4);
  assert.match(full, /Alerts/);
  assert.match(full, /12,345 pages printed/);
  assert.match(full, /<button class="zoom" title="Back to the compact view"><ha-icon icon="mdi:arrow-collapse">/);
  assert.doesNotMatch(full, /class="mini"/);
  assert.equal(card.getCardSize(), 5);
  assert.deepEqual({ ...card.getGridOptions() }, { columns: 12, min_columns: 6 });
  clickZoom(card);
  assert.match(card.shadowRoot.innerHTML, /<ha-card class="mini">/);
  assert.match(card.shadowRoot.innerHTML, /mdi:arrow-expand/);
});

test("the full view is the same markup as the full card, plus the button", () => {
  const hass = mockHass();
  const card = mini(hass);
  clickZoom(card);
  const strip = (html) => html.replace(/<button class="zoom"[\s\S]*?<\/button>/, "").replace(/<style>[\s\S]*<\/style>/, "");
  assert.equal(strip(card.shadowRoot.innerHTML), strip(render(hass).shadowRoot.innerHTML));
});

test("a keyboard press on the detail button keeps the focus on it", () => {
  const card = mini(mockHass());
  assert.deepEqual(clickZoom(card, 0).focused, [".zoom"]);
  assert.deepEqual(clickZoom(card, 1).focused, []);
});

test("a click outside the card brings back the compact view, not one inside it or in a dialog", () => {
  const card = mini(mockHass());
  card.connectedCallback();
  try {
    clickZoom(card);
    documentClick([{ localName: "div" }, card, { localName: "body" }]);
    assert.match(card.shadowRoot.innerHTML, /Ink levels/, "inside the card");
    documentClick([{ localName: "mwc-button" }, { localName: "ha-more-info-dialog" }, { localName: "body" }]);
    documentClick([{ localName: "dialog" }]);
    assert.match(card.shadowRoot.innerHTML, /Ink levels/, "in a dialog");
    documentClick([{ localName: "div" }, { localName: "body" }]);
    assert.match(card.shadowRoot.innerHTML, /<ha-card class="mini">/, "outside");
  } finally {
    card.disconnectedCallback();
  }
  assert.equal(listeners.filter(([type]) => type === "click").length, 0, "listener removed");
});

test("zoom: false removes the detail button", () => {
  assert.doesNotMatch(mini(mockHass(), { zoom: false }).shadowRoot.innerHTML, /class="zoom"/);
  assert.doesNotMatch(render(mockHass()).shadowRoot.innerHTML, /class="zoom"/, "never on the full card");
});

test("the mini card editor offers zoom and keeps it out of the YAML at its default", () => {
  const ed = new PrinterMiniCardEditor();
  ed.setConfig({ type: "custom:printer-mini-card" });
  ed.hass = { language: "fr" };
  assert.ok(ed._form.schema.some((s) => s.name === "zoom"));
  assert.equal(ed._form.computeLabel({ name: "zoom" }), "Bouton de détail");
  assert.ok(ed._form.computeHelper({ name: "zoom" }));
  assert.equal(ed._form.data.zoom, true);
  const sent = [];
  ed.dispatchEvent = (e) => sent.push(e);
  ed._valueChanged({ stopPropagation() {}, detail: { value: { zoom: true, show_inks: true } } });
  assert.deepEqual({ ...ed._config }, { type: "custom:printer-mini-card" });
  ed._valueChanged({ stopPropagation() {}, detail: { value: { zoom: false } } });
  assert.equal(ed._config.zoom, false);
  assert.ok(!new PrinterCardEditor()._schema.call({ _lang: () => "en" }).some((s) => s.name === "zoom"));
});
