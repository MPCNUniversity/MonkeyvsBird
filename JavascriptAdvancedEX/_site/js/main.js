//import van onze custom css
import '../scss/styles.scss'
//import all of bootstrap zijn js
import * as bootstrap from 'bootstrap'
//import van eigen css imagecontrol
import '../css/style.css'

//eigen js



// p10 startoefening oef 1
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




//p 12 oefening 2
//pure function
function maakGroet(naam){
    return `Hallo ${naam}! Welkom bij je avontuur in MPCNU oefenmodule Javascript voor beginners`
}

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






// p14 vierkant berekenen oef 3
// Pure berekening
function berekenVierkant(getal) {
    return getal * getal;
}

function handleVierkant() {
    const inp = document.getElementById('sq_input');
    const out = document.getElementById('sq_output');

    const waarde = Number(inp.value);

    if (!waarde) {
        out.className = "alert alert-warning mt-3 mb-0";
        out.textContent = "⚠️ Geef een getal in!";
        return;
    }

    const resultaat = berekenVierkant(waarde);

    out.className = "alert alert-success mt-3 mb-0";
    out.textContent = `${waarde}² = ${resultaat}`;
}

// Event koppelen
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('sq_btn')
        ?.addEventListener("click", handleVierkant);
});













// p 17 scope handling oef 4
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




// p 18 geheim bericht oef 5
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








// p 20 kleur kiezen oef 6
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







// p 22 fruit kiezer
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
// p 24 welkom bericht oef 8
function maakWelkomst(naam, leeftijd) {
    return `Welkom ${naam}! Jij bent ${leeftijd} jaar oud.`;
}

// UI handler
function toonWelkom() {
    const naam = document.getElementById("fr_naam").value.trim();
    const leeftijd = document.getElementById("fr_leeftijd").value.trim();
    const out = document.getElementById("fr_text");

    if (!naam || !leeftijd) {
        out.className = "alert alert-warning mb-0";
        out.textContent = `⚠️ Vul naam en leeftijd in`;
        return;
    }

    const tekst = maakWelkomst(naam, leeftijd);

    out.className = "alert alert-success mb-0";
    out.textContent = tekst;
}

// Event
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fr_btn")
        ?.addEventListener("click", toonWelkom);
});

/*
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
*/






// pagina 27 oef 9
// Pure function
function maakProfielTekst(naam, stad, hobbie) {
    return `Naam: ${naam}<br>Stad: ${stad}<br>Hobbie: ${hobbie}`;
}

// UI handler
function maakProfiel() {
    const naam = document.getElementById("pf_name").value.trim();
    const stad = document.getElementById("pf_city").value.trim();
    const hobbie = document.getElementById("pf_hobby").value.trim();
    const out = document.getElementById("pf_out");

    if (!naam || !stad || !hobbie) {
        out.className = "alert alert-warning mb-0";
        out.textContent = `⚠️ Vul naam en stad en hobbie in`;
        return;
    }

    const tekst = maakProfielTekst(naam, stad, hobbie);

    out.className = "alert alert-success mb-0";
    out.innerHTML = tekst;
}

// Event
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pf_btn")
        ?.addEventListener("click", maakProfiel);
});










// pagina 29   oef 10 optellen
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
















// pagina 31 oefening 11
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
    ev_out.className = `alert ${even ? "alert-success" : "alert-danger"} mb-0`;
    ev_out.textContent = `${inp} is ${even ? "EVEN" : "ONEVEN ❌"}`;
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ev_btn")
        ?.addEventListener("click", checkEven);
});
















// pagina 33 oef 12
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




// pagina 35 array maken
// Lege array om namen op te slaan
/*
    We bewaren alle taken in een array.
    Elke keer de gebruiker een taak toevoegt komt die in deze array terecht.
    Daarna tonen we die taken op het scherm.
*/
(() => {

const takenLijst = [];

// Pure functie -> maakt lijst HTML
 function maakLijstHTML(items) {
//     <p className="badge bg-primary py-2 px-3">taak 1</p>
    return items.map(item => `<p class="badge bg-primary py-2 px-3 me-1">${item}</p>`).join("");
}

// UI handler
function voegTaakToe() {
    const inp = document.getElementById("arr2_taak");
    const lijst = document.getElementById("arr2_list");
    const counts = document.querySelectorAll(".arr2_count");

    const taak = inp.value.trim();

    if (!taak) {
        alert("⚠️ Geef een taak in!");
        return;
    }

    // voeg toe aan array
    takenLijst.push(taak);

    // UI updaten
    lijst.innerHTML = maakLijstHTML(takenLijst);
    counts.forEach(c => c.textContent = takenLijst.length);

    // veld leegmaken
    inp.value = "";
}

// Event listener
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("arr2_btn")
        ?.addEventListener("click", voegTaakToe);
});

})();




// pagina 38 verander achtergrond
// Hoofdstuk 8: Root Nodes
// ----------------------------------

function plaatsBerichtInBody() {
    // selecteer de body
    const bodyNode = document.body;

    // maak een nieuw element
    const p = document.createElement("p");
    p.textContent = "Bericht toegevoegd via root node! ";
    p.className = "text-center mt-2 text-success fw-bold";

    // voeg toe aan body
    bodyNode.appendChild(p);
}

function veranderAchtergrond() {
   // const htmlNode = document.documentElement; // <html>

    // lichte highlight
    document.body.style.background = "#050c13ff";
}

function toonFeedback(tekst) {
    const out = document.getElementById("rn_output");
    out.className = "alert alert-success mb-0";
    out.textContent = tekst;
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("rn_btnMessage")
        ?.addEventListener("click", () => {
            plaatsBerichtInBody();
            toonFeedback("Bericht toegevoegd aan body ");
        });

    document.getElementById("rn_btnColor")
        ?.addEventListener("click", () => {
            veranderAchtergrond();
            toonFeedback("Achtergrond aangepast via <html> node 🎨");
        });
});





// pagina 40 dark mode light mode

function activeerDarkMode() {
    document.body.style.background = "#222";
    document.body.style.color = "#fff";
}

function activeerLightMode() {
    document.body.style.background = "#fff";
    document.body.style.color = "#000";
}

function toonStatus(msg) {
    const out = document.getElementById("dm_status");
    out.className = "alert alert-success mb-0";
    out.textContent = msg;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dm_on")
        ?.addEventListener("click", () => {
            activeerDarkMode();
            toonStatus("Dark mode actief 🌙");
        });

    document.getElementById("dm_off")
        ?.addEventListener("click", () => {
            activeerLightMode();
            toonStatus("Light mode actief ☀️");
        });
});




// pagina 53  zoek een naam
function filterNamen() {
    const value = document.getElementById("sel_input").value.toLowerCase();
    const items = document.querySelectorAll(".naam-item"); // NodeList

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(value) ? "block" : "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sel_input")
        ?.addEventListener("keyup", filterNamen);
});






// pagina 55 kleurkiezer oef
(() => {
function setColor(color) {
    const boxes = document.querySelectorAll(".kleur-box");
    boxes.forEach(box => box.style.background = color);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ks_red")?.addEventListener("click", () => setColor("red"));
    document.getElementById("ks_blue")?.addEventListener("click", () => setColor("blue"));
    document.getElementById("ks_green")?.addEventListener("click", () => setColor("green"));
});
})();




// pagina 57 focus oefening 19
function updateChildCount() {
    const container = document.querySelector(".card-body");
    const count = container.children.length;
    document.getElementById("d13_count").textContent = count;
}

// Event binding
document.addEventListener("DOMContentLoaded", () => {
    updateChildCount();

    document.getElementById("d13_focusName")
        ?.addEventListener("click", () => {
            document.getElementById("d13_name").focus();
        });

    document.getElementById("d13_focusEmail")
        ?.addEventListener("click", () => {
            document.getElementById("d13_email").focus();
        });
});





// pagina 59 oefening 20 children focus en blur
function updateFTCount() {
    const body = document.getElementById("ft_body");
    document.getElementById("ft_count").textContent = body.children.length;
}

document.addEventListener("DOMContentLoaded", () => {
    const inp = document.getElementById("ft_input");

    updateFTCount();

    inp.addEventListener("focus", () => {
        inp.style.border = "2px solid blue";
    });

    inp.addEventListener("blur", () => {
        inp.style.border = "1px solid #ccc";
    });

    document.getElementById("ft_btn")?.addEventListener("click", () => {
        inp.focus();
    });
});




// pagina 61 toggle highlight
function toggleHighlight() {
    const boxes = document.querySelectorAll(".cl-box");
    boxes.forEach(box => box.classList.toggle("bg-light"));
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cl_toggle")
        ?.addEventListener("click", toggleHighlight);
});



// pagina 63 Toggle darkmode
(() => {

function toggleDarkMode() {
    const body = document.body;
    const btn = document.getElementById("dm2_btn");
    const status = document.getElementById("dm2_status");

    const isDark = body.classList.toggle("dark-mode");

    if (isDark) {
        btn.textContent = "Light mode ☀️";
        status.className = "alert alert-success mb-0";
        status.textContent = "Dark mode actief 🌙";
    } else {
        btn.textContent = "Dark mode 🌙";
        status.className = "alert alert-secondary mb-0";
        status.textContent = "Light mode actief ☀️";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dm2_btn")
        ?.addEventListener("click", toggleDarkMode);
});

})();




// pagina 64 formulieren

(() => {

function updatePreview() {
    const name = document.getElementById("ev_name").value;
    const preview = document.getElementById("ev_preview");

    if (name.trim() === "") {
        preview.className = "alert alert-secondary mb-2";
        preview.textContent = "Wacht op input…";
    } else {
        preview.className = "alert alert-info mb-2";
        preview.textContent = `Hallo ${name}! 👋`;
    }
}

function handleSubmit(event) {
    event.preventDefault(); // stop page reload

    const name = document.getElementById("ev_name").value.trim();
    const status = document.getElementById("ev_status");


    if (!name) {
        status.className = "alert alert-danger mb-0 mt-3";
        status.textContent = "❌ Vul een naam in";
        return;
    }

    status.className = "alert alert-success mb-0 mt-3";
    status.textContent =  `Formulier verstuurd voor ${name}`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ev_name")?.addEventListener("input", updatePreview);
    document.getElementById("ev_form")?.addEventListener("submit", handleSubmit);
});

})();



// pagina 67 valid email oefening 23
(() => {

function isValidEmail(email) {
    return email.includes("@") && email.includes(".") && !email.includes(" ");
}

function updateEmailPreview() {
    const value = document.getElementById("em_input").value;
    const preview = document.getElementById("em_preview");

    if (isValidEmail(value)) {
        preview.className = "alert alert-success mb-2";
        preview.textContent = " Geldig emailadres";
    } else {
        preview.className = "alert alert-warning mb-2";
        preview.textContent = "⚠️ Ongeldig emailadres";
    }
}

function handleEmailSubmit(e) {
    e.preventDefault();

    const val = document.getElementById("em_input").value;
    const status = document.getElementById("em_status");

    if (!isValidEmail(val)) {
        status.className = "alert alert-danger mb-0 mt-3";
        status.textContent = "❌ Emailadres ongeldig";
        return;
    }

    status.className = "alert alert-success mb-0 mt-3";
    status.textContent = `Email geaccepteerd: ${val}`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("em_input")?.addEventListener("input", updateEmailPreview);
    document.getElementById("em_form")?.addEventListener("submit", handleEmailSubmit);
});

})();




// pagina 70 geblokkeerde link oefening 24
//eigen js
document.addEventListener("DOMContentLoaded", () => {

    // 1) Link blokkeren
    document.getElementById("ev_link")
        ?.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("ev_msg2").textContent =
                "🚫 Navigatie geblokkeerd door JS";
        });

    // 2) Hover effects
    const box = document.getElementById("ev_box");

    box.addEventListener("mouseover", () => {
        box.classList.add("bg-warning");
        box.textContent = "Hover actief!";
    });

    box.addEventListener("mouseleave", () => {
        box.classList.remove("bg-warning");
        box.textContent = "Hover over mij 🖱️";
    });

    // 3) Form prevent + feedback
    document.getElementById("ev_form2")
        ?.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("ev_input2").value.trim();
            const msg = document.getElementById("ev_msg2");

            if (!name) {
                msg.className = "alert alert-danger mt-3 mb-0";
                msg.textContent = "❌ Vul je naam in";
                return;
            }

            msg.className = "alert alert-success mt-3 mb-0";
            msg.textContent =  `Form verzonden voor ${name} (zonder reload!)`;
        });
});






// pagina 72 hover en click effecten   oefening 25
document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("rb_box");
    const msg = document.getElementById("rb_msg");

    // Hover
    box.addEventListener("mouseover", () => {
        box.classList.remove("bg-light");
        box.style.setProperty("background-color", "lightgreen", "important");
        msg.textContent = "👋 Hallo!";
    });

    // Verlaten
    box.addEventListener("mouseleave", () => {
        box.classList.add("bg-light");
        box.style.removeProperty("background-color");
        msg.textContent = "😭 Kom terug!";
    });

    // Klik
    box.addEventListener("click", () => {
        box.style.setProperty("border", "3px solid black", "important");
        msg.textContent = "🖱️ Je klikt!";
    });

    // Dubbelklik
    box.addEventListener("dblclick", () => {
        box.style.setProperty("border", "3px solid red", "important");
        msg.textContent = "⚡ Dubbelklik wow!";
    });
});




// pagina 73 taak toevoegen en verwijderen uit lijst
//eigen js
const taken2 = [];

function renderTodos() {
    const list = document.getElementById("todo_list2");

    list.innerHTML = taken2
        .map((task, index) => `
      <li class="list-group-item d-flex justify-content-between align-items-center ${task.done ? "todo-done" : ""}">
        <span class="todo-text" data-idx="${index}">
           ${task.text}
        </span>
        <button class="btn btn-sm btn-danger todo-del" data-idx="${index}">X</button>
      </li>
    `)
        .join("");
}

function addTodo(e) {
    e.preventDefault();

    const inp = document.getElementById("todo_input2");
    const msg = document.getElementById("todo_msg2");
    const text = inp.value.trim();

    if (!text) {
        msg.className = "alert alert-danger mb-3";
        msg.textContent = "❌ Vul een taak in";
        return;
    }

    taken2.push({ text, done: false });

    msg.className = "alert alert-success mb-3";
    msg.textContent =  `Taak toegevoegd: ${text}`;

    inp.value = "";
    renderTodos();
}

function handleTodoClick(e) {
    const idx = e.target.dataset.idx;

    // Toggle done
    if (e.target.classList.contains("todo-text")) {
        taken2[idx].done = !taken2[idx].done;
        renderTodos();
        return;
    }

    // Delete
    if (e.target.classList.contains("todo-del")) {
        taken2.splice(idx, 1);
        renderTodos();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("todo_form2")?.addEventListener("submit", addTodo);
    document.getElementById("todo_list2")?.addEventListener("click", handleTodoClick);
});





// pagina 77  Leeftijd berekenen oefening 27

function berekenLeeftijd(jaar) {
    const huidigJaar = new Date().getFullYear();
    return huidigJaar - jaar;
}

function toonLeeftijd(e) {
    e.preventDefault();

    const input = document.getElementById("age_input").value.trim();
    const out = document.getElementById("age_output");

    if (!input || isNaN(input)) {
        out.className = "alert alert-danger mb-0";
        out.textContent = "❌ Geef een geldig jaar in";
        return;
    }

    const leeftijd = berekenLeeftijd(Number(input));

    const gebruiker = {
        geboorteJaar: Number(input),
        leeftijd: leeftijd
    };

    out.className = "alert alert-success mb-0";
    out.textContent =  `Je bent ongeveer ${gebruiker.leeftijd} jaar oud (geboren in ${gebruiker.geboorteJaar})`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("age_form")?.addEventListener("submit", toonLeeftijd);
});




// pagina 77 geboortedag berekenen
// Functie om weekdag te berekenen
function berekenWeekdag() {
    const dag = parseInt(document.getElementById("dob_day").value, 10);
    const maand = parseInt(document.getElementById("dob_month").value, 10);
    const jaar = parseInt(document.getElementById("dob_year").value, 10);
    const output = document.getElementById("dob_out");

    // Validatie
    if (!dag || !maand || !jaar) {
        output.className = "alert alert-danger mb-0";
        output.textContent = "⚠️ Vul dag, maand en jaar in!";
        return;
    }

    // Maak een Date object
    const geboortedatum = new Date(jaar, maand - 1, dag);

    // Array met weekdagen
    const weekdagen = [
        "zondag",
        "maandag",
        "dinsdag",
        "woensdag",
        "donderdag",
        "vrijdag",
        "zaterdag"
    ];

    const weekdag = weekdagen[geboortedatum.getDay()];

    // Toon resultaat
    output.className = "alert alert-success mb-0";
    output.textContent = `Je bent geboren op ${weekdag} ${dag}/${maand}/${jaar}.`;
}

// Event listener
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dob_btn")
        ?.addEventListener("click", berekenWeekdag);
});        






// pagina 83 object constructors  oefening 30
(() => {

const users = [];

function User(name, age) {
    this.name = name;
    this.age = age;
    this.info = function() {
        return `${this.name} (${this.age} jaar)`;
    };
}

function addUser() {
    const name = document.getElementById("uc_name").value.trim();
    const age = document.getElementById("uc_age").value.trim();
    const list = document.getElementById("uc_list");

    if (!name || !age) return;

    const user = new User(name, Number(age));
    users.push(user);

    list.innerHTML = users
        .map(u => `<li class="list-group-item">${u.info()}</li>`)
        .join("");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("uc_btn")
        ?.addEventListener("click", addUser);
});
})();






// pagina 84 object constructor product factory
// Constructor voor Product
function Product(naam, prijs) {
    this.naam = naam;
    this.prijs = prijs;
    this.info = function() {
        return `${this.naam} - €${this.prijs.toFixed(2)}`;
    };
}

// Array om producten te bewaren
const producten = [];

// UI handler
function voegProductToe() {
    const naam = document.getElementById("prod_name").value.trim();
    const prijs = parseFloat(document.getElementById("prod_price").value);
    const lijst = document.getElementById("prod_list");

    if (!naam || isNaN(prijs)) {
        alert("⚠️ Vul een productnaam en prijs in!");
        return;
    }

    // Maak nieuw product via constructor
    const nieuwProduct = new Product(naam, prijs);

    // Voeg toe aan array
    producten.push(nieuwProduct);

    // Update UI
    lijst.innerHTML = producten
        .map(p => `<li class="list-group-item">${p.info()}</li>`)
        .join("");

    // Velden leegmaken
    document.getElementById("prod_name").value = "";
    document.getElementById("prod_price").value = "";
}

// Event listener
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("prod_btn")
        ?.addEventListener("click", voegProductToe);
});









// pagina 86 es6 classes demo
// Hoofdstuk 20: ES6 Classes + extends + super
// ---------------------------------------------
(() => {

class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    info() {
        return `${this.name} (${this.age} jaar)`;
    }
}

class Admin extends User {
    constructor(name, age) {
        super(name, age);
        this.role = "Admin";
    }

    info() {
        return `[ADMIN] ${super.info()}`;
    }
}

const clsUsers = [];

function addClassUser() {
    const name = document.getElementById("cls_name").value.trim();
    const age = Number(document.getElementById("cls_age").value);
    const role = document.getElementById("cls_role").value;
    const list = document.getElementById("cls_list");

    if (!name || !age) return;

    const user = role === "admin"
        ? new Admin(name, age)
        : new User(name, age);

    clsUsers.push(user);

    list.innerHTML = clsUsers
        .map(u => `<li class="list-group-item">${u.info()}</li>`)
        .join("");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cls_btn")
        ?.addEventListener("click", addClassUser);
});

})();



// pagina 90 
// Hoofdstuk 21: Mini Webshop Project
// --------------------------------------
(() => {

class Product {
    constructor(name, price, emoji) {
        this.name = name;
        this.price = price;
        this.emoji = emoji;
    }

    label() {
        return `${this.emoji} ${this.name} — €${this.price.toFixed(2)}`;
    }
}

const products3 = [
    new Product("Pizza", 12.5, "🍕"),
    new Product("Hamburger", 9.9, "🍔"),
    new Product("Sushi", 15.0, "🍣"),
    new Product("Frietjes", 4.5, "🍟")
];

let cartCount = 0;

function renderProducts() {
    const cont = document.getElementById("prod_container");

    cont.innerHTML = products3
        .map((p, i) => `
      <div class="card mb-2">
        <div class="card-body d-flex justify-content-between align-items-center">
          <strong>${p.label()}</strong>
          <button class="btn btn-sm btn-success prod_buy" data-idx="${i}">
            Koop
          </button>
        </div>
      </div>
    `)
        .join("");
}

function addToCart(idx) {
    cartCount++;
    const badge = document.getElementById("cart_count");
    const msg = document.getElementById("cart_msg");

    badge.textContent = cartCount;
    badge.classList.add("cart-added");
    setTimeout(() => badge.classList.remove("cart-added"), 300);

    msg.className = "alert alert-success mt-2 mb-0";
    msg.textContent =  `${products3[idx].name} toegevoegd aan winkelmandje`;
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();

    document.getElementById("prod_container")
        ?.addEventListener("click", (e) => {
            if (e.target.classList.contains("prod_buy")) {
                addToCart(e.target.dataset.idx);
            }
        });
});
})();




// pagina 95 Bom
(() => {

function showBOM() {
    const data = [
        `🪟 Window breedte: ${window.innerWidth}`,
        `🖥️ Screen resolutie: ${screen.width} x ${screen.height}`,
        `🌐 User Agent: ${navigator.userAgent}`,
        `💬 Browser taal: ${navigator.language}`,
        `📡 Online: ${navigator.onLine ? "Ja" : "Nee"}`,
        `🔗 URL: ${location.href}`
    ];

    document.getElementById("bom_list").innerHTML =
        data.map(item => `<li class="list-group-item">${item}</li>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("bom_btn")
        ?.addEventListener("click", showBOM);

    document.getElementById("bom_go")
        ?.addEventListener("click", () => {
            location.href = "https://google.com/";
        });
});

})();




// pagina 96 Bom mini oefening device info oefeninge 34
function checkDevice() {
    const lijst = document.getElementById("dc_list");

    // Detectie van touchscreen
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Bouw een array met info
    const info = [
        `User agent: ${navigator.userAgent}`,
        `Platform: ${navigator.platform}`,
        `Taal: ${navigator.language}`,
        `Online status: ${navigator.onLine ? "Online" : "Offline"}`,
        `Scherm resolutie: ${screen.width} x ${screen.height}`,
        `Kleur diepte: ${screen.colorDepth} bits`,
        `Touchscreen aanwezig: ${isTouch ? "Ja" : "Nee"}`,
        `Cookies toegestaan: ${navigator.cookieEnabled ? "Ja" : "Nee"}`,
        `Browser naam: ${navigator.appName}`,
        `Browser versie: ${navigator.appVersion}`,
        `Locatie href: ${location.href}`,
        `Locatie host: ${location.host}`,
        `Locatie protocol: ${location.protocol}`
    ];

    // Zet in de UI
    lijst.innerHTML = info
        .map(item => `<li class="list-group-item">${item}</li>`)
        .join("");
}

// Event listener
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dc_btn")
        ?.addEventListener("click", checkDevice);
});




// pagina 99 local storage
function loadName() {
    const saved = localStorage.getItem("username");
    const out = document.getElementById("ls_output");

    if (saved) {
        out.className = "alert alert-success mb-0";
        out.textContent = `Welkom terug, ${saved}!`;
    }
}

function saveName() {
    const inp = document.getElementById("ls_name").value.trim();
    const out = document.getElementById("ls_output");

    if (!inp) return;

    localStorage.setItem("username", inp);

    out.className = "alert alert-success mb-0";
    out.textContent =  `Naam opgeslagen: ${inp}`;
}

document.addEventListener("DOMContentLoaded", () => {
    loadName();
    document.getElementById("ls_save")
        ?.addEventListener("click", saveName);
});







// pagina 100 local storage
let favs = [];

function saveFavs() {
    localStorage.setItem("favs", JSON.stringify(favs));
}

function loadFavs() {
    const saved = JSON.parse(localStorage.getItem("favs"));
    if (saved) favs = saved;
    renderFavs();
}

function renderFavs() {
    document.getElementById("fav_list").innerHTML =
        favs.map(f => `<li class="list-group-item">${f}</li>`).join("");
}

function addFav() {
    const val = document.getElementById("fav_input").value.trim();
    if (!val) return;

    favs.push(val);
    saveFavs();
    renderFavs();
    document.getElementById("fav_input").value = "";
}

function clearFavs() {
    favs = [];
    localStorage.removeItem("favs");
    renderFavs();
}

document.addEventListener("DOMContentLoaded", () => {
    loadFavs();
    document.getElementById("fav_btn")?.addEventListener("click", addFav);
    document.getElementById("fav_clear")?.addEventListener("click", clearFavs);
});




// pagina 104  Fetch API
async function loadUsers() {
    const status = document.getElementById("api_status");
    const list = document.getElementById("api_list");

    try {
        status.className = "alert alert-warning mb-0";
        status.textContent = "⏳ Data laden...";

        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!res.ok) throw new Error("Netwerk fout");

        const users = await res.json();

        list.innerHTML = users
            .map(u => `<li class="list-group-item"><strong>${u.name}</strong><br>${u.email}</li>`)
            .join("");

        status.className = "alert alert-success mb-0";
        status.textContent =  `${users.length} gebruikers geladen`;

    } catch (err) {
        status.className = "alert alert-danger mb-0";
        status.textContent = "❌ Fout bij laden van data";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("api_btn")
        ?.addEventListener("click", loadUsers);
});




// pagina 106 
// Hoofdstuk 25: JSON File Load (Local API Simulator)
// ---------------------------------------------------

async function loadLocalUsers() {
    const status = document.getElementById("json_status");
    const list = document.getElementById("json_list");

    try {
        status.className = "alert alert-warning mb-0";
        status.textContent = "⏳ JSON laden...";

        const res = await fetch("./data/users.json");
        if (!res.ok) throw new Error("Fout bij laden JSON");

        const users = await res.json();

        list.innerHTML = users
            .map(u => `<li class="list-group-item"><strong>${u.name}</strong><br>${u.email}</li>`)
            .join("");

        status.className = "alert alert-success mb-0";
        status.textContent =  `${users.length} gebruikers geladen`;

    } catch(err) {
        status.className = "alert alert-danger mb-0";
        status.textContent = "❌ Kon JSON niet laden";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("json_btn")
        ?.addEventListener("click", loadLocalUsers);
});




// pagina 109
// Functie om JSON te laden en producten te tonen
async function laadProducten() {
    const lijst = document.getElementById("prod_list_local");
    const status = document.getElementById("prod_status_local");

    try {
        // Simuleer lokale JSON (in praktijk: fetch('producten.json'))
        const data = [
            { "name": "Laptop", "price": 899 },
            { "name": "Monitor", "price": 199 },
            { "name": "Toetsenbord", "price": 49 }
        ];

        // Update status
        status.className = "alert alert-info mb-0";
        status.textContent = "✅ Producten geladen!";

        // Zet producten in lijst
        lijst.innerHTML = data
            .map(p => `<li class="list-group-item">${p.name} – €${p.price}</li>`)
            .join("");

    } catch (err) {
        status.className = "alert alert-danger mb-0";
        status.textContent = "❌ Fout bij laden van producten!";
        console.error(err);
    }
}

// Event listener
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("prod_load_btn")
        ?.addEventListener("click", laadProducten);
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


let btn1 = document.querySelector('#button1');
let btn2 = document.querySelector('#button2');
let btn3 = document.querySelector('#button3');
let btn4 = document.querySelector('#button4');
let btn5 = document.querySelector('#button5');
let btn6 = document.querySelector('#button6');
let btndeskoff = document.querySelector('#buttondeskoff');


btn1.addEventListener('click', () =>{
    document.body.style.backgroundImage = "url('images/headmasterdesk.png')";

    });
btn2.addEventListener('click', () =>{
    document.body.style.backgroundImage = "url('images/librarygrounds.png')";
});
btn3.addEventListener('click', () =>{
    document.body.style.backgroundImage = "url('images/deskon.png')";
});
btn4.addEventListener('click', () =>{
    document.body.style.backgroundImage = "url('images/6.png')";

    });
btn5.addEventListener('click', () =>{
    document.body.style.backgroundImage = "url('images/bosdesk.png')";
});
btn6.addEventListener('click', () =>{
    document.body.style.backgroundImage = "url('images/rangerOnlineOcean.gif')";
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





/* e
    i
     n
      d
       e

          r
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




