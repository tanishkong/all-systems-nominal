# August 4, 2026 — All Systems Nominal

A retelling of *There Will Come Soft Rains* as a smart home system log.

This project replaces Bradbury’s omniscient narrator with a corporate smart home interface that continues to operate after the humans are gone. The house performs its daily routines, logs activity, and maintains system “normalcy” despite the complete absence of occupants.

## Concept

The piece explores the gap between automated systems and human reality.

* The **left panel** presents a chronological system log of the house’s routines.
* The **right panel** (“Contextual Intelligence”) presents real-world parallels to each action — energy usage, automated devices, and AI behavior.
* The system continues to function as designed, even when its assumptions are no longer valid.

A key moment:

> “Presence status: confirmed. (0 users detected.)”

The system performs certainty while being completely wrong.

## Design Decisions

* **No user interaction** — the system runs autonomously.
* **Stable interface** — the UI never visually breaks down.
* **Only content degrades** — logs fragment during failure, not the interface.
* **Narrative time** — the clock progresses independently of real time.
* **Abrupt ending** — the system completes its cycle and schedules the next day, followed by a hard cut to black.

## Medium

A browser-based interface built using:

* HTML
* CSS
* JavaScript

No frameworks or build tools are used.

## How to Run

Open `index.html` in a browser.

Or deploy via Vercel by importing this repository. No build step is required.

## Credits

Original text inspiration:
Ray Bradbury, *There Will Come Soft Rains* (1950)
