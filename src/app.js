import { html, render } from 'https://unpkg.com/lit-html?module';
import { Home } from './home.js';
import { Contact, attachContactEvents } from './contact.js';

particlesJS.load('particles-js', './particles.json');

const root = document.getElementById('root');

function navigate(path) {
  switch (path) {
    case '#/contact':
      render(Contact(), root);
      attachContactEvents();
      break;
    case '#/home':
    case '':
    case '#':
    default:
      render(Home(), root);
      attachHomeEvents();
      break;
  }
}

window.addEventListener('hashchange', () => {
  navigate(location.hash);
});

// При зареждане на страницата
document.addEventListener('DOMContentLoaded', () => {
  navigate(location.hash || '#/home');
});


function attachHomeEvents() {
  const contactIcon = document.querySelector('.social-icons a[title="Email"]');
  if (contactIcon) {
    contactIcon.addEventListener('click', (e) => {
      e.preventDefault();
      location.hash = '#/contact';
    });
  }
}

function attachContactEventsBackButton() {
  const backBtn = document.getElementById('go-home');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      location.hash = '#/home';
    });
  }
}