# Skolehjelp

Interaktive øvelser til skolearbeid. Nettsiden er vanlig HTML, CSS og JavaScript uten byggesteg.

- `index.html`: forside med oversikt over øvelsene
- `modalverber.html`: tyske modalverb i presens (A1–A2), 30 oppgaver
- `modalverber-fortid.html`: modalverb i fortid (B1), 30 oppgaver
- `kasus-verb-vg1.html` og `kasus-verb-vg2.html`: kasus og verbbøyning for vg1 og vg2, 30 oppgaver hver
- `css/style.css`: felles stil
- `js/quiz.js`: felles logikk for øvelsene
- `js/modalverber.js`, `js/fortid.js`, `js/vg1.js` og `js/vg2.js`: oppgavene

## Publisere med GitHub Pages

1. Legg filene i roten av repoet `skolehjelp` og push til `main`.
2. Gå til **Settings → Pages**.
3. Under **Build and deployment** velger du **Deploy from a branch**, branch `main` og mappen `/ (root)`.
4. Siden blir tilgjengelig på `https://<brukernavn>.github.io/skolehjelp/`.

## Legge til flere øvelser

Lag en ny `.html`-fil som bruker `css/style.css`, og legg til et kort i `index.html` (kopier `a.card`-blokken).
