import { html, render } from 'https://unpkg.com/lit-html?module';

import { Home } from './home.js';


particlesJS.load('particles-js', '../particles.json');

const root = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
  render(Home(), root);
});
