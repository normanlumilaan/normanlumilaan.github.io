/*
import { AnimateOnScroll } from "./_animate/AnimateOnScroll";
import { FadeOnScroll } from "./_animate/FadeOnScroll";

window.addEventListener("load", () => {

  const html = document.querySelector<HTMLElement>("html");
  const body = document.querySelector<HTMLElement>("body");
  const items = document.querySelectorAll<HTMLElement>(".section");

  if (!html || !body || !items) {
    throw new Error("Scrollable or container items not found");
  }

  const strategy = new FadeOnScroll(html, body, items);
  const animatOnScroll = new AnimateOnScroll(html, strategy);

  animatOnScroll.init();
});

*/

import { Animation } from "./animation/Animation";
import { FadeOnScroll } from "./animation/FadeOnScroll";

window.addEventListener("load", () => {
  const container = document.querySelector<HTMLElement>("body");

  if (!container) {
    console.log("Animation container element not found");
    return;
  }

  const items = container.querySelectorAll<HTMLElement>(".section");

  const fadeonscroll = new FadeOnScroll(container, items);
  const animation = new Animation(fadeonscroll);

  animation.init();
});
