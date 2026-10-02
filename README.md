# Reaktionsnetzwerk·Monitor

Interaktive Web-App der Fakultät Angewandte Chemie (TH Nürnberg) zur Simulation
beliebiger chemischer Reaktionsnetzwerke. Spezies, Reaktionen, Stöchiometrie
und Reaktionsordnungen werden direkt im Browser definiert; die
Konzentrations-Zeit-Verläufe werden live berechnet und dargestellt.

## Funktionen

- **Beliebig viele Spezies** mit frei wählbarem Namen und Anfangskonzentration C₀
- **Beliebig viele Reaktionen** mit mehreren Edukten und Produkten
- **Stöchiometrie und Reaktionsordnung unabhängig** voneinander einstellbar
  (auch gebrochene Ordnungen, z. B. 0,5)
- **Vorlagen** zum schnellen Einstieg:
  - Reaktion 1. Ordnung: A → B
  - Folgereaktion: A → B → C
  - Nebenreaktion: A → B und A → C
- **Automatischer Zeitbereich** – die Simulation läuft, bis sich alle
  Konzentrationen stabilisiert haben
- **Interaktives Diagramm**: Bereich aufziehen zum Hineinzoomen, Mausrad zum
  Zoomen, Doppelklick zum Zurücksetzen
- **CSV-Export** der Simulationsdaten (Semikolon-getrennt, Dezimalkomma,
  UTF-8 mit BOM – direkt in Excel öffenbar)

Gleichgewichtsreaktionen lassen sich über eine Hin- und eine Rückreaktion
abbilden (z. B. A → B und B → A).

## Modell und Numerik

Für jede Reaktion *j* gilt das Geschwindigkeitsgesetz

```
r_j = k_j · Π (C_i)^n_i      (Produkt über alle Edukte i)
```

und für jede Spezies *i*

```
dC_i/dt = Σ_j ν_ij · r_j
```

mit den stöchiometrischen Koeffizienten ν (negativ für Edukte, positiv für
Produkte). Das ODE-System wird mit dem klassischen **Runge-Kutta-Verfahren
4. Ordnung** (400 Zeitschritte) integriert; negative Konzentrationen werden
auf 0 begrenzt. Die Integration wurde gegen die analytischen Lösungen der drei
Vorlagen validiert.

Einheiten sind frei wählbar, müssen aber konsistent sein (z. B. C in mol/L,
t in s, k entsprechend der Reaktionsordnung).

## Technik

- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- [Recharts](https://recharts.org/) für das Diagramm
- [Tailwind CSS 4](https://tailwindcss.com/) für das Layout
- Gestaltung im Corporate Design der TH Nürnberg („die Ohm“)

Die gesamte Logik (Modell, Simulation, Oberfläche) liegt in
[src/App.jsx](src/App.jsx).

## Entwicklung

Voraussetzung: Node.js ≥ 18 (CI verwendet Node 20).

```bash
npm install
npm run dev       # Entwicklungsserver mit Hot Reload
npm run build     # Produktions-Build nach dist/
npm run preview   # Produktions-Build lokal ansehen
```

## Deployment

Bei jedem Push auf `main` baut der Workflow
[.github/workflows/deploy.yml](.github/workflows/deploy.yml) die App und
veröffentlicht sie auf GitHub Pages. Der Pfad, unter dem die App ausgeliefert
wird, ist in [vite.config.js](vite.config.js) über `base` festgelegt und muss
zum Namen des GitHub-Repositorys passen.
