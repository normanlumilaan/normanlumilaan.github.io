import { type AnimationStrategy } from "./Animation";

export class FadeOnScroll implements AnimationStrategy {
  readonly name = "fade-on-scroll";

  itemScrollHeight: number = 0;
  totalScrollHeight: number = 0;

  constructor(
    private itemsContainerElem: HTMLElement,
    private itemElems: NodeListOf<HTMLElement>
  ) {
    this.scrollY = this.scrollY.bind(this);
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
    this.itemsContainerElem.classList.add(`${this.name}__container`);

    for (let i = 0; i < this.itemElems.length; i++) {
      const item = this.itemElems[i];
      item.classList.add(`${this.name}__frame`);
      this.setItemVisibility(item, i > 0 ? 0 : 1);
    }
  }

  scrollY(scrollTop: number): void {
    if (scrollTop < 0) return;

    const activeItemIndex = Math.floor(scrollTop / this.itemScrollHeight);
    const itemScrollProgress =
      (scrollTop % this.itemScrollHeight) / this.itemScrollHeight;

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
