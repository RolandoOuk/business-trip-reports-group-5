const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const backToTop = document.querySelector('.back-to-top');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const id = entry.target.closest('section[id]')?.id;
      if (id) navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
sections.forEach((section) => observer.observe(section));

window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 700));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
