document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.getElementById('navbar');

  if (burger && navLinks) {
    burger.addEventListener('click', () => navLinks.classList.toggle('active'));
    document.querySelectorAll('.nav-links a').forEach(l =>
      l.addEventListener('click', () => navLinks.classList.remove('active'))
    );
  }

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  function openTargetDetails() {
    const id = window.location.hash.replace('#', '');
    const el = document.getElementById(id);
    if (el && el.tagName === 'DETAILS') {
      el.open = true;
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  }
  window.addEventListener('hashchange', openTargetDetails);
  openTargetDetails();
});

function toggleNavItem(e, el) {
  if (window.innerWidth <= 768) {
    e.preventDefault();
    el.parentElement.classList.toggle('open');
  }
}

function copyAndOpenEmail() {
  const email = 'iliyass.meliani@gmail.com';
  const note = document.getElementById('copyNote');
  navigator.clipboard.writeText(email).then(() => {
    if (note) note.textContent = 'Email copié — ouverture de votre client mail...';
  }).catch(() => {
    if (note) note.textContent = 'Ouverture de votre client mail...';
  });
  setTimeout(() => {
    window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent("Projet d'optimisation") +
      '&body=' + encodeURIComponent('Bonjour,\n\nJe souhaite discuter d\'un projet d\'optimisation.\n\n');
  }, 300);
}

function submitContactForm(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const company = form.company.value.trim();
  const email = form.email.value.trim();
  const need = form.need.value;
  const message = form.message.value.trim();

  const subject = 'Nouvelle demande — ' + (company || name || 'site OptiFlux');
  const body =
    'Nom : ' + name + '\n' +
    'Entreprise : ' + company + '\n' +
    'Email : ' + email + '\n' +
    'Type de besoin : ' + need + '\n\n' +
    'Message :\n' + message;

  window.location.href = 'mailto:iliyass.meliani@gmail.com?subject=' +
    encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

  const note = document.getElementById('formNote');
  if (note) note.textContent = "Ouverture de votre client mail avec votre demande pré-remplie...";
  return false;
}
