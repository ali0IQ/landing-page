// =====================
// MOBILE MENU
// =====================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}


// =====================
// CART SYSTEM
// =====================

let cart = [];

const cartCount = document.getElementById("cart-count");
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");

const buttons = document.querySelectorAll(".add-to-cart");


// =====================
// LOAD CART (localStorage)
// =====================
function loadCart() {
    const data = localStorage.getItem("cart");

    if (data) {
        try {
            cart = JSON.parse(data);
        } catch (e) {
            cart = [];
        }
    }
}


// =====================
// SAVE CART
// =====================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// =====================
// RENDER CART
// =====================
function renderCart() {

    if (!cartList || !cartTotal || !cartCount) return;

    cartList.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        count += item.qty;

        const li = document.createElement("li");

        li.innerHTML = `
            ${item.name} - $${item.price} x${item.qty}
            <button onclick="removeItem(${index})">❌</button>
            <button onclick="increase(${index})">+</button>
            <button onclick="decrease(${index})">-</button>
        `;

        cartList.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = count;

    saveCart();
}


// =====================
// ADD TO CART
// =====================
buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        const name = btn.dataset.name;
        const price = Number(btn.dataset.price);

        if (!name || !price) return;

        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.qty++;
        } else {
            cart.push({
                name,
                price,
                qty: 1
            });
        }

        renderCart();
    });
});


// =====================
// CART ACTIONS
// =====================
window.removeItem = function(index) {
    cart.splice(index, 1);
    renderCart();
};

window.increase = function(index) {
    cart[index].qty++;
    renderCart();
};

window.decrease = function(index) {
    cart[index].qty--;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    renderCart();
};


// =====================
// INIT
// =====================
loadCart();
renderCart();

const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartOverlay = document.getElementById("cart-overlay");
const closeCart = document.getElementById("close-cart");

// open cart
cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cartModal.classList.add("active");
    cartOverlay.classList.add("active");
});

// close cart
function close() {
    cartModal.classList.remove("active");
    cartOverlay.classList.remove("active");
}

closeCart.addEventListener("click", close);
cartOverlay.addEventListener("click", close);