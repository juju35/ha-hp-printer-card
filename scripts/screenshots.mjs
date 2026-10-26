// Renders the card with mock data and saves the README screenshots.
// Usage: npm run build && npm run screenshots
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const cardJs = readFileSync(`${root}dist/printer-card.js`, "utf8");

const THEMES = {
  light: {
    "--primary-background-color": "#e8eaed",
    "--secondary-background-color": "#ececec",
    "--card-background-color": "#ffffff",
    "--primary-text-color": "#212121",
    "--secondary-text-color": "#727272",
    "--divider-color": "rgba(0,0,0,.12)",
  },
  dark: {
    "--primary-background-color": "#111111",
    "--secondary-background-color": "#282828",
    "--card-background-color": "#1c1c1c",
    "--primary-text-color": "#e1e1e1",
    "--secondary-text-color": "#9b9b9b",
    "--divider-color": "rgba(225,225,225,.12)",
  },
};
const COMMON = {
  "--primary-color": "#03a9f4",
  "--info-color": "#039be5",
  "--success-color": "#43a047",
  "--warning-color": "#ffa600",
  "--error-color": "#db4437",
  "--text-primary-color": "#ffffff",
};

// Minimal stand-ins for Home Assistant's <ha-card> and <ha-icon> (Material Design Icons paths below).
const haElements = (icons) => `
const ICONS = ${JSON.stringify(icons)};
customElements.define("ha-card", class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML =
      "<style>:host{display:block;background:var(--card-background-color);border-radius:12px;" +
      "border:1px solid var(--divider-color);color:var(--primary-text-color);overflow:hidden}</style><slot></slot>";
  }
});
customElements.define("ha-icon", class extends HTMLElement {
  static get observedAttributes() { return ["icon"]; }
  connectedCallback() { this._draw(); }
  attributeChangedCallback() { this._draw(); }
  _draw() {
    const path = ICONS[(this.getAttribute("icon") || "").replace("mdi:", "")] || "";
    this.style.display = "inline-flex";
    this.innerHTML = '<svg viewBox="0 0 24 24" style="width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);fill:currentColor"><path d="' + path + '"/></svg>';
  }
});`;

const pageHtml = (theme, width) => `<!doctype html><html><head><meta charset="utf-8">
<style>
  :root { ${Object.entries({ ...THEMES[theme], ...COMMON }).map(([k, v]) => `${k}:${v};`).join("")} }
  body { margin: 0; padding: 16px; background: var(--primary-background-color); color: var(--primary-text-color);
         font-family: Roboto, "Segoe UI", Helvetica, Arial, sans-serif; width: ${width}px; }
</style></head><body><div id="root"></div></body></html>`;

// Opens one shot { file, type, theme, width, config, hass?, after? } in a fresh page and returns it.
// A fresh page per shot: re-running the scripts in the same realm would redeclare their globals.
async function openCard(browser, s, { icons = {}, hass = {}, extra = "" }) {
  const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 1000, height: 2000 } });
  page.on("pageerror", (err) => console.error(`${s.file}: ${err.message}`));
  await page.setContent(pageHtml(s.theme, s.width));
  await page.addScriptTag({ content: haElements(icons) + extra });
  await page.addScriptTag({ content: cardJs });
  await page.evaluate(
    ({ type, config, hass, dark }) => {
      const el = document.createElement(type);
      el.setConfig({ type: `custom:${type}`, ...config });
      el.hass = { states: {}, entities: {}, devices: {}, language: "en", locale: { language: "en" },
                  themes: { darkMode: dark }, callService: async () => {}, callWS: async () => ({}), ...hass };
      document.getElementById("root").appendChild(el);
    },
    { type: s.type, config: s.config || {}, hass: { ...hass, ...(s.hass || {}) }, dark: s.theme === "dark" }
  );
  if (s.after) await s.after(page);
  return page;
}

// Renders each shot { file, type, theme, width, config, hass?, after? } into screenshots/<file>.png.
// extra: more stand-in elements, as script source.
export async function render(shots, { icons = {}, hass = {}, extra = "" } = {}) {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of shots) {
    const page = await openCard(browser, s, { icons, hass, extra });
    await page.waitForTimeout(400);
    // The card plus the 16px page padding around it, on the theme background.
    const box = await page.locator("#root").boundingBox();
    await page.screenshot({
      path: `${root}screenshots/${s.file}.png`,
      clip: { x: 0, y: 0, width: s.width + 32, height: Math.ceil(box.height) + 32 },
      animations: "disabled",
    });
    console.log(`screenshots/${s.file}.png`);
    await page.close();
  }
  await browser.close();
}

// Records one shot as a looping GIF (screenshots/<file>.gif) — needs ffmpeg on PATH. Every animation is paused and
// stepped frame by frame, so the GIF is identical whatever the machine's speed.
export async function animate(shot, { icons = {}, hass = {}, extra = "", fps = 20, seconds = 3 } = {}) {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await openCard(browser, shot, { icons, hass, extra });
  await page.waitForTimeout(300);
  const box = await page.locator("#root").boundingBox();
  const clip = { x: 0, y: 0, width: shot.width + 32, height: Math.ceil(box.height) + 32 };
  const dir = mkdtempSync(join(tmpdir(), "pr-frames-"));
  const frames = Math.round(fps * seconds);
  for (let i = 0; i < frames; i++) {
    await page.evaluate((t) => { for (const a of document.getAnimations()) { a.pause(); a.currentTime = t; } }, (i * 1000) / fps);
    await page.screenshot({ path: join(dir, `f${String(i).padStart(3, "0")}.png`), clip });
  }
  await browser.close();
  const out = `${root}screenshots/${shot.file}.gif`;
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error", "-framerate", String(fps), "-i", join(dir, "f%03d.png"),
    "-vf", `scale=${clip.width}:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse=dither=bayer:bayer_scale=4`,
    "-loop", "0", out,
  ]);
  rmSync(dir, { recursive: true });
  console.log(`screenshots/${shot.file}.gif`);
}

const icons = {
  "alert": "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z",
  "alert-outline": "M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16",
  "invert-colors": "M12,19.58V19.58C10.4,19.58 8.89,18.96 7.76,17.83C6.62,16.69 6,15.19 6,13.58C6,12 6.62,10.47 7.76,9.34L12,5.1M17.66,7.93L12,2.27V2.27L6.34,7.93C3.22,11.05 3.22,16.12 6.34,19.24C7.9,20.8 9.95,21.58 12,21.58C14.05,21.58 16.1,20.8 17.66,19.24C20.78,16.12 20.78,11.05 17.66,7.93Z",
  "water-outline": "M12,3.77L11.25,4.61C11.25,4.61 9.97,6.06 8.68,7.94C7.39,9.82 6,12.07 6,14.23A6,6 0 0,0 12,20.23A6,6 0 0,0 18,14.23C18,12.07 16.61,9.82 15.32,7.94C14.03,6.06 12.75,4.61 12.75,4.61L12,3.77M12,6.9C12.44,7.42 12.84,7.85 13.68,9.07C14.89,10.83 16,13.07 16,14.23C16,16.45 14.22,18.23 12,18.23C9.78,18.23 8,16.45 8,14.23C8,13.07 9.11,10.83 10.32,9.07C11.16,7.85 11.56,7.42 12,6.9Z",
  "arrow-collapse": "M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z",
  "arrow-expand": "M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z",
  "alert-circle": "M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
  "calendar-alert": "M6 1V3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3H18V1H16V3H8V1H6M5 8H19V19H5V8M11 9V14H13V9H11M11 16V18H13V16H11Z",
  "cancel": "M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z",
  "check-circle": "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",
  "clock-outline": "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",
  "cloud-off-outline": "M19.8 22.6L17.15 20H6.5Q4.2 20 2.6 18.4T1 14.5Q1 12.58 2.19 11.08 3.38 9.57 5.25 9.15 5.33 8.95 5.4 8.76 5.5 8.57 5.55 8.35L1.4 4.2L2.8 2.8L21.2 21.2M6.5 18H15.15L7.1 9.95Q7.05 10.23 7.03 10.5 7 10.73 7 11H6.5Q5.05 11 4.03 12.03 3 13.05 3 14.5 3 15.95 4.03 17 5.05 18 6.5 18M11.13 14M21.6 18.75L20.15 17.35Q20.58 17 20.79 16.54 21 16.08 21 15.5 21 14.45 20.27 13.73 19.55 13 18.5 13H17V11Q17 8.93 15.54 7.46 14.08 6 12 6 11.33 6 10.7 6.16 10.07 6.33 9.5 6.68L8.05 5.23Q8.93 4.63 9.91 4.31 10.9 4 12 4 14.93 4 16.96 6.04 19 8.07 19 11 20.73 11.2 21.86 12.5 23 13.78 23 15.5 23 16.5 22.63 17.31 22.25 18.15 21.6 18.75M14.83 12.03Z",
  "cloud-print-outline": "M15 15H9V14H15V15M15 16H9V17H15V16M15 18H9V19H15V18M23 13.5C23 14.75 22.56 15.81 21.69 16.69C20.81 17.56 19.75 18 18.5 18H18V22H6V17.95C4.7 17.85 3.57 17.36 2.61 16.43C1.54 15.38 1 14.09 1 12.58C1 11.28 1.39 10.12 2.17 9.1S4 7.43 5.25 7.15C5.67 5.62 6.5 4.38 7.75 3.43S10.42 2 12 2C13.95 2 15.6 2.68 16.96 4.04C18.32 5.4 19 7.05 19 9C20.15 9.13 21.1 9.63 21.86 10.5C22.62 11.35 23 12.35 23 13.5M6 15.95V11H17V9C17 7.62 16.5 6.44 15.54 5.46C14.56 4.5 13.38 4 12 4S9.44 4.5 8.46 5.46C7.5 6.44 7 7.62 7 9H6.5C5.53 9 4.71 9.34 4.03 10.03C3.34 10.71 3 11.53 3 12.5S3.34 14.29 4.03 15C4.59 15.54 5.25 15.85 6 15.95M16 13H8V20H16V13M21 13.5C21 12.8 20.76 12.21 20.27 11.73S19.2 11 18.5 11H18V16H18.5C19.2 16 19.79 15.76 20.27 15.28S21 14.2 21 13.5Z",
  "content-copy": "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z",
  "file-document-multiple-outline": "M16 0H8C6.9 0 6 .9 6 2V18C6 19.1 6.9 20 8 20H20C21.1 20 22 19.1 22 18V6L16 0M20 18H8V2H15V7H20V18M4 4V22H20V24H4C2.9 24 2 23.1 2 22V4H4M10 10V12H18V10H10M10 14V16H15V14H10Z",
  "paper-roll-outline": "M9 3C5.69 3 3.14 5.69 3 9V21H12V13.46C13.1 14.45 14.5 15 16 15C19.31 15 22 12.31 22 9C22 5.69 19.31 3 16 3H9M9 5H11.54C10.55 6.1 10 7.5 10 9V12H9V13H10V19H5V13H6V12H5V9C5 6.79 6.79 5 9 5M16 5C18.21 5 20 6.79 20 9C20 11.21 18.21 13 16 13C13.79 13 12 11.21 12 9C12 6.79 13.79 5 16 5M16 7.25C15.03 7.25 14.25 8.03 14.25 9C14.25 9.97 15.03 10.75 16 10.75C16.97 10.75 17.75 9.97 17.75 9C17.75 8.03 16.97 7.25 16 7.25M7 12V13H8V12H7Z",
  "power-sleep": "M18.73,18C15.4,21.69 9.71,22 6,18.64C2.33,15.31 2.04,9.62 5.37,5.93C6.9,4.25 9,3.2 11.27,3C7.96,6.7 8.27,12.39 12,15.71C13.63,17.19 15.78,18 18,18C18.25,18 18.5,18 18.73,18Z",
  "printer": "M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z",
  "printer-alert": "M16 3H4V7H16M17 12C16.4 12 16 11.6 16 11S16.4 10 17 10 18 10.4 18 11 17.6 12 17 12M14 19H6V14H14M17 8H3C1.3 8 0 9.3 0 11V17H4V21H16V17H20V11C20 9.3 18.7 8 17 8M24 13H22V7H24V13M24 17H22V15H24V17Z",
  "printer-check": "M18 7H6V3H18V7M6 21V17H2V11C2 9.34 3.34 8 5 8H19C20.66 8 22 9.34 22 11V13.81C21.12 13.3 20.1 13 19 13C17.77 13 16.64 13.37 15.69 14H8V19H13C13 19.7 13.13 20.37 13.35 21H6M18 11C18 11.55 18.45 12 19 12S20 11.55 20 11 19.55 10 19 10 18 10.45 18 11M23.5 17L22 15.5L18.5 19L16.5 17L15 18.5L18.5 22L23.5 17",
  "printer-off": "M6,3V4.18L8.82,7H18V3H6M2.28,3L1,4.27L4.75,8C3.19,8.15 2,9.44 2,11V17H6V21H17.73L19.73,23L21,21.72L2.28,3M9.82,8L18.82,17H22V11A3,3 0 0,0 19,8H9.82M19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10M8,14H10.73L15.73,19H8V14Z",
  "scanner": "M4.2,10.7L19.8,5L20.5,6.9L6.4,12H19A2,2 0 0,1 21,14V18A2,2 0 0,1 19,20H5A2,2 0 0,1 3,18V12.5C3,11.7 3.5,10.9 4.2,10.7M17,17H19V15H17V17M5,17H15V15H5V17Z",
  "water-alert": "M10 3.25C10 3.25 16 10 16 14C16 17.31 13.31 20 10 20S4 17.31 4 14C4 10 10 3.25 10 3.25M20 7V13H18V7H20M18 17H20V15H18V17Z"
};

// Mock HP Printer integration: a main device, one sub-device per cartridge, and an IPP device for paper alerts.
const entities = {};
const states = {};
const devices = {
  hp: { id: "hp", name: "OfficeJet Pro 9010 series", manufacturer: "HP", model: "OfficeJet Pro 9010" },
  ipp: { id: "ipp", name: "HP OfficeJet Pro 9010 (IPP)", manufacturer: "HP", model: "OfficeJet Pro 9010" },
};
const add = (device, id, state, attributes = {}) => {
  entities[id] = { entity_id: id, device_id: device };
  states[id] = { entity_id: id, state, last_changed: new Date().toISOString(), attributes: { friendly_name: id, ...attributes } };
};
add("hp", "sensor.officejet_status", "ready", { options: ["ready", "inpowersave", "processing", "scanprocessing", "copying", "canceljob", "stopped"] });
add("hp", "binary_sensor.officejet_eprint", "on", { device_class: "connectivity" });
add("hp", "sensor.officejet_printer_total_pages", "2148", { unit_of_measurement: "pages" });
[["black", 50], ["cyan", 50], ["magenta", 50], ["yellow", 12]].forEach(([color, level], i) => {
  const dev = `ink_${color}`;
  devices[dev] = { id: dev, name: `${color[0].toUpperCase() + color.slice(1)} cartridge`, via_device_id: "hp", manufacturer: "HP" };
  add(dev, `sensor.${color}_cartridge_level`, String(level), { unit_of_measurement: "%" });
  add(dev, `sensor.${color}_cartridge_station`, String(i + 1));
});
add("ipp", "sensor.officejet_ipp", "idle", { uri_supported: "ipp://192.168.1.30/ipp/print", options: ["idle", "printing", "stopped"], state_reason: "media-empty-error" });

// Mock IPP-only printer of another brand (laser, one toner cartridge): generic picture, no HP logo.
const ipp = { states: { ...states }, entities: { ...entities },
  devices: { ...devices, laser: { id: "laser", name: "Office laser printer", manufacturer: "Brother", model: "HL-L2350DW" } } };
for (const [id, state, attributes] of [
  ["sensor.laser_printer", "printing", { uri_supported: "ipp://192.168.1.31/ipp/print", options: ["idle", "printing", "stopped"], state_reason: "none" }],
  ["sensor.laser_black_toner", "64", { unit_of_measurement: "%", marker_type: "toner-cartridge", friendly_name: "Black toner" }],
]) {
  ipp.entities[id] = { entity_id: id, device_id: "laser" };
  ipp.states[id] = { entity_id: id, state, last_changed: new Date().toISOString(), attributes };
}

const hass = { states, entities, devices };
const offline = structuredClone(states);
offline["sensor.officejet_status"].state = "unavailable";
offline["sensor.officejet_ipp"].state = "unavailable";

// Opens the mini card's full view with a mouse click (detail: 1), so no keyboard focus ring shows.
const zoomIn = (page) =>
  page.evaluate(() =>
    document
      .querySelector("printer-mini-card")
      .shadowRoot.querySelector(".zoom")
      .dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true, detail: 1 })),
  );

await render(
  [
    { file: "card", type: "printer-card", theme: "light", width: 460, config: {} },
    { file: "card-dark", type: "printer-card", theme: "dark", width: 460, config: {} },
    { file: "offline", type: "printer-card", theme: "light", width: 460, config: {}, hass: { states: offline } },
    { file: "ipp", type: "printer-card", theme: "light", width: 460, config: { device_id: "laser" }, hass: ipp },
    { file: "mini-card", type: "printer-mini-card", theme: "light", width: 380, config: {} },
    { file: "mini-card-dark", type: "printer-mini-card", theme: "dark", width: 380, config: {} },
    { file: "mini-offline", type: "printer-mini-card", theme: "light", width: 380, config: {}, hass: { states: offline } },
    { file: "mini-offline-dark", type: "printer-mini-card", theme: "dark", width: 380, config: {}, hass: { states: offline } },
    { file: "mini-zoom", type: "printer-mini-card", theme: "light", width: 460, config: {}, after: zoomIn },
    { file: "mini-zoom-dark", type: "printer-mini-card", theme: "dark", width: 460, config: {}, after: zoomIn },
  ],
  { icons, hass }
);

await animate(
  { file: "printing", type: "printer-card", theme: "light", width: 460, config: { device_id: "laser" }, hass: ipp },
  { icons, hass }
);
await animate(
  { file: "printing-mini", type: "printer-mini-card", theme: "light", width: 380, config: { device_id: "laser" }, hass: ipp },
  { icons, hass }
);
