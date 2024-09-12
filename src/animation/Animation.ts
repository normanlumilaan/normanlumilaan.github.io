"use strict";

export interface AnimationStrategy {
  /** Init animation */
  init(): void;
}

export class Animation {
  private animation: AnimationStrategy | null = null;

  constructor(animation?: AnimationStrategy) {
    if (animation) {
      this.setAnimation(animation);
    }
  }

  setAnimation(animation: AnimationStrategy): void {
    this.animation = animation;
  }

  init(): void {
    if (!this.animation) {
      console.log("Animation strategy not set");
      return;
    }
    this.animation.init();
  }
}

export default Animation;
