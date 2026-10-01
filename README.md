# Satellite Saturn – Astro-Proof-of-Concept

Ein kleines Spielprojekt, um [Astro](https://astro.build) kennenzulernen. Es enthält zwei Beispielseiten:

| Seite | Datei | Was sie zeigt |
| :---- | :---- | :------------ |
| **404-Seite** | [`src/pages/404.astro`](src/pages/404.astro) | Reines Astro: HTML, Komponenten, Props und scoped CSS. Im Browser kommt **kein JavaScript** an. |
| **Feedback-Seite** | [`src/pages/feedback.astro`](src/pages/feedback.astro) | Astro **mit React**: Ein interaktives Formular mit State und Events, eingebunden als „Island“. |

Beide Dateien enden mit einem Kommentar, der die Schreibweise erklärt. Am besten dort anfangen.

## Loslegen

**Voraussetzung:** Node.js ab Version 22.12 (prüfen mit `node -v`).

```sh
npm install      # einmalig: Abhängigkeiten installieren
npm run dev      # Entwicklungsserver starten
```

Danach im Browser öffnen:

- Startseite: http://localhost:4321
- Feedback-Seite (React): http://localhost:4321/feedback
- 404-Seite: http://localhost:4321/404 oder eine beliebige nicht existierende URL, z. B. http://localhost:4321/gibts-nicht

Änderungen an den Dateien erscheinen automatisch im Browser. Beenden mit `Ctrl+C`.

## Wie eine `.astro`-Datei aufgebaut ist

```astro
---
// 1. Script: JavaScript/TypeScript, läuft nur beim Build, nie im Browser
import Button from '../components/Button.astro';
const title = 'Hallo';
---

<!-- 2. Template: HTML mit {Ausdrücken} und Komponenten -->
<h1>{title}</h1>
<Button href="/">Zur Startseite</Button>

<style>
	/* 3. CSS: gilt nur für diese Datei */
	h1 { color: navy; }
</style>
```

- **Komponenten** werden im Script importiert und im Template wie HTML-Tags benutzt.
- **Props** (z. B. `href="/"`) liest die Komponente über `Astro.props`.
- **`<slot />`** ist der Platzhalter für den Inhalt zwischen den Tags einer Komponente.
- **Jede Datei in `src/pages/` wird automatisch zu einer URL:** `feedback.astro` → `/feedback`.

## React in Astro

React-Komponenten (`.tsx`) werden genauso importiert. Der Unterschied steckt in der **`client:*`-Direktive**:

```astro
<FeedbackForm />              <!-- nur statisches HTML, nicht interaktiv -->
<FeedbackForm client:load />  <!-- im Browser interaktiv (useState, onClick …) -->
```

Ohne Direktive rendert Astro die Komponente nur einmal zu HTML. Mit `client:load`, `client:idle` oder `client:visible` bekommt **nur diese Komponente** JavaScript, der Rest der Seite bleibt reines HTML.

**Zum Ausprobieren:** In `feedback.astro` mal `client:load` entfernen. Das Formular sieht dann gleich aus, reagiert aber nicht mehr.

## Projektstruktur

```text
/
├── public/                         # statische Dateien (Favicon …), werden 1:1 ausgeliefert
├── src/
│   ├── components/
│   │   ├── Button.astro            # Astro-Komponente mit Props und Slot
│   │   ├── FeedbackForm.tsx        # React-Komponente mit State
│   │   ├── FeedbackForm.module.css # CSS-Modul für die React-Komponente
│   │   └── Welcome.astro           # Startseiten-Inhalt aus dem Astro-Template
│   ├── layouts/
│   │   └── Layout.astro            # HTML-Grundgerüst (<head>, Titel …) für alle Seiten
│   └── pages/                      # jede Datei = eine URL
│       ├── index.astro             # /
│       ├── 404.astro               # Fehlerseite
│       └── feedback.astro          # /feedback
├── astro.config.mjs                # Astro-Konfiguration (hier ist React eingebunden)
└── package.json
```

## Befehle

| Befehl            | Was passiert                                                |
| :---------------- | :---------------------------------------------------------- |
| `npm install`     | Abhängigkeiten installieren                                 |
| `npm run dev`     | Entwicklungsserver auf `localhost:4321` starten             |
| `npm run build`   | Fertige Website nach `./dist/` bauen                        |
| `npm run preview` | Den Build aus `./dist/` lokal ansehen                       |

## Bekannte Einschränkungen

- Das Feedback-Formular verschickt nichts. Es zeigt nach dem Absenden nur eine Bestätigung.
- Der `Button` ist ein einfacher Nachbau des Kernux-Buttons, das Kernux-Theme ist nicht installiert.
- Das Styling ist ein Platzhalter.

## Mehr lernen

- [Astro-Komponenten](https://docs.astro.build/en/basics/astro-components/)
- [React und andere Frameworks in Astro](https://docs.astro.build/en/guides/framework-components/)
- [Routing (Seiten und URLs)](https://docs.astro.build/en/guides/routing/)
- [Styling](https://docs.astro.build/en/guides/styling/)
