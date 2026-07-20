//import van onze custom css
import '../scss/styles.scss'
//import all of bootstrap zijn js
import * as bootstrap from 'bootstrap'
//import van eigen css imagecontrol
import '../css/style.css'

//eigen js
document.addEventListener('DOMContentLoaded',()=>{
    //card 1
    const btn = document.getElementById('btnTest');
    const out = document.getElementById('out');

    btn.addEventListener('click', ()=>{
        out.textContent = 'Alles werkt. Klaar voor de oefeningen!';
        out.className = 'alert alert-success mt-3 mb-0';
    })
    out.addEventListener('mouseover', ()=>{
        out.className='alert alert-danger mt-3 mb-0';
    })
    out.addEventListener('mouseleave', ()=>{
        out.className='alert alert-secondary mt-3 mb-0';
    })
    //card 2
    const inpName = document.getElementById('inpName');
    const btnName = document.getElementById('btnName');
    const nameOut = document.getElementById('nameOut');

    btnName.addEventListener('click', ()=>{
        const naam = inpName.value.trim();
        if(!naam){
            nameOut.className='alert alert-warning mt-3 mb-0'
            nameOut.textContent = 'Vul je naam in'
            return
        }
        nameOut.className = 'alert alert-success mt-3 mb-0'
        nameOut.textContent = `Welkom, ${naam}`
    })
})







//pure function
function maakGroet(naam){
    return `Hallo ${naam}! Welkom bij je avontuur in MPCNU oefenmodule Javascript voor beginners`
}


//hoofdstuk2
//impure function
function handleGroetClick(){
    const naamInput = document.getElementById('fn_nameInput')
    const output = document.getElementById('fn_output')
    const naam = naamInput.value.trim();

    if(!naam){
        output.className = "alert alert-warning mt-3 mb-0"
        output.textContent = "Geef een naam in!"
        return
    }
    const boodschap = maakGroet(naam)
    

    output.textContent = boodschap;
    output.className="alert alert-success mt-3 mb-0"
}

 //Event koppelen
// document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById('fn_btnGreet')
//         ?.addEventListener("click", handleGroetClick);
// });
document.addEventListener("DOMContentLoaded", () => {
    const btnGreet = document.getElementById('fn_btnGreet')
    btnGreet.addEventListener("click", handleGroetClick);
});















// hoofdstuk3
function toonBericht() {
    const binnen = "Ik leef binnen de functie 👀";

    function inner() {
        return `Inner ziet: ${binnen}`;
    }

    return inner();
}

function handleScope() {
    const output = document.getElementById("sc_output");

    //  inner sees outer
    const bericht = toonBericht();

    output.className = "alert alert-success mb-0";
    output.textContent = bericht;

    // try {
    //     // ❌ buiten de functie proberen de variabele te gebruiken
    //     console.log(binnen);
    // } catch (err) {
    //     console.warn("binnen is niet zichtbaar buiten de functie");
    // }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sc_btn")
        ?.addEventListener("click", handleScope);
});

// Geheim bericht
function geheimBericht() {
    const secret = "Code unlocked 🗝️";

    function leesSecret() {
        return secret;
    }

    return leesSecret();
}

function handleSecret() {
    const out = document.getElementById("sc2_output");
    out.className = "alert alert-success mb-0";
    out.textContent = geheimBericht();
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sc2_btn")
        ?.addEventListener("click", handleSecret);
});













function bepaalKleurInfo(kleur) {
    const input = kleur.toLowerCase()

    if (input === "rood") return { text: "Je koos rood", color: "red" };
    if (input === "blauw") return { text: "Je koos blauw", color: "blue" };

    return { text: "Onbekende kleur", color: null };
}

// Impure function (DOM)
function toonKleur() {
    const inp = document.getElementById("nf_input");
    const out = document.getElementById("nf_text");
    const box = document.getElementById("nf_box");

    const waarde = inp.value.trim();

    if (!waarde) {
        out.className = "alert alert-warning mb-2";
        out.textContent = "⚠️ Geef een kleur in";
        box.style.background = "#f8f9fa";
        box.textContent = "Geen kleur";
        return;
    }

    const resultaat = bepaalKleurInfo(waarde);

    if (!resultaat.color) {
        out.className = "alert alert-danger mb-2";
        out.textContent = resultaat.text;
        box.style.background = "#f8f9fa";
        box.textContent = "Onbekend";
        return;
    }

    out.className = "alert alert-success mb-2";
    out.textContent = resultaat.text;
    box.style.background = resultaat.color;
    box.textContent = resultaat.color.toUpperCase();
}

// Event koppeling
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("nf_btn")
        ?.addEventListener("click", toonKleur);
});

function bepaalFruit(naam) {
    const f = naam.toLowerCase();

    if (f === "appel") return { text: "Je koos appel", emoji: "🍎" };
    if (f === "banaan") return { text: "Je koos banaan", emoji: "🍌" };

    return { text: "Onbekend fruit", emoji: "❓" };
}

function toonFruit() {
    const inp = document.getElementById("fr_input");
    const txt = document.getElementById("fr_text");
    const box = document.getElementById("fr_box");

    const waarde = inp.value.trim();

    if (!waarde) {
        txt.className = "alert alert-warning mb-2";
        txt.textContent = "⚠️ Vul een fruitsoort in!";
        box.textContent = "❓";
        return;
    }

    const res = bepaalFruit(waarde);

    txt.className = "alert alert-success mb-2";
    txt.textContent = res.text;
    box.textContent = res.emoji;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fr_btn")
        ?.addEventListener("click", toonFruit);
});









// ----------------------------------
// Hoofdstuk 5: Template Literals
// ----------------------------------

// Pure function
function maakWelkomstZin(naam, leeftijd) {
    return `Welkom ${naam}! Jij bent ${leeftijd} jaar oud.`;
}

// UI handler
function toonWelkomstZin() {
    const naam = document.getElementById("tl_name").value.trim();
    const leeftijd = document.getElementById("tl_age").value.trim();
    const out = document.getElementById("tl_output");

    if (!naam || !leeftijd) {
        out.className = "alert alert-warning mb-0";
        out.textContent = `⚠️ Vul naam en leeftijd in`;
        return;
    }

    const tekst = maakWelkomstZin(naam, leeftijd);

    out.className = "alert alert-success mb-0";
    out.textContent = tekst;
}

// Event
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("tl_btn")
        ?.addEventListener("click", toonWelkomstZin);
});















// pagina 29  optellen
//eigen js
const telOp = (a, b) => a + b;

// UI handler (arrow + block body)
const verwerkSom = () => {
    const n1 = Number(document.getElementById("af_num1").value);
    const n2 = Number(document.getElementById("af_num2").value);
    const out = document.getElementById("af_out");

    if (!n1 || !n2) {
        out.className = "alert alert-warning mb-0";
        out.textContent = `⚠️ Vul twee getallen in`;
        return;
    }

    const resultaat = telOp(n1, n2);

    out.className = "alert alert-success mb-0";
    out.textContent = `Resultaat: ${n1} + ${n2} = ${resultaat}`;
};

// Event
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("af_btn")
        ?.addEventListener("click", verwerkSom);
});


//eigen js
const isEven = num => num % 2 === 0;

const checkEven = () => {
    const inp = Number(document.getElementById("ev_input").value);
    const out = document.getElementById("ev_out");

    if (!inp) {
        out.className = "alert alert-warning mb-0";
        out.textContent = `⚠️ Vul een getal in`;
        return;
    }
    //manier 1
    // if (isEven(inp)) {
    //     out.className = "alert alert-success mb-0";
    //     out.textContent = ${inp} is EVEN;
    // } else {
    //     out.className = "alert alert-danger mb-0";
    //     out.textContent = `${inp} is ONEVEN ❌`;
    // }

    //manier 2
    // const even = isEven(inp);
    //
    // out.className = even
    //     ? "alert alert-success mb-0"
    //     : "alert alert-danger mb-0";
    //
    // out.textContent = even
    //     ? `${inp} is EVEN`
    //     : `${inp} is ONEVEN ❌`

    //manier 3
    const even = isEven(inp);
    ev_out.className = alert `${even ? "alert-success" : "alert-danger"} mb-0`;
    ev_out.textContent = `${inp} is ${even ? "EVEN" : "ONEVEN ❌"}`;
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ev_btn")
        ?.addEventListener("click", checkEven);
});



// hoofdstuk 7  array maken
//eigen js
// Lege array om namen op te slaan
const namen = [];

// Pure functie -> maakt lijst HTML
function maakLijstHTML(items) {
    return items.map(item => `<li class="list-group-item">${item}</li>`).join("");}

// UI handler
function voegNaamToe() {
    const inp = document.getElementById("arr_name");
    const lijst = document.getElementById("arr_list");
    const count = document.getElementById("arr_count");

    const naam = inp.value.trim();

    if (!naam) {
        alert("⚠️ Geef een naam in!");
        return;
    }

    // voeg toe aan array
    namen.push(naam);

    // UI updaten
    lijst.innerHTML = maakLijstHTML(namen);
    count.textContent = namen.length;

    // veld leegmaken
    inp.value = "";
}

// Event listener
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("arr_btn")
        ?.addEventListener("click", voegNaamToe);
});

/*  Dit is de code voor de link die elegant beweegt elegant-link */
        document.querySelector('.elegant-link').addEventListener('click', function(e) {
            e.preventDefault();

            // Afmetingen voor het nieuwe venster (kleiner dan standaard)
            const width = 600;
            const height = 900;

            // Centreer het nieuwe venster op het scherm
            const left = (screen.width - width) / 2;
            const top = (screen.height - height) / 2;

            window.open(this.href, '_blank',
                `width=${width},height=${height},left=${left},top=${top},
                 resizable=yes,scrollbars=yes,status=yes,toolbar=no,menubar=no`);
        });


/*
    Hieronder de code voor rekenmachine r
                                        e
                                        k
                                        e
                                        n
                                        m
                                        a
                                        c
                                        h
                                        i
                                        n
                                        e
*/


document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments du DOM
    const display = document.getElementById('calc_display'); // Supposons que vous avez un élément avec id="display"
    const buttons = document.querySelectorAll('button');

    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;

    // Fonction pour mettre à jour l'affichage
    function updateDisplay() {
        display.textContent = currentInput;
    }

    // Fonction pour ajouter un chiffre à l'entrée actuelle
    function addDigit(digit) {
        if (currentInput === '0' || resetScreen) {
            currentInput = digit;
            resetScreen = false;
        } else {
            currentInput += digit;
        }
    }

    // Fonction pour gérer les opérations
    function setOperation(op) {
        if (operation !== null) calculate();
        previousInput = currentInput;
        operation = op;
        resetScreen = true;
    }

    // Fonction pour calculer le résultat
    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '−':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operation = null;
        updateDisplay();
    }

    // Fonction pour effacer tout
    function clearAll() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        resetScreen = false;
        updateDisplay();
    }

    // Fonction pour effacer le dernier caractère
    function backspace() {
        if (currentInput.length === 1) {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
    }

    // Fonction pour inverser le signe
    function invertSign() {
        const num = parseFloat(currentInput);
        if (!isNaN(num)) {
            currentInput = (num * -1).toString();
        }
    }

    // Gestion des événements des boutons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;

            // Gestion des chiffres
            if (this.getAttribute('data-digit')) {
                addDigit(value);
            }
            // Gestion des opérations
            else if (this.getAttribute('data-op')) {
                setOperation(value);
            }
            // Gestion des autres boutons
            else {
                switch (this.id) {
                    case 'btn_pct':
                        const num = parseFloat(currentInput) / 100;
                        currentInput = num.toString();
                        break;
                    case 'btn_ce':
                        clearAll();
                        break;
                    case 'btn_c':
                        clearAll();
                        break;
                    case 'btn_back':
                        backspace();
                        break;
                    case 'btn_inv':
                        invertSign();
                        break;
                    case 'btn_pow2':
                        const pow = Math.pow(parseFloat(currentInput), 2);
                        currentInput = pow.toString();
                        break;
                    case 'btn_sqrt':
                        const sqrt = Math.sqrt(parseFloat(currentInput));
                        currentInput = sqrt.toString();
                        break;
                    case 'btn_sign':
                        invertSign();
                        break;
                    case 'btn_comma':
                        if (!currentInput.includes(',')) {
                            currentInput += ',';
                        }
                        break;
                    case 'btn_eq':
                        calculate();
                        break;    
                }
            }

            updateDisplay();
        });
    });

    // Gestion du clavier (optionnel)
    document.addEventListener('keydown', function(e) {
        const key = e.key;

        if (/[0-9]/.test(key)) {
            addDigit(key);
        } else if (key === '+') {
            setOperation('+');
        } else if (key === '-') {
            setOperation('-');
        } else if (key === '*') {
            setOperation('×');
        } else if (key === '/') {
            setOperation('÷');
        } else if (key === 'Enter' || key === '=') {
            calculate();
        } else if (key === 'Escape') {
            clearAll();
        } else if (key === 'Backspace') {
            backspace();
        }

        updateDisplay();
    });
});



