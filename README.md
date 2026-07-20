# 🚀 Nuxt 3 + Supabase + TailwindCSS — Reservatie App

Welkom bij onze groepsapplicatie!  
Deze webapp is gebouwd door **Magaly**, **Nikita** en **Friedel** en maakt gebruik van moderne webtechnologieën:

- **Nuxt 3** — frontend framework
- **Supabase** — backend, database & authentication
- **Pinia** — state management
- **Tailwind CSS** — utility‑first styling
- **Custom CSS** — kleuren, fonts & theming

Deze README legt uit hoe je het project lokaal opstart, hoe de structuur werkt en welke stappen je moet volgen na een git pull.

---

## 📦 Installatie

### Clone de repository
```bash
git clone <repo-url>
cd <project-folder>
```

### Installeer dependencies
```bash
npm install
```

### Start de development server
```bash
npm run dev
```

De app draait standaard op:
```text
http://localhost:3000
```

---

## 🧱 Projectstructuur

### 📁 Belangrijke mappen

| Map            | Beschrijving                                  |
|----------------|-----------------------------------------------|
| /components    | Herbruikbare Vue‑componenten                  |
| /pages         | Nuxt‑routes                                   |
| /layouts       | Pagina‑layouts                                |
| /assets/css    | Tailwind, kleuren & fonts                     |
| /server        | API‑routes (indien nodig)                     |
| /plugins       | Supabase client, Pinia, enz.                  |

---

## 🎨 Styling

We gebruiken een combinatie van **TailwindCSS** en **custom CSS**.

### Tailwind configuratie

Geactiveerd via:

- `@nuxtjs/tailwindcss`
- `assets/css/tailwind.css`
- `tailwind.config.js`

Tailwind biedt:

- spacing & layout utilities
- gradients
- shadows
- animaties
- responsive design

### Custom CSS

We hebben drie centrale CSS‑bestanden:

#### `assets/css/colors.css`
Bevat kleurvariabelen zoals:
```css
--color-primary;
--color-accent;
--color-bg;
--color-text;
```

#### `assets/css/fonts.css`
Bevat:
- imports van Google Fonts
- variabelen zoals `--font-base` en `--font-title`
- body‑font setup

#### `assets/css/tailwind.css`
Activeert Tailwind:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🗄️ Supabase integratie

De homepage (`pages/index.vue`) bevat een automatische check:

- Is de Supabase client beschikbaar?
- Werkt de verbinding correct?
- Zijn er auth‑errors?

De status wordt getoond in een info‑blok.

---

## 🔄 Workflow na een git pull

Iedereen in het team moet:

### Nieuwe code ophalen
```bash
git pull
```

### Dependencies installeren
```bash
npm install
```

### Dev server herstarten
```bash
npm run dev
```

### (Optioneel) Build cache wissen bij rare fouten
```bash
rm -rf .nuxt
npm run dev
```

---

## 🔒 Belangrijk: .env wordt niet meegestuurd

Zorg dat je nooit je `.env` pusht.  
De repo bevat een `.gitignore` die `.env` uitsluit.

Als een `.env` toch zichtbaar is in GitHub:
```bash
git rm --cached .env
git commit -m "Remove .env from repo"
git push
```

En vergeet niet je API keys te roteren.

---

## 📜 License

Dit project is privé en bedoeld voor educatieve en interne teamdoeleinden.

## antwoorden op de vragen

1. Analyse van het probleem
   Welke soorten resources?

We ondersteunen types zoals Meeting Rooms (vergaderzalen), Apparatuur (laptops, camera's) en eventueel Bedrijfswagens.

Minimale eigenschappen: id, naam, type (om te filteren), beschrijving (voor details) en een icon (voor visuele herkenning).

Welke gegevens voor een reservatie?

Noodzakelijk zijn: titel (wat gebeurt er?), start_time & end_time (wanneer?), resource_id (waar/wat?), en user_id (wie?).

Koppeling datamodel (Resource <-> Reservatie)?

Dit gebeurt via een Foreign Key relatie in de database. De tabel reservations heeft een kolom resource_id die verwijst naar de id van de tabel resources. In Supabase kunnen we hierdoor data "joinen" (ophalen als geneste data).

Voorkomen van dubbele reservaties?

Backend: Via database "constraints" of triggers die checken of een tijdslot overlapt.

Frontend: Voor we het formulier versturen, valideren we of de eindtijd na de starttijd ligt. Visueel ziet de gebruiker op de FullCalendar direct of een blokje bezet is.

Inzicht in beschikbaarheid?

De Kalender-view (CalendarCard.vue) geeft het snelste inzicht: lege plekken zijn beschikbaar, gekleurde blokken zijn bezet. Daarnaast toont de Lijst-view chronologisch wat er gepland staat.

2. Pagina’s en navigatie
   Minimale pagina’s?

Twee hoofdpagina's:

/resources: Een overzicht van wat er te reserveren valt.

/reservations: Het dashboard met de kalender, lijst en filters om boekingen te beheren.

Navigatie?

We gebruiken een Navbar.vue component dat op elke pagina zichtbaar is (via layouts/default.vue). Hierin staan NuxtLink elementen die zorgen voor snelle, client-side navigatie zonder de pagina te herladen.

Informatie op resource-overzicht?

De ResourceCard.vue toont de naam, een icoon, het type en een korte beschrijving. Daarnaast tonen we een "teller" (reservation_count) die aangeeft hoe vaak een item al gereserveerd is, om de populariteit in te schatten.

Resource tonen bij reservatie?

In de ReservationCard.vue en in de Kalender-events tonen we de naam van de resource (bijv. "Conference Room A") duidelijk in een afwijkende kleur (bijv. blauw/cyan), zodat de gebruiker direct ziet wáár de reservatie plaatsvindt.

3. Toevoegen en verwijderen van reservaties
   Hoe ziet het formulier eruit?

Het formulier (NewReservations.vue) staat (in onze layout) in een sidebar of modal. Het bevat invoervelden voor Titel, Datum, Starttijd, Eindtijd en een Dropdown voor de Resource.

Verplichte velden?

Alle velden zijn in principe verplicht. Zonder datum/tijd is een reservatie zinloos, en zonder resource weet men niet wat men boekt.

Validatie en feedback?

We gebruiken een computed property (isFormValid) die de "Opslaan" knop disabled (grijs maakt) zolang er velden leeg zijn.

Bij het opslaan checken we logica (bv. eindtijd > starttijd). Als de API (Supabase) faalt, tonen we een alert() met de foutmelding.

Conflict afhandeling?

Als de gebruiker probeert te boeken op een bezet moment, zal Supabase een error teruggeven (als de constraints goed staan) of we vangen dit in de UI af. De kalender toont visueel overlappingen.

Verwijderen?

(Optioneel in de UI) Dit zou kunnen via een "Delete" icoontje op de ReservationCard. Na het klikken wordt een delete request naar Supabase gestuurd, en wordt de lijst automatisch ververst (fetchReservations()).

4. Filters en overzicht
   Filter criteria?

Datum: Om te zien wat er op een specifieke dag gebeurt.

Resource: Om de agenda van één specifieke ruimte/auto te zien.

Logische interface?

We hebben een Filter Balk bovenaan de pagina (reservations.vue). Deze staat los van de lijst en bevat duidelijke labels ("Kies Datum", "Filter op Resource").

Geen resultaten?

We tonen een Empty State component (een rood kader) met de tekst "Geen resultaten gevonden" en een duidelijke knop "Wis Filters" om snel terug te keren naar het volledige overzicht.

5. State en architectuur
   Globale data (Pinia)?

We gebruiken een Pinia store (useDataStore) voor Resources en Reservaties.

Waarom? Omdat deze data op meerdere plekken nodig is (in de Kalender, in de Lijst, in de Dropdown van het formulier). Door het in een store te zetten, hoeven we de data maar één keer op te halen.

Acties (Add/Remove)?

Deze horen thuis in de Store of in de componenten die useSupabase aanroepen. De store houdt de "waarheid" van de data vast en biedt functies als fetchReservations() om alles up-to-date te houden.

Code overzichtelijk houden?

Door het gebruik van kleine componenten (ReservationCard, ResourceCard, CalendarCard). De hoofdpagina (reservations.vue) doet alleen de layout en het ophalen van data, maar de weergave zit in de sub-componenten.

Herbruikbare componenten?

ResourceCard.vue en ReservationCard.vue zijn herbruikbaar. Ze ontvangen hun data via props (zoals title, start_time, resources object), waardoor ze "domme" componenten zijn die alleen data tonen die ze krijgen.

6. Persistentie
   Bewaard blijven?

Ja, reservaties moeten bewaard blijven na een refresh. Anders is het systeem nutteloos voor planning.

Supabase integratie?

We gebruiken de useSupabase composable van Nuxt. De connectiegegevens (URL en Key) staan in het .env bestand (veiligheid).

Data inladen?

We gebruiken de onMounted lifecycle hook. Zodra de pagina laadt in de browser, wordt fetchReservations() aangeroepen om de data uit Supabase te halen.

Interface tijdens laden?

We gebruiken een Loading State (v-if="loading"). De gebruiker ziet een tekst "⏳ Reservaties laden..." of een spinner, zodat ze weten dat de app bezig is en niet vastgelopen is.

7. Oplevering en verantwoording
   Repository structuur?

Standaard Nuxt 3 structuur:

/components: Alle UI blokjes (kaarten, kalender).

/pages: De routes (URL's) van de app.

/stores: De Pinia state management.

/assets/css: Tailwind configuratie.#   B o o k O f P a g e s  
 #   M o n k e y v s B i r d  
 