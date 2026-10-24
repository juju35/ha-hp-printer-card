import assert from "node:assert/strict";
import { test } from "node:test";
import { loadCard } from "./load.mjs";

const { HpPrinterCard, HpPrinterCardEditor, hpHpInks, hpEsc, hpFill } = loadCard("hp-printer-card.js", [
  "HpPrinterCard",
  "HpPrinterCardEditor",
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

function render(hass, config = { device_id: "p" }) {
  const card = new HpPrinterCard();
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
    const ed = new HpPrinterCardEditor();
    ed.setConfig(config);
    ed.hass = { language };
    return ed._form.computeLabel({ name: "name" });
  };
  assert.equal(label({}), "Name");
  assert.equal(label({ language: "fr" }), "Nom");
  assert.equal(label({ language: "en" }, "fr"), "Name");
});
