// 🟢 Toggle Hamburger Menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* 🟢 Smooth Scroll Animation Function */
function smoothScrollTo(targetY, duration = 700) {
  const startY = window.pageYOffset;
  const diff = targetY - startY;
  let startTime = null;

  function animationStep(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    // Ease in-out curve
    const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
    window.scrollTo(0, startY + diff * ease);
    if (progress < 1) requestAnimationFrame(animationStep);
  }

  requestAnimationFrame(animationStep);
}

/* 🟢 Smooth Scroll for <a href="#..."> links */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id && id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.pageYOffset;
        smoothScrollTo(y, 700);
      }
    }
  });
});

/* 🟢 Smooth Scroll for Arrow icons (<img class="arrow">) */
document.querySelectorAll('.arrow').forEach(arrow => {
  arrow.addEventListener('click', e => {
    e.preventDefault();
    // Try to extract the target ID directly from the onclick or data attribute
    let href = arrow.getAttribute('onclick') || "";
    let match = href.match(/#\w+/);
    if (!match) return;
    const target = document.querySelector(match[0]);
    if (target) {
      const y = target.getBoundingClientRect().top + window.pageYOffset;
      smoothScrollTo(y, 700);
    }
  });
});
