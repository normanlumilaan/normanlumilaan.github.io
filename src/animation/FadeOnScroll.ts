"use strict";

import { ScrollAnimation } from "./ScrollAnimation";

export class FadeOnScroll extends ScrollAnimation {
  readonly name = "fade-on-scroll";

  private itemScrollHeight: number = 0;
  private totalScrollHeight: number = 0;

  constructor(
    private container: HTMLElement,
    private items: NodeListOf<HTMLElement>
  ) {
    super();
  }

  private setItemVisibility(elem: HTMLElement, opacityRaw: number): void {
    const opacity = opacityRaw.toFixed(2);
    const visibility = opacityRaw === 0 ? "hidden" : "visible";

    requestAnimationFrame(() => {
      Object.assign(elem.style, {
        opacity,
        visibility,
      });
      elem.setAttribute("aria-hidden", opacityRaw === 0 ? "true" : "false");
    });
  }

  private calculate() {
    const itemHeight = Math.floor(
      this.container.getBoundingClientRect().height
    );
    this.itemScrollHeight = itemHeight;
    this.totalScrollHeight = itemHeight * this.items.length;
  }

  animateScrollY(scrollTop: number): void {
    if (scrollTop < 0) return;
    const activeItemIndex = Math.floor(scrollTop / this.itemScrollHeight);
    const itemScrollProgress =
      (scrollTop % this.itemScrollHeight) / this.itemScrollHeight;

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      let opacity = 0;

      if (i === activeItemIndex) {
        opacity = 1 - itemScrollProgress;
      } else if (i === activeItemIndex + 1) {
        opacity = itemScrollProgress;
      }

      this.setItemVisibility(item, opacity);
    }
  }

  init(): boolean {
    if (this.scrollable === null) {
      this.scrollable = this.container;
    }

    this.container.classList.add(`${this.name}__container`);

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      item.classList.add(`${this.name}__frame`);
      this.setItemVisibility(item, i > 0 ? 0 : 1);
    }

    this.calculate();

    if (this.scrollable instanceof HTMLElement) {
      this.scrollable.style.height = `${this.totalScrollHeight}px`;
    } else {
      document.documentElement.style.height = `${this.totalScrollHeight}px`;
    }

    this.getScrollTop = this.setGetScrollTop(this.scrollable);
    this.onScrollY();
    return true;
  }
}

export default FadeOnScroll;
