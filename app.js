import { render, html } from "https://cdn.jsdelivr.net/npm/lit-html@3.1.2/lit-html.js";
import page from "https://cdn.jsdelivr.net/npm/page/page.mjs";

import { homeView } from "./home.js";



const root = document.getElementById("app");

function renderWithFade(content) {
  root.classList.add("fade-out");
  setTimeout(() => {
    render(content, root);
    root.classList.remove("fade-out");
    root.classList.add("fade-in");
    setTimeout(() => root.classList.remove("fade-in"), 300);
  }, 200);
}

function decorateContext(ctx, next) {
  ctx.render = (content) => renderWithFade(content);
  next();
}

page(decorateContext);
page("/", homeView);


page.start();

document.body.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault();
    page.show(link.getAttribute("href"));
  }
});
