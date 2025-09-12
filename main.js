// Toggle mobile menu
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const navList = document.getElementById('nav-list');
  menuBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
  });

  // Fade-in on scroll
  const faders = document.querySelectorAll('.fade-in');
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, options);
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // WhatsApp button (optional pulse animation on hover)
  const waBtn = document.querySelector('.whatsapp-btn');
  waBtn.addEventListener('mouseenter', () => waBtn.classList.add('pulse'));
  waBtn.addEventListener('mouseleave', () => waBtn.classList.remove('pulse'));
});
