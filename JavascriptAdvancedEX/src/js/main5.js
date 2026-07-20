//import van onze custom css
import '../scss/styles.scss'
//import all of bootstrap zijn js
import * as bootstrap from 'bootstrap'
//import van eigen css imagecontrol
import '../css/style.css'

//eigen js
// vijfde main voor verdeling van de scripten





// Oefening M8 — Focus & Field Monitor
//-------------------------------------
function m8_isTitleValid() {
    const value = document.getElementById('m8_title').value.trim();
    return value.length > 0;
}
function m8_isDescValid() {
    const value = document.getElementById('m8_desc').value.trim();
    return value.length >= 10;
}
function m8_isEmailValid() {
    const value = document.getElementById('m8_email').value.trim();
    return value.includes('@') && value.includes('.');
}
function m8_updateFieldFeedback() {
    const title = document.getElementById('m8_title');
    const desc = document.getElementById('m8_desc');
    const email = document.getElementById('m8_email');
    const titleHelp = document.getElementById('m8_title_help');
    const descHelp = document.getElementById('m8_desc_help');
    const emailHelp = document.getElementById('m8_email_help');
    // Titel
    if (m8_isTitleValid()) {
        titleHelp.className = 'form-text mt-1 text-success';
        titleHelp.textContent = 'OK.';
    } else {
        titleHelp.className = 'form-text mt-1 text-danger';
        titleHelp.textContent = 'Titel is verplicht.';
    }
    // Beschrijving
    if (m8_isDescValid()) {
        descHelp.className = 'form-text mt-1 text-success';
        descHelp.textContent = 'Beschrijving is lang genoeg.';
    } else {
        const len = desc.value.trim().length;
        descHelp.className = 'form-text mt-1 text-danger';
        descHelp.textContent = `Te kort (${len}/10).`;
    }
    // E-mail
    if (m8_isEmailValid()) {
        emailHelp.className = 'form-text mt-1 text-success';
        emailHelp.textContent = 'E-mailadres lijkt geldig.';
    } else {
        emailHelp.className = 'form-text mt-1 text-danger';
        emailHelp.textContent = 'E-mailadres lijkt ongeldig.';
    }
}
function m8_countValidFields() {
    let count = 0;
    if (m8_isTitleValid()) count++;
    if (m8_isDescValid()) count++;
    if (m8_isEmailValid()) count++;
    return count;
}
function m8_updateStatus() {
    const status = document.getElementById('m8_status');
    const count = m8_countValidFields();
    if (count === 0) {
        status.className = 'alert alert-secondary mb-3';
        status.textContent = 'Nog geen velden ingevuld.';
    } else if (count < 3) {
        status.className = 'alert alert-info mb-3';
        status.textContent = `${count} van de 3 velden zijn ingevuld.`;
    } else {
        status.className = 'alert alert-success mb-3';
        status.textContent = 'Alle velden zijn ingevuld 🎉';
    }
}
function m8_updateSummary() {
    const summary = document.getElementById('m8_summary');
    const allValid = m8_countValidFields() === 3;
    if (!allValid) {
        summary.innerHTML =
            '<li class="text-muted">Samenvatting verschijnt zodra alle velden geldig zijn.</li>';
        return;
    }
    const titleVal = document.getElementById('m8_title').value.trim();
    const descVal = document.getElementById('m8_desc').value.trim();
    const emailVal = document.getElementById('m8_email').value.trim();
    summary.innerHTML = `
 <li><strong>Titel:</strong> ${titleVal}</li>
 <li><strong>Beschrijving:</strong> ${descVal}</li>
 <li><strong>E-mail:</strong> ${emailVal}</li>
 `;
}
function m8_onFieldChange() {
    m8_updateFieldFeedback();
    m8_updateStatus();
    m8_updateSummary();
    }

// Focus-highlights
function m8_addFocusHighlight(groupId) {
    const group = document.getElementById(groupId);
    group.classList.add('border-primary', 'border-2', 'bg-white');
}
function m8_removeFocusHighlight(groupId) {
    const group = document.getElementById(groupId);
    group.classList.remove('border-primary', 'border-2', 'bg-white');
}
function m8_focusFirstInvalidField() {
    const status = document.getElementById('m8_status');
    if (m8_countValidFields() === 3) {
        status.className = 'alert alert-success mb-3';
        status.textContent = 'Alles is in orde, geen lege velden meer.';
        return;
    }
    status.className = 'alert alert-warning mb-3';
    status.textContent =
        'Je hebt nog onvolledige velden. We hebben je naar het eerste lege veld gebracht.';
    // Zoek eerste ongeldige veld in vaste volgorde
    if (!m8_isTitleValid()) {
        document.getElementById('m8_title').focus();
        return;
    }
    if (!m8_isDescValid()) {
        document.getElementById('m8_desc').focus();
        return;
    }
    if (!m8_isEmailValid()) {
        document.getElementById('m8_email').focus();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('m8_title');
    const desc = document.getElementById('m8_desc');
    const email = document.getElementById('m8_email');
    // Input / wijziging events
    title?.addEventListener('input', m8_onFieldChange);
    desc?.addEventListener('input', m8_onFieldChange);
    email?.addEventListener('input', m8_onFieldChange);
    // Focus & blur events voor highlight rond de groepen
    title?.addEventListener('focus', () =>
        m8_addFocusHighlight('m8_group_title'));
    title?.addEventListener('blur', () =>
        m8_removeFocusHighlight('m8_group_title'));
    desc?.addEventListener('focus', () =>
        m8_addFocusHighlight('m8_group_desc'));
    desc?.addEventListener('blur', () =>
        m8_removeFocusHighlight('m8_group_desc'));
    email?.addEventListener('focus', () =>
        m8_addFocusHighlight('m8_group_email'));
    email?.addEventListener('blur', () =>
        m8_removeFocusHighlight('m8_group_email'));
    // Knop voor eerste lege veld
    document
        .getElementById('m8_focus_btn')
        ?.addEventListener('click', m8_focusFirstInvalidField);
    // Initiele status
    m8_onFieldChange();
});





// oefening M9
// Oefening M9 — Live Form Feedback & Validatie
//--------------------------------------------
function m9_isNameValid() {
    const value = document.getElementById('m9_name').value.trim();
    return value.length >= 2;
}
function m9_isEmailValid() {
    const value = document.getElementById('m9_email').value.trim();
    return value.includes('@') && value.includes('.');
}
function m9_isMsgValid() {
    const value = document.getElementById('m9_msg').value.trim();
    return value.length >= 10;
}
function m9_updateSingleField(fieldId, helpId, isValidFn, invalidText,
                              validText) {
    const field = document.getElementById(fieldId);
    const help = document.getElementById(helpId);
    const isValid = isValidFn();
    if (isValid) {
        help.className = 'form-text text-success';
        help.textContent = validText;
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    } else {
        help.className = 'form-text text-danger';
        help.textContent = invalidText;
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
    }
}
function m9_updateAllFieldFeedback() {
    m9_updateSingleField(
        'm9_name',
        'm9_name_help',
        m9_isNameValid,
        'Naam is verplicht (minstens 2 tekens).',
        'Naam is ok.'
    );
    m9_updateSingleField(
        'm9_email',
        'm9_email_help',
        m9_isEmailValid,
        'E-mailadres lijkt ongeldig.',
        'E-mailadres lijkt geldig.'
    );
    m9_updateSingleField(
        'm9_msg',
        'm9_msg_help',
        m9_isMsgValid,
    );
    'Bericht is te kort (minstens 10 tekens).',
        'Bericht is lang genoeg.'
}
function m9_allValid() {
    return m9_isNameValid() && m9_isEmailValid() && m9_isMsgValid();
}
function m9_updateSummary() {
    const summary = document.getElementById('m9_summary');
    if (!m9_allValid()) {
        summary.innerHTML =
            '<li class="text-muted">Samenvatting verschijnt wanneer het formulier geldig is verzonden.</li>';
        return;
    }
    const nameVal = document.getElementById('m9_name').value.trim();
    const emailVal = document.getElementById('m9_email').value.trim();
    const msgVal = document.getElementById('m9_msg').value.trim();
    summary.innerHTML = `
 <li><strong>Naam:</strong> ${nameVal}</li>
 <li><strong>E-mailadres:</strong> ${emailVal}</li>
 <li><strong>Bericht:</strong> ${msgVal}</li>
 `;
}
function m9_handleSubmit(event) {
    event.preventDefault();
    const status = document.getElementById('m9_status');
    // Valideer alles nog eens
    m9_updateAllFieldFeedback();
    if (!m9_allValid()) {
        status.className = 'alert alert-warning mb-3';
        status.textContent =
            'Er zijn nog fouten in het formulier. Controleer de gemarkeerde velden.';
        m9_updateSummary();
        return;
    }
    status.className = 'alert alert-success mb-3';
    status.textContent = 'Formulier is geldig en werd virtueel verzonden.';
    m9_updateSummary();
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('m9_form');
    const nameField = document.getElementById('m9_name');
    const emailField = document.getElementById('m9_email');
    const msgField = document.getElementById('m9_msg');
    // Live feedback tijdens het typen
    nameField?.addEventListener('input', () => {
        m9_updateSingleField(
            'm9_name',
            'm9_name_help',
            m9_isNameValid,
            'Naam is verplicht (minstens 2 tekens).',
            'Naam is ok.'
        );
    });
    emailField?.addEventListener('input', () => {
        m9_updateSingleField(
            'm9_email',
            'm9_email_help',
            m9_isEmailValid,
            'E-mailadres lijkt ongeldig.',
            'E-mailadres lijkt geldig.'
        );
    });
    msgField?.addEventListener('input', () => {
        m9_updateSingleField(
            'm9_msg',
            'm9_msg_help',
            m9_isMsgValid,
            'Bericht is te kort (minstens 10 tekens).',
            'Bericht is lang genoeg.'
        );
    });
    // Blur-events (nog eens checken bij verlaten veld)
    nameField?.addEventListener('blur', m9_updateAllFieldFeedback);
    emailField?.addEventListener('blur', m9_updateAllFieldFeedback);
    msgField?.addEventListener('blur', m9_updateAllFieldFeedback);
    // Submit-event
    form?.addEventListener('submit', m9_handleSubmit);
    // Init
    m9_updateAllFieldFeedback();
    m9_updateSummary();
});




// oefening M10
// Oefening M10 — Toetsenbord- & Sneltoetsmonitor
//--------------------------------------------
let m10_enterCount = 0;
let m10_escapeCount = 0;
let m10_spaceCount = 0;
let m10_arrowCount = 0;
function m10_updateDisplay(event) {
    const display = document.getElementById('m10_key_display');
    const keyVal = document.getElementById('m10_key_value');
    const keyCode = document.getElementById('m10_key_code');
    const modifiers = document.getElementById('m10_modifiers');
    const keyText = event.key === ' ' ? 'Space' : event.key;
    display.textContent = keyText;
    keyVal.textContent = keyText;
    keyCode.textContent = event.code;
    const items = [];
    if (event.ctrlKey) items.push('Ctrl ingedrukt');
    if (event.altKey) items.push('Alt ingedrukt');
    if (event.shiftKey) items.push('Shift ingedrukt');
    if (items.length === 0) {
        modifiers.innerHTML = '<li>Geen modifier keys actief.</li>';
    } else {
        modifiers.innerHTML = items.map(text => `<li>${text}</li>`).join('');
    }
}
function m10_updateCounters(event) {
    const enterEl = document.getElementById('m10_enter_count');
    const escapeEl = document.getElementById('m10_escape_count');
    const spaceEl = document.getElementById('m10_space_count');
    const arrowEl = document.getElementById('m10_arrow_count');
    switch (event.key) {
        case 'Enter':
            m10_enterCount++;
            enterEl.textContent = m10_enterCount;
            break;
        case 'Escape':
            m10_escapeCount++;
            escapeEl.textContent = m10_escapeCount;
            break;
        case ' ':
            m10_spaceCount++;
            spaceEl.textContent = m10_spaceCount;
            break;
        default:
            break;
    }
    if (
        event.code === 'ArrowLeft' ||
        event.code === 'ArrowRight' ||
        event.code === 'ArrowUp' ||
        event.code === 'ArrowDown'
    ) {
        m10_arrowCount++;
        arrowEl.textContent = m10_arrowCount;
    }
}
function m10_resetStats() {
    m10_enterCount = 0;
    m10_escapeCount = 0;
    m10_spaceCount = 0;
    m10_arrowCount = 0;
    document.getElementById('m10_enter_count').textContent = '0';
    document.getElementById('m10_escape_count').textContent = '0';
    document.getElementById('m10_space_count').textContent = '0';
    document.getElementById('m10_arrow_count').textContent = '0';
}
function m10_updateShortcutStatus(text, type) {
    const status = document.getElementById('m10_shortcut_status');
    status.className = `alert alert-${type} mb-0`;
    status.textContent = text;
}
function m10_checkShortcut(event) {
    const shortcutMode = document.getElementById('m10_shortcut_mode');
    const enabled = shortcutMode.checked;
    if (!enabled) {
        m10_updateShortcutStatus('Sneltoetsmodus staat uit.', 'secondary');
        return;
    }
    // Standaard: geen bekende sneltoets
    let handled = false;
    // Ctrl + S
    if (event.ctrlKey && !event.shiftKey && !event.altKey && (event.key === 's'
        || event.key === 'S')) {
        event.preventDefault();
        m10_updateShortcutStatus('Sneltoets gedetecteerd: Ctrl + S (Opslaan)',
            'success');
        handled = true;
    }
    // Ctrl + P
    if (event.ctrlKey && !event.shiftKey && !event.altKey && (event.key === 'p'
        || event.key === 'P')) {
        event.preventDefault();
        m10_updateShortcutStatus('Sneltoets gedetecteerd: Ctrl + P (Printen)',
            'success');
        handled = true;
    }
    // Ctrl + Shift + N
    if (
        event.ctrlKey &&
        event.shiftKey &&
        !event.altKey &&
        (event.key === 'n' || event.key === 'N')
    ) {
        event.preventDefault();
        m10_updateShortcutStatus('Sneltoets gedetecteerd: Ctrl + Shift + N (Nieuw venster)', 'success');
        handled = true;
    }
    if (!handled) {
        m10_updateShortcutStatus('Geen bekende sneltoets.', 'info');
    }
}
function m10_handleKeyDown(event) {
    m10_updateDisplay(event);
    m10_updateCounters(event);
    m10_checkShortcut(event);
}
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', m10_handleKeyDown);
    document.getElementById('m10_reset_stats')?.addEventListener('click', () =>
    {
        m10_resetStats();
    });
    // Init shortcut status
    m10_updateShortcutStatus('Sneltoetsmodus staat uit.', 'secondary');
    document.getElementById('m10_shortcut_mode')?.addEventListener('change', () => {
        const shortcutMode = document.getElementById('m10_shortcut_mode');
        if (shortcutMode.checked) {
            m10_updateShortcutStatus('Sneltoetsmodus is ingeschakeld. Probeer Ctrl+S, Ctrl+P of Ctrl+Shift+N.', 'info');
        } else {
            m10_updateShortcutStatus('Sneltoetsmodus staat uit.', 'secondary');
        }
    });
});




// Oefening M11 — Geboortedag & Verjaardagsinfo
//---------------------------------------------------
const M11_DAYS = [
    'Zondag',
    'Maandag',
    'Dinsdag',
    'Woensdag',
    'Donderdag',
    'Vrijdag',
    'Zaterdag'
];

function m11_calculateInfo(dateStr) {
    const birth = new Date(dateStr);
    const now = new Date();
    if (Number.isNaN(birth.getTime())) {
        return null;
    }
    // Leeftijd
    let age = now.getFullYear() - birth.getFullYear();
    const hasHadBirthdayThisYear =
        now.getMonth() > birth.getMonth() ||
        (now.getMonth() === birth.getMonth() && now.getDate() >=
            birth.getDate());
    if (!hasHadBirthdayThisYear) {
        age--;
    }
    // Dag van de week
    const dayName = M11_DAYS[birth.getDay()];
    // Volgende verjaardag (huidig jaar of volgend jaar)
    let nextBirthday = new Date(
        now.getFullYear(),
        birth.getMonth(),
        birth.getDate()
    );
    if (nextBirthday < now) {
        nextBirthday = new Date(
            now.getFullYear() + 1,
            birth.getMonth(),
            birth.getDate()
        );
    }
    // Dagen tot volgende verjaardag
    const diffMs = nextBirthday - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return {
        age,
        dayName,
        nextBirthday,
        diffDays
    };
}

function m11_updateUI(result) {
    const status = document.getElementById('m11_status');
    const summary = document.getElementById('m11_summary');
    if (!result) {
        status.className = 'alert alert-warning mb-3';
        status.textContent = 'Vul een geldige geboortedatum in.';
        summary.innerHTML =
            '<li class="text-muted">Samenvatting verschijnt zodra een geldige geboortedatum is berekend.</li>';
        return;
    }
    const {age, dayName, nextBirthday, diffDays} = result;
    status.className = 'alert alert-success mb-3';
    status.textContent = `Je bent ongeveer ${age} jaar oud. Je bent geboren op een ${dayName}.`;
    const nextBirthdayStr = nextBirthday.toLocaleDateString();
    summary.innerHTML = `
 <li><strong>Leeftijd:</strong> ${age} jaar</li>
 <li><strong>Geboortedag:</strong> ${dayName}</li>
 <li><strong>Volgende verjaardag:</strong> ${nextBirthdayStr}</li>
 <li><strong>Dagen tot volgende verjaardag:</strong> ${diffDays}</li>
 `;
}

function m11_handleClick() {
    const input = document.getElementById('m11_date');
    const value = input.value;
    if (!value) {
        m11_updateUI(null);
        return;
    }
    const result = m11_calculateInfo(value);
    m11_updateUI(result);
}


document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('m11_btn');
    const input = document.getElementById('m11_date');
    btn?.addEventListener('click', m11_handleClick);
    // Optioneel: bij Enter in het datumveld ook berekenen
    input?.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            m11_handleClick();
        }
    });
});




// oefening M12
// Oefening M12 — Gebruikers en admins met ES6 classes
//-------------------------------------------------------
class M12User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.role = 'User';
    }

    getLabel() {
        return `${this.name} (${this.age}) is een gewone gebruiker.`;
    }
}

class M12Admin extends M12User {
    constructor(name, age) {
        super(name, age);
        this.role = 'Admin';
    }

    getLabel() {
        return `${this.name} (${this.age}) is administrator.`;
    }
}

const m12_accounts = [];

function m12_updateCounters() {
    const totalEl = document.getElementById('m12_total_count');
    const userEl = document.getElementById('m12_user_count');
    const adminEl = document.getElementById('m12_admin_count');
    const total = m12_accounts.length;
    const users = m12_accounts.filter(acc => acc.role === 'User').length;
    const admins = m12_accounts.filter(acc => acc.role === 'Admin').length;
    totalEl.textContent = total;
    userEl.textContent = users;
    adminEl.textContent = admins;
}

function m12_renderList() {
    const list = document.getElementById('m12_list');
    if (m12_accounts.length === 0) {
        list.innerHTML = `
                                                             <div class="col-12">
                                                             <p class="text-muted mb-0">
                                                             Nog geen accounts aangemaakt, vul het formulier in en klik op "Maak
                                                            account".
                                                             </p>
                                                             </div>
                                                             `;
        return;
    }
    list.innerHTML = m12_accounts
        .map(acc => {
            const isAdmin = acc.role === 'Admin';
            const badgeClass = isAdmin ? 'bg-danger' : 'bg-secondary';
            const roleText = isAdmin ? 'Admin' : 'User';
            return `
                                                             <div class="col-md-6 col-lg-4">
                                                             <div class="card h-100 shadow-sm">
                                                             <div class="card-body d-flex flex-column">
                                                             <div class="d-flex justify-content-between align-items-start
                                                             mb-2">
                                                             <h5 class="card-title mb-0">${acc.name}</h5>
                                                             <span class="badge ${badgeClass}">${roleText}</span>
                                                             </div>
                                                             <p class="card-text mb-1">
                                                             Leeftijd: <strong>${acc.age}</strong>
                                                             </p>
                                                             <p class="card-text small text-muted mt-auto">
                                                             ${acc.getLabel()}
                                                             </p>
                                                             </div>
                                                             </div>
                                                             </div>
                                                             `;
        })
        .join('');
}

function m12_addAccount() {
    const nameInp = document.getElementById('m12_name');
    const ageInp = document.getElementById('m12_age');
    const roleSel = document.getElementById('m12_role');
    const name = nameInp.value.trim();
    const age = Number(ageInp.value);
    const role = roleSel.value;
    if (!name || !age || age <= 0) {
        alert('Vul een geldige naam en leeftijd in.');
        return;
    }
    let account;
    if (role === 'admin') {
        account = new M12Admin(name, age);
    } else {
        account = new M12User(name, age);
    }
    m12_accounts.push(account);
    m12_updateCounters();
    m12_renderList();
    // Formulier resetten
    nameInp.value = '';
    ageInp.value = '';
    roleSel.value = 'user';
    nameInp.focus();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('m12_add')?.addEventListener('click', m12_addAccount);
    m12_updateCounters();
    m12_renderList();
});




// oefening M13
// oefening M13
//---------------------------------------------------
// Oefening M13- Productcatalogus met filters
//---------------------------------------------------
// ES6 class voor een product
class M13Product {
    constructor(name, category, price, description) {
        this.name = name;
        this.category = category; // 'books', 'courses', 'software'
        this.price = price;
        // number
        this.description = description;
    }
}

// Vooraf gedefinieerde lijst met producten
const m13_allProducts = [
    new M13Product(
        'JavaScript Basis',
        'books',
        29.99,
        'Boek voor absolute beginners in JavaScript.'
    ),
    new M13Product(
        'Geavanceerde JavaScript Patterns',
        'books',
        49.5,
        'Voor ontwikkelaars die hun JS kennis willen verdiepen.'
    ),
    new M13Product(
        'Online cursus HTML en CSS',
        'courses',
        39,
        'Stapsgewijze videoreeks om webpagina s te leren bouwen.'
    ),
    new M13Product(
        'Full Stack traject',
        'courses',
        99,
        'Een traject dat front end en back end combineert.'
    ),
    new M13Product(
        'Task Manager App',
        'software',
        15,
        'Eenvoudige tool om dagelijkse taken bij te houden.'
    ),
    new M13Product(
        'Budget Planner',
        'software',
        9.99,
        'Software om inkomsten en uitgaven overzichtelijk te beheren.'
    )
];

// Kleine helper om een nette categorie naam te tonen
function m13_categoryLabel(category) {
    switch (category) {
        case 'books':
            return 'Boek';
        case 'courses':
            return 'Cursus';
        case 'software':
            return 'Software';
        default:
            return category;
    }
}

// Helper voor badge klasse op basis van categorie
function m13_categoryBadgeClass(category) {
    switch (category) {
        case 'books':
            return 'bg-outline-secondary border text-muted';
        case 'courses':
            return 'bg-primary text-white';
        case 'software':
            return 'bg-info text-dark';
        default:
            return 'bg-light text-muted';
    }
}

// Producten tekenen
function m13_renderProducts(products, isFiltered) {
    const container = document.getElementById('m13_products');
    const status = document.getElementById('m13_status');
    if (!products || products.length === 0) {
        container.innerHTML = '';
        status.className = 'alert alert-warning mb-3';
        status.textContent = 'Geen producten gevonden met deze filter.';
        return;
    }
    // Als er gefilterd is, tonen we de hoeveelheid
    if (isFiltered) {
        status.className = 'alert alert-success mb-3';
        status.textContent = `Gevonden producten: ${products.length}`;
    } else {
        status.className = 'alert alert-secondary mb-3';
        status.textContent = 'Er worden momenteel alle producten getoond.';
    }
    container.innerHTML = products
        .map(product => {
            const badgeClass = m13_categoryBadgeClass(product.category);
            const catLabel = m13_categoryLabel(product.category);
            return `
                                 <div class="col-md-6 col-lg-4">
                                 <div class="card h-100 shadow-sm">
                                 <div class="card-body d-flex flex-column">
                                 <div class="d-flex justify-content-between align-items-start
                                 mb-2">
                                 <h5 class="card-title mb-0">${product.name}</h5>
                                 <span class="badge ${badgeClass}">${catLabel}</span>
                                 </div>
                                 <p class="card-text mb-2">${product.description}</p>
                                 <p class="mt-auto fw-bold">
                                 €${product.price.toFixed(2)}
                                 </p>
                                 </div>
                                 </div>
                                 </div>
                                 `;
        })
        .join('');
}



// Filter toepassen op basis van de input
function m13_applyFilter() {
    const catSelect = document.getElementById('m13_cat');
    const maxPriceInput = document.getElementById('m13_max');
    const selectedCategory = catSelect.value; // 'all', 'books', ...
    const maxPriceStr = maxPriceInput.value.trim();
    const maxPrice = maxPriceStr ? Number(maxPriceStr) : null;
    let filtered = m13_allProducts.slice();
    // Categorie filter
    if (selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === selectedCategory);
    }
    // Prijs filter
    if (maxPrice !== null && !Number.isNaN(maxPrice) && maxPrice >= 0) {
        filtered = filtered.filter(p => p.price <= maxPrice);
    }
    const isFiltered =
        selectedCategory !== 'all' || (maxPrice !== null
            && !Number.isNaN(maxPriceStr));
    m13_renderProducts(filtered, isFiltered);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initieel alle producten tonen
    m13_renderProducts(m13_allProducts, false);
    // Filter knop koppelen
    document.getElementById('m13_filter')?.addEventListener('click',
        m13_applyFilter);
    // Optional: filter ook bij Enter in het prijsveld
    document.getElementById('m13_max')?.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            m13_applyFilter();
        }
    });
});


// oefening M14
// Oefening M14 — Rick & Morty Mini-Viewer (clean version)
//-----------------------------------------------------
let m14_characters = [];
let m14_filtered = [];

function m14_setStatus(msg, type = "secondary") {
    const box = document.getElementById("m14_status");
    box.className = `alert alert-${type} mb-3`;
    box.textContent = msg;
}

function m14_renderCards(list) {
    const container = document.getElementById("m14_cards");
    if (!list || list.length === 0) {
        container.innerHTML = "";
        return;
    }
    container.innerHTML = list
        .map(ch => {
            return `
                         <div class="col-md-6 col-lg-4">
                         <div class="card h-100 shadow-sm">
                         <img src="${ch.image}" class="card-img-top" alt="${ch.name}">
                         <div class="card-body">
                         <h5 class="card-title">${ch.name}</h5>
                         <p class="card-text mb-1">
                         <strong>Status:</strong> ${ch.status}
                         </p>
                         <p class="card-text mb-1">
                         <strong>Soort:</strong> ${ch.species}
                         </p>
                         <p class="card-text mb-0">
                        <strong>Locatie:</strong> ${ch.location.name}
                         </p>
                         </div>
                         </div>
                         </div>
                         `;
        })
        .join("");
}

async function m14_loadCharacters() {
    const url = "https://rickandmortyapi.com/api/character/?page=1";
    m14_setStatus("Bezig met laden…", "warning");
    document.getElementById("m14_cards").innerHTML = "";
    document.getElementById("m14_search").disabled = true;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("HTTP fout");
        const data = await res.json();
        m14_characters = data.results;
        m14_filtered = [...m14_characters];
        m14_renderCards(m14_filtered);
        m14_setStatus("20 personages geladen.", "success");
        document.getElementById("m14_search").disabled = false;
    } catch (err) {
        m14_setStatus("Er ging iets mis bij het laden.", "danger");
    }
}

function m14_applyFilter() {
    const search =
        document.getElementById("m14_search").value.trim().toLowerCase();
    if (!search) {
        m14_filtered = [...m14_characters];
        m14_setStatus("20 personages geladen.", "success");
        m14_renderCards(m14_filtered);
        return;
    }
    m14_filtered = m14_characters.filter(ch =>
        ch.name.toLowerCase().includes(search)
    );
    if (m14_filtered.length === 0) {
        m14_setStatus("Geen resultaten voor deze zoekopdracht.", "info");
    } else {
        m14_setStatus(`${m14_filtered.length} resultaten gevonden.`, "success");
    }
}

m14_renderCards(m14_filtered);
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("m14_load")?.addEventListener("click",
        m14_loadCharacters);
    document.getElementById("m14_search")?.addEventListener("input",
        m14_applyFilter);
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














