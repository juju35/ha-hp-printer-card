# Changelog

## 2.4.4

### Fixes
- With two identical printers, when the HP Printer device of one has no address, its card no longer takes the other printer's IPP sensor (and shows its paper and cover alerts): the sensor whose address matches the other HP Printer device is left to it. When no sensor can be told apart, none is attached.
- A printer name without domain in HP Printer (`officejet`) is now compared with DNS names only: the IPP sensor is attached when it announces the printer's `.local` name (and IP address), instead of being refused as another printer.

## 2.4.3

### Fixes
- The IPP sensor is attached again when HP Printer uses a DNS name (`officejet.lan`) and the IPP sensor announces the printer's `.local` name and IP address: paper and cover alerts were lost since 2.4.2. A `.local` name and another DNS name are no longer compared as if they could tell two printers apart.
- With two identical printers, an IPP sensor whose address matches now always wins over one that announces no address.
- Two DNS names that only share their first part (`printer.office1.lan` / `printer.office2.lan`) are no longer taken for the same printer.

### Maintenance
- Reference table of IPP pairing cases (same host, IP vs `.local`, DNS vs mDNS, IPv4 vs IPv6, different hosts, identical printers, no host, IPP sensor absent or unavailable) in the test suite.

## 2.4.2

### Fixes
- Two printers of the same model, one followed by HP Printer only and the other by IPP only, are no longer paired: the first printer's card no longer shows the second printer's paper and cover alerts. A single pair is still matched when one side gives the IP address and the other the `.local` name, and a name now matches with or without its domain (`hp1234` / `hp1234.local`).

## 2.4.1

### Fixes
- The IPP sensor is attached again when the HP Printer and IPP integrations name the printer differently (IP address on one side, `.local` name on the other): paper and cover alerts were lost. With identical printers, any address the IPP sensor advertises can match.
- An empty cartridge reported by IPP no longer shows a second "Cartridge empty" alert next to the cartridge's own ink alert.
- Common IPP reasons ("Load paper", "Toner empty", "Cartridge missing") are translated instead of shown in raw English.
- Spanish: cartridge colors are written in lower case inside sentences ("Tinta baja: negro"), and "Vista por última vez" agrees with "impresora".
- German: the tri-color cartridge is called "Farbe" ("Patrone Farbe: leer").
- Lighter discovery on large installations: other devices are no longer scanned sensor by sensor, and only once per refresh.

### Maintenance
- Test checking that the French strings have the English keys and placeholders.
- CI: the screenshots workflow retries the Chromium download and fails clearly when apt fails three times.
- `playwright` range raised to the locked 1.64.1.
- CI: when the screenshots workflow pushes refreshed screenshots, it starts the lint, validate and HACS checks again on the pull request branch (a push made with `GITHUB_TOKEN` starts no `pull_request` run).
- The compact card's Sections grid no longer pretends to change on zoom (Home Assistant does not read it again); `rows: 'auto'` already lets the full view grow.

## 2.4.0

### Changes
- Spanish translation (card and visual editor); `es` added to the editor's language selector.

### Maintenance
- Test checking that the German and Spanish strings have exactly the English keys and placeholders.

## 2.3.0

### Changes
- German translation (card and visual editor), contributed by domwu0001.

## 2.2.3

### Fixes
- Two printers of the same model: the card no longer picks up the other printer's IPP sensor (paper / cover alerts of the wrong device); the IPP sensor must now share the printer's host when both are known.
- A second printer named like the first ("OfficeJet 2" next to "OfficeJet") is no longer mixed into the first one's cartridges and sensors.
- Mini card: keyboard focus on the detail button is kept when the card refreshes.
- A printhead reported only through its status ("Printhead…", "Tête…") is recognised whatever its case.

### Maintenance
- README: printing animation GIFs, refreshed screenshots, "Dark" captions, current HACS install steps.
- CI: hardened apt handling and fork guard in the screenshots workflow, release gated on the tests, unused ruff tooling removed, jscpd annotation step no longer crashes without a report.

## 2.2.2
### Changes
- The printer icon shown in place of the HP logo uses the shared round badge of the other cards: 16 % tint of the status color, 24 px icon (20 px on the mini card).
- The status pill (Ready, Printing, Offline…) sits in the header row, right of the name (before the detail button on the mini card's full view), instead of on its own line next to the picture; the ink / alert / ePrint chips stay next to the picture.
- Header geometry: the body starts 8 px under the header (was 10 px); logo 12 px from the top and left edges, status pill 12 px from the right edge (detail button 8 px).
- The Ink levels / Toner and Alerts section titles have a leading 16 px icon, like the other cards' section titles.

## 2.2.1

### Changes
- Full card (and the mini card's full view): the HP logo, or the printer icon in its place, sits before the name on a header line, like the Home Connect cards, instead of the top right corner; the status, chips and picture come below. The detail button stays at the right end of that line.

## 2.2.0

### Changes
- Mini card laid out like the Home Connect mini cards: logo, name, status (dot and label) and detail button on top, then the picture with one chip per cartridge — a small tank filled to its level, outlined orange or red when low — and per alert. Offline, the last time the printer was seen shows under a clock icon.
- Without the HP logo (other brands, generic picture), a printer icon takes its place (in the status color on the mini card); `show_logo: false` still removes both.

## 2.1.0

### New
- **Printer Mini Card** (`custom:printer-mini-card`, with its visual editor): picture, name and status on one line, then one chip per cartridge, tinted orange when low and red when nearly empty, and one per alert. *Offline* with the last time the printer was seen when it is off.
- Detail button on the mini card (top right): shows the full card in place (status, ink levels, alerts, picture); the button, or a click anywhere outside the card, goes back to the compact view. `zoom: false` removes it, in the visual editor too.

### Maintenance
- The full card's rendering is split into parts the mini card reuses; tests and screenshots for the mini card and its full view. Nothing changes for the full card.

## 2.0.3

### Fixes
- OfficeJet drawing: the control panel is straight instead of tilted.

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
