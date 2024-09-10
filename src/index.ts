//import "./animate/animate-on-scroll";
import { AnimateOnScroll } from "./animate/AnimateOnScroll";
import { FadeOnScroll } from "./animate/FadeOnScroll";

window.addEventListener("load", () => {
  /** Move to main.ts */
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
