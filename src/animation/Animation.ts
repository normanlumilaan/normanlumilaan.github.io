"use strict";

export interface AnimationStrategy {
  /** Init animation */
  init(): void;
  scrollY(scrollTop: number): void;
  totalScrollHeight: number;
}

type ScrollableElement = HTMLElement | Window | Document;
type ScrollPositionGetter = () => number;

export class Animation {
  private animation: AnimationStrategy | null = null;

  private scrollableElem: ScrollableElement | null = null;

  private getScrollTop: ScrollPositionGetter | null = null;

  private isProcessingY: boolean = false;

  constructor(animation?: AnimationStrategy) {
    if (animation) {
      this.setAnimation(animation);
    }

    this.handleScrollY = this.handleScrollY.bind(this);
  }

  private handleScrollY(): void {
    if (this.isProcessingY) return;
    this.isProcessingY = true;
    const top = this.getScrollTop!();
    this.animation!.scrollY(top);
    this.isProcessingY = false;
  }

  private defineScrollTopGetter(elem: ScrollableElement): ScrollPositionGetter {
    if (elem instanceof Document) {
      return () => document.documentElement.scrollTop;
    } else if (elem instanceof Window) {
      return () => window.scrollY;
    } else if (elem instanceof HTMLElement) {
      return () => elem.scrollTop;
    }

    return () => -1;
  }

  private setScrollHeight(element: ScrollableElement): void {
    if (!this.animation) {
      console.log("Canno set scroll height, animation strategy not defined");
      return;
    }
    if (element instanceof Document) {
      document.documentElement.style.height = `${this.animation.totalScrollHeight}px`;
    } else if (element instanceof HTMLElement) {
      element.style.height = `${this.animation.totalScrollHeight}px`;
    }
  }

  setAnimation(animation: AnimationStrategy): void {
    this.animation = animation;
  }

  listenScrollYOn(element: ScrollableElement): void {
    const _element = element || document;

    this.scrollableElem = _element;
    this.getScrollTop = this.defineScrollTopGetter(_element);
    _element.addEventListener("scroll", this.handleScrollY);
  }

  init(): void {
    if (!this.animation) {
      console.log("Animation strategy not set");
      return;
    }

    if (!this.scrollableElem) {
      console.log("Scrollable element not found");
      return;
    }

    this.animation.init();
    this.setScrollHeight(this.scrollableElem);
  }
}

export default Animation;
