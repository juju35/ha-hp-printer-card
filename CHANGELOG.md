# Changelog

## 1.3.2

### Maintenance
- Merged branches are deleted automatically (new `cleanup-branches` workflow). Nothing changes for users.

## 1.3.1

### Development
- The built card is no longer committed in `dist/`: CI builds it on every push, and the release workflow builds it and attaches it to the release, which is where HACS downloads it from. Nothing changes for users.

## 1.3.0

### Changes
- Status, alert, ink warning and ePrint colors come from the Home Assistant theme (`--success-color`, `--info-color`, `--warning-color`, `--error-color`) with the Home Assistant defaults as fallbacks.
- Printer name in 18px and status, alert counters and ePrint as the same 12px pills as the other ha-* cards.
- Section titles, ink labels and tank corners aligned with the other cards.

### Development
- The card source moves to `src/hp-printer-card.js`; `npm run build` stamps the version from `package.json` into `dist/hp-printer-card.js`, and CI checks that `dist/` is up to date.
- `npm run screenshots` renders the README screenshots with a mock HP printer.
- Releases are published when `version` in `package.json` has no tag yet.

## 1.2.1

### Changes
- The HP logo in the top right corner of the card is now the real HP logo, drawn as a vector so it stays sharp at any size.

## 1.2.0

### What's new
- Clicking the printer picture opens the printer's web admin page in a new tab. The address comes from the device's configuration URL or the IPP integration, and can be set with the new `admin_url` option, also in the visual editor.
- HP logo in the top right corner of the card; clicking it opens hp.com. It can be hidden with the new `show_logo` option.

## 1.1.0

### What's new
- ePrint status chip under the printer status: on, off, or not registered, read from the HP Printer integration's *ePrint status* and *ePrint registered* sensors.
- New `show_eprint` option (on by default), also in the visual editor.
- `eprint` and `eprint_registration` entity overrides.

## 1.0.0

First public release.

### What's new
- `hp-printer-card`, a card for HP printers built for the HP Printer (`hpprinter`) integration, also working with the core IPP integration.
- Offline state: when the printer is turned off or unreachable, the card says so and shows when it was last seen.
- Status with color (ready, sleeping, printing, scanning, copying, cancelling, stopped), shown on the printer's control panel in the picture.
- Ink levels for every cartridge, in slot order, with a configurable low ink threshold.
- Alerts: low or nearly empty ink, cartridge and printhead problems, and paper, jam and cover alerts from the IPP integration; optional expired warranty alert.
- Page counter.
- Pick the printer once: every entity is found automatically from its devices, and the status, IPP sensor and page counter can be overridden.
- Visual editor in the dashboard UI, labels in English and French.
- Light and dark theme compatible, installable via HACS.
