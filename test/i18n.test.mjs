import assert from "node:assert/strict";
import { test } from "node:test";
import { loadCard } from "./load.mjs";

const { HpI18n } = loadCard("printer-card.js", ["HpI18n"]);
const placeholders = (s) => String(s).match(/\{\w+\}/g)?.sort() ?? [];

test("I18N parity: de and es have exactly the keys and placeholders of en", () => {
  const en = HpI18n.en;
  for (const lang of ["de", "es"]) {
    const strings = HpI18n[lang];
    assert.ok(strings, `${lang} is missing`);
    assert.deepEqual(Object.keys(strings).sort(), Object.keys(en).sort(), `${lang} keys differ from en`);
    for (const key of Object.keys(en)) {
      assert.deepEqual(placeholders(strings[key]), placeholders(en[key]), `${lang}.${key} placeholders differ from en`);
    }
  }
});

test("I18N: fr covers every en key", () => {
  for (const key of Object.keys(HpI18n.en)) assert.ok(key in HpI18n.fr, `fr.${key} is missing`);
});
