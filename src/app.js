import { render } from '../node_modules/lit-html/lit-html.js';
import { Home } from './home.js';


particlesJS.load('particles-js', '../particles.json');

const root = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
  render(Home(), root);
});
