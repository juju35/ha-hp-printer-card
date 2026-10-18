# Changelog

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
