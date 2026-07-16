const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const backToTop = document.querySelector('.back-to-top');
const header = document.querySelector('.site-header');
const progressBar = document.querySelector('.scroll-progress span');

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

const counterObserver = new IntersectionObserver((entries, activeObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('[data-count]').forEach((counter) => {
      const target = Number(counter.dataset.count);
      const duration = 900;
      const startedAt = performance.now();
      const updateCount = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        counter.textContent = Math.round(target * (1 - (1 - progress) ** 3));
        if (progress < 1) requestAnimationFrame(updateCount);
      };
      requestAnimationFrame(updateCount);
    });
    activeObserver.unobserve(entry.target);
  });
}, { threshold: 0.45 });

document.querySelectorAll('.stat-row').forEach((row) => counterObserver.observe(row));

window.addEventListener('scroll', () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progressBar.style.width = `${scrollProgress}%`;
  header.classList.toggle('scrolled', window.scrollY > 24);
  backToTop.classList.toggle('visible', window.scrollY > 700);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
