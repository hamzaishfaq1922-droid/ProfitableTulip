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