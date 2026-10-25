var PRINTER_CARD_VERSION = '__VERSION__';

// ── i18n ──────────────────────────────────────────────────────────────────────
var HpI18n = {
  fr: {
    printer: 'Imprimante',
    st_ready: 'Prête',
    st_inpowersave: 'En veille',
    st_processing: 'Impression en cours',
    st_scanprocessing: 'Numérisation en cours',
    st_copying: 'Copie en cours',
    st_canceljob: 'Annulation de la tâche',
    st_stopped: 'Arrêtée',
    st_offline: 'Hors ligne',
    st_unknown: 'État inconnu',
    offline_text: 'L\'imprimante est éteinte ou injoignable.',
    last_seen: 'Dernier contact {t}',
    inks: 'Niveaux d\'encre',
    alerts: 'Alertes',
    no_alerts: 'Aucune alerte',
    no_device: 'Aucune imprimante trouvée',
    toner: 'Niveaux de toner',
    pages: '{n} pages imprimées',
    pages_left: '≈ {n} pages',
    c_black: 'Noir',
    c_cyan: 'Cyan',
    c_magenta: 'Magenta',
    c_yellow: 'Jaune',
    c_tricolor: 'Couleur',
    c_ink: 'Encre',
    cw_black: 'noire',
    printhead: 'Tête d\'impression',
    al_low: 'Encre {c} faible ({p} %)',
    al_empty: 'Encre {c} presque épuisée ({p} %)',
    al_cartridge: 'Cartouche {c} : {s}',
    al_printhead: 'Tête d\'impression : {s}',
    al_expired: 'Garantie de la cartouche {c} expirée',
    al_stopped: 'L\'imprimante est arrêtée',
    cs_missing: 'absente',
    cs_empty: 'vide',
    cs_used: 'déjà utilisée',
    cs_counterfeit: 'contrefaite',
    cs_nongenuine: 'non HP',
    cs_incompatible: 'incompatible',
    cs_damaged: 'endommagée',
    cs_problem: 'problème détecté',
    ipp_media_empty: 'Bac à papier vide',
    ipp_media_low: 'Papier bientôt épuisé',
    ipp_media_jam: 'Bourrage papier',
    ipp_door_open: 'Capot ouvert',
    ipp_cover_open: 'Capot ouvert',
    ipp_input_tray_missing: 'Bac à papier absent',
    ipp_output_area_full: 'Bac de sortie plein',
    ipp_marker_supply_empty: 'Cartouche vide',
    ipp_offline: 'Imprimante hors ligne',
    ed_device: 'Imprimante',
    ed_device_helper: 'Appareil de l\'intégration HP Printer ou IPP (toutes marques)',
    ed_name: 'Nom',
    ed_name_helper: 'Laisser vide pour le nom de l\'appareil',
    ed_show_image: 'Image de l\'imprimante',
    ed_show_inks: 'Niveaux d\'encre',
    ed_show_alerts: 'Alertes',
    ed_show_stats: 'Compteur de pages',
    ed_show_expired: 'Alerte garantie expirée',
    ed_low_threshold: 'Seuil d\'encre faible (%)',
    ed_show_logo: 'Logo HP (imprimantes HP, sauf illustration générique)',
    ed_admin_url: 'Page d\'administration (URL)',
    ed_admin_url_helper: 'Ouverte au clic sur l\'imprimante — laisser vide pour l\'adresse détectée',
    open_admin: 'Ouvrir la page d\'administration de l\'imprimante',
    open_hp: 'Ouvrir hp.com',
    ed_image: 'Image personnalisée (URL)',
    ed_image_helper: 'Ex. /local/imprimante.png — remplace l\'illustration',
    ed_picture: 'Illustration',
    ed_picture_helper: 'Automatique : dessin selon la gamme HP, sinon imprimante générique',
    pic_auto: 'Automatique',
    pic_officejet: 'HP OfficeJet / PageWide (multifonction)',
    pic_laserjet: 'HP LaserJet (laser)',
    pic_deskjet: 'HP DeskJet / ENVY (compacte)',
    pic_smart_tank: 'HP Smart Tank (réservoirs)',
    pic_generic: 'Imprimante générique (IPP)',
    ed_language: 'Langue',
    ed_language_helper: 'Laisser vide pour suivre la langue de Home Assistant',
    ed_entities: 'Entités (avancé)',
    ed_entities_helper: 'Détectées automatiquement depuis l\'appareil ; à renseigner seulement pour forcer une entité',
    en_status: 'Statut',
    en_ipp: 'Capteur IPP (alertes papier, capot…)',
    en_total_pages: 'Total de pages',
    en_eprint: 'Statut ePrint',
    en_eprint_registration: 'Enregistrement ePrint',
    ed_show_eprint: 'Statut ePrint',
    ep_on: 'ePrint activé',
    ep_off: 'ePrint désactivé',
    ep_unregistered: 'ePrint non enregistré',
  },
  en: {
    printer: 'Printer',
    st_ready: 'Ready',
    st_inpowersave: 'Sleeping',
    st_processing: 'Printing',
    st_scanprocessing: 'Scanning',
    st_copying: 'Copying',
    st_canceljob: 'Cancelling job',
    st_stopped: 'Stopped',
    st_offline: 'Offline',
    st_unknown: 'Unknown state',
    offline_text: 'The printer is turned off or unreachable.',
    last_seen: 'Last seen {t}',
    inks: 'Ink levels',
    alerts: 'Alerts',
    no_alerts: 'No alerts',
    no_device: 'No printer found',
    toner: 'Toner levels',
    pages: '{n} pages printed',
    pages_left: '≈ {n} pages',
    c_black: 'Black',
    c_cyan: 'Cyan',
    c_magenta: 'Magenta',
    c_yellow: 'Yellow',
    c_tricolor: 'Tri-color',
    c_ink: 'Ink',
    printhead: 'Printhead',
    al_low: '{c} ink low ({p} %)',
    al_empty: '{c} ink nearly empty ({p} %)',
    al_cartridge: '{c} cartridge: {s}',
    al_printhead: 'Printhead: {s}',
    al_expired: '{c} cartridge warranty expired',
    al_stopped: 'The printer is stopped',
    cs_missing: 'missing',
    cs_empty: 'empty',
    cs_used: 'previously used',
    cs_counterfeit: 'counterfeit',
    cs_nongenuine: 'non-HP',
    cs_incompatible: 'incompatible',
    cs_damaged: 'damaged',
    cs_problem: 'problem detected',
    ipp_media_empty: 'Paper tray empty',
    ipp_media_low: 'Paper running low',
    ipp_media_jam: 'Paper jam',
    ipp_door_open: 'Cover open',
    ipp_cover_open: 'Cover open',
    ipp_input_tray_missing: 'Paper tray missing',
    ipp_output_area_full: 'Output tray full',
    ipp_marker_supply_empty: 'Cartridge empty',
    ipp_offline: 'Printer offline',
    ed_device: 'Printer',
    ed_device_helper: 'Device from the HP Printer or IPP integration (any brand)',
    ed_name: 'Name',
    ed_name_helper: 'Leave empty to use the device name',
    ed_show_image: 'Printer picture',
    ed_show_inks: 'Ink levels',
    ed_show_alerts: 'Alerts',
    ed_show_stats: 'Page counter',
    ed_show_expired: 'Expired warranty alert',
    ed_low_threshold: 'Low ink threshold (%)',
    ed_show_logo: 'HP logo (HP printers, not with the generic picture)',
    ed_admin_url: 'Admin page (URL)',
    ed_admin_url_helper: 'Opened when clicking the printer — leave empty for the detected address',
    open_admin: 'Open the printer admin page',
    open_hp: 'Open hp.com',
    ed_image: 'Custom picture (URL)',
    ed_image_helper: 'E.g. /local/printer.png — replaces the illustration',
    ed_picture: 'Illustration',
    ed_picture_helper: 'Automatic: drawing by HP range, else a generic printer',
    pic_auto: 'Automatic',
    pic_officejet: 'HP OfficeJet / PageWide (all-in-one)',
    pic_laserjet: 'HP LaserJet (laser)',
    pic_deskjet: 'HP DeskJet / ENVY (compact)',
    pic_smart_tank: 'HP Smart Tank (ink tanks)',
    pic_generic: 'Generic printer (IPP)',
    ed_language: 'Language',
    ed_language_helper: 'Leave empty to follow the Home Assistant language',
    ed_entities: 'Entities (advanced)',
    ed_entities_helper: 'Detected from the device; only set them to force an entity',
    en_status: 'Status',
    en_ipp: 'IPP sensor (paper, cover… alerts)',
    en_total_pages: 'Total pages',
    en_eprint: 'ePrint status',
    en_eprint_registration: 'ePrint registration',
    ed_show_eprint: 'ePrint status',
    ep_on: 'ePrint on',
    ep_off: 'ePrint off',
    ep_unregistered: 'ePrint not registered',
  },
};

function hpT(lang, key) {
  var strings = HpI18n[lang] || HpI18n.en;
  return strings[key] || HpI18n.en[key] || key;
}

function hpEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function hpFill(str, vars) {
  return String(str).replace(/\{(\w+)\}/g, (m, k) => vars[k] != null ? vars[k] : m);
}

// ── Illustrations ────────────────────────────────────────────────────────────
// Drawn pictures (160 × 120): one per HP range and a generic printer for the other brands (IPP).
// Their `.screen` (control panel) lights up in the status color.
var HP_ART_DEFS = '<defs>' +
  '<linearGradient id="pc-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5f7f9"/><stop offset="1" stop-color="#cdd3da"/></linearGradient>' +
  '<linearGradient id="pc-dark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#525965"/><stop offset="1" stop-color="#2a2e35"/></linearGradient>' +
  '<linearGradient id="pc-paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e6e9ee"/></linearGradient>' +
  '</defs><ellipse cx="80" cy="111" rx="64" ry="5" fill="#000" opacity="0.13"/>';

var HP_ART = {
  generic:
    '<rect x="42" y="6" width="76" height="40" rx="2" fill="url(#pc-paper)" stroke="#c3c9d1"/>' +
    '<path d="M52 16h56M52 23h56M52 30h38" stroke="#c9ced6" stroke-width="2.5" stroke-linecap="round"/>' +
    '<rect x="14" y="34" width="132" height="58" rx="14" fill="url(#pc-body)" stroke="#b5bcc6"/>' +
    '<rect x="20" y="37" width="120" height="8" rx="4" fill="#fff" opacity="0.6"/>' +
    '<rect x="100" y="50" width="34" height="14" rx="4" fill="#23272e"/><rect class="screen" x="103" y="53" width="28" height="8" rx="2"/>' +
    '<circle cx="28" cy="57" r="3.5" fill="#8a929c"/>' +
    '<rect x="28" y="74" width="104" height="8" rx="4" fill="url(#pc-dark)"/>' +
    '<path d="M36 78h88l-6 28H42z" fill="url(#pc-paper)" stroke="#c3c9d1"/>',
  officejet:
    '<rect x="62" y="4" width="56" height="14" rx="1" fill="url(#pc-paper)" stroke="#c3c9d1"/>' +
    '<path d="M38 28L50 12H128L138 28z" fill="url(#pc-dark)"/>' +
    '<rect x="16" y="26" width="128" height="16" rx="5" fill="url(#pc-dark)"/>' +
    '<rect x="16" y="40" width="128" height="62" rx="8" fill="url(#pc-body)" stroke="#b5bcc6"/>' +
    '<rect x="26" y="49" width="38" height="18" rx="3" fill="#23272e"/><rect class="screen" x="29" y="52" width="32" height="12" rx="2"/>' +
    '<rect x="36" y="78" width="88" height="7" rx="3.5" fill="url(#pc-dark)"/>' +
    '<path d="M44 82h72l5 15H39z" fill="url(#pc-paper)" stroke="#c3c9d1"/>' +
    '<path d="M17 96h126" stroke="#aab2bc"/>',
  laserjet:
    '<rect x="22" y="12" width="116" height="94" rx="8" fill="url(#pc-body)" stroke="#b5bcc6"/>' +
    '<path d="M22 20a8 8 0 0 1 8-8h100a8 8 0 0 1 8 8v14H22z" fill="url(#pc-dark)"/>' +
    '<path d="M38 18h84l-6 11H44z" fill="#16191d"/><rect x="50" y="22" width="60" height="5" rx="1" fill="url(#pc-paper)"/>' +
    '<rect x="30" y="42" width="42" height="18" rx="4" fill="#23272e"/><rect class="screen" x="33" y="45" width="36" height="12" rx="2"/>' +
    '<circle cx="126" cy="51" r="3.5" fill="#8a929c"/>' +
    '<path d="M23 72h114M23 84h114" stroke="#aab2bc"/>' +
    '<rect x="64" y="92" width="32" height="5" rx="2.5" fill="#8a929c"/>',
  deskjet:
    '<path d="M46 6h68l4 48H42z" fill="url(#pc-paper)" stroke="#c3c9d1"/>' +
    '<rect x="14" y="48" width="132" height="46" rx="16" fill="url(#pc-body)" stroke="#b5bcc6"/>' +
    '<rect x="22" y="51" width="116" height="8" rx="4" fill="#fff" opacity="0.6"/>' +
    '<rect x="102" y="62" width="30" height="8" rx="4" fill="#23272e"/><rect class="screen" x="104" y="64" width="26" height="4" rx="2"/>' +
    '<rect x="34" y="76" width="92" height="7" rx="3.5" fill="url(#pc-dark)"/>' +
    '<path d="M42 80h76l8 22H34z" fill="url(#pc-paper)" stroke="#c3c9d1"/>',
  smart_tank:
    '<rect x="16" y="24" width="128" height="16" rx="5" fill="url(#pc-dark)"/>' +
    '<rect x="16" y="38" width="128" height="64" rx="8" fill="url(#pc-body)" stroke="#b5bcc6"/>' +
    '<rect x="22" y="46" width="30" height="48" rx="4" fill="#dde1e6" stroke="#b5bcc6"/>' +
    '<rect x="25" y="50" width="5" height="40" rx="1.5" fill="#fff"/><rect x="25" y="62" width="5" height="28" rx="1.5" fill="#2b2f36"/>' +
    '<rect x="32" y="50" width="5" height="40" rx="1.5" fill="#fff"/><rect x="32" y="66" width="5" height="24" rx="1.5" fill="#00a6d6"/>' +
    '<rect x="39" y="50" width="5" height="40" rx="1.5" fill="#fff"/><rect x="39" y="58" width="5" height="32" rx="1.5" fill="#d6197c"/>' +
    '<rect x="46" y="50" width="4" height="40" rx="1.5" fill="#fff"/><rect x="46" y="70" width="4" height="20" rx="1.5" fill="#f5c400"/>' +
    '<rect x="98" y="46" width="38" height="14" rx="4" fill="#23272e"/><rect class="screen" x="101" y="49" width="32" height="8" rx="2"/>' +
    '<rect x="60" y="76" width="72" height="7" rx="3.5" fill="url(#pc-dark)"/>' +
    '<path d="M66 80h60l4 16H62z" fill="url(#pc-paper)" stroke="#c3c9d1"/>',
};

var HP_PICTURES = ['auto', 'officejet', 'laserjet', 'deskjet', 'smart_tank', 'generic'];

function hpIsHpDevice(device) {
  var maker = String(device?.manufacturer || '').toLowerCase();
  var model = `${device?.model || ''} ${device?.name || ''}`.toLowerCase().trim();
  return /\bhp\b|hewlett/.test(maker) || /^hp\b/.test(model);
}

// Picture matching a device: the drawing of its HP range, or the generic printer for the other brands.
function hpPictureFor(device, kind) {
  if (kind !== 'hp' && !hpIsHpDevice(device)) return 'generic';
  var model = `${device?.model || ''} ${device?.name || ''}`.toLowerCase();
  if (/laserjet|neverstop/.test(model)) return 'laserjet';
  if (/smart tank|ink tank/.test(model)) return 'smart_tank';
  if (/deskjet|envy|tango/.test(model)) return 'deskjet';
  return 'officejet';
}

// ── Status ───────────────────────────────────────────────────────────────────
var HP_STATE_COLORS = {
  ready: 'var(--success-color, #43a047)',
  inpowersave: '#5c8fd6',
  processing: 'var(--info-color, #039be5)',
  scanprocessing: '#8e24aa',
  copying: 'var(--info-color, #039be5)',
  canceljob: 'var(--warning-color, #ffa600)',
  stopped: 'var(--error-color, #db4437)',
};

var HP_STATE_ICONS = {
  ready: 'mdi:printer-check',
  inpowersave: 'mdi:power-sleep',
  processing: 'mdi:printer',
  scanprocessing: 'mdi:scanner',
  copying: 'mdi:content-copy',
  canceljob: 'mdi:cancel',
  stopped: 'mdi:printer-alert',
  offline: 'mdi:printer-off',
};

// States reported by the IPP integration, mapped onto the HP Printer ones.
var HP_IPP_STATES = { idle: 'ready', printing: 'processing', stopped: 'stopped' };

var HP_BUSY = ['processing', 'scanprocessing', 'copying'];

// ── Inks ─────────────────────────────────────────────────────────────────────
var HP_INK_COLORS = {
  cyan: '#00a6d6',
  magenta: '#d6197c',
  yellow: '#f5c400',
  // Follows the theme text color: near black on light themes, light on dark ones.
  black: 'color-mix(in srgb, var(--primary-text-color, #212121) 88%, transparent)',
  tricolor: 'linear-gradient(90deg, #00a6d6 0 33%, #d6197c 33% 66%, #f5c400 66%)',
  ink: '#9e9e9e',
};

function hpInkColor(text) {
  var t = String(text || '').toLowerCase().replace(/[^a-z]/g, '');
  if (/cyanmagentayellow|tricolor|tricolour|couleur/.test(t)) return 'tricolor';
  if (/cyan/.test(t)) return 'cyan';
  if (/magenta/.test(t)) return 'magenta';
  if (/yellow|jaune/.test(t)) return 'yellow';
  if (/black|noir|photoblack/.test(t)) return 'black';
  return null;
}

// Cartridge states that are fine: ok, newGenuineHP, usedGenuineHP, genuineHP…
function hpCartridgeOk(state) {
  var s = String(state || '').toLowerCase();
  return !s || s === 'ok' || s === 'unknown' || s.indexOf('genuine') >= 0 && s.indexOf('non') < 0;
}

function hpCartridgeProblem(state) {
  var s = String(state || '').toLowerCase();
  if (/missing|absent/.test(s)) return 'cs_missing';
  if (/empty|depleted|veryLow/i.test(s)) return 'cs_empty';
  if (/counterfeit/.test(s)) return 'cs_counterfeit';
  if (/nongenuine|nonhp|non_hp|refill/.test(s)) return 'cs_nongenuine';
  if (/incompatible|wrong/.test(s)) return 'cs_incompatible';
  if (/damage|fail|error/.test(s)) return 'cs_damaged';
  if (/used/.test(s)) return 'cs_used';
  return 'cs_problem';
}

// ── Discovery ────────────────────────────────────────────────────────────────
function _hpState(hass, id) { return id ? hass.states[id] : undefined; }

function hpIsHpStatus(s) {
  var o = (s?.attributes.options) || [];
  return o.indexOf('inpowersave') >= 0 || (o.indexOf('ready') >= 0 && o.indexOf('scanprocessing') >= 0);
}

function hpIsIppStatus(s) {
  var a = (s?.attributes) || {};
  var o = a.options || [];
  return a.uri_supported !== undefined || (o.indexOf('idle') >= 0 && o.indexOf('printing') >= 0 && o.indexOf('stopped') >= 0);
}

// Registry entries grouped by device, built once per `hass.entities` object (it only changes with the registry).
var hpRegistryIndex = new WeakMap();
function hpRegistryByDevice(reg) {
  var index = hpRegistryIndex.get(reg);
  if (!index) {
    index = new Map();
    Object.values(reg).forEach((e) => {
      if (!e.device_id || e.hidden) return;
      if (!index.has(e.device_id)) index.set(e.device_id, []);
      index.get(e.device_id).push(e);
    });
    hpRegistryIndex.set(reg, index);
  }
  return index;
}

function hpEntitiesOf(hass, deviceIds) {
  if (!hass?.entities) return [];
  var index = hpRegistryByDevice(hass.entities);
  var out = [];
  deviceIds.forEach((id) => { (index.get(id) || []).forEach((e) => { if (hass.states[e.entity_id]) out.push(e); }); });
  return out;
}

function hpDeviceName(hass, id) {
  var d = hass?.devices?.[id];
  return d ? String(d.name_by_user || d.name || '').trim() : '';
}

// Printers: devices carrying an HP Printer status sensor or an IPP printer sensor.
// Sensors attached to a device, listed once per `hass.entities` object; states are read on each call.
var hpSensorIndex = new WeakMap();
function hpDeviceSensors(reg) {
  var list = hpSensorIndex.get(reg);
  if (!list) {
    list = Object.values(reg).filter((e) => e.device_id && e.entity_id.indexOf('sensor.') === 0);
    hpSensorIndex.set(reg, list);
  }
  return list;
}

function hpFindPrinters(hass) {
  if (!hass?.entities) return [];
  var out = [];
  hpDeviceSensors(hass.entities).forEach((e) => {
    var s = hass.states[e.entity_id];
    var kind = hpIsHpStatus(s) ? 'hp' : (hpIsIppStatus(s) ? 'ipp' : null);
    if (kind && !out.some((p) => p.id === e.device_id)) out.push({ id: e.device_id, kind: kind });
  });
  // HP Printer integration first: it carries the richer data.
  return out.sort((a, b) => (a.kind === 'hp' ? 0 : 1) - (b.kind === 'hp' ? 0 : 1));
}

// The HP Printer integration splits a printer into one device per part
// (cartridges, printhead, printer counters…) linked to the main one.
function hpSubDevices(hass, mainId) {
  if (!hass?.devices) return [];
  var main = hass.devices[mainId];
  var mainName = hpDeviceName(hass, mainId);
  return Object.keys(hass.devices).filter((id) => {
    if (id === mainId) return false;
    var d = hass.devices[id];
    if (d.via_device_id === mainId) return true;
    return !!mainName && main && d.manufacturer === main.manufacturer && String(d.name || '').indexOf(`${String(main.name || '')} `) === 0;
  });
}

function hpUnit(s) { return s?.attributes.unit_of_measurement; }

function hpPick(list, hass, test) {
  var hit = list.find((e) => test(e.entity_id, hass.states[e.entity_id]));
  return hit ? hit.entity_id : undefined;
}

// Builds the cartridge list of a HP Printer device: one entry per consumable sub-device.
function hpHpInks(hass, subIds) {
  var inks = [];
  subIds.forEach((id) => {
    var list = hpEntitiesOf(hass, [id]);
    var level = hpPick(list, hass, (eid, s) => eid.indexOf('sensor.') === 0 && hpUnit(s) === '%');
    var typeId = hpPick(list, hass, (eid, s) => {
      var o = (s.attributes.options || []);
      return eid.indexOf('sensor.') === 0 && o.indexOf('printhead') >= 0 && o.indexOf('ink') >= 0;
    });
    var type = typeId ? hass.states[typeId].state : '';
    var status = hpPick(list, hass, (eid, s) => eid.indexOf('binary_sensor.') === 0 && s.attributes.state !== undefined && /(statut|status|state|etat)$/.test(eid));
    if (!level && type !== 'printhead' && !(status && /printhead|tete/.test(status))) return;
    var name = hpDeviceName(hass, id);
    inks.push({
      device: id,
      name: name,
      printhead: type === 'printhead' || (!level && /printhead|tete/i.test(name)),
      color: hpInkColor(name) || hpInkColor(level) || 'ink',
      level: level,
      status: status,
      station: hpPick(list, hass, (eid) => /(_emplacement|_station|_slot)$/.test(eid)),
      expiry: hpPick(list, hass, (eid, s) => s.attributes.device_class === 'timestamp' && /(expiration|expiry|warranty|garantie)/.test(eid)),
      pages_left: hpPick(list, hass, (_eid, s) => hpUnit(s) === 'pages' && s.attributes.state_class === 'measurement'),
    });
  });
  var order = { black: 0, cyan: 1, magenta: 2, yellow: 3, tricolor: 4, ink: 5 };
  return inks.sort((a, b) => {
    var sa = a.station ? Number(hass.states[a.station].state) : NaN;
    var sb = b.station ? Number(hass.states[b.station].state) : NaN;
    if (!Number.isNaN(sa) && !Number.isNaN(sb) && sa !== sb) return sa - sb;
    return (order[a.color] ?? 9) - (order[b.color] ?? 9);
  });
}

// IPP integration: one "<color> cartridge" sensor per marker, on the same device.
function hpIppInks(hass, list) {
  return list.filter((e) => {
    var s = hass.states[e.entity_id];
    return e.entity_id.indexOf('sensor.') === 0 && s.attributes.marker_type !== undefined;
  }).map((e) => {
    var s = hass.states[e.entity_id];
    return { name: s.attributes.friendly_name, color: hpInkColor(e.entity_id) || hpInkColor(s.attributes.friendly_name) || 'ink',
      level: e.entity_id, low: s.attributes.marker_low_level, toner: /toner/i.test(String(s.attributes.marker_type || '')) };
  }).sort((a, b) => {
    var order = { black: 0, cyan: 1, magenta: 2, yellow: 3, tricolor: 4, ink: 5 };
    return order[a.color] - order[b.color];
  });
}

// IPP printer sensor matching a HP Printer device (same model), for paper/cover alerts.
// The candidates (sensors of another device of the same model) come from the registry and are cached
// with it; their states are checked on each call, so a sensor that shows up later is still found.
var hpModelIndex = new WeakMap();
function hpSensorsByModel(hass) {
  var cached = hpModelIndex.get(hass.entities);
  if (!cached || cached.devices !== hass.devices) {
    var byModel = new Map();
    hpDeviceSensors(hass.entities).forEach((e) => {
      var model = hass.devices[e.device_id]?.model;
      if (!model) return;
      if (!byModel.has(model)) byModel.set(model, []);
      byModel.get(model).push(e);
    });
    cached = { devices: hass.devices, byModel: byModel };
    hpModelIndex.set(hass.entities, cached);
  }
  return cached.byModel;
}

function hpFindIppSensor(hass, mainId) {
  var main = hass.devices?.[mainId];
  if (!main?.model || !hass.entities) return undefined;
  var hit = (hpSensorsByModel(hass).get(main.model) || []).find((e) =>
    e.device_id !== mainId && hpIsIppStatus(hass.states[e.entity_id]));
  return hit ? hit.entity_id : undefined;
}

// Printer web page: the device's configuration URL, else the host of the IPP sensor's URI.
function hpAdminUrl(hass, r) {
  var ids = [r.deviceId];
  var ippEnt = r.ipp && hass.entities?.[r.ipp];
  if (ippEnt?.device_id) ids.push(ippEnt.device_id);
  for (var i = 0; i < ids.length; i++) {
    var d = hass.devices?.[ids[i]];
    if (d?.configuration_url && /^https?:\/\//i.test(d.configuration_url)) return d.configuration_url;
  }
  var s = r.ipp && hass.states[r.ipp];
  var uris = s?.attributes.uri_supported;
  uris = Array.isArray(uris) ? uris : String(uris || '').split(',');
  for (var j = 0; j < uris.length; j++) {
    var m = /^ipps?:\/\/(\[[^\]]+\]|[^/:]+)/i.exec(String(uris[j]).trim());
    if (m) return `http://${m[1]}`;
  }
  return '';
}

var HP_LOGO = '<svg viewBox="0 0 1280 1280" aria-hidden="true"><defs><clipPath id="hp-logo-clip"><circle cx="640" cy="640" r="640"/></clipPath></defs>' +
  '<circle cx="640" cy="640" r="640" fill="#024ad8"/><g clip-path="url(#hp-logo-clip)" fill="#fff">' +
  '<path d="M485-20H619L482 360H597Q645 360 670 393Q695 427 676 477L515 918H380L552 444H451L277 918H142L349 360Z"/>' +
  '<path fill-rule="evenodd" d="M819 358H1070Q1118 358 1143 391Q1168 424 1151 470L1009 866Q1000 890 977 905Q956 918 932 918H752L614 1300H485ZM924 441H1026L883 832H781Z"/></g></svg>';

// ── Card ─────────────────────────────────────────────────────────────────────
// The card's focusable links, by the class that identifies each across renders.
var HP_FOCUSABLE = ['pic', 'logo'];
function hpFocusKey(el) {
  return el?.tagName === 'A' && el.classList ? HP_FOCUSABLE.find((k) => el.classList.contains(k)) || '' : '';
}

var HP_DEFAULTS = {
  show_image: true, show_logo: true, show_inks: true, show_alerts: true, show_stats: true, show_eprint: true, show_expired: false, low_threshold: 15, picture: 'auto',
};

class PrinterCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement('printer-card-editor');
  }

  static getStubConfig(hass) {
    var p = hpFindPrinters(hass)[0];
    return p ? { device_id: p.id } : {};
  }

  setConfig(config) {
    if (!config) throw new Error('Invalid configuration');
    this._config = Object.assign({}, HP_DEFAULTS, config);
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    this._sig = null;
    this._update();
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  connectedCallback() {
    // Keeps the time-dependent parts ("Last seen 5 minutes ago", expired cartridges) current:
    // _update() only re-renders when they actually change.
    clearInterval(this._timer);
    this._timer = setInterval(() => this._update(), 60000);
  }

  disconnectedCallback() {
    clearInterval(this._timer);
  }

  getCardSize() { return 5; }

  getGridOptions() { return { columns: 12, min_columns: 6 }; }

  _lang() {
    var l = (this._config?.language) || (this._hass?.language) || document.documentElement.lang || 'en';
    l = l.split('-')[0];
    return HpI18n[l] ? l : 'en';
  }

  _t(k, vars) { var s = hpT(this._lang(), k); return vars ? hpFill(s, vars) : s; }

  // Discovery is reused until the registry, the config or the availability of the printer's
  // entities changes (an entity coming back online brings the attributes discovery relies on).
  // An incomplete result (states not loaded yet) is searched again on the next update, and so is a
  // missing IPP sensor (the IPP integration may load after HP Printer): its lookup reads the states.
  _resolve() {
    var hass = this._hass, m = this._memo;
    if (m && m.entities === hass.entities && m.devices === hass.devices && m.config === this._config &&
      m.avail === this._availSig(m.devs)) {
      if (m.r.kind === 'hp' && !m.r.ipp) {
        var ipp = hpFindIppSensor(hass, m.r.deviceId);
        if (ipp) m.r = Object.assign({}, m.r, { ipp: ipp });
      }
      return m.r;
    }
    var r = this._discover();
    var devs = [r.deviceId].concat(r.kind === 'hp' ? hpSubDevices(hass, r.deviceId) : []);
    this._memo = r.status && hass.states[r.status]
      ? { entities: hass.entities, devices: hass.devices, config: this._config, devs: devs, avail: this._availSig(devs), r: r }
      : null;
    return r;
  }

  _availSig(devs) {
    var hass = this._hass;
    return hpEntitiesOf(hass, devs).map((e) => (hass.states[e.entity_id].state === 'unavailable' ? 0 : 1)).join('');
  }

  _discover() {
    var hass = this._hass, c = this._config, over = c.entities || {};
    var deviceId = c.device_id;
    if (!deviceId && c.entity && hass.entities?.[c.entity]) deviceId = hass.entities[c.entity].device_id;
    if (!deviceId && over.status && hass.entities?.[over.status]) deviceId = hass.entities[over.status].device_id;
    if (!deviceId) { var p = hpFindPrinters(hass)[0]; deviceId = p?.id; }

    var main = hpEntitiesOf(hass, [deviceId]);
    var status = over.status || hpPick(main, hass, (eid, s) => eid.indexOf('sensor.') === 0 && hpIsHpStatus(s));
    var r = { deviceId: deviceId, kind: 'hp', isHp: true, status: status, inks: [], ipp: over.ipp, total_pages: over.total_pages,
      eprint: over.eprint, eprint_registration: over.eprint_registration };

    if (status && hpIsHpStatus(hass.states[status])) {
      var subs = hpSubDevices(hass, deviceId);
      r.inks = hpHpInks(hass, subs);
      // ePrint (HP cloud printing): "ePrint status" (connectivity) and "ePrint registered" binary sensors.
      var ep = main.filter((e) => e.entity_id.indexOf('binary_sensor.') === 0 && /eprint/.test(e.entity_id));
      if (!r.eprint) {
        r.eprint = hpPick(ep, hass, (_eid, s) => s.attributes.device_class === 'connectivity') ||
          hpPick(ep, hass, (eid) => /(statut|status)/.test(eid));
      }
      if (!r.eprint_registration) {
        r.eprint_registration = hpPick(ep, hass, (eid, s) => eid !== r.eprint && (/(registr|enregistr)/.test(eid) || /registered/.test(String(s.attributes.state))));
      }
      if (!r.ipp) r.ipp = hpFindIppSensor(hass, deviceId);
      if (!r.total_pages) {
        var all = hpEntitiesOf(hass, subs);
        r.total_pages = hpPick(all, hass, (eid) => /_printer_total_pages$/.test(eid)) ||
          hpPick(all, hass, (eid, s) => hpUnit(s) === 'pages' && s.attributes.state_class === 'total_increasing' && /total_(pages|impressions)$/.test(eid));
      }
    } else {
      // IPP-only printer (or status forced to an IPP sensor).
      r.kind = 'ipp';
      r.isHp = hpIsHpDevice(hass.devices?.[deviceId]);
      r.status = status || hpPick(main, hass, (eid, s) => eid.indexOf('sensor.') === 0 && hpIsIppStatus(s));
      r.ipp = r.ipp || r.status;
      r.inks = hpIppInks(hass, main);
    }
    return r;
  }

  _ids(r) {
    var ids = [r.status, r.ipp, r.total_pages, r.eprint, r.eprint_registration];
    r.inks.forEach((i) => { ids.push(i.level, i.status, i.expiry, i.pages_left); });
    return ids.filter(Boolean);
  }

  // What the card shows that changes with time alone: the "last seen" text and the expired cartridges.
  _timeSig(r) {
    var st = this._hass.states[r.status];
    var out = [];
    if (this._state(r) === 'offline' && st?.last_changed) {
      var since = new Date(st.last_changed);
      if (!Number.isNaN(since.getTime())) out.push(st.last_changed, this._relative(since));
    }
    if (this._config.show_expired) {
      r.inks.forEach((ink) => {
        var d = ink.expiry && this._avail(ink.expiry) ? new Date(this._val(ink.expiry)).getTime() : NaN;
        out.push(!Number.isNaN(d) && d < Date.now());
      });
    }
    return out;
  }

  _update() {
    if (!this._config || !this._hass || !this.shadowRoot) return;
    var r = this._resolve();
    var hass = this._hass;
    var sig = JSON.stringify([this._lang(), this._config, r.deviceId, this._timeSig(r), this._ids(r).map((id) => {
      var s = hass.states[id];
      return s ? [id, s.state, s.attributes.state, s.attributes.state_reason, s.attributes.state_message] : null;
    })]);
    if (sig === this._sig) return;
    this._sig = sig;
    this._render(r);
  }

  _val(id) { var s = id && this._hass.states[id]; return s ? s.state : undefined; }

  _avail(id) { var v = this._val(id); return v !== undefined && v !== 'unavailable' && v !== 'unknown'; }

  _num(id) { return this._avail(id) ? Number(this._val(id)) : NaN; }

  _state(r) {
    var v = this._val(r.status);
    if (v === undefined || v === 'unavailable' || v === 'off') return 'offline';
    if (r.kind === 'ipp') return HP_IPP_STATES[v] || 'unknown';
    return HP_STATE_COLORS[v] ? v : 'unknown';
  }

  _inkLabel(ink) {
    return this._t(`c_${ink.color}`);
  }

  // Label used inside a sentence: lower case in French ("encre jaune"), as is in English.
  _inkWord(ink) {
    var l = ink.printhead ? this._t('printhead') : this._inkLabel(ink);
    if (this._lang() !== 'fr') return l;
    // "encre noire", "cartouche noire": the adjective agrees with the feminine noun.
    var w = hpT('fr', `cw_${ink.color}`);
    return w === `cw_${ink.color}` ? l.toLowerCase() : w;
  }

  _alerts(r, state) {
    var c = this._config, out = [];
    var low = Number(c.low_threshold);
    if (Number.isNaN(low)) low = 15;
    var critical = Math.min(low, 5);
    r.inks.forEach((ink) => {
      var label = this._inkWord(ink);
      if (!ink.printhead) {
        var p = this._num(ink.level);
        if (!Number.isNaN(p) && p <= low) {
          out.push({ level: p <= critical ? 'error' : 'warn', icon: 'mdi:water-alert',
            text: this._t(p <= critical ? 'al_empty' : 'al_low', { c: label, p: Math.round(p) }) });
        }
      }
      var st = ink.status && this._hass.states[ink.status];
      if (st && st.state === 'off' && !hpCartridgeOk(st.attributes.state)) {
        var problem = this._t(hpCartridgeProblem(st.attributes.state));
        out.push({ level: 'error', icon: ink.printhead ? 'mdi:printer-alert' : 'mdi:alert-circle',
          text: ink.printhead ? this._t('al_printhead', { s: problem }) : this._t('al_cartridge', { c: label, s: problem }) });
      }
      if (c.show_expired && ink.expiry && this._avail(ink.expiry)) {
        var d = new Date(this._val(ink.expiry));
        if (!Number.isNaN(d.getTime()) && d.getTime() < Date.now()) {
          out.push({ level: 'info', icon: 'mdi:calendar-alert', text: this._t('al_expired', { c: label }) });
        }
      }
    });
    if (state === 'stopped') out.push({ level: 'error', icon: 'mdi:printer-alert', text: this._t('al_stopped') });
    out = out.concat(this._ippAlerts(r));
    var rank = { error: 0, warn: 1, info: 2 };
    return out.sort((a, b) => rank[a.level] - rank[b.level]);
  }

  // IPP "printer-state-reasons": media-empty-error, media-jam-warning, door-open…
  _ippAlerts(r) {
    var s = r.ipp && this._hass.states[r.ipp];
    if (!s || s.state === 'unavailable') return [];
    var raw = s.attributes.state_reason;
    var reasons = Array.isArray(raw) ? raw : String(raw || '').split(',');
    var seen = {};
    var out = [];
    reasons.map((x) => String(x).trim()).forEach((reason) => {
      if (!reason || reason === 'none' || reason === 'None') return;
      var level = /-error$/.test(reason) ? 'error' : (/-report$/.test(reason) ? 'info' : 'warn');
      var base = reason.replace(/-(error|warning|report)$/, '');
      // Ink levels are already covered by the cartridges.
      if (/^marker-supply-low|^toner-low|^marker-waste/.test(base) && r.inks.length) return;
      var key = `ipp_${base.replace(/-/g, '_')}`;
      var text = this._t(key);
      if (text === key) text = base.replace(/-/g, ' ').replace(/^./, (ch) => ch.toUpperCase());
      if (seen[text]) return;
      seen[text] = true;
      out.push({ level: level, icon: /media|paper|tray/.test(base) ? 'mdi:paper-roll-outline' : 'mdi:alert', text: text });
    });
    return out;
  }

  _relative(date) {
    var secs = Math.round((date.getTime() - Date.now()) / 1000);
    var units = [['day', 86400], ['hour', 3600], ['minute', 60]];
    try {
      var rtf = new Intl.RelativeTimeFormat(this._lang(), { numeric: 'auto' });
      for (var i = 0; i < units.length; i++) {
        if (Math.abs(secs) >= units[i][1]) return rtf.format(Math.round(secs / units[i][1]), units[i][0]);
      }
      return rtf.format(0, 'minute');
    } catch (_e) {
      return date.toLocaleString(this._lang());
    }
  }

  // Drawing set by the `picture` option, else detected from the device.
  _pictureKey(r) {
    var pic = this._config.picture;
    return HP_PICTURES.indexOf(pic) < 1 ? hpPictureFor(this._hass.devices?.[r.deviceId], r.kind) : pic;
  }

  // Custom image, else the configured or detected drawing.
  _picture(r, custom) {
    if (custom) return `<img src="${hpEsc(custom)}" alt="">`;
    var pic = this._pictureKey(r);
    return `<svg class="art art-${pic}" viewBox="0 0 160 120" aria-hidden="true">${HP_ART_DEFS}${HP_ART[pic]}</svg>`;
  }

  _render(r) {
    var c = this._config, hass = this._hass;
    var deviceName = hpDeviceName(hass, r.deviceId);
    var name = c.name || deviceName.replace(/\s*\([\d.]+\)\s*$/, '') || this._t('printer');

    if (!r.deviceId || !r.status) {
      this.shadowRoot.innerHTML = `${this._styles()}<ha-card><div class="empty"><ha-icon icon="mdi:printer-off"></ha-icon>${this._t('no_device')}</div></ha-card>`;
      return;
    }

    var state = this._state(r);
    var offline = state === 'offline';
    var color = offline ? 'var(--disabled-text-color, #9e9e9e)' : (HP_STATE_COLORS[state] || 'var(--secondary-text-color)');
    var statusText = this._t(`st_${state}`);
    var alerts = offline ? [] : this._alerts(r, state);

    // Picture, with the control panel lit in the status color.
    // Clicking it opens the printer's web admin page, when its address is known.
    var imageHtml = '';
    if (c.show_image) {
      var custom = c.image && String(c.image).trim();
      // Only http(s) addresses become a link, like the detected configuration URL.
      var custAdmin = c.admin_url && String(c.admin_url).trim();
      var admin = (custAdmin && /^https?:\/\//i.test(custAdmin) ? custAdmin : '') || hpAdminUrl(hass, r);
      var picTag = admin ? 'a' : 'div';
      imageHtml = '<' + picTag + ' class="pic' + (offline ? ' off' : '') + (HP_BUSY.indexOf(state) >= 0 ? ' busy' : '') + '"' +
        (admin ? ` href="${hpEsc(admin)}" target="_blank" rel="noopener noreferrer" title="${hpEsc(this._t('open_admin'))}"` : '') + '>' +
        this._picture(r, custom) +
      '</' + picTag + '>';
    }

    var chips = [];
    if (!offline && c.show_alerts) {
      var errors = alerts.filter((a) => a.level === 'error').length;
      var warns = alerts.filter((a) => a.level === 'warn').length;
      if (errors) chips.push(`<span class="chip error"><ha-icon icon="mdi:alert-circle"></ha-icon>${errors}</span>`);
      if (warns) chips.push(`<span class="chip warn"><ha-icon icon="mdi:alert"></ha-icon>${warns}</span>`);
    }
    if (!offline && c.show_eprint && this._avail(r.eprint)) {
      var epOn = this._val(r.eprint) === 'on';
      var epReg = !r.eprint_registration || !this._avail(r.eprint_registration) || this._val(r.eprint_registration) === 'on';
      var epKey = !epReg ? 'ep_unregistered' : (epOn ? 'ep_on' : 'ep_off');
      chips.push('<span class="chip ' + (epOn && epReg ? 'on' : 'muted') + '"><ha-icon icon="' +
        (epOn && epReg ? 'mdi:cloud-print-outline' : 'mdi:cloud-off-outline') + '"></ha-icon>' + this._t(epKey) + '</span>');
    }

    var sub = '';
    if (offline) {
      var st = hass.states[r.status];
      var since = st?.last_changed ? new Date(st.last_changed) : null;
      sub = '<div class="sub">' + this._t('offline_text') +
        (since && !Number.isNaN(since.getTime()) ? `<br><span class="muted">${hpEsc(this._t('last_seen', { t: this._relative(since) }))}</span>` : '') + '</div>';
    } else if (c.show_stats && this._avail(r.total_pages)) {
      var n = Number(this._val(r.total_pages));
      sub = '<div class="sub muted"><ha-icon icon="mdi:file-document-multiple-outline"></ha-icon>' +
        hpEsc(this._t('pages', { n: Number.isNaN(n) ? this._val(r.total_pages) : n.toLocaleString(this._lang()) })) + '</div>';
    }

    // No HP logo next to the generic printer, even for an HP device.
    var logoHtml = c.show_logo && r.isHp && this._pictureKey(r) !== 'generic'
      ? `<a class="logo" href="https://www.hp.com" target="_blank" rel="noopener noreferrer" title="${hpEsc(this._t('open_hp'))}">${HP_LOGO}</a>`
      : '';

    var head = '<div class="head">' + logoHtml + imageHtml +
      '<div class="meta">' +
        '<div class="name">' + hpEsc(name) + '</div>' +
        '<div class="status"><ha-icon icon="' + (HP_STATE_ICONS[state] || 'mdi:printer') + '"></ha-icon><span>' + hpEsc(statusText) + '</span></div>' +
        (chips.length ? `<div class="chips">${chips.join('')}</div>` : '') +
        sub +
      '</div></div>';

    var inksHtml = '';
    var cartridges = r.inks.filter((i) => !i.printhead && i.level);
    if (!offline && c.show_inks && cartridges.length) {
      var low = Number(c.low_threshold);
      inksHtml = '<div class="section"><div class="section-title">' + this._t(cartridges.every((i) => i.toner) ? 'toner' : 'inks') + '</div><div class="inks" style="--n:' + cartridges.length + '">' +
        cartridges.map((ink) => {
          var p = this._num(ink.level);
          var pct = Number.isNaN(p) ? 0 : Math.max(0, Math.min(100, p));
          var bad = ink.status && this._val(ink.status) === 'off' && !hpCartridgeOk(hass.states[ink.status]?.attributes.state);
          var isLow = !Number.isNaN(p) && p <= (Number.isNaN(low) ? 15 : low);
          var left = Number(this._val(ink.pages_left));
          var title = this._inkLabel(ink) + (Number.isNaN(p) ? '' : ` · ${Math.round(p)} %`) +
            (this._avail(ink.pages_left) && !Number.isNaN(left) ? ` · ${this._t('pages_left', { n: left })}` : '');
          return '<div class="ink' + (isLow ? ' low' : '') + (!Number.isNaN(p) && p <= Math.min(Number.isNaN(low) ? 15 : low, 5) ? ' crit' : '') + (bad ? ' bad' : '') + '" title="' + hpEsc(title) + '">' +
            '<div class="tank"><div class="level" style="height:' + pct + '%;background:' + HP_INK_COLORS[ink.color] + '"></div>' +
              (isLow || bad ? '<ha-icon class="flag" icon="mdi:alert"></ha-icon>' : '') + '</div>' +
            '<div class="pct">' + (Number.isNaN(p) ? '—' : `${Math.round(p)}<small>%</small>`) + '</div>' +
            '<div class="lbl">' + hpEsc(this._inkLabel(ink)) + '</div>' +
          '</div>';
        }).join('') + '</div></div>';
    }

    var alertsHtml = '';
    if (!offline && c.show_alerts) {
      alertsHtml = '<div class="section"><div class="section-title">' + this._t('alerts') + '</div>' +
        (alerts.length
          ? `<div class="alerts">${alerts.map((a) => {
            var txt = String(a.text);
            return `<div class="alert ${a.level}"><ha-icon icon="${a.icon}"></ha-icon><span>${hpEsc(txt.charAt(0).toUpperCase() + txt.slice(1))}</span></div>`;
          }).join('')}</div>`
          : `<div class="alert ok"><ha-icon icon="mdi:check-circle"></ha-icon><span>${this._t('no_alerts')}</span></div>`) +
      '</div>';
    }

    var focused = hpFocusKey(this.shadowRoot.activeElement);
    this.shadowRoot.innerHTML = `${this._styles(color)}<ha-card class="${offline ? 'offline' : ''}">${head}${inksHtml}${alertsHtml}</ha-card>`;
    // innerHTML replaced the focused link: focus its counterpart so keyboard navigation keeps its place.
    if (focused) this.shadowRoot.querySelector(`a.${focused}`)?.focus({ preventScroll: true });
  }

  _styles(color) {
    return '<style>' +
      ':host { display: block; height: 100%; --hp-color: ' + (color || 'var(--disabled-text-color, #9e9e9e)') + '; }' +
      'ha-card { height: 100%; box-sizing: border-box; padding: 12px; display: flex; flex-direction: column; gap: 10px; }' +
      '.empty { display: flex; align-items: center; gap: 10px; color: var(--secondary-text-color); }' +
      '.head { position: relative; display: flex; align-items: center; gap: 12px; }' +
      '.logo { position: absolute; top: 0; right: 0; width: 22px; height: 22px; line-height: 0; transition: transform 0.2s; }' +
      '.logo svg { width: 100%; height: 100%; }' +
      '.logo:hover { transform: scale(1.08); }' +
      '.head:has(.logo) .meta { padding-right: 30px; }' +
      'a.pic { cursor: pointer; }' +
      'a.pic:hover img { filter: brightness(1.06); }' +
      '.pic { display: block; position: relative; width: 28%; max-width: 120px; flex-shrink: 0; transition: filter 0.4s, opacity 0.4s; }' +
      '.pic img { display: block; width: 100%; height: auto; }' +
      '.pic svg.art { display: block; width: 100%; height: auto; overflow: visible; }' +
      '.screen { fill: var(--hp-color); opacity: 0.85; filter: drop-shadow(0 0 6px var(--hp-color)); }' +
      '.pic.busy .screen { animation: hp-glow 1.6s ease-in-out infinite; }' +
      '@keyframes hp-glow { 0%, 100% { opacity: 0.95; } 50% { opacity: 0.45; } }' +
      '.pic.off { filter: grayscale(1); opacity: 0.55; }' +
      '.pic.off .screen { display: none; }' +
      '.meta { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }' +
      '.name { font-size: 16px; font-weight: 500; color: var(--primary-text-color); line-height: 1.25; }' +
      '.status { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; font-size: 12px; font-weight: 500; color: var(--hp-color);' +
        ' padding: 2px 10px 2px 6px; border-radius: 12px; background: color-mix(in srgb, var(--hp-color) 15%, transparent); }' +
      '.status ha-icon { --mdc-icon-size: 14px; }' +
      '.chips { display: flex; flex-wrap: wrap; gap: 6px; }' +
      '.chip { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; padding: 1px 8px 1px 5px; border-radius: 12px; }' +
      '.chip ha-icon { --mdc-icon-size: 13px; }' +
      '.chip.error { background: color-mix(in srgb, var(--error-color, #db4437) 15%, transparent); color: var(--error-color, #db4437); }' +
      '.chip.warn { background: color-mix(in srgb, var(--warning-color, #ffa600) 15%, transparent); color: var(--warning-color, #ffa600); }' +
      '.chip.on { background: color-mix(in srgb, var(--info-color, #039be5) 15%, transparent); color: var(--info-color, #039be5); }' +
      '.chip.muted { background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--secondary-text-color); }' +
      '.sub { font-size: 11px; color: var(--secondary-text-color); line-height: 1.4; display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }' +
      '.sub ha-icon { --mdc-icon-size: 15px; }' +
      '.muted { color: var(--secondary-text-color); opacity: 0.85; }' +
      '.section { display: flex; flex-direction: column; gap: 6px; }' +
      '.section-title { font-size: 12px; font-weight: 500; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.04em; }' +
      '.inks { display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: 8px; }' +
      '.ink { display: flex; flex-direction: column; align-items: center; gap: 2px; min-width: 0; }' +
      '.tank { position: relative; width: 100%; max-width: 40px; height: 44px; border-radius: 8px; overflow: hidden;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.12)); box-shadow: inset 0 0 0 1px var(--divider-color, rgba(128,128,128,0.25)); }' +
      '.level { position: absolute; left: 0; right: 0; bottom: 0; border-radius: 0 0 8px 8px; transition: height 0.6s ease; }' +
      '.ink.low .tank, .ink.bad .tank { box-shadow: inset 0 0 0 2px var(--warning-color, #ffa600); }' +
      '.ink.bad .tank, .ink.crit .tank { box-shadow: inset 0 0 0 2px var(--error-color, #db4437); }' +
      '.flag { position: absolute; top: 4px; left: 50%; transform: translateX(-50%); --mdc-icon-size: 16px; color: var(--warning-color, #ffa600); }' +
      '.ink.bad .flag, .ink.crit .flag { color: var(--error-color, #db4437); }' +
      '.pct { font-size: 13px; font-weight: 500; color: var(--primary-text-color); }' +
      '.pct small { font-size: 11px; font-weight: 500; margin-left: 1px; color: var(--secondary-text-color); }' +
      '.lbl { font-size: 11px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }' +
      '.alerts { display: flex; flex-direction: column; gap: 6px; }' +
      '.alert { display: flex; align-items: center; gap: 8px; font-size: 12px; padding: 6px 8px; border-radius: 10px;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)); color: var(--primary-text-color); }' +
      '.alert ha-icon { --mdc-icon-size: 18px; flex-shrink: 0; }' +
      '.alert.error { background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent); } .alert.error ha-icon { color: var(--error-color, #db4437); }' +
      '.alert.warn { background: color-mix(in srgb, var(--warning-color, #ffa600) 12%, transparent); } .alert.warn ha-icon { color: var(--warning-color, #ffa600); }' +
      '.alert.info ha-icon { color: var(--secondary-text-color); }' +
      '.alert.ok { color: var(--secondary-text-color); } .alert.ok ha-icon { color: var(--success-color, #43a047); }' +
    '</style>';
  }
}

// ── printer-card-editor (visual editor, built on HA's ha-form) ───────────────
class PrinterCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = Object.assign({}, config);
    this._render();
  }

  set hass(hass) {
    var prevLang = this._hass?.language;
    this._hass = hass;
    if (this._form && prevLang === (hass?.language)) {
      this._form.hass = hass;
    } else {
      this._render();
    }
  }

  _lang() {
    var lang = ((this._config?.language) || (this._hass?.language) || 'en').split('-')[0];
    return HpI18n[lang] ? lang : 'en';
  }

  _schema() {
    var t = (k) => hpT(this._lang(), k);
    return [
      { name: 'device_id', selector: { device: { filter: [{ integration: 'hpprinter' }, { integration: 'ipp' }] } } },
      { name: 'name', selector: { text: {} } },
      {
        type: 'grid', name: '', schema: [
          { name: 'show_image', selector: { boolean: {} } },
          { name: 'show_logo', selector: { boolean: {} } },
          { name: 'show_inks', selector: { boolean: {} } },
          { name: 'show_alerts', selector: { boolean: {} } },
          { name: 'show_stats', selector: { boolean: {} } },
          { name: 'show_eprint', selector: { boolean: {} } },
        ],
      },
      { name: 'low_threshold', selector: { number: { min: 0, max: 50, step: 1, mode: 'slider', unit_of_measurement: '%' } } },
      { name: 'show_expired', selector: { boolean: {} } },
      { name: 'admin_url', selector: { text: { type: 'url' } } },
      {
        name: 'picture',
        selector: { select: { mode: 'dropdown', options: HP_PICTURES.map((v) => ({ value: v, label: t(`pic_${v}`) })) } },
      },
      { name: 'image', selector: { text: {} } },
      {
        name: 'language',
        selector: { select: { mode: 'dropdown', options: [{ value: 'fr', label: 'Français' }, { value: 'en', label: 'English' }] } },
      },
      {
        type: 'expandable', name: 'entities', title: t('ed_entities'), flatten: false,
        schema: [
          { name: 'status', selector: { entity: { domain: 'sensor' } } },
          { name: 'ipp', selector: { entity: { domain: 'sensor' } } },
          { name: 'total_pages', selector: { entity: { domain: 'sensor' } } },
          { name: 'eprint', selector: { entity: { domain: 'binary_sensor' } } },
          { name: 'eprint_registration', selector: { entity: { domain: 'binary_sensor' } } },
        ],
      },
    ];
  }

  _render() {
    if (!this._config || !this._hass) return;
    if (!this._form) {
      this._form = document.createElement('ha-form');
      this._form.addEventListener('value-changed', (ev) => this._valueChanged(ev));
      this.appendChild(this._form);
    }
    var lang = this._lang();
    this._form.hass = this._hass;
    this._form.schema = this._schema();
    this._form.computeLabel = (s) => {
      if (['status', 'ipp', 'total_pages', 'eprint', 'eprint_registration'].indexOf(s.name) >= 0) return hpT(lang, `en_${s.name}`);
      return hpT(lang, `ed_${s.name}`);
    };
    this._form.computeHelper = (s) => {
      var key = `ed_${s.name}_helper`;
      var txt = hpT(lang, key);
      return txt === key ? undefined : txt;
    };
    this._form.data = Object.assign({}, HP_DEFAULTS, this._config);
  }

  _valueChanged(ev) {
    ev.stopPropagation();
    var value = Object.assign({}, ev.detail.value);
    // Keep the YAML short: drop options left empty or at their default.
    Object.keys(value).forEach((key) => {
      if (value[key] === '' || value[key] === null || value[key] === undefined) delete value[key];
    });
    Object.keys(HP_DEFAULTS).forEach((key) => {
      if (value[key] === HP_DEFAULTS[key]) delete value[key];
    });
    if (value.entities) {
      var e = Object.assign({}, value.entities);
      Object.keys(e).forEach((k) => { if (!e[k]) delete e[k]; });
      if (Object.keys(e).length) value.entities = e; else delete value.entities;
    }
    if (this._config.type) value = Object.assign({ type: this._config.type }, value);
    var lang = this._lang();
    this._config = value;
    // A new language option relabels the form.
    if (lang !== this._lang()) this._render();
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: value }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('printer-card-editor')) {
  customElements.define('printer-card-editor', PrinterCardEditor);
}

window.customCards = window.customCards || [];
if (!customElements.get('printer-card')) {
  customElements.define('printer-card', PrinterCard);
  window.customCards.push({
    type: 'printer-card',
    name: 'Printer Card',
    description: 'Status, ink or toner levels and alerts for printers (HP Printer and IPP integrations)',
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-printer-card',
  });
}

console.info(`%c PRINTER-CARD %c v${PRINTER_CARD_VERSION} `, 'color:#fff;background:#0096d6;font-weight:700', 'color:#0096d6;background:#fff');
