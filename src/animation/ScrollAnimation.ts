"use strict";

import { type AnimationStrategy } from "./Animate";

export interface ScrollAnimationStrategy extends AnimationStrategy {
  /** Animate on vertical scroll  */
  animateScrollY(scrollTop: number): void;
}

type ScrollableElement = Window | Document | HTMLElement;

type GetScrollTopFn = () => number;

export abstract class ScrollAnimation implements ScrollAnimationStrategy {
  /** Element that triggers scroll event */
  protected scrollable: ScrollableElement | null = null;

  protected getScrollTop: GetScrollTopFn | null = null;

  /** Throttle flag */
  private isProcessingY: boolean = false;

  constructor() {
    this.handleScrollY = this.handleScrollY.bind(this);
  }

  /** Define scroll top getter function based on element instance */
  protected setGetScrollTop(element: ScrollableElement): GetScrollTopFn {
    if (element instanceof Window) {
      return () => window.scrollY;
    } else if (element instanceof Document) {
      return () => document.documentElement.scrollTop;
    } else if (element instanceof HTMLElement) {
      return () => element.scrollTop;
    }

    return () => -1;
  }

  /** Vertical scroll event handler */
  private handleScrollY(): void {
    if (this.isProcessingY) return;
    this.isProcessingY = true;
    const top = this.getScrollTop!();
    this.animateScrollY(top);
    this.isProcessingY = false;
  }

  /** Attach scroll event listener */
  onScrollY(): void {
    this.scrollable?.addEventListener("scroll", this.handleScrollY);
  }

  /** Remove scroll event listener */
  offScrollY(): void {
    this.scrollable?.removeEventListener("scroll", this.handleScrollY);
  }

  /** Listen scroll on element */
  listenScrollYOn(element: ScrollableElement): void {
    this.offScrollY();
    this.scrollable = element;
  }

  /** Vertical scroll animation */
  abstract animateScrollY(scrollTop: number): void;

  abstract init(): boolean;
}

export default ScrollAnimation;
