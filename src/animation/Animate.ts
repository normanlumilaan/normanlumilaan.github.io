"use strict";

export interface AnimationStrategy {
  /** Init animation style */
  init(): boolean;
}

/** Main class for initializing and manageing animations */
export class Animate {
  private animation: AnimationStrategy | null = null;

  constructor(animation?: AnimationStrategy) {
    if (animation) {
      this.setAnimation(animation);
    }
  }

  setAnimation(animation: AnimationStrategy) {
    this.animation = animation;
  }

  init(): boolean {
    if (!this.animation) {
      console.log("Animation not defined");
      return false;
    }

    return this.animation.init();
  }
}

export default Animate;
