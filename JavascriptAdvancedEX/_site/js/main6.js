//import van onze custom css
import '../scss/styles.scss'
//import all of bootstrap zijn js
import * as bootstrap from 'bootstrap'
//import van eigen css imagecontrol
import '../css/style.css'

//eigen js
// zesde main voor verdeling van de scripten


// Skeleton Placeholder zie pag 131
function skeletonUI() {
    return `
             <div class="mb-2 skeleton" style="height: 25px; width: 60%;"></div>
             <div class="mb-2 skeleton" style="height: 18px; width: 90%;"></div>
             <div class="mb-2 skeleton" style="height: 18px; width: 80%;"></div>
             <div class="mb-2 skeleton" style="height: 18px; width: 70%;"></div>
             `;
}

//------------------------------------------------------
//------------------------------------------------------
// Hoofdstuk 31: Promise.all + Skeleton Loading
//------------------------------------------------------
async function loadUserAndPosts() {
    const out = document.getElementById("multi_output");
    // skeleton
    out.innerHTML = skeletonUI();
    try {
        const [userRes, postsRes] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users/1"),
            fetch("https://jsonplaceholder.typicode.com/posts?userId=1"),
            // 3. WACHT 5 seconden → skeleton blijft zichtbaar
            await new Promise(resolve => setTimeout(resolve, 5000))
        ]);

        if (!userRes.ok || !postsRes.ok) throw new Error("API fout");
        const user = await userRes.json();
        const posts = await postsRes.json();
        out.innerHTML = `
                                         <div class="alert alert-success">
                                         👤 <strong>${user.name}</strong> (${user.email})
                                         </div>
                                         <h6>📬 Laatste posts:</h6>
                                         <ul class="list-group">
                                         ${posts.slice(0, 3).map(p => `<li class="list-group-item">${p.title}</li>`).join("")}
                                         </ul>
                                         `;
    } catch {
        out.innerHTML = `
                                         <div class="alert alert-danger">
                                         ❌ Kon data niet laden, probeer opnieuw
                                         </div>
                                         `;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("multi_btn")
        ?.addEventListener("click", loadUserAndPosts);
});





//oefening p134
// Imports van onze modules
import { fetchUser } from "./services/apiService.js";
import { userCard } from "./components/userCard.js";
import { capitalize } from "./utils/format.js";
// DOM
document.addEventListener("DOMContentLoaded", async () => {
    const out = document.getElementById("mod_out");
    out.textContent = "⏳ Laden...";
    try {
        const user = await fetchUser(1);
        out.innerHTML = userCard(user);
        console.log(capitalize("module systeem actief!"));
    } catch {
        out.innerHTML = `<div class="alert alert-danger">❌ Kon user niet
 laden</div>`;
    }
});






// oefening p138
import {productCard} from "./components/productCard.js";
import {skeletonCard} from "./components/skeletonCard.js";
import {getLocalProducts} from "./services/productService.js";
import {getRecommendations} from "./services/recommendService.js";
import {saveCart, loadCart} from "./utils/storage.js";

let cart = loadCart();

function updateCartBadge() {
    document.getElementById("cart_badge").textContent = cart.length;
}

async function loadProducts() {
    const cont = document.getElementById("product_list");
    cont.innerHTML = skeletonCard().repeat(4);
    try {
        const data = await getLocalProducts();
        cont.innerHTML = data.map(productCard).join("");
    } catch {
        cont.innerHTML = `<div class="alert alert-danger">❌ Producten konden
                 niet geladen worden</div>`;
    }
}

async function loadRecommendations() {
    const cont = document.getElementById("rec_list");
    cont.innerHTML = skeletonCard().repeat(3);
    try {
        const rec = await getRecommendations();

        cont.innerHTML = rec.slice(0, 3)
            .map(r => productCard({name: r.show.name, price: 0}, 0))
            .join("");
    } catch {
        cont.innerHTML = `<div class="alert alert-warning">⚠️ Aanraders niet
                 beschikbaar</div>`;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    updateCartBadge();
    loadProducts();
    loadRecommendations();
    document.body.addEventListener("click", e => {
        if (e.target.classList.contains("add_cart_btn")) {
            const idx = e.target.dataset.idx;
            cart.push(idx);
            saveCart(cart);
            updateCartBadge();
        }
    });
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