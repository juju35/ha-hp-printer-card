var HP_PRINTER_CARD_VERSION = '__VERSION__';

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
    no_device: 'Aucune imprimante HP trouvée',
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
    ed_device_helper: 'Appareil de l\'intégration HP Printer (ou IPP)',
    ed_name: 'Nom',
    ed_name_helper: 'Laisser vide pour le nom de l\'appareil',
    ed_show_image: 'Image de l\'imprimante',
    ed_show_inks: 'Niveaux d\'encre',
    ed_show_alerts: 'Alertes',
    ed_show_stats: 'Compteur de pages',
    ed_show_expired: 'Alerte garantie expirée',
    ed_low_threshold: 'Seuil d\'encre faible (%)',
    ed_show_logo: 'Logo HP',
    ed_admin_url: 'Page d\'administration (URL)',
    ed_admin_url_helper: 'Ouverte au clic sur l\'imprimante — laisser vide pour l\'adresse détectée',
    open_admin: 'Ouvrir la page d\'administration de l\'imprimante',
    open_hp: 'Ouvrir hp.com',
    ed_image: 'Image personnalisée (URL)',
    ed_image_helper: 'Ex. /local/imprimante.png — laisser vide pour l\'image fournie',
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
    no_device: 'No HP printer found',
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
    ed_device_helper: 'Device from the HP Printer (or IPP) integration',
    ed_name: 'Name',
    ed_name_helper: 'Leave empty to use the device name',
    ed_show_image: 'Printer picture',
    ed_show_inks: 'Ink levels',
    ed_show_alerts: 'Alerts',
    ed_show_stats: 'Page counter',
    ed_show_expired: 'Expired warranty alert',
    ed_low_threshold: 'Low ink threshold (%)',
    ed_show_logo: 'HP logo',
    ed_admin_url: 'Admin page (URL)',
    ed_admin_url_helper: 'Opened when clicking the printer — leave empty for the detected address',
    open_admin: 'Open the printer admin page',
    open_hp: 'Open hp.com',
    ed_image: 'Custom picture (URL)',
    ed_image_helper: 'E.g. /local/printer.png — leave empty for the bundled picture',
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
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function hpFill(str, vars) {
  return String(str).replace(/\{(\w)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
}

// ── Printer picture ──────────────────────────────────────────────────────────
// HP OfficeJet Pro 9010 series, transparent background, control panel blanked so
// the card can light it up with the status color (see HP_SCREEN).
var HP_PRINTER_IMAGE = 'data:image/webp;base64,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';
// Control panel outline, in the picture's own coordinates (1007 × 768).
var HP_SCREEN = { box: '0 0 1007 768', points: '381,382 488,358 488,433 381,458' };

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

var HP_INK_SHORT = { black: 'K', cyan: 'C', magenta: 'M', yellow: 'Y', tricolor: 'CMY', ink: '•' };

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
function hpState(hass, id) { return id ? hass.states[id] : undefined; }

function hpIsHpStatus(s) {
  var o = (s && s.attributes.options) || [];
  return o.indexOf('inpowersave') >= 0 || (o.indexOf('ready') >= 0 && o.indexOf('scanprocessing') >= 0);
}

function hpIsIppStatus(s) {
  var a = (s && s.attributes) || {};
  var o = a.options || [];
  return a.uri_supported !== undefined || (o.indexOf('idle') >= 0 && o.indexOf('printing') >= 0 && o.indexOf('stopped') >= 0);
}

function hpEntitiesOf(hass, deviceIds) {
  if (!hass || !hass.entities) return [];
  return Object.values(hass.entities).filter(function (e) {
    return deviceIds.indexOf(e.device_id) >= 0 && !e.hidden && hass.states[e.entity_id];
  });
}

function hpDeviceName(hass, id) {
  var d = hass && hass.devices && hass.devices[id];
  return d ? String(d.name_by_user || d.name || '').trim() : '';
}

// Printers: devices carrying an HP Printer status sensor or an IPP printer sensor.
function hpFindPrinters(hass) {
  if (!hass || !hass.entities) return [];
  var out = [];
  Object.values(hass.entities).forEach(function (e) {
    if (!e.device_id || e.entity_id.indexOf('sensor.') !== 0) return;
    var s = hass.states[e.entity_id];
    var kind = hpIsHpStatus(s) ? 'hp' : (hpIsIppStatus(s) ? 'ipp' : null);
    if (kind && !out.some(function (p) { return p.id === e.device_id; })) out.push({ id: e.device_id, kind: kind });
  });
  // HP Printer integration first: it carries the richer data.
  return out.sort(function (a, b) { return (a.kind === 'hp' ? 0 : 1) - (b.kind === 'hp' ? 0 : 1); });
}

// The HP Printer integration splits a printer into one device per part
// (cartridges, printhead, printer counters…) linked to the main one.
function hpSubDevices(hass, mainId) {
  if (!hass || !hass.devices) return [];
  var main = hass.devices[mainId];
  var mainName = hpDeviceName(hass, mainId);
  return Object.keys(hass.devices).filter(function (id) {
    if (id === mainId) return false;
    var d = hass.devices[id];
    if (d.via_device_id === mainId) return true;
    return !!mainName && main && d.manufacturer === main.manufacturer && String(d.name || '').indexOf(String(main.name || '') + ' ') === 0;
  });
}

function hpUnit(s) { return s && s.attributes.unit_of_measurement; }

function hpPick(list, hass, test) {
  var hit = list.find(function (e) { return test(e.entity_id, hass.states[e.entity_id]); });
  return hit ? hit.entity_id : undefined;
}

// Builds the cartridge list of a HP Printer device: one entry per consumable sub-device.
function hpHpInks(hass, subIds) {
  var inks = [];
  subIds.forEach(function (id) {
    var list = hpEntitiesOf(hass, [id]);
    var level = hpPick(list, hass, function (eid, s) {
      return eid.indexOf('sensor.') === 0 && hpUnit(s) === '%';
    });
    var typeId = hpPick(list, hass, function (eid, s) {
      var o = (s.attributes.options || []);
      return eid.indexOf('sensor.') === 0 && o.indexOf('printhead') >= 0 && o.indexOf('ink') >= 0;
    });
    var type = typeId ? hass.states[typeId].state : '';
    var status = hpPick(list, hass, function (eid, s) {
      return eid.indexOf('binary_sensor.') === 0 && s.attributes.state !== undefined && /(statut|status|state|etat)$/.test(eid);
    });
    if (!level && type !== 'printhead' && !(status && /printhead|tete/.test(status))) return;
    var name = hpDeviceName(hass, id);
    inks.push({
      device: id,
      name: name,
      printhead: type === 'printhead' || (!level && /printhead|tete/i.test(name)),
      color: hpInkColor(name) || hpInkColor(level) || 'ink',
      level: level,
      status: status,
      station: hpPick(list, hass, function (eid) { return /(_emplacement|_station|_slot)$/.test(eid); }),
      expiry: hpPick(list, hass, function (eid, s) {
        return s.attributes.device_class === 'timestamp' && /(expiration|expiry|warranty|garantie)/.test(eid);
      }),
      pages_left: hpPick(list, hass, function (eid, s) {
        return hpUnit(s) === 'pages' && s.attributes.state_class === 'measurement';
      }),
    });
  });
  var order = { black: 0, cyan: 1, magenta: 2, yellow: 3, tricolor: 4, ink: 5 };
  return inks.sort(function (a, b) {
    var sa = a.station ? Number(hass.states[a.station].state) : NaN;
    var sb = b.station ? Number(hass.states[b.station].state) : NaN;
    if (!isNaN(sa) && !isNaN(sb) && sa !== sb) return sa - sb;
    return (order[a.color] || 9) - (order[b.color] || 9);
  });
}

// IPP integration: one "<color> cartridge" sensor per marker, on the same device.
function hpIppInks(hass, list) {
  return list.filter(function (e) {
    var s = hass.states[e.entity_id];
    return e.entity_id.indexOf('sensor.') === 0 && s.attributes.marker_type !== undefined;
  }).map(function (e) {
    var s = hass.states[e.entity_id];
    return { name: s.attributes.friendly_name, color: hpInkColor(e.entity_id) || hpInkColor(s.attributes.friendly_name) || 'ink',
      level: e.entity_id, low: s.attributes.marker_low_level };
  }).sort(function (a, b) {
    var order = { black: 0, cyan: 1, magenta: 2, yellow: 3, tricolor: 4, ink: 5 };
    return order[a.color] - order[b.color];
  });
}

// IPP printer sensor matching a HP Printer device (same model), for paper/cover alerts.
function hpFindIppSensor(hass, mainId) {
  var main = hass.devices && hass.devices[mainId];
  if (!main || !hass.entities) return undefined;
  var hit = Object.values(hass.entities).find(function (e) {
    if (e.entity_id.indexOf('sensor.') !== 0 || e.device_id === mainId) return false;
    var d = hass.devices[e.device_id];
    return d && d.model && d.model === main.model && hpIsIppStatus(hass.states[e.entity_id]);
  });
  return hit ? hit.entity_id : undefined;
}

// Printer web page: the device's configuration URL, else the host of the IPP sensor's URI.
function hpAdminUrl(hass, r) {
  var ids = [r.deviceId];
  var ippEnt = r.ipp && hass.entities && hass.entities[r.ipp];
  if (ippEnt && ippEnt.device_id) ids.push(ippEnt.device_id);
  for (var i = 0; i < ids.length; i++) {
    var d = hass.devices && hass.devices[ids[i]];
    if (d && d.configuration_url && /^https?:\/\//i.test(d.configuration_url)) return d.configuration_url;
  }
  var s = r.ipp && hass.states[r.ipp];
  var uris = s && s.attributes.uri_supported;
  uris = Array.isArray(uris) ? uris : String(uris || '').split(',');
  for (var j = 0; j < uris.length; j++) {
    var m = /^ipps?:\/\/(\[[^\]]+\]|[^/:]+)/i.exec(String(uris[j]).trim());
    if (m) return 'http://' + m[1];
  }
  return '';
}

var HP_LOGO = '<svg viewBox="0 0 1280 1280" aria-hidden="true"><defs><clipPath id="hp-logo-clip"><circle cx="640" cy="640" r="640"/></clipPath></defs>' +
  '<circle cx="640" cy="640" r="640" fill="#024ad8"/><g clip-path="url(#hp-logo-clip)" fill="#fff">' +
  '<path d="M485-20H619L482 360H597Q645 360 670 393Q695 427 676 477L515 918H380L552 444H451L277 918H142L349 360Z"/>' +
  '<path fill-rule="evenodd" d="M819 358H1070Q1118 358 1143 391Q1168 424 1151 470L1009 866Q1000 890 977 905Q956 918 932 918H752L614 1300H485ZM924 441H1026L883 832H781Z"/></g></svg>';

// ── Card ─────────────────────────────────────────────────────────────────────
var HP_DEFAULTS = {
  show_image: true, show_logo: true, show_inks: true, show_alerts: true, show_stats: true, show_eprint: true, show_expired: false, low_threshold: 15,
};

class HpPrinterCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement('hp-printer-card-editor');
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

  getCardSize() { return 5; }

  getGridOptions() { return { columns: 12, min_columns: 6 }; }

  _lang() {
    var l = (this._config && this._config.language) || (this._hass && this._hass.language) || document.documentElement.lang || 'en';
    l = l.split('-')[0];
    return HpI18n[l] ? l : 'en';
  }

  _t(k, vars) { var s = hpT(this._lang(), k); return vars ? hpFill(s, vars) : s; }

  _resolve() {
    var hass = this._hass, c = this._config, over = c.entities || {};
    var deviceId = c.device_id;
    if (!deviceId && c.entity && hass.entities && hass.entities[c.entity]) deviceId = hass.entities[c.entity].device_id;
    if (!deviceId && over.status && hass.entities && hass.entities[over.status]) deviceId = hass.entities[over.status].device_id;
    if (!deviceId) { var p = hpFindPrinters(hass)[0]; deviceId = p && p.id; }

    var main = hpEntitiesOf(hass, [deviceId]);
    var status = over.status || hpPick(main, hass, function (eid, s) { return eid.indexOf('sensor.') === 0 && hpIsHpStatus(s); });
    var r = { deviceId: deviceId, kind: 'hp', status: status, inks: [], ipp: over.ipp, total_pages: over.total_pages,
      eprint: over.eprint, eprint_registration: over.eprint_registration };

    if (status && hpIsHpStatus(hass.states[status])) {
      var subs = hpSubDevices(hass, deviceId);
      r.inks = hpHpInks(hass, subs);
      // ePrint (HP cloud printing): "ePrint status" (connectivity) and "ePrint registered" binary sensors.
      var ep = main.filter(function (e) { return e.entity_id.indexOf('binary_sensor.') === 0 && /eprint/.test(e.entity_id); });
      if (!r.eprint) {
        r.eprint = hpPick(ep, hass, function (eid, s) { return s.attributes.device_class === 'connectivity'; }) ||
          hpPick(ep, hass, function (eid) { return /(statut|status)/.test(eid); });
      }
      if (!r.eprint_registration) {
        r.eprint_registration = hpPick(ep, hass, function (eid, s) {
          return eid !== r.eprint && (/(registr|enregistr)/.test(eid) || /registered/.test(String(s.attributes.state)));
        });
      }
      if (!r.ipp) r.ipp = hpFindIppSensor(hass, deviceId);
      if (!r.total_pages) {
        var all = hpEntitiesOf(hass, subs);
        r.total_pages = hpPick(all, hass, function (eid) { return /_printer_total_pages$/.test(eid); }) ||
          hpPick(all, hass, function (eid, s) {
            return hpUnit(s) === 'pages' && s.attributes.state_class === 'total_increasing' && /total_(pages|impressions)$/.test(eid);
          });
      }
    } else {
      // IPP-only printer (or status forced to an IPP sensor).
      r.kind = 'ipp';
      r.status = status || hpPick(main, hass, function (eid, s) { return eid.indexOf('sensor.') === 0 && hpIsIppStatus(s); });
      r.ipp = r.ipp || r.status;
      r.inks = hpIppInks(hass, main);
    }
    return r;
  }

  _ids(r) {
    var ids = [r.status, r.ipp, r.total_pages, r.eprint, r.eprint_registration];
    r.inks.forEach(function (i) { ids.push(i.level, i.status, i.expiry, i.pages_left); });
    return ids.filter(Boolean);
  }

  _update() {
    if (!this._config || !this._hass || !this.shadowRoot) return;
    var r = this._resolve();
    var hass = this._hass;
    var sig = JSON.stringify([this._lang(), this._config, r.deviceId, this._ids(r).map(function (id) {
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
    return this._t('c_' + ink.color);
  }

  // Label used inside a sentence: lower case in French ("encre jaune"), as is in English.
  _inkWord(ink) {
    var l = ink.printhead ? this._t('printhead') : this._inkLabel(ink);
    if (this._lang() !== 'fr') return l;
    // "encre noire", "cartouche noire": the adjective agrees with the feminine noun.
    var w = hpT('fr', 'cw_' + ink.color);
    return w === 'cw_' + ink.color ? l.toLowerCase() : w;
  }

  _alerts(r, state) {
    var c = this._config, out = [];
    var low = Number(c.low_threshold);
    if (isNaN(low)) low = 15;
    var critical = Math.min(low, 5);
    r.inks.forEach((ink) => {
      var label = this._inkWord(ink);
      if (!ink.printhead) {
        var p = this._num(ink.level);
        if (!isNaN(p) && p <= low) {
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
        if (!isNaN(d.getTime()) && d.getTime() < Date.now()) {
          out.push({ level: 'info', icon: 'mdi:calendar-alert', text: this._t('al_expired', { c: label }) });
        }
      }
    });
    if (state === 'stopped') out.push({ level: 'error', icon: 'mdi:printer-alert', text: this._t('al_stopped') });
    out = out.concat(this._ippAlerts(r));
    var rank = { error: 0, warn: 1, info: 2 };
    return out.sort(function (a, b) { return rank[a.level] - rank[b.level]; });
  }

  // IPP "printer-state-reasons": media-empty-error, media-jam-warning, door-open…
  _ippAlerts(r) {
    var s = r.ipp && this._hass.states[r.ipp];
    if (!s || s.state === 'unavailable') return [];
    var raw = s.attributes.state_reason;
    var reasons = Array.isArray(raw) ? raw : String(raw || '').split(',');
    var seen = {};
    var out = [];
    reasons.map(function (x) { return String(x).trim(); }).forEach((reason) => {
      if (!reason || reason === 'none' || reason === 'None') return;
      var level = /-error$/.test(reason) ? 'error' : (/-report$/.test(reason) ? 'info' : 'warn');
      var base = reason.replace(/-(error|warning|report)$/, '');
      // Ink levels are already covered by the cartridges.
      if (/^marker-supply-low|^toner-low|^marker-waste/.test(base) && r.inks.length) return;
      var key = 'ipp_' + base.replace(/-/g, '_');
      var text = this._t(key);
      if (text === key) text = base.replace(/-/g, ' ').replace(/^./, function (ch) { return ch.toUpperCase(); });
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
    } catch (e) {
      return date.toLocaleString(this._lang());
    }
  }

  _render(r) {
    var c = this._config, hass = this._hass;
    var deviceName = hpDeviceName(hass, r.deviceId);
    var name = c.name || deviceName.replace(/\s*\([\d.]+\)\s*$/, '') || this._t('printer');

    if (!r.deviceId || !r.status) {
      this.shadowRoot.innerHTML = this._styles() + '<ha-card><div class="empty"><ha-icon icon="mdi:printer-off"></ha-icon>' + this._t('no_device') + '</div></ha-card>';
      return;
    }

    var state = this._state(r);
    var offline = state === 'offline';
    var color = offline ? 'var(--disabled-text-color, #9e9e9e)' : (HP_STATE_COLORS[state] || 'var(--secondary-text-color)');
    var statusText = this._t('st_' + state);
    var alerts = offline ? [] : this._alerts(r, state);

    // Picture, with the control panel lit in the status color.
    // Clicking it opens the printer's web admin page, when its address is known.
    var imageHtml = '';
    if (c.show_image) {
      var custom = c.image && String(c.image).trim();
      var admin = (c.admin_url && String(c.admin_url).trim()) || hpAdminUrl(hass, r);
      var picTag = admin ? 'a' : 'div';
      imageHtml = '<' + picTag + ' class="pic' + (offline ? ' off' : '') + (HP_BUSY.indexOf(state) >= 0 ? ' busy' : '') + '"' +
        (admin ? ' href="' + hpEsc(admin) + '" target="_blank" rel="noopener noreferrer" title="' + hpEsc(this._t('open_admin')) + '"' : '') + '>' +
        '<img src="' + hpEsc(custom || HP_PRINTER_IMAGE) + '" alt="">' +
        (custom ? '' : '<svg viewBox="' + HP_SCREEN.box + '" aria-hidden="true"><polygon class="screen" points="' + HP_SCREEN.points + '"/></svg>') +
      '</' + picTag + '>';
    }

    var chips = [];
    if (!offline && c.show_alerts) {
      var errors = alerts.filter(function (a) { return a.level === 'error'; }).length;
      var warns = alerts.filter(function (a) { return a.level === 'warn'; }).length;
      if (errors) chips.push('<span class="chip error"><ha-icon icon="mdi:alert-circle"></ha-icon>' + errors + '</span>');
      if (warns) chips.push('<span class="chip warn"><ha-icon icon="mdi:alert"></ha-icon>' + warns + '</span>');
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
      var since = st && st.last_changed ? new Date(st.last_changed) : null;
      sub = '<div class="sub">' + this._t('offline_text') +
        (since && !isNaN(since.getTime()) ? '<br><span class="muted">' + hpEsc(this._t('last_seen', { t: this._relative(since) })) + '</span>' : '') + '</div>';
    } else if (c.show_stats && this._avail(r.total_pages)) {
      var n = Number(this._val(r.total_pages));
      sub = '<div class="sub muted"><ha-icon icon="mdi:file-document-multiple-outline"></ha-icon>' +
        this._t('pages', { n: isNaN(n) ? this._val(r.total_pages) : n.toLocaleString(this._lang()) }) + '</div>';
    }

    var logoHtml = c.show_logo
      ? '<a class="logo" href="https://www.hp.com" target="_blank" rel="noopener noreferrer" title="' + hpEsc(this._t('open_hp')) + '">' + HP_LOGO + '</a>'
      : '';

    var head = '<div class="head">' + logoHtml + imageHtml +
      '<div class="meta">' +
        '<div class="name">' + hpEsc(name) + '</div>' +
        '<div class="status"><ha-icon icon="' + (HP_STATE_ICONS[state] || 'mdi:printer') + '"></ha-icon><span>' + hpEsc(statusText) + '</span></div>' +
        (chips.length ? '<div class="chips">' + chips.join('') + '</div>' : '') +
        sub +
      '</div></div>';

    var inksHtml = '';
    var cartridges = r.inks.filter(function (i) { return !i.printhead && i.level; });
    if (!offline && c.show_inks && cartridges.length) {
      var low = Number(c.low_threshold);
      inksHtml = '<div class="section"><div class="section-title">' + this._t('inks') + '</div><div class="inks" style="--n:' + cartridges.length + '">' +
        cartridges.map((ink) => {
          var p = this._num(ink.level);
          var pct = isNaN(p) ? 0 : Math.max(0, Math.min(100, p));
          var bad = ink.status && this._val(ink.status) === 'off' && !hpCartridgeOk((hass.states[ink.status] || {}).attributes.state);
          var isLow = !isNaN(p) && p <= (isNaN(low) ? 15 : low);
          var left = Number(this._val(ink.pages_left));
          var title = this._inkLabel(ink) + (isNaN(p) ? '' : ' · ' + Math.round(p) + ' %') +
            (this._avail(ink.pages_left) && !isNaN(left) ? ' · ' + this._t('pages_left', { n: left }) : '');
          return '<div class="ink' + (isLow ? ' low' : '') + (!isNaN(p) && p <= Math.min(isNaN(low) ? 15 : low, 5) ? ' crit' : '') + (bad ? ' bad' : '') + '" title="' + hpEsc(title) + '">' +
            '<div class="tank"><div class="level" style="height:' + pct + '%;background:' + HP_INK_COLORS[ink.color] + '"></div>' +
              (isLow || bad ? '<ha-icon class="flag" icon="mdi:alert"></ha-icon>' : '') + '</div>' +
            '<div class="pct">' + (isNaN(p) ? '—' : Math.round(p) + '<small>%</small>') + '</div>' +
            '<div class="lbl">' + hpEsc(this._inkLabel(ink)) + '</div>' +
          '</div>';
        }).join('') + '</div></div>';
    }

    var alertsHtml = '';
    if (!offline && c.show_alerts) {
      alertsHtml = '<div class="section"><div class="section-title">' + this._t('alerts') + '</div>' +
        (alerts.length
          ? '<div class="alerts">' + alerts.map(function (a) {
            var txt = String(a.text);
            return '<div class="alert ' + a.level + '"><ha-icon icon="' + a.icon + '"></ha-icon><span>' + hpEsc(txt.charAt(0).toUpperCase() + txt.slice(1)) + '</span></div>';
          }).join('') + '</div>'
          : '<div class="alert ok"><ha-icon icon="mdi:check-circle"></ha-icon><span>' + this._t('no_alerts') + '</span></div>') +
      '</div>';
    }

    this.shadowRoot.innerHTML = this._styles(color) + '<ha-card class="' + (offline ? 'offline' : '') + '">' + head + inksHtml + alertsHtml + '</ha-card>';
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
      '.pic svg { position: absolute; inset: 0; width: 100%; height: 100%; }' +
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

// ── hp-printer-card-editor (visual editor, built on HA's ha-form) ────────────
class HpPrinterCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = Object.assign({}, config);
    this._render();
  }

  set hass(hass) {
    var prevLang = this._hass && this._hass.language;
    this._hass = hass;
    if (this._form && prevLang === (hass && hass.language)) {
      this._form.hass = hass;
    } else {
      this._render();
    }
  }

  _lang() {
    var lang = this._hass && this._hass.language ? this._hass.language.split('-')[0] : 'en';
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
      if (['status', 'ipp', 'total_pages', 'eprint', 'eprint_registration'].indexOf(s.name) >= 0) return hpT(lang, 'en_' + s.name);
      return hpT(lang, 'ed_' + s.name);
    };
    this._form.computeHelper = (s) => {
      var key = 'ed_' + s.name + '_helper';
      var txt = hpT(lang, key);
      return txt === key ? undefined : txt;
    };
    this._form.data = Object.assign({}, HP_DEFAULTS, this._config);
  }

  _valueChanged(ev) {
    ev.stopPropagation();
    var value = Object.assign({}, ev.detail.value);
    // Keep the YAML short: drop options left empty or at their default.
    Object.keys(value).forEach(function (key) {
      if (value[key] === '' || value[key] === null || value[key] === undefined) delete value[key];
    });
    Object.keys(HP_DEFAULTS).forEach(function (key) {
      if (value[key] === HP_DEFAULTS[key]) delete value[key];
    });
    if (value.entities) {
      var e = Object.assign({}, value.entities);
      Object.keys(e).forEach(function (k) { if (!e[k]) delete e[k]; });
      if (Object.keys(e).length) value.entities = e; else delete value.entities;
    }
    if (this._config.type) value = Object.assign({ type: this._config.type }, value);
    this._config = value;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: value }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('hp-printer-card-editor')) {
  customElements.define('hp-printer-card-editor', HpPrinterCardEditor);
}

window.customCards = window.customCards || [];
if (!customElements.get('hp-printer-card')) {
  customElements.define('hp-printer-card', HpPrinterCard);
  window.customCards.push({
    type: 'hp-printer-card',
    name: 'HP Printer Card',
    description: 'Status, ink levels and alerts for HP printers (HP Printer and IPP integrations)',
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-hp-printer-card',
  });
}

console.info('%c HP-PRINTER-CARD %c v' + HP_PRINTER_CARD_VERSION + ' ', 'color:#fff;background:#0096d6;font-weight:700', 'color:#0096d6;background:#fff');
