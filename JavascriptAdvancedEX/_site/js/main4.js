//import van onze custom css
import '../scss/styles.scss'
//import all of bootstrap zijn js
import * as bootstrap from 'bootstrap'
//import van eigen css imagecontrol
import '../css/style.css'

//eigen js
// vierde main voor verdeling van de scripten





// -----------------------------------------
// Aantal Pokémon dat we willen tonen
const POKEMON_COUNT = 1328;
const container = document.getElementById("pokemon-container");

// Functie om data op te halen
async function fetchPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await response.json();
}

// Functie om een card te maken
function createPokemonCard(pokemon) {
    const col = document.createElement("div");
    const index = `#${String(pokemon.id).padStart(3, "0")}`;
    col.className = "col-sm-6 col-md-4 col-lg-3";

    col.innerHTML = `

    <div class="card shadow-sm h-100">
        <div class="card-header bg-primary text-white text-center" xmlns="http://www.w3.org/1999/html">
        <h5 class="card-title text-capitalize">${pokemon.name}</h5>
    </div>
      <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
      <div class="card-body">
         <span class="text-center offset-5"><strong><em>${index}</em></strong></span>

        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                        <p class="card-text">
          <strong>Type:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}<br>
          <strong>hoogte:</strong> ${parseFloat(pokemon.height/10)} M<br>
          <strong>Gewicht:</strong> ${pokemon.weight}
          
        </p>
</div>
</div>
</div>


      </div>
    </div>
  `;
    return col;
}

// Init functie
async function loadPokemon() {
    for (let i = 1; i <= POKEMON_COUNT; i++) {
        const pokemon = await fetchPokemon(i);
        const card = createPokemonCard(pokemon);
        container.appendChild(card);
    }
}

// Start
loadPokemon();













// Star Wars
// app-starwars.js
document.getElementById("btn").addEventListener("click", () => {
    const container = document.getElementById("characters");
    container.innerHTML = "<em>Belofte gestart... data wordt opgehaald...</em>";

    // Promise die data van SWAPI ophaalt
    const fetchCharacters = new Promise((resolve, reject) => {
        fetch("https://swapi.dev/api/people/")
            .then(res => res.json())
            .then(data => resolve(data.results))
            .catch(err => reject("Fout bij ophalen: " + err));
    });

    fetchCharacters
        .then(characters => {
            container.innerHTML = "";
            characters.forEach((char, index) => {
                const card = document.createElement("div");
                card.className = "col-md-4";

                // Voor demo: gebruik een placeholder afbeelding (via starwars-visualguide)
                const imgUrl = `https://starwars-visualguide.com/assets/img/characters/${index+1}.jpg`;

                card.innerHTML = `
          <div class="card bg-dark text-light h-100">
            <img src="${imgUrl}" class="card-img-top" alt="${char.name}">
            <div class="card-body">
              <h5 class="card-title">${char.name}</h5>
              <p class="card-text">
                <strong>Hoogte:</strong> ${char.height} cm<br>
                <strong>Gewicht:</strong> ${char.mass} kg<br>
                <strong>Haarkleur:</strong> ${char.hair_color}<br>
                <strong>Geboortejaar:</strong> ${char.birth_year}
              </p>
            </div>
          </div>
        `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            container.innerHTML = `<span class="text-danger">${error}</span>`;
        })
        .finally(() => {
            container.innerHTML += "<p class='mt-3'><small>(Belofte afgehandeld)</small></p>";
        });
});






// Promise
// Een Promise maken
const mijnBelofte = new Promise((resolve, reject) => {
    let succes = true;

    if (succes) {
        resolve("De operatie is geslaagd!");
    } else {
        reject("Er ging iets mis...");
    }
});

// Promise gebruiken
mijnBelofte
    .then(resultaat => console.log(resultaat))   // bij succes
    .catch(fout => console.error(fout))          // bij mislukking
    .finally(() => console.log("Klaar!"));
















// M1 — Som van twee getallen
function sum(a, b) {
    return a + b; // pure functie: berekent alleen en wijzigt geen UI
}

function handleM1() {
    const aRaw = document.getElementById("m1_a").value.trim();
    const bRaw = document.getElementById("m1_b").value.trim();
    const out   = document.getElementById("m1_out");

    const a = parseFloat(aRaw);
    const b = parseFloat(bRaw);

    if (aRaw === "" || bRaw === "" || Number.isNaN(a) || Number.isNaN(b)) {
        out.className = "alert alert-warning mb-0";
        out.textContent = "Vul twee geldige getallen in";
        return;
    }

    const result = sum(a, b);
    out.className = "alert alert-success mb-0";
    out.textContent = `${a} + ${b} = ${result}`;
}

// Event-koppeling
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("m1_btn")?.addEventListener("click", handleM1);
});



// oefening M2 Celcius naar Kelvin
// M2 — Celsius → Kelvin
function cToK(c) {
    return c + 273.15; // formule: K = C + 273.15
}

function handleM2() {
    const raw = document.getElementById("m2_c").value.trim();
    const out = document.getElementById("m2_out");
    const c = parseFloat(raw);

    if (raw === "" || Number.isNaN(c)) {
        out.className = "alert alert-warning mb-0";
        out.textContent = "Vul een geldig getal in";
        return;
    }

    const k = cToK(c);
    out.className = "alert alert-success mb-0";
    out.textContent = `${c}°C = ${k} K`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("m2_btn")?.addEventListener("click", handleM2);
});


(()=>{
// oefening M3
// M3 — BMI-berekening
function calcBmi(kg, cm) {
    const m = cm / 100;          // omzetting cm → m
    return kg / (m * m);         // formule: BMI = kg / (m^2)
}

function handleM3() {
    const wRaw = document.getElementById("bmi_w").value.trim();
    const hRaw = document.getElementById("bmi_h").value.trim();
    const out  = document.getElementById("bmi_out");

    const w = parseFloat(wRaw);
    const h = parseFloat(hRaw);

    // Validatie: beide velden moeten getallen bevatten en lengte > 0
    if (wRaw === "" || hRaw === "" || Number.isNaN(w) || Number.isNaN(h) || h <= 0) {
        out.className = "alert alert-warning mb-0";
        out.textContent = "Vul geldige waarden in";
        return;
    }

    const bmi = calcBmi(w, h);
    out.className = "alert alert-success mb-0";
    out.textContent = `BMI = ${bmi.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("bmi_btn")?.addEventListener("click", handleM3);
});



// oefening M4
// M4 — BMI met categorie en kleur

// 1) BMI berekenen (zoals bij M3)
function calcBmi(kg, cm) {
    const m = cm / 100;
    return kg / (m * m); // BMI = gewicht / (lengte in meter)^2
}

// 2) Categorie bepalen + bijhorende Bootstrap alert-klasse kiezen
function categorizeBmi(bmi) {
    // Standaard WHO-drempels
    if (bmi < 18.5) {
        return { label: "Ondergewicht", klass: "alert alert-info mb-0" };       // blauwachtig
    }
    if (bmi < 25) {
        return { label: "Gezond gewicht", klass: "alert alert-success mb-0" };  // groen
    }
    if (bmi < 30) {
        return { label: "Overgewicht", klass: "alert alert-warning mb-0" };     // geel
    }
    return { label: "Obesitas", klass: "alert alert-danger mb-0" };           // rood
}

function handleM4() {
    const wRaw = document.getElementById("bmi2_w").value.trim();
    const hRaw = document.getElementById("bmi2_h").value.trim();
    const out  = document.getElementById("bmi2_out");

    const w = parseFloat(wRaw);
    const h = parseFloat(hRaw);

    // Validatie: beide velden vereist, getallen, en lengte > 0
    if (wRaw === "" || hRaw === "" || Number.isNaN(w) || Number.isNaN(h) || h <= 0) {
        out.className = "alert alert-warning mb-0";
        out.textContent = "Vul geldige waarden in";
        return;
    }

    // Berekening + categorie
    const bmi = calcBmi(w, h);
    const { label, klass } = categorizeBmi(bmi);

    // Output met kleur per categorie
    out.className = klass;
    out.textContent = `BMI = ${bmi.toFixed(2)} — Categorie: ${label}`;
}

// Event-koppeling
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("bmi2_btn")?.addEventListener("click", handleM4);
});
})();

// oefening M5
// M5 — Prijs na korting
function calcDiscount(price, pct) {
    // formule: nieuwe prijs = prijs × (1 - pct / 100)
    return price * (1 - pct / 100);
}

function handleDiscount() {
    const pRaw = document.getElementById("price").value.trim();
    const dRaw = document.getElementById("discount").value.trim();
    const out = document.getElementById("discount_out");

    const price = parseFloat(pRaw);
    const discount = parseFloat(dRaw);

    // Validatie: beide velden moeten geldig zijn en percentage tussen 0 en 100
    if (
        pRaw === "" ||
        dRaw === "" ||
        Number.isNaN(price) ||
        Number.isNaN(discount) ||
        discount < 0 ||
        discount > 100
    ) {
        out.className = "alert alert-warning mb-0";
        out.textContent = "Vul een geldige prijs en korting in (0–100%)";
        return;
    }

    // Berekening + afronding op 2 decimalen
    const newPrice = calcDiscount(price, discount);
    out.className = "alert alert-success mb-0";
    out.textContent = `Nieuwe prijs: €${newPrice.toFixed(2)} (Korting: ${discount}%)`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("discount_btn")?.addEventListener("click", handleDiscount);
});








// Javascript oefening M6
function applyBaseDiscount(price, mode, value) {
    if (mode === "pct") {
        // nieuwe prijs = prijs × (1 − value/100)
        return price * (1 - (value / 100));
    }
    // mode === "eur"
    // nieuwe prijs = prijs − value
    return price - value;
}

function applyCoupon(extraPct, currentPrice) {
    // extra korting in procent op de tussenprijs
    // nieuwe prijs = currentPrice × (1 − extraPct/100)
    return currentPrice * (1 - (extraPct / 100));
}

function clampToFloor(price, floor) {
    return price < floor ? floor : price;
}

function euros(n) {
    // eenvoudige formatter voor twee decimalen
    return Number(n).toFixed(2);
}

function handleM6() {
    const out   = document.getElementById("ex_out");
    const pRaw  = document.getElementById("ex_price").value.trim();
    const mVal  = document.getElementById("ex_mode").value;
    const dRaw  = document.getElementById("ex_disc").value.trim();
    const cRaw  = document.getElementById("ex_coupon").value.trim();
    const fRaw  = document.getElementById("ex_floor").value.trim();

    const price = parseFloat(pRaw);
    const disc  = parseFloat(dRaw);
    const floor = parseFloat(fRaw);

    // Validatie basisvelden
    const baseInvalid =
        pRaw === "" || Number.isNaN(price) || price < 0 ||
        dRaw === "" || Number.isNaN(disc)  || disc < 0 ||
        fRaw === "" || Number.isNaN(floor) || floor < 0;

    if (baseInvalid) {
        out.className = "alert alert-warning mb-0";
        out.textContent = "Vul geldige waarden in voor prijs, korting en minimumprijs";
        return;
    }

    // Extra validatie per kortingswijze
    if (mVal === "pct" && (disc > 100)) {
        out.className = "alert alert-warning mb-0";
        out.textContent = "Percentage moet tussen 0 en 100 liggen";
        return;
    }
    if (mVal === "eur" && (disc > price)) {
        out.className = "alert alert-warning mb-0";
        out.textContent = "Vast bedrag mag niet groter zijn dan de prijs";
        return;
    }

    // Stap 1: basis-korting
    const afterBase = applyBaseDiscount(price, mVal, disc);
    const baseReduction = price - afterBase;

    // Stap 2: eventuele coupon
    const hasCoupon = cRaw.toUpperCase() === "SAVE10";
    const afterCoupon = hasCoupon ? applyCoupon(10, afterBase) : afterBase;
    const couponReduction = afterBase - afterCoupon;

    // Stap 3: minimumprijs toepassen
    const finalPrice = clampToFloor(afterCoupon, floor);
    const floorApplied = finalPrice !== afterCoupon;

    // Opbouw van een duidelijk overzicht
    const lines = [
        `Oorspronkelijke prijs:  €${euros(price)}`,
        mVal === "pct"
            ? `Korting (${euros(disc)}%):        −€${euros(baseReduction)}`
            : `Korting (bedrag):        −€${euros(baseReduction)}`,
        hasCoupon
            ? `Extra coupon (10%):      −€${euros(couponReduction)}`
            : `Extra coupon:            geen`,
        `Tussenprijs:             €${euros(afterCoupon)}`,
        `Minimumprijs toegepast:  ${floorApplied ? "ja" : "nee"}`,
        `Eindprijs:               €${euros(finalPrice)}`
    ];

    // Kleurkeuze voor output:
    // - succes als geen floor ingreep en prijs daalt
    // - info als geen korting of geen verandering
    // - warning als floor ingreep nodig was
    let klass = "alert alert-success mb-0";
    if (floorApplied) klass = "alert alert-warning mb-0";
    if (finalPrice === price && !floorApplied) klass = "alert alert-info mb-0";

    out.className = klass;
    out.innerHTML = `<pre class="mb-0" style="white-space:pre-wrap">${lines.join("\n")}</pre>`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ex_btn")?.addEventListener("click", handleM6);
});







(()=>{


// oefening M7 Rekenmachine

// Eindoefening — Rekenmachine (Windows-stijl)
// -----------------------------------------

// Interne toestand
    let mem = 0;                 // geheugen
    let cur = "0";               // huidige invoer als string (met komma)
    let prev = null;             // vorig getal (number)
    let op = null;               // huidig bewerkingsteken: "+", "−", "×", "÷"
    let justEvaluated = false;   // laatste actie was "=" (om nieuwe invoer te starten)

// Helpers
    const $ = (id) => document.getElementById(id);
    const display = () => { $("calc_display").textContent = cur; };
    const toNumber = (s) => parseFloat(s.replace(",", "."));             // "12,3" -> 12.3
    const fromNumber = (n) => String(n).replace(".", ",");               // 12.3  -> "12,3"
    const isZero = (s) => s === "0" || s === "-0";

    function setCurFromNumber(n) {
        // Beperk op lengte en verwijder onnodige trailing nullen
        if (!Number.isFinite(n)) {
            cur = "Niet gedefinieerd";
            return;
        }
        let s = fromNumber(n);
        if (s.includes(",")) {
            // trim trailing zeros
            s = s.replace(/,?0+$/, (m) => (m.startsWith(",") ? "" : m));
        }
        cur = s;
    }

    function applyOp(a, b, operator) {
        switch (operator) {
            case "+": return a + b;
            case "−": return a - b;
            case "×": return a * b;
            case "÷": return b === 0 ? NaN : a / b;
            default:  return b;
        }
    }

// Invoer: cijfers
    function pressDigit(d) {
        if (justEvaluated || (op && isZero(cur))) {
            cur = d;
            justEvaluated = false;
            display();
            return;
        }
        if (cur === "0") cur = d;
        else if (cur === "-0") cur = "-" + d;
        else cur += d;
        display();
    }

// Invoer: komma
    function pressComma() {
        if (justEvaluated) {
            cur = "0,";
            justEvaluated = false;
            display();
            return;
        }
        if (!cur.includes(",")) {
            cur += ",";
            display();
        }
    }

// Tekens: + − × ÷
    function setOperator(nextOp) {
        const n = toNumber(cur);
        if (prev === null) {
            prev = n;
        } else if (op && !justEvaluated) {
            prev = applyOp(prev, n, op);
            setCurFromNumber(prev);
        }
        op = nextOp;
        justEvaluated = false;
        display();
        cur = "0";
    }

// =
    function evaluate() {
        const n = toNumber(cur);
        if (op === null && prev === null) return;

        const a = prev === null ? 0 : prev;
        const result = applyOp(a, n, op);
        setCurFromNumber(result);
        prev = result;
        op = null;
        justEvaluated = true;
        display();
    }

// CE (alleen huidige invoer wissen)
    function clearEntry() {
        cur = "0";
        display();
    }

// C (alles wissen)
    function clearAll() {
        cur = "0";
        prev = null;
        op = null;
        justEvaluated = false;
        display();
    }

// Backspace
    function backspace() {
        if (justEvaluated) return;
        if (cur.length <= 1 || (cur.startsWith("-") && cur.length === 2)) {
            cur = "0";
        } else {
            cur = cur.slice(0, -1);
            if (cur === "-") cur = "0";
        }
        display();
    }

// Wissel teken
    function toggleSign() {
        if (cur.startsWith("-")) cur = cur.slice(1);
        else if (!isZero(cur)) cur = "-" + cur;
        display();
    }

// Percentage (eenvoudig: huidige invoer / 100)
    function percent() {
        const n = toNumber(cur);
        setCurFromNumber(n / 100);
        display();
    }

// 1/x
    function invert() {
        const n = toNumber(cur);
        setCurFromNumber(1 / n);
        prev = null; op = null; justEvaluated = true;
        display();
    }

// x²
    function pow2() {
        const n = toNumber(cur);
        setCurFromNumber(n * n);
        prev = null; op = null; justEvaluated = true;
        display();
    }

// √x
    function sqrt() {
        const n = toNumber(cur);
        setCurFromNumber(n < 0 ? NaN : Math.sqrt(n));
        prev = null; op = null; justEvaluated = true;
        display();
    }

// Memory
    function mClear() { mem = 0; }
    function mRecall() { setCurFromNumber(mem); display(); justEvaluated = true; }
    function mStore()  { mem = toNumber(cur); }
    function mPlus()   { mem += toNumber(cur); }
    function mMinus()  { mem -= toNumber(cur); }

// Event-koppelingen
    document.addEventListener("DOMContentLoaded", () => {
        // Cijfers
        document.querySelectorAll("[data-digit]").forEach(btn => {
            btn.addEventListener("click", () => pressDigit(btn.getAttribute("data-digit")));
        });
        // Komma en basis
        $("btn_comma").addEventListener("click", pressComma);
        $("btn_ce").addEventListener("click", clearEntry);
        $("btn_c").addEventListener("click", clearAll);
        $("btn_back").addEventListener("click", backspace);
        $("btn_sign").addEventListener("click", toggleSign);
        $("btn_pct").addEventListener("click", percent);
        $("btn_inv").addEventListener("click", invert);
        $("btn_pow2").addEventListener("click", pow2);
        $("btn_sqrt").addEventListener("click", sqrt);
        $("btn_eq").addEventListener("click", evaluate);

        // Operators
        document.querySelectorAll("[data-op]").forEach(btn => {
            btn.addEventListener("click", () => setOperator(btn.getAttribute("data-op")));
        });

        // Memory
        $("calc_mc").addEventListener("click", mClear);
        $("calc_mr").addEventListener("click", mRecall);
        $("calc_ms").addEventListener("click", mStore);
        $("calc_mplus").addEventListener("click", mPlus);
        $("calc_mminus").addEventListener("click", mMinus);

        // Init
        display();
    });









    /*const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    // Volledig scherm
    canvas.width = window.outerWidth;
    canvas.height = window.innerHeight;

    // Instelbare tekst
    const customText = 'Friedel Mythos SQL Sprite'; // ← hier kan je je eigen tekst zetten
    const letters = customText.split('').filter(c => c !== ' ');
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Y-positie per kolom
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
      ctx.fillStyle = 'rgb(0 0 0/ 0.09)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    setInterval(drawMatrix, 50);
    */
})();













