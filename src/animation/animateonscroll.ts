import { Animate } from "./Animate";
import { FadeOnScroll } from "./FadeOnScroll";

window.addEventListener("load", () => {
  const context = document.querySelector<HTMLElement>("body");
  const items = document.querySelectorAll<HTMLElement>(".section");

  if (!context) {
    console.log("Context element not found in DOM");
    return;
  }

  const fadeonscroll = new FadeOnScroll(context, items);
  const animate = new Animate(fadeonscroll);

  fadeonscroll.listenScrollYOn(document);

  animate.init();
});
