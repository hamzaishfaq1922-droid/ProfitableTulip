// --- 1. Smooth Slide Text Animation (Copyright Safe) ---
const flipTexts = document.querySelectorAll('.flip-text');
let currentTextIndex = 0;

if (flipTexts.length > 0) {
  setInterval(() => {
    flipTexts[currentTextIndex].classList.remove('active');
    currentTextIndex = (currentTextIndex + 1) % flipTexts.length;
    flipTexts[currentTextIndex].classList.add('active');
  }, 2500);
}

// --- 2. Scroll Parallax: Scroll Down = Door hona, Scroll Up = Kareeb aana ---
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const floatingElements = document.querySelectorAll('.floating-element');

  floatingElements.forEach((el, index) => {
    const speed = (index + 1) * 0.3;
    const moveX = (index % 2 === 0 ? 1 : -1) * scrollPosition * speed * 0.4;
    const moveY = scrollPosition * speed * 0.5;

    el.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + scrollPosition * 0.001})`;
  });
});
// --- Mobile Menu Hamburger Toggle Logic ---
const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuBtn && navMenu) {
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Jab kisi link par click ho toh menu close ho jaye
  const navItems = navMenu.querySelectorAll('a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Bahar click karne par bhi menu close ho jaye
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenuBtn.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}
// Add to Cart Function
function addToCart(serviceName) {
  let cart = JSON.parse(localStorage.getItem('tulipCart')) || [];
  cart.push(serviceName);
  localStorage.setItem('tulipCart', JSON.stringify(cart));
  alert(`✅ "${serviceName}" has been added to your cart!`);
  updateCartCounters();
}

// Update Counters on Load
function updateCartCounters() {
  let cart = JSON.parse(localStorage.getItem('tulipCart')) || [];
  document.querySelectorAll('#cart-counter, #cart-counter-2').forEach(el => {
    if(el) el.innerText = cart.length;
  });
}

// Load Cart Items in cart.html
function loadCartPage() {
  let container = document.getElementById('cart-items-container');
  if(!container) return;
  
  let cart = JSON.parse(localStorage.getItem('tulipCart')) || [];
  if(cart.length === 0) {
    container.innerHTML = `<p style="color: var(--text-gray);">Your cart is empty. <a href="services.html" style="color: var(--primary-glow);">Browse Services</a></p>`;
    return;
  }

  let html = '';
  cart.forEach((item, index) => {
    html += `
      <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 0.8rem; border-radius: 10px; margin-bottom: 0.8rem;">
        <span style="color: #fff; font-weight: 600;">${index + 1}. ${item}</span>
        <button onclick="removeItem(${index})" style="background: transparent; border: none; color: #ef4444; cursor: pointer;">❌</button>
      </div>
    `;
  });
  container.innerHTML = html;
}

// Remove Single Item
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('tulipCart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('tulipCart', JSON.stringify(cart));
  loadCartPage();
  updateCartCounters();
}

// Clear Entire Cart
function clearCart() {
  localStorage.removeItem('tulipCart');
  loadCartPage();
  updateCartCounters();
}

// WhatsApp Checkout
function checkoutWhatsApp() {
  let name = document.getElementById('client-name').value;
  let handle = document.getElementById('client-handle').value;
  let cart = JSON.parse(localStorage.getItem('tulipCart')) || [];

  if(!name || !handle) {
    alert('Please fill in your Name and Social Link!');
    return;
  }
  if(cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  let message = `Hello Profitable Tulip! New Order:%0A*Name:* ${name}%0A*Handle:* ${handle}%0A*Selected Services:*%0A`;
  cart.forEach((item, i) => {
    message += `${i+1}. ${item}%0A`;
  });

  let url = `https://wa.me/923230297971?text=${message}`;
  window.open(url, '_blank');
}

// Run on page load
window.onload = function() {
  updateCartCounters();
  loadCartPage();
};
