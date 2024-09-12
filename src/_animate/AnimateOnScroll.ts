export interface Animation {
  init: () => void;
  handleScrollY: (scrollPosition: number) => void;
}

export class AnimateOnScroll {
  private animation: Animation | null = null;

  private isProcessing: boolean = false;

  constructor(private scrollableElem: HTMLElement, animation?: Animation) {
    if (animation) {
      this.animation = animation;
    }

    this.scrollYHandler = this.scrollYHandler.bind(this);
  }

  setAnimation(animation: Animation): void {
    this.animation = animation;
  }

  scrollYHandler(): void {
    if (this.isProcessing) return;
    this.isProcessing = true;
    const scrollY = this.scrollableElem.scrollTop;
    this.animation!.handleScrollY(scrollY);
    this.isProcessing = false;
  }

  init() {
    if (!this.animation) {
      console.log("Animation strategy not defined");
      return;
    }
    this.animation.init();

    const listenOnelement =
      this.scrollableElem.nodeName === "HTML" ? document : this.scrollableElem;

    listenOnelement.addEventListener("scroll", this.scrollYHandler);
  }
}
