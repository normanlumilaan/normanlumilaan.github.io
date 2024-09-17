'use strict'

/**
 * Interface for defining animation strategies.
 */
export interface AnimationStrategy {
  /**
   * Initializes the animation style.
   * @returns {boolean} Returns true if initialization is successful, otherwise false.
   */
  init(): boolean
}

/**
 * Class for managing and initializing animations.
 */
export class Animate {
  /** The current animation strategy. */
  private animation: AnimationStrategy | null = null

  /**
   * Creates an instance of Animate with an optional initial animation strategy.
   * @param {AnimationStrategy} [animation] - The initial animation strategy to set.
   */
  constructor(animation?: AnimationStrategy) {
    if (animation) {
      this.setAnimation(animation)
    }
  }

  /**
   * Sets the animation strategy.
   * @param {AnimationStrategy} animation - The animation strategy to set.
   */
  setAnimation(animation: AnimationStrategy): void {
    this.animation = animation
  }

  /**
   * Initializes the animation strategy if defined.
   * @returns {boolean} Returns true if the animation was successfully initialized, otherwise false.
   */
  init(): boolean {
    if (this.animation === null) {
      console.warn('Animation strategy is not defined.')
      return false
    }

    return this.animation.init()
  }
}

export default Animate
