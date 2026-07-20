//import van onze custom css
import '../scss/styles.scss'
//import all of bootstrap zijn js
import * as bootstrap from 'bootstrap'
//import van eigen css imagecontrol
import '../css/style.css'



// tweede main voor verdeling van de scripten

// oefening h1 eenvoudige rekenmachine
document.addEventListener('DOMContentLoaded',()=>{
    const mt_a=document.getElementById('mt_a');
    const mt_b=document.getElementById('mt_b');
    const mt_add = document.getElementById('mt_add');
    const mt_out = document.getElementById('mt_out');


    mt_add.addEventListener('click', ()=>{
        mt_out.textContent = Number(mt_a.value) + Number(mt_b.value);
    })
    mt_sub.addEventListener('click', ()=>{
        mt_out.textContent = Number(mt_a.value) - Number(mt_b.value);
    })
    mt_mul.addEventListener('click', ()=>{
        mt_out.textContent = Number(mt_a.value) * Number(mt_b.value);
    })
    mt_div.addEventListener('click', ()=>{
        mt_out.textContent = Number(mt_a.value) / Number(mt_b.value);
    })
})

// eerste oplossing is kleiner te typen maar kan je maar eenmalig gebruiken

// volgende oplossing is een functie en kan mee gebruikt worden op meer plaatsen in de code


function add(getal1,getal2){
    return getal1+getal2;
}
document.getElementById("mt_add")
    ?.addEventListener("click", () => {
        mt_out.textContent = add(Number(mt_a.value), Number(mt_b.value));
    });













// oefening h1b
(()=>{
    document.addEventListener('DOMContentLoaded', () => {
        const inpCm = document.getElementById('uc_cm');
        const btnToM = document.getElementById('uc_to_m');
        const btnToIn = document.getElementById('uc_to_in');
        const badgeM = document.getElementById('uc_m');
        const badgeIn = document.getElementById('uc_in');

        function invalid() {
            badgeM.textContent = 'ongeldig';
            badgeIn.textContent = 'ongeldig';
        }

        btnToM.addEventListener('click', () => {
            const cmVal = inpCm.value.trim();
            if (cmVal === '') {
                invalid();
                return;
            }

            const cm = Number(cmVal);
            if (cm < 0) {
                invalid();
                return;
            }

            const meter = Number((cm / 100).toFixed(2));
            badgeM.textContent = meter;
        });

        btnToIn.addEventListener('click', () => {
            const cmVal = inpCm.value.trim();
            if (cmVal === '') {
                invalid();
                return;
            }

            const cm = Number(cmVal);
            if (cm < 0) {
                invalid();
                return;
            }

            const inch = Number((cm / 2.54).toFixed(2));
            badgeIn.textContent = inch;
        });
    });
})();





// oefening h2 scope lab
document.addEventListener('DOMContentLoaded', () => {
    // UI refs
    const btnGlobal = document.getElementById('sc_global');
    const btnLocal  = document.getElementById('sc_local');
    const statusBad = document.getElementById('sc_status');
    const listBox   = document.getElementById('sc_vars');

    // ---------- PURE FUNCTIES (LOGICA) ----------
    // Leveren enkel data (strings) terug, geen DOM manipulatie

    // Simuleer wat zichtbaar is na een blok binnen dezelfde functie
    function globalData() {
        // In een echte demo zou je var/let/const in blokken zetten.
        // Voor het Functions-hoofdstuk volstaat de correcte uitkomst-lijst.
        return [
            'var in functie: zichtbaar',
            'let in functie: zichtbaar',
            'const in functie: zichtbaar',
            'var in blok: zichtbaar',
            'let in blok: niet zichtbaar',
            'const in blok: niet zichtbaar'
        ];
    }

    // Toon dat let/const block-scoped zijn en buiten het blok niet beschikbaar
    function localData() {
        return [
            'var in blok: zichtbaar binnen functie',
            'let in blok: niet zichtbaar buiten blok',
            'const in blok: niet zichtbaar buiten blok'
        ];
    }

    // Hulpfunctie: maak <li> lijst in één HTML-string
    function makeListHTML(items) {
        var html = '';
        for (var i = 0; i < items.length; i++) {
            html += '<li class="list-group-item">' + items[i] + '</li>';
        }
        return html;
    }

    // ---------- IMPURE FUNCTIES (UI) ----------

    function runGlobal() {
        // status badge
        statusBad.className = 'badge text-bg-primary';
        statusBad.textContent = 'global uitgevoerd';

        // lijst vullen
        var items = globalData();
        listBox.innerHTML = makeListHTML(items);
    }

    function runLocal() {
        // status badge
        statusBad.className = 'badge text-bg-info';
        statusBad.textContent = 'local uitgevoerd';

        // lijst vullen
        var items = localData();
        listBox.innerHTML = makeListHTML(items);
    }

    // Events koppelen
    btnGlobal.addEventListener('click', runGlobal);
    btnLocal.addEventListener('click', runLocal);
});

/*
* Wat zie je bij testen

Klik Run global() → badge wordt blauw met “global uitgevoerd” en de lijst bevat 6 regels waarin var ook buiten
* het blok zichtbaar is, let/const niet.

Klik Run local() → badge wordt lichtblauw met “local uitgevoerd” en de lijst verandert naar 3 regels die
* het block-scope verschil benadrukken.

Zo verschillen de lijsten bij beide runs en houd je je netjes aan de Functions-aanpak: pure berekening, impure UI.
* */





// oefening h2b variable shadowing
document.addEventListener("DOMContentLoaded", () => {

    const inpBase = document.getElementById("sh_base");
    const btnRun  = document.getElementById("sh_run");
    const outList = document.getElementById("sh_out");

    // Pure functie: geeft array van strings terug
    function shadowInfo(base) {
        let x = base;               // buiten block

        {
            let x = base + 5;         // shadow: nieuwe x
            return [
                `buiten block: x = ${base}`,
                `binnen block: x = ${x}`,
                `na block: x = ${base}`
            ];
        }
    }

    // Impure: UI
    function handleShadow() {
        const raw = inpBase.value.trim();
        const base = raw === '' ? 10 : Number(raw);

        const items = shadowInfo(base);

        let html = "";
        for (let i = 0; i < items.length; i++) {
            html += `<li class="list-group-item">${items[i]}</li>`;
        }
        outList.innerHTML = html; // overschrijven
    }

    btnRun.addEventListener("click", handleShadow);
});





// Hoofdstuk 3: Function Scoping
// Oefening H3-A — Formatter Station
// ------------------------------
(()=> {
    document.addEventListener('DOMContentLoaded', () => {

        const inp = document.getElementById('fs_text');
        const btnUp = document.getElementById('fs_upper');
        const btnLo = document.getElementById('fs_lower');
        const btnCa = document.getElementById('fs_cap');
        const list = document.getElementById('fs_results');

        // Pure: Capitalize
        function capitalize(str) {
            const t = str.trim();
            if (t === '') return '';
            const first = t.charAt(0).toUpperCase();    // eerste letter groot
            const rest = t.slice(1).toLowerCase();     // rest kleine letters
            return first + rest;
        }

        // UI helper: voeg item toe (max 5)
        function prependItem(text) {
            if (text.trim() === '') return;

            list.innerHTML =
                `<li class="list-group-item">${text}</li>` + list.innerHTML;

            while (list.children.length > 5) {
                list.removeChild(list.lastElementChild);
            }
        }

        // Click handlers
        btnUp.addEventListener('click', () => {
            const v = inp.value;
            if (v.trim() === '') return;
            prependItem(v.toUpperCase());
        });

        btnLo.addEventListener('click', () => {
            const v = inp.value;
            if (v.trim() === '') return;
            prependItem(v.toLowerCase());
        });

        btnCa.addEventListener('click', () => {
            const v = inp.value;
            const c = capitalize(v);
            if (c === '') return;
            prependItem(c);
        });

    });
})();



// oefening h3b
// Hoofdstuk 3: Function Scoping
// Oefening H3-B — Slug Maker
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {

    const inp  = document.getElementById('sm_title');
    const slug = document.getElementById('sm_slug');

    // Pure functie: maakt slug van titel
    function makeSlug(title) {
        // lowercase
        let t = title.toLowerCase();

        // trim spaties
        t = t.trim();

        // vervang spaties en underscores door koppeltekens
        t = t.replace(/[\s_]+/g, '-');

        // verwijder alles wat geen letter, cijfer of - is
        t = t.replace(/[^a-z0-9-]/g, '');

        // meerdere - na elkaar -> één -
        t = t.replace(/-+/g, '-');

        // trim koppeltekens aan begin/einde
        t = t.replace(/^-+|-+$/g, '');

        return t;
    }

    // UI handler
    function handleInput() {
        const text = inp.value;
        const s = makeSlug(text);
        slug.textContent = s || '-';
    }

    // Live update
    inp.addEventListener('input', handleInput);
});




// oefening h4
// Hoofdstuk 4: Named Functions
// Oefening H4-A — Template Previewer
// ----------------------------------
document.addEventListener('DOMContentLoaded', initTemplatePreviewer);

// ========== IMPURE: entrypoint ==========
function initTemplatePreviewer() {
    // UI refs
    const inpFirst  = document.getElementById('tp_first');
    const inpLast   = document.getElementById('tp_last');
    const inpCity   = document.getElementById('tp_city');
    const pillP1    = document.getElementById('tp_p1');
    const pillP2    = document.getElementById('tp_p2');
    const previewEl = document.getElementById('tp_preview');

    // State
    let currentTpl = 'p1'; // 'p1' | 'p2'

    // Koppelingen
    inpFirst.addEventListener('input', handleInputChange);
    inpLast .addEventListener('input', handleInputChange);
    inpCity .addEventListener('input', handleInputChange);

    pillP1.addEventListener('click', () => handlePillClick('p1'));
    pillP2.addEventListener('click', () => handlePillClick('p2'));

    // Eerste render
    render();

    // ======== IMPURE HANDLERS ========
    function handleInputChange() {
        render();
    }

    function handlePillClick(which) {
        currentTpl = which;
        setActivePill(pillP1, pillP2, which);
        render();
    }

    // ======== IMPURE RENDER ========
    function render() {
        const values = readValues(inpFirst, inpLast, inpCity);
        const msg = makeMessage(currentTpl, values);

        // placeholder weg, platte tekst erin
        previewEl.className = ''; // verwijder placeholder-klassen
        previewEl.textContent = msg;
    }
}

// ========== PURE: logica ==========
function readValues(inpFirst, inpLast, inpCity) {
    // leest DOM (impure in strikte zin), maar behoudt hier voor compactheid van handlers
    return {
        first: inpFirst.value.trim(),
        last:  inpLast.value.trim(),
        city:  inpCity.value.trim()
    };
}

function isComplete(values) {
    return values.first !== '' && values.last !== '' && values.city !== '';
}

function tmplP1(values) {
    // P1: korte zin
    return `Hallo ${values.first} ${values.last} uit ${values.city}!`;
}

function tmplP2(values) {
    // P2: langere zin
    return `${values.first} ${values.last} woont in ${values.city}. Fijn dat je er bent, ${values.first}!`;
}

function makeMessage(templateKey, values) {
    if (!isComplete(values)) return 'Vul alle velden in';

    if (templateKey === 'p1') return tmplP1(values);
    if (templateKey === 'p2') return tmplP2(values);

    return 'Onbekende template';
}

// ========== IMPURE: UI helpers ==========
function setActivePill(p1Btn, p2Btn, which) {
    // active class beheren zoals Bootstrap pills
    if (which === 'p1') {
        p1Btn.className = 'nav-link active';
        p2Btn.className = 'nav-link';
    } else {
        p1Btn.className = 'nav-link';
        p2Btn.className = 'nav-link active';
    }
}
/*
* Een pure functie en een impure functie verschillen doordat ze een ander doel hebben in je code.

---

Pure functie

Doet een berekening, raakt niets anders aan.

| Kenmerk             | Betekenis                                                                        |
| ------------------- | -------------------------------------------------------------------------------- |
| Heeft alleen input  | Gebruikt enkel wat je meegeeft (parameters)                                      |
| Geeft alleen output | Return van een resultaat                                                         |
| Geen bijwerkingen   | Verandert niets in de UI, console, netwerk, database, variabelen buiten zichzelf |
| Altijd voorspelbaar | Met dezelfde input komt altijd dezelfde output                                   |

**Voorbeeld**

function dubbel(x) {
  return x * 2;
}

Zelfde input → zelfde output, altijd.

---

Impure functie

Doet iets met de buitenwereld (bijwerking).

| Kenmerk                             | Betekenis                         |
| ----------------------------------- | --------------------------------- |
| Past dingen aan buiten zichzelf aan | DOM, console, netwerk, opslag…    |
| Geen vaste output nodig             | Hoeft geen return te hebben       |
| Kan onverwachte gevolgen hebben     | Verandering hangt af van omgeving |

Voorbeeld

function toon(tekst) {
  document.getElementById("box").textContent = tekst;
}

Dit verandert de UI, dus dit is impure.

Eenvoudige manier om te onthouden

| Pure                | Impure                     |
| ------------------- | -------------------------- |
| Denkt               | Doet                       |
| Rekent              | Verandert dingen           |
| Returnt             | Update UI / console / data |
| Altijd voorspelbaar | Afhankelijk van omgeving   |

Waarom gebruiken we beide?

* Pure functies houden logica helder en testbaar.
* Impure functies verbinden de logica met de echte wereld (UI).

In deze cursus:

> Pure = berekenen
> Impure = DOM & events

* */




// oefening h4b
// Hoofdstuk 4: Named Functions
// Oefening H4-B — Initialen Generator
// ----------------------------------
document.addEventListener("DOMContentLoaded", initInitialsGenerator);

// startpunt
function initInitialsGenerator() {
    const inp  = document.getElementById("ig_full");
    const btn  = document.getElementById("ig_make");
    const out  = document.getElementById("ig_out");

    btn.addEventListener("click", () => toonInitialen(inp, out));
}

// ---------- PURE FUNCTION ----------
function maakInitialen(naam) {
    // trimmen & splitsen op spaties
    // | Code                     | Betekenis in gewone taal                         |
    // | ------------------------ | ------------------------------------------------ |
    // | `naam.trim()`            | knipt spaties weg aan het begin en einde         |
    // | `.split(" ")`            | knipt de zin in stukjes waar spaties zitten      |
    // | `.filter(d => d !== "")` | gooit lege stukjes weg (bv. bij dubbele spaties) |

    // Voorbeeld Invoer:
    //     " Tom Van Houtte "
    // trim() → "Tom Van Houtte"
    // split(" ") → ["Tom", "", "Van", "", "Houtte"]
    // filter(...) → ["Tom", "Van", "Houtte"]

    const delen = naam.trim().split(" ").filter(d => d !== "");

    // minstens 2 woorden
    if (delen.length < 2) return "onvolledige naam";

    // eerste letter elk deel → uppercase → met punt
    // | Stap | `i` | `delen[i]` | `delen[i].charAt(0)` | `toUpperCase()` | Toevoegen (`res +=`)         |
    // | ---- | --- | ---------- | -------------------- | --------------- | ---------------------------- |
    // | 1    | 0   | `"Tom"`    | `"T"`                | `"T"`           | `"T."`                       |
    // | 2    | 1   | `"Van"`    | `"V"`                | `"V"`           | `"T." + "V."` → `"T.V."`     |
    // | 3    | 2   | `"Houtte"` | `"H"`                | `"H"`           | `"T.V." + "H."` → `"T.V.H."` |
    let res = "";
    for (let i = 0; i < delen.length; i++) {
        const letter = delen[i].charAt(0).toUpperCase();
        res += letter + ".";
    }
    return res;
}

// ---------- IMPURE FUNCTION ----------
function toonInitialen(inputEl, outputEl) {
    const naam = inputEl.value;

    if (!naam.trim()) {
        outputEl.textContent = "onvolledige naam";
        return;
    }

    const result = maakInitialen(naam);
    outputEl.textContent = result;
}




// oefening h5
// Hoofdstuk 5: Template Literals
// Oefening H5-A — Counter Console
// ----------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // UI refs
    const btnInc1 = document.getElementById('cc_inc1');
    const btnInc5 = document.getElementById('cc_inc5');
    const btnDec1 = document.getElementById('cc_dec1');
    const btnReset = document.getElementById('cc_reset');

    const badgeVal = document.getElementById('cc_val');
    const bar = document.getElementById('cc_bar');

    // module-scope state
    let count = 0; // 0–100

    // render met template literals
    function render() {
        badgeVal.textContent = `${count}`;
        bar.style.width = `${count}%`;
        bar.setAttribute('aria-valuenow', `${count}`);
        bar.textContent = `${count}%`;
    }

    // controls (arrow functions) + grenzen 0–100
    btnInc1.addEventListener('click', () => { count = Math.min(100, count + 1); render(); });
    btnInc5.addEventListener('click', () => { count = Math.min(100, count + 5); render(); });
    btnDec1.addEventListener('click', () => { count = Math.max(0, count - 1); render(); });
    btnReset.addEventListener('click', () => { count = 0; render(); });

    // init
    render();
});




// oefening h5b
// Hoofdstuk 5: Template Literals
// Oefening H5-B — Inline Calculator
// ----------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const inp  = document.getElementById("ic_n");
    const plus = document.getElementById("ic_plus");
    const minus = document.getElementById("ic_minus");

    // helper om te clampen tussen −999 en 999
    // | Deel                  | Betekenis                                                                                          |
    // | --------------------- | -------------------------------------------------------------------------------------------------- |
    // | `Math.min(999, v)`    | pakt de kleinste van 999 en `v` → dus `v` kan **niet hoger worden dan 999**                        |
    // | `Math.max(-999, ...)` | pakt de grootste van -999 en het vorige resultaat → dus `v` kan niet lager worden dan -999         |

    const clamp = v => Math.max(-999, Math.min(999, v));

    plus.addEventListener("click", () => {
        const v = Number(inp.value);
        inp.value = clamp(v + 1);
    });

    minus.addEventListener("click", () => {
        const v = Number(inp.value);
        inp.value = clamp(v - 1);
    });
});




// oefening h6
// ----------------------------------
// Hoofdstuk 6: Arrow Functions (=>)
// Oefening H6-A — Tags Manager
// ----------------------------------
// | Begrip          | Betekenis                                           |
// | --------------- | --------------------------------------------------- |
// | `array`         | lijst met waarden                                   |
// | `trim()`        | spaties rond tekst verwijderen                      |
// | `toLowerCase()` | alles kleine letters (handig voor vergelijken)      |
// | `some()`        | checkt of een lijst een match bevat                 |
// | `map()`         | maakt een nieuwe lijst door elke waarde te bewerken |
// | `join("")`      | plakt lijst weer samen in één string                |
// | `sort()`        | alfabetisch sorteren                                |
// | `reverse()`     | lijst omkeren                                       |
// | `Set()`         | verzameling met alleen unieke waarden               |


document.addEventListener('DOMContentLoaded', () => {

    // We halen alle HTML-elementen op zodat we er later mee kunnen werken.
    // Dit doet niets "slims": we steken alleen verwijzingen naar elementen in variabelen.
    const inp     = document.getElementById('tm_input');
    const btnAdd  = document.getElementById('tm_add');
    const btnSort = document.getElementById('tm_sort');
    const btnRev  = document.getElementById('tm_rev');
    const btnClr  = document.getElementById('tm_clear');

    const list    = document.getElementById('tm_list');
    const elCount = document.getElementById('tm_count');
    const elUniq  = document.getElementById('tm_unique');

    // Hier bewaren we al onze tags in een array (lijst).
    // Een array is een verzameling waarden in volgorde, bv: ["JS", "HTML", "CSS"]
    let tags = [];

    // -------------------------------------------------------
    // Kleine hulpfuncties (arrow functions)
    // -------------------------------------------------------

    // trim() verwijdert spaties voor en na een tekst:
    // "  hallo  " → "hallo"
    const clean = v => v.trim();

    // toLowerCase() maakt tekst altijd kleine letters:
    // "JS" → "js"
    // Dit gebruiken we om "JS" en "js" als dezelfde tag te zien (case-insensitive)
    const lower = v => v.toLowerCase();

    // some() kijkt of er minstens één element in de array voldoet aan een test
    // bv: ["hi","yo"].some(w => w==="yo") → true
    //
    // Hier gebruiken we het om te checken of een tag al bestaat.
    const isDuplicate = (arr, value) => {
        const val = lower(value);
        return arr.some(t => lower(t) === val);
    };

    // -------------------------------------------------------
    // RENDER: bouw de volledige UI opnieuw op
    // -------------------------------------------------------
    const render = () => {
        // map() gaat door elke waarde van de array en geeft een nieuwe array terug
        // Hier bouwen we HTML-regels voor elke tag
        //
        // daarna gebruiken we join("") om de array van HTML-stukjes samen te voegen tot 1 string
        list.innerHTML = tags
            .map((t, i) =>
                `<li class="list-group-item d-flex justify-content-between align-items-center">
           <span>${t}</span>
           <span class="badge text-bg-secondary rounded-pill">${i}</span>
         </li>`
            )
            .join(""); // join("") plakt alles aan elkaar zonder komma's

        // lengte van array = totaal aantal tags
        elCount.textContent = `${tags.length}`;

        // new Set() maakt een unieke verzameling
        // ["JS","js","JS"] → Set(["js"])
        // daarna meten we hoe groot die Set is (unieke woorden)
        const uniqCount = new Set(tags.map(lower)).size;
        elUniq.textContent = `${uniqCount}`;
    };

    // -------------------------------------------------------
    // Toevoegen van nieuwe tag
    // -------------------------------------------------------
    btnAdd.addEventListener('click', () => {
        const val = clean(inp.value);

        // niets ingevuld → stop
        if (!val) return;

        // als de tag al bestaat → stop
        if (isDuplicate(tags, val)) return;

        // voegen tag toe aan array
        tags.push(val);

        // inputveld leegmaken
        inp.value = "";

        // UI vernieuwen
        render();
    });

    // -------------------------------------------------------
    // Sorteren van A → Z
    // -------------------------------------------------------
    // sort() sorteert alfabetisch
    // localeCompare() vergelijkt twee woorden correct (ook met accenten)
    btnSort.addEventListener('click', () => {
        tags.sort((a, b) => lower(a).localeCompare(lower(b)));
        render();
    });

    // -------------------------------------------------------
    // Omgekeerde volgorde
    // -------------------------------------------------------
    // reverse() keert de hele array om
    btnRev.addEventListener('click', () => {
        tags.reverse();
        render();
    });

    // -------------------------------------------------------
    // Alles leegmaken
    // -------------------------------------------------------
    btnClr.addEventListener('click', () => {
        tags = []; // Array leegmaken
        render();
    });

    // Eerste keer tekenen bij pagina-start
    //render();
    //document.write("tester");
});






// oefening h6b
// Hoofdstuk 6: Arrow Functions (=>)
// Oefening H6-B — Shop Categories
// ----------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const crumb   = document.getElementById('sc_crumb');
    const filters = document.getElementById('sc_filters');
    const itemsEl = document.getElementById('sc_items');

    // lokale dataset
    const products = [
        { name: 'MacBook Air 13',      cat: 'Laptops' },
        { name: 'ThinkPad X1 Carbon',  cat: 'Laptops' },
        { name: 'Dell Ultrasharp 27"', cat: 'Monitors' },
        { name: 'LG 34" UltraWide',    cat: 'Monitors' },
        { name: 'USB-C Dock',          cat: 'Accessoires' },
        { name: 'Wireless Mouse',      cat: 'Accessoires' },
    ];

    let current = 'Alle';

    // helpers

    // Deze functie zorgt ervoor dat slechts één filter-item actief is.
    // Eerst verwijdert ze de active-klasse bij alle items,
    // daarna voegt ze active toe aan het item waarop jij geklikt hebt.
    //
    // Dus: eerst alles netjes schoonmaken, dan het juiste element aanzetten.

    // const setActive = li => { ... }
    // We maken een arrow function met de naam setActive
    // Ze krijgt één parameter: li
    // li staat voor het list-item waarop geklikt is
    // Denk: "Deze functie activeert het LI-element dat ik doorgeef."

    // [...filters.children]
    // filters.children geeft een HTMLCollection terug
    // (een soort lijst met alle <li> elementjes binnen #sc_filters)
    // [ ... ] is de spread operator
    // Hiermee maken we een echte array van die lijst
    // Waarom?
    // Omdat een HTMLCollection niet alle array-methodes heeft, maar een array wel.

// .forEach(el => el.classList.remove('active'))
//     We lopen over elk filter-item
//     el = één <li> per ronde
//     Voor elke el roepen we classList.remove('active') op
//     Dus hier zeggen we:
//     "Haal de class active weg bij iedereen."

    // li.classList.add('active')
    // Daarna voegen we active toe aan het aangewezen element (het geklikte li)
    // Hierdoor wordt dat item visueel “actief” (Bootstrap styling)
    const setActive = li => {
        [...filters.children].forEach(el => el.classList.remove('active'));
        li.classList.add('active');
    };

    // Als de gekozen categorie Alle is, toon dan alle producten.
    // Anders, toon alleen de producten waarvan de categorie hetzelfde is als wat de gebruiker koos.
//     current === 'Alle':
//        Kijk of de huidige gekozen filter "Alle" is.
//     ? products:
//        Ja → dan zetten we list gelijk aan de volledige lijst producten.
//     : products.filter(...)
//        Nee → dan filteren we de producten zodat alleen de juiste categorie overblijft.
//        p is een product uit de lijst products. Tijdens de filter doorlopen we dus achtereenvolgens alle producten
//        uit de array

//     list.map(...) maakt een lijst van HTML-stukjes, zoals:
//     [
//         "<li>MacBook Air</li>",
//         "<li>Dell Monitor</li>",
//         "<li>USB-C Hub</li>"
//     ]
//         .join('') plakt die stukjes aan elkaar zonder tussenstuk
//     Resultaat na join:
//         <li>MacBook Air</li><li>Dell Monitor</li><li>USB-C Hub</li>
//     Dit is één string, klaar om in innerHTML te zetten.
//     Waarom is join('') nodig?
//         Omdat .map() een array geeft.
//         innerHTML verwacht een string, niet een array.
//     join('') zorgt ervoor dat:
//         ["<li>1</li>","<li>2</li>"]
//     wordt:
//         "<li>1</li><li>2</li>"
    const render = () => {
        const list = current === 'Alle'
            ? products
            : products.filter(p => p.cat === current);

        itemsEl.innerHTML = list.map(p =>
            `<li class="list-group-item">${p.name}</li>`
        ).join('');
        crumb.textContent = current;
    };

    // event delegation voor alle filter-items
    filters.addEventListener('click', e => {
        const li = e.target.closest('.list-group-item');
        if (!li) return;

        current = li.textContent.trim();
        setActive(li);
        render();
    });

    // init
    // de functie wordt meteen geladen tijdens de start van de pagina om alle gegevens te laden in de pagina.
    render();
});



// oefening H7 Node inspector
// Hoofdstuk 7: ES6 Arrays
// Oefening H7-A — Node Inspector
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Elementen ophalen
    const box           = document.getElementById('ni_container');
    const btnChildNodes = document.getElementById('ni_count_childNodes');
    const btnChildren   = document.getElementById('ni_count_children');
    const outNodes      = document.getElementById('ni_out_nodes');
    const outChildren   = document.getElementById('ni_out_children');

    // Klik: tel ALLE directe kind-nodes (incl. tekst/whitespace)
    btnChildNodes.addEventListener('click', () => {
        // childNodes is een lijst van nodes (element + tekst + comments)
        const totaal = box.childNodes.length;
        console.log(box.childNodes);// telt ook spaties/line breaks
        outNodes.textContent = totaal;          // enkel getal tonen
    });

    // Klik: tel ENKEL element-kinderen (<div>, <ul>, <li>, ...)
    btnChildren.addEventListener('click', () => {
        // children is een HTMLCollection met alleen element nodes
        const totaal = box.children.length;
        console.log(box.children);
        outChildren.textContent = totaal;       // enkel getal tonen
    });
});




// oefening h7b
// Hoofdstuk 7: ES6 Arrays
// Oefening H7-B — DOM Tree Flattener
// ------------------------------
document.addEventListener('DOMContentLoaded', renderTree);

// Pure: maak <li>-lijst uit array van namen
function maakLijstHTML(items) {
    return items.map(n => `<li class="list-group-item">${n}</li>`).join('');
}

// Pure: depth-first element-namen verzamelen (geen textnodes)
function flattenTree(rootEl) {
    const namen = [];

    // recursieve walk
    function walk(el) {
        namen.push(el.nodeName);            // bv. DIV, UL, LI
        const kids = el.children;           // enkel elementnodes
        for (let i = 0; i < kids.length; i++) {
            walk(kids[i]);                    // dieper gaan (depth-first)
        }
    }

    walk(rootEl);
    return namen;
}

// Impure: lezen uit DOM en resultaat tonen
function renderTree() {
    const root = document.getElementById('tf_root');
    const out  = document.getElementById('tf_out');

    const namen = flattenTree(root);
    out.innerHTML = maakLijstHTML(namen); // overschrijft elke run
}










// oefening h8
// Hoofdstuk 8: DOM Nodes & Root Nodes
// Oefening H8-A — Document Roots Dashboard
// ----------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('rn_refresh');

    // Hulpfunctie: schrijf waardes in 3 badges van één rij
    function vulRij(idName, idChildren, idHas, node) {
        // nodeName: bv. "HTML", "HEAD", "BODY"
        document.getElementById(idName).textContent = node.nodeName;

        // children.length: aantal element-kinderen
        document.getElementById(idChildren).textContent = node.children.length;

        // hasChildNodes(): true/false als string
        document.getElementById(idHas).textContent = node.hasChildNodes() ? 'true' : 'false';
    }

    // Ververs alle root-infos
    function verversRoots() {
        // Root nodes
        const htmlNode = document.documentElement; // <html>
        const headNode = document.head;            // <head>
        const bodyNode = document.body;            // <body>

        // HTML-rij
        vulRij('rn_html_name', 'rn_html_children', 'rn_html_has', htmlNode);

        // HEAD-rij
        vulRij('rn_head_name', 'rn_head_children', 'rn_head_has', headNode);

        // BODY-rij
        vulRij('rn_body_name', 'rn_body_children', 'rn_body_has', bodyNode);
    }

    // Klik op "Verversen"
    btn.addEventListener('click', verversRoots);

    // Initieel één keer meten bij laden
    verversRoots();
});