import { Animation } from "./AnimateOnScroll";

interface AnimationOptions {
  id: string;
}

const defaults: AnimationOptions = {
  id: "fade-on-scroll",
};

export class FadeOnScroll implements Animation {
  private id: string;

  itemScrollHeight: number = 0;
  totalScrollHeight: number = 0;

  constructor(
    private scrollableElem: HTMLElement,
    private itemsContainerElem: HTMLElement,
    private itemElems: NodeListOf<HTMLElement>,
    opts?: AnimationOptions
  ) {
    this.id = opts?.id || defaults.id;
  }

  private calculateDimensions(): void {
    this.itemScrollHeight = Math.floor(
      this.itemElems[0]!.getBoundingClientRect().height
    );
    this.totalScrollHeight = this.itemScrollHeight * this.itemElems.length;
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

  private setupDomElements(): void {
    this.scrollableElem.classList.add(this.id);
    this.itemsContainerElem.classList.add(`${this.id}__container`);

    this.scrollableElem.dataset.animation = this.id;
    this.itemsContainerElem.dataset.animation = `${this.id}-container`;

    this.scrollableElem.style.setProperty(
      "height",
      `${this.totalScrollHeight}px`
    );

    Object.assign(this.itemsContainerElem!.style, {
      position: "sticky",
      top: 0,
    });

    for (let i = 0; i < this.itemElems.length; i++) {
      const item = this.itemElems[i];
      item.classList.add(`${this.id}__item`);
      item.dataset.animation = `${this.id}-item`;
      this.setItemVisibility(item, i > 0 ? 0 : 1);
    }
  }

  handleScrollY(scrollPosition: number): void {
    if (scrollPosition < 0) return;

    const activeItemIndex = Math.floor(scrollPosition / this.itemScrollHeight);
    const itemScrollProgress =
      (scrollPosition % this.itemScrollHeight) / this.itemScrollHeight;

    for (let i = 0; i < this.itemElems.length; i++) {
      const item = this.itemElems[i];
      let opacity = 0;

      if (i === activeItemIndex) {
        opacity = 1 - itemScrollProgress;
      } else if (i === activeItemIndex + 1) {
        opacity = itemScrollProgress;
      }

      this.setItemVisibility(item, opacity);
    }
  }

  init(): void {
    this.calculateDimensions();
    this.setupDomElements();
  }
}
