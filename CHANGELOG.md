# Changelog

## 2.0.2

### Changes
- No HP logo with the generic picture, whether detected or set with `picture: generic`.

## 2.0.1

### Breaking changes
- The `custom:hp-printer-card` alias is removed: replace it with `type: custom:printer-card` in your dashboards.

## 2.0.0

### Breaking changes
- The repository becomes `ha-printer-card` and the card `custom:printer-card`; the file is now `printer-card.js` (HACS: **Printer Card**). `custom:hp-printer-card` stays registered as an alias, so existing dashboards keep working. A resource added by hand as `/local/hp-printer-card.js` must point to `/local/printer-card.js`.

### New
- Any IPP printer (Brother, Canon, Epson…): status, ink or toner levels and paper / cover alerts through the IPP integration. *Toner levels* title for laser cartridges.
- `picture` option, in the visual editor too: drawings for the HP OfficeJet, LaserJet, DeskJet / ENVY and Smart Tank ranges, and a generic printer. `auto` (default) picks it from the device model; their control panel lights up in the status color.

### Changes
- The bundled HP OfficeJet Pro 9010 photo is removed: the OfficeJet drawing replaces it (set `image` to use a photo of your own).
- The HP logo only shows for HP printers; "No printer found" instead of "No HP printer found".

## 1.5.2

### Fixes
- Keyboard focus stays on the printer picture (admin page link) or the HP logo when the card updates, instead of being lost on every status change.

### Maintenance
- The duplication check runs on Node 22 like the other CI jobs; regression tests for the focus fix. Nothing changes for users.

## 1.5.1

### Changes
- README: the `admin_url` example is `http://printer.local` instead of a LAN address.

### Fixes
- Paper alerts and the admin link show up when the IPP sensor appears after the card is first drawn (IPP loaded after HP Printer, or unavailable at startup), without waiting for a registry change.
- Lighter updates: the printer and IPP sensor lookups reuse sensor lists cached per registry change instead of walking the whole entity registry.

### Maintenance
- Screenshot script renders each capture in a fresh page; duplication checks no longer scan the tests. Nothing changes for users.

## 1.5.0

### Changes
- `admin_url` only becomes a link when it starts with `http://` or `https://`; otherwise the printer's detected address is used.
- The visual editor follows the card's `language` option.

### Fixes
- Black ink is listed first again when the slot sensors are missing.
- While the printer is offline, "Last seen" updates every minute instead of staying frozen; expired cartridges (`show_expired`) are re-checked over time too.
- A non-numeric total pages value is HTML-escaped.
- Lighter updates: the printer's entities are no longer looked up in the whole entity registry on every Home Assistant update.

### Maintenance
- CI hardening: actions pinned by commit SHA, read-only workflow token, monthly Dependabot updates, duplication findings annotated in pull requests.
- Unit tests (`npm test`) run in CI; dead code removed, `package-lock.json` version synced. Nothing changes for users.

## 1.4.1

### Maintenance
- Tooling only, no functional change: Biome linting, pre-commit and a Lint CI (duplication checks). Card source modernized (optional chaining, template literals), identical behavior.

## 1.4.0

### Changes
- More compact layout with the same information, like the other ha-* cards: 12 px card padding, 36 px header icon, 16 px name and 12 px subtitle, 11 px pills, tighter tiles and sections.
- Printer picture 42 % (max 190 px) → 28 % (max 120 px), ink tanks 64 → 44 px, lower alerts.

## 1.3.3

### Changes
- HACS now asks for Home Assistant 2024.8 or later, the version that brought the sections view the card supports; the README says so under **Prerequisites**.

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
