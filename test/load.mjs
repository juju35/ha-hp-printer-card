// Evaluates the card source in a sandbox with minimal browser stubs and returns the requested top-level names.
// The card is a single classic script (no exports), so the bundle stays exactly what HACS serves.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

export function loadCard(file, names) {
  const src = readFileSync(fileURLToPath(new URL(`../src/${file}`, import.meta.url)), "utf8");
  const registry = new Map();
  // Listeners added on `document`, as [type, listener, capture], so tests can fire document clicks.
  const listeners = [];
  const sandbox = {
    console: { info() {}, log() {}, warn() {}, error() {} },
    HTMLElement: class {
      attachShadow() {
        this.shadowRoot = { innerHTML: "", activeElement: null, addEventListener() {}, querySelector: () => null };
        return this.shadowRoot;
      }
      addEventListener() {}
      dispatchEvent() {}
      appendChild() {}
    },
    CustomEvent: class {},
    customElements: { get: (n) => registry.get(n), define: (n, c) => registry.set(n, c) },
    document: {
      documentElement: { lang: "en" },
      createElement: (tag) => ({ tagName: tag, addEventListener() {} }),
      addEventListener: (type, fn, capture) => listeners.push([type, fn, capture]),
      removeEventListener: (type, fn, capture) => {
        const i = listeners.findIndex((l) => l[0] === type && l[1] === fn && l[2] === capture);
        if (i >= 0) listeners.splice(i, 1);
      },
    },
    navigator: { language: "en" },
    localStorage: { getItem: () => null, setItem() {} },
    setInterval: () => 0,
    clearInterval() {},
    setTimeout: () => 0,
    clearTimeout() {},
  };
  sandbox.window = sandbox;
  // The current global Date, so node:test mock timers apply to the card too.
  Object.defineProperty(sandbox, "Date", { get: () => globalThis.Date });
  vm.createContext(sandbox);
  vm.runInContext(`${src}\n;globalThis.__exports = { ${names.join(", ")} };`, sandbox, { filename: file });
  return { ...sandbox.__exports, customElements: registry, listeners };
}
