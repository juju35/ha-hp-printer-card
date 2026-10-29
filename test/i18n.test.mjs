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

test("I18N: fr has the en keys and placeholders, plus its own cw_* adjective forms", () => {
  const en = HpI18n.en, fr = HpI18n.fr;
  const own = Object.keys(fr).filter((k) => !k.startsWith("cw_")).sort();
  assert.deepEqual(own, Object.keys(en).sort(), "fr keys differ from en");
  for (const key of Object.keys(en)) {
    assert.deepEqual(placeholders(fr[key]), placeholders(en[key]), `fr.${key} placeholders differ from en`);
  }
});
