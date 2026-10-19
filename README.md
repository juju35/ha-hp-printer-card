# ha-hp-printer-card

[![HACS](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![HACS Validation](https://github.com/juju35/ha-hp-printer-card/actions/workflows/validate.yml/badge.svg)](https://github.com/juju35/ha-hp-printer-card/actions/workflows/validate.yml)
[![Release](https://img.shields.io/github/v/release/juju35/ha-hp-printer-card)](https://github.com/juju35/ha-hp-printer-card/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Custom Lovelace card for HP printers in Home Assistant, built for the [HP Printer](https://github.com/elad-bar/ha-hpprinter) integration (`hpprinter`) and also working with the core [IPP](https://www.home-assistant.io/integrations/ipp/) integration.

When the printer is off, the card simply says it's **offline**. Otherwise it shows the **status**, the **ink levels** and the **alerts**.

Pick the printer, the card finds all its entities by itself.

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=juju35&repository=ha-hp-printer-card&category=plugin)

| Online | Dark theme | Offline |
|---|---|---|
| ![HP Printer card](https://raw.githubusercontent.com/juju35/ha-hp-printer-card/main/screenshots/card.png) | ![HP Printer card, dark theme](https://raw.githubusercontent.com/juju35/ha-hp-printer-card/main/screenshots/card-dark.png) | ![HP Printer card, printer offline](https://raw.githubusercontent.com/juju35/ha-hp-printer-card/main/screenshots/offline.png) |

## Features

- **Offline state**: when the printer is turned off or unreachable, the picture turns grey and the card only shows *Offline* with the last time it was seen
- **Status** with color: ready, sleeping, printing, scanning, copying, cancelling, stopped. The printer's control panel lights up in the status color and pulses while it works
- **Ink levels**: one tank per cartridge, in the printer's slot order, with a warning below a configurable threshold
- **Alerts**: low or nearly empty ink, missing / used / non-HP / damaged cartridge, printhead problem, and, through the IPP integration, empty paper tray, paper jam, open cover…
- **ePrint status**: on, off or not registered (HP cloud printing)
- Page counter
- Automatic entity discovery from the device (works with English or French entity IDs), status, IPP sensor, ePrint sensors and page counter can be overridden
- Visual editor in the dashboard UI (no YAML needed)
- English and French, follows the Home Assistant language
- Light and dark theme compatible
- Single file, no dependencies, HACS-ready

## Requirements

- Home Assistant with the [HP Printer](https://github.com/elad-bar/ha-hpprinter) integration (recommended) or the [IPP](https://www.home-assistant.io/integrations/ipp/) integration set up
- With both integrations set up for the same printer, the card uses HP Printer for status and inks and picks up the IPP printer sensor by itself for paper and cover alerts

## Installation

### Via HACS (recommended)

Click the button below to add the repository directly:

[![Add to HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=juju35&repository=ha-hp-printer-card&category=plugin)

Or manually:

1. Open HACS → **Frontend** → **⋮** → **Custom repositories**
2. Add `https://github.com/juju35/ha-hp-printer-card` — Category: **Dashboard** (Lovelace)
3. Search for **HP Printer Card** and install it
4. Clear your browser cache and refresh

HACS registers the dashboard resource for you.

### Manual

1. Download `hp-printer-card.js` from the [latest release](https://github.com/juju35/ha-hp-printer-card/releases/latest)
2. Copy it to `/config/www/hp-printer-card.js`
3. Go to **Settings → Dashboards → Resources** → Add resource:
   - URL: `/local/hp-printer-card.js`
   - Type: **JavaScript Module**
4. Clear your browser cache and refresh

## Configuration

### Visual editor

Add the card from the dashboard (**Add card** → **HP Printer Card**). The first printer found is picked automatically; change it with the **Printer** field, then set the name, the sections to show and the low ink threshold. The **Entities (advanced)** panel lets you force an entity if auto-detection picks the wrong one. Options left at their default are not written to the YAML.

### Minimal

```yaml
type: custom:hp-printer-card
device_id: e1146b5da5cdfee3f4b06c25b0c863a7
```

Use either `device_id` (what the visual editor writes) or `entity` (any entity of the printer's main device). With neither, the card uses the first printer it finds.

### Full options

```yaml
type: custom:hp-printer-card
device_id: e1146b5da5cdfee3f4b06c25b0c863a7
name: Printer
show_image: true
show_logo: true
show_inks: true
show_alerts: true
show_stats: true
show_eprint: true
show_expired: false
low_threshold: 15
admin_url: http://192.168.1.20
image: /local/my-printer.png
language: en
entities:
  status: sensor.hp_officejet_pro_9010_series_192_168_1_119_status
  ipp: sensor.hp_officejet_pro_9010_series
  total_pages: sensor.hp_officejet_pro_9010_series_192_168_1_119_printer_total_pages
  eprint: binary_sensor.hp_officejet_pro_9010_series_192_168_1_119_eprint_status
  eprint_registration: binary_sensor.hp_officejet_pro_9010_series_192_168_1_119_eprint_registered
```

### Options reference

| Option | Required | Default | Description |
|---|---|---|---|
| `device_id` | ❌* | Auto | Printer device (*or `entity`; the first printer found is used if both are missing) |
| `entity` | ❌ | — | Any entity of the printer's main device, used to find the device |
| `name` | ❌ | Device name | Card title |
| `show_image` | ❌ | `true` | Show the printer picture |
| `show_logo` | ❌ | `true` | Show the HP logo in the top right corner; clicking it opens hp.com |
| `show_inks` | ❌ | `true` | Show the ink levels |
| `show_alerts` | ❌ | `true` | Show the alerts |
| `show_stats` | ❌ | `true` | Show the total page counter |
| `show_eprint` | ❌ | `true` | Show the ePrint status (HP Printer integration only) |
| `show_expired` | ❌ | `false` | Also alert when a cartridge's warranty date has passed |
| `low_threshold` | ❌ | `15` | Ink level (%) at or below which a cartridge is flagged as low; at 5 % or less it is nearly empty |
| `admin_url` | ❌ | Detected | Page opened when clicking the printer picture, e.g. `http://192.168.1.20`. By default, the device's configuration URL or the address of its IPP sensor |
| `image` | ❌ | Bundled picture | URL of your own printer picture, e.g. `/local/printer.png` |
| `language` | ❌ | Auto | Force language: `fr` or `en` (auto-detects from HA settings) |
| `entities` | ❌ | Auto | Override detected entities (see below) |

### Entity overrides

Keys accepted under `entities`:

| Key | Domain | Used for |
|---|---|---|
| `status` | `sensor` | Printer status (HP Printer *Status* sensor, or the IPP printer sensor) |
| `ipp` | `sensor` | IPP printer sensor, read for paper, jam and cover alerts |
| `total_pages` | `sensor` | Page counter |
| `eprint` | `binary_sensor` | ePrint status (on / off) |
| `eprint_registration` | `binary_sensor` | ePrint registration, shows *not registered* when off |

Cartridges are always found from the printer's devices.

## How it works

The HP Printer integration creates one device per part of the printer (each cartridge, the printhead, the print, scan and copy counters) linked to the main device. The card reads the entity registry to list them, then for each cartridge finds its level, slot, status and warranty date. The printer is shown as **offline** when its status sensor reports `off` (that's what the integration does when the printer stops answering) or is unavailable.

With the IPP integration only, the card reads the `<color> cartridge` sensors and the printer sensor of the IPP device.

The bundled picture is an HP OfficeJet Pro 9010; set `image` to use a picture of your own model (the lit control panel is only drawn on the bundled picture).

## Translations

The card auto-detects the language from your Home Assistant settings. Currently supported:

| Language | Code |
|---|---|
| English | `en` |
| Français | `fr` |

Contributions for additional languages are welcome!

## License

[MIT](LICENSE)
