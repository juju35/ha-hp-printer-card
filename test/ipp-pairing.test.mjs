// Reference table for pairing a HP Printer device with the IPP printer sensor of the same printer
// (hpFindIppSensor). Each fix of this pairing broke another case: every case below states its
// expected result, and the whole table must pass.
import assert from "node:assert/strict";
import { test } from "node:test";
import { loadCard } from "./load.mjs";

const { hpFindIppSensor } = loadCard("printer-card.js", ["hpFindIppSensor"]);

const MODEL = "OfficeJet Pro 9010";
const HP_OPTIONS = ["ready", "inpowersave", "processing", "scanprocessing", "stopped"];

// hp: HP Printer devices of the model ({ id, url, status: false when its status sensor is missing from the states }).
// ipp: IPP devices of the model ({ id, uris, url: device configuration URL, state: false (absent) | 'unavailable' }).
function hassOf({ hp = [], ipp = [] }) {
  const hass = { states: {}, entities: {}, devices: {} };
  for (const p of hp) {
    hass.devices[p.id] = { name: `Printer ${p.id}`, manufacturer: "HP", model: MODEL, configuration_url: p.url };
    const eid = `sensor.${p.id}_status`;
    hass.entities[eid] = { entity_id: eid, device_id: p.id };
    if (p.status !== false) hass.states[eid] = { state: "ready", attributes: { options: HP_OPTIONS } };
  }
  for (const d of ipp) {
    hass.devices[d.id] = { name: `IPP ${d.id}`, model: MODEL, configuration_url: d.url };
    const eid = `sensor.${d.id}`;
    hass.entities[eid] = { entity_id: eid, device_id: d.id };
    if (d.state === "unavailable") hass.states[eid] = { state: "unavailable", attributes: {} };
    else if (d.state !== false) hass.states[eid] = { state: "idle", attributes: { uri_supported: d.uris ?? "" } };
  }
  return hass;
}

const ipp = (uris, extra = {}) => ({ id: "ipp_a", uris, ...extra });

// [label, setup, main device, expected sensor]
const CASES = [
  // 1 HP + 1 IPP, same host.
  ["same IPv4 address", { hp: [{ id: "p", url: "http://192.168.1.30/" }], ipp: [ipp("ipp://192.168.1.30/ipp/print")] }, "p", "sensor.ipp_a"],
  ["same .local name, case and trailing dot ignored", { hp: [{ id: "p", url: "http://hpabc123.local/" }], ipp: [ipp("ipp://HPABC123.local.:631/ipp/print")] }, "p", "sensor.ipp_a"],
  ["same DNS name", { hp: [{ id: "p", url: "http://officejet.lan/" }], ipp: [ipp("ipp://officejet.lan/ipp/print")] }, "p", "sensor.ipp_a"],
  // IP against .local name: different forms, nothing to compare, a single pair is accepted.
  ["IP vs .local name", { hp: [{ id: "p", url: "http://192.168.1.30/" }], ipp: [ipp("ipp://hpabc123.local/ipp/print")] }, "p", "sensor.ipp_a"],
  [".local name vs IP", { hp: [{ id: "p", url: "http://hpabc123.local/" }], ipp: [ipp("ipp://192.168.1.30/ipp/print")] }, "p", "sensor.ipp_a"],
  // DNS name against the mDNS name and the IP announced by IPP: not comparable, accepted (pass 4 finding).
  ["DNS name vs mDNS name + IP", { hp: [{ id: "p", url: "http://officejet.lan/" }], ipp: [ipp(["ipp://HPABC123.local.:631/ipp/print", "ipps://192.168.1.30/ipp/print"])] }, "p", "sensor.ipp_a"],
  ["DNS name vs IP only", { hp: [{ id: "p", url: "http://officejet.lan/" }], ipp: [ipp("ipp://192.168.1.30/ipp/print")] }, "p", "sensor.ipp_a"],
  ["DNS name vs mDNS name only", { hp: [{ id: "p", url: "http://officejet.lan/" }], ipp: [ipp("ipp://hpabc123.local/ipp/print")] }, "p", "sensor.ipp_a"],
  ["mDNS name vs DNS name", { hp: [{ id: "p", url: "http://hpabc123.local/" }], ipp: [ipp("ipp://officejet.lan/ipp/print")] }, "p", "sensor.ipp_a"],
  ["name without domain matches the .local name", { hp: [{ id: "p", url: "http://hpabc123/" }], ipp: [ipp("ipp://hpabc123.local/ipp/print")] }, "p", "sensor.ipp_a"],
  ["name without domain matches the DNS name", { hp: [{ id: "p", url: "http://officejet/" }], ipp: [ipp("ipp://officejet.lan/ipp/print")] }, "p", "sensor.ipp_a"],
  ["IPP host from the IPP device's configuration URL", { hp: [{ id: "p", url: "http://192.168.1.30/" }], ipp: [ipp(undefined, { url: "http://192.168.1.30/" })] }, "p", "sensor.ipp_a"],
  ["IP and name both announced, the IP matches", { hp: [{ id: "p", url: "http://192.168.1.30/" }], ipp: [ipp(["ipp://hpabc123.local/ipp/print", "ipps://192.168.1.30/ipp/print"])] }, "p", "sensor.ipp_a"],
  // IPv4 against IPv6.
  ["IPv4 vs IPv6", { hp: [{ id: "p", url: "http://192.168.1.30/" }], ipp: [ipp("ipp://[fe80::1]/ipp/print")] }, "p", "sensor.ipp_a"],
  ["IPv6 vs IPv4", { hp: [{ id: "p", url: "http://[fe80::1]/" }], ipp: [ipp("ipp://192.168.1.30/ipp/print")] }, "p", "sensor.ipp_a"],
  ["same IPv6 address", { hp: [{ id: "p", url: "http://[FE80::1]:8080/" }], ipp: [ipp("ipp://[fe80::1]:631/ipp/print")] }, "p", "sensor.ipp_a"],
  // Hosts of the same form that differ: two printers of the model (A on HP Printer only, B on IPP only).
  ["different IPv4 addresses", { hp: [{ id: "p", url: "http://192.168.1.30/" }], ipp: [ipp("ipp://192.168.1.31/ipp/print")] }, "p", undefined],
  ["different IPv6 addresses", { hp: [{ id: "p", url: "http://[fe80::1]/" }], ipp: [ipp("ipp://[fe80::2]/ipp/print")] }, "p", undefined],
  ["different .local names", { hp: [{ id: "p", url: "http://printer-a.local/" }], ipp: [ipp("ipp://printer-b.local/ipp/print")] }, "p", undefined],
  ["different DNS names", { hp: [{ id: "p", url: "http://printer-a.lan/" }], ipp: [ipp("ipp://printer-b.lan/ipp/print")] }, "p", undefined],
  ["DNS names with the same first label in different domains", { hp: [{ id: "p", url: "http://printer.office1.lan/" }], ipp: [ipp("ipp://printer.office2.lan/ipp/print")] }, "p", undefined],
  ["same name under the mDNS and a DNS domain, identical printers", { hp: [{ id: "p", url: "http://hp-a.lan/" }, { id: "p2", url: "http://hp-b.lan/" }], ipp: [{ id: "ipp_b", uris: "ipp://hp-b.local/ipp/print" }, { id: "ipp_a", uris: "ipp://hp-a.local/ipp/print" }] }, "p", "sensor.ipp_a"],
  // A name without domain is a DNS name (search domain): it is compared with DNS names only, not with
  // .local names (changed in 2.4.4: printer-a vs printer-b.local used to be a mismatch).
  ["different names, one without domain, vs a .local name", { hp: [{ id: "p", url: "http://printer-a/" }], ipp: [ipp("ipp://printer-b.local/ipp/print")] }, "p", "sensor.ipp_a"],
  ["name without domain vs .local name + IP", { hp: [{ id: "p", url: "http://officejet/" }], ipp: [ipp(["ipp://HPABC123.local.:631/ipp/print", "ipps://192.168.1.30/ipp/print"])] }, "p", "sensor.ipp_a"],
  ["different names, one without domain, vs a DNS name", { hp: [{ id: "p", url: "http://printer-a/" }], ipp: [ipp("ipp://printer-b.lan/ipp/print")] }, "p", undefined],
  ["different names without domain", { hp: [{ id: "p", url: "http://printer-a/" }], ipp: [ipp("ipp://printer-b/ipp/print")] }, "p", undefined],
  ["name + different IP announced", { hp: [{ id: "p", url: "http://192.168.1.30/" }], ipp: [ipp(["ipp://printer-b.local/ipp/print", "ipps://192.168.1.31/ipp/print"])] }, "p", undefined],
  ["other printer's HP status sensor missing from the states", { hp: [{ id: "p", url: "http://192.168.1.30/" }, { id: "p2", url: "http://192.168.1.31/", status: false }], ipp: [ipp("ipp://192.168.1.31/ipp/print")] }, "p", undefined],
  // Two printers of the same model followed by both integrations: the right IPP sensor for each.
  ...[["p", "sensor.ipp_a"], ["p2", "sensor.ipp_b"]].map(([id, want]) => [
    `two identical printers, ${id} gets its own sensor`,
    { hp: [{ id: "p", url: "http://192.168.1.30/" }, { id: "p2", url: "http://192.168.1.31/" }], ipp: [{ id: "ipp_b", uris: "ipp://192.168.1.31/ipp/print" }, { id: "ipp_a", uris: ["ipp://hp-a.local/ipp/print", "ipps://192.168.1.30/ipp/print"] }] },
    id, want,
  ]),
  ["two identical printers, a matching sensor wins over one without host", { hp: [{ id: "p", url: "http://192.168.1.30/" }, { id: "p2", url: "http://192.168.1.31/" }], ipp: [{ id: "ipp_b", uris: "" }, { id: "ipp_a", uris: "ipp://192.168.1.30/ipp/print" }] }, "p", "sensor.ipp_a"],
  ["two identical printers, no host matches", { hp: [{ id: "p", url: "http://192.168.1.32/" }, { id: "p2", url: "http://192.168.1.31/" }], ipp: [{ id: "ipp_b", uris: "ipp://192.168.1.31/ipp/print" }, { id: "ipp_a", uris: "ipp://192.168.1.30/ipp/print" }] }, "p", undefined],
  ["two identical printers, hosts of different forms only", { hp: [{ id: "p", url: "http://192.168.1.30/" }, { id: "p2", url: "http://192.168.1.31/" }], ipp: [ipp("ipp://hp-a.local/ipp/print")] }, "p", undefined],
  // This HP device has no host: a sensor matching another HP device of the model is that device's.
  ...[["p", "sensor.ipp_a"], ["p2", "sensor.ipp_b"]].map(([id, want]) => [
    `two identical printers, no host on the HP side of p, ${id} gets its own sensor`,
    { hp: [{ id: "p" }, { id: "p2", url: "http://192.168.1.31/" }], ipp: [{ id: "ipp_b", uris: "ipp://192.168.1.31/ipp/print" }, { id: "ipp_a", uris: "ipp://192.168.1.30/ipp/print" }] },
    id, want,
  ]),
  ["two identical printers, no host on the HP side of p, both sensors free", { hp: [{ id: "p" }, { id: "p2", url: "http://192.168.1.32/" }], ipp: [{ id: "ipp_b", uris: "ipp://192.168.1.31/ipp/print" }, { id: "ipp_a", uris: "ipp://192.168.1.30/ipp/print" }] }, "p", undefined],
  ["two identical printers, no host on either HP side", { hp: [{ id: "p" }, { id: "p2" }], ipp: [{ id: "ipp_b", uris: "ipp://192.168.1.31/ipp/print" }, { id: "ipp_a", uris: "ipp://192.168.1.30/ipp/print" }] }, "p", undefined],
  ["no host on this HP side, the only IPP sensor is the other HP device's", { hp: [{ id: "p" }, { id: "p2", url: "http://192.168.1.31/" }], ipp: [{ id: "ipp_b", uris: "ipp://192.168.1.31/ipp/print" }] }, "p", undefined],
  ["no host on this HP side, the other HP device's status sensor missing, its sensor still excluded", { hp: [{ id: "p" }, { id: "p2", url: "http://192.168.1.31/", status: false }], ipp: [{ id: "ipp_b", uris: "ipp://192.168.1.31/ipp/print" }, { id: "ipp_a", uris: "ipp://192.168.1.30/ipp/print" }] }, "p", "sensor.ipp_a"],
  ["no host on this HP side, the only IPP sensor matches the other HP device whose status sensor is missing", { hp: [{ id: "p" }, { id: "p2", url: "http://192.168.1.31/", status: false }], ipp: [{ id: "ipp_b", uris: "ipp://192.168.1.31/ipp/print" }] }, "p", undefined],
  ["no host on this HP side, the other HP device's host matches no sensor", { hp: [{ id: "p" }, { id: "p2", url: "http://192.168.1.32/" }], ipp: [{ id: "ipp_a", uris: "ipp://192.168.1.30/ipp/print" }] }, "p", "sensor.ipp_a"],
  ["one HP device, two IPP sensors: the one with the same host", { hp: [{ id: "p", url: "http://192.168.1.30/" }], ipp: [{ id: "ipp_b", uris: "ipp://192.168.1.31/ipp/print" }, { id: "ipp_a", uris: "ipp://192.168.1.30/ipp/print" }] }, "p", "sensor.ipp_a"],
  // No known host.
  ["no host on either side", { hp: [{ id: "p" }], ipp: [ipp(undefined)] }, "p", "sensor.ipp_a"],
  ["no host on the HP side", { hp: [{ id: "p" }], ipp: [ipp("ipp://192.168.1.30/ipp/print")] }, "p", "sensor.ipp_a"],
  ["no host on the IPP side", { hp: [{ id: "p", url: "http://192.168.1.30/" }], ipp: [ipp(undefined)] }, "p", "sensor.ipp_a"],
  // IPP sensor absent or unavailable.
  ["IPP sensor absent from the states", { hp: [{ id: "p", url: "http://192.168.1.30/" }], ipp: [ipp(undefined, { state: false })] }, "p", undefined],
  ["IPP sensor unavailable", { hp: [{ id: "p", url: "http://192.168.1.30/" }], ipp: [ipp(undefined, { state: "unavailable" })] }, "p", undefined],
  ["no IPP device at all", { hp: [{ id: "p", url: "http://192.168.1.30/" }] }, "p", undefined],
];

for (const [label, setup, main, want] of CASES) {
  test(`IPP pairing: ${label} → ${want ?? "none"}`, () => {
    assert.equal(hpFindIppSensor(hassOf(setup), main), want);
  });
}
