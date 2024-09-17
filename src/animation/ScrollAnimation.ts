'use strict'

import { type AnimationStrategy } from './Animate'

/**
 * Interface for scroll animation strategies.
 * @extends AnimationStrategy
 */
export interface ScrollAnimationStrategy extends AnimationStrategy {
  /**
   * Animate elements based on vertical scroll position.
   * @param {number} scrollTop - The vertical scroll position.
   */
  animateScrollY(scrollTop: number): void
}

type ScrollableElement = Window | Document | HTMLElement

type GetScrollTopFn = () => number

/**
 * Abstract class for scroll-based animations.
 * Implements ScrollAnimationStrategy.
 */
export abstract class ScrollAnimation implements ScrollAnimationStrategy {
  /** The element that triggers the scroll event. */
  protected scrollable: ScrollableElement | null = null

  /** Function to get the current vertical scroll position. */
  protected getScrollTop: GetScrollTopFn | null = null

  /** Resize observer for handling element resizing. */
  protected observeResize: ResizeObserver | null = null

  /** Flag to prevent multiple scroll events from being processed simultaneously. */
  private isProcessingY: boolean = false

  constructor() {
    this.handleScrollY = this.handleScrollY.bind(this)
  }

  /**
   * Sets the function to retrieve the vertical scroll position based on the element type.
   * @param {ScrollableElement} element - The element for which to set the scroll top getter function.
   * @returns {GetScrollTopFn} A function that returns the current vertical scroll position.
   */
  protected setGetScrollTop(element: ScrollableElement): GetScrollTopFn {
    if (element instanceof Window) {
      return () => window.scrollY
    } else if (element instanceof Document) {
      return () => document.documentElement.scrollTop
    } else if (element instanceof HTMLElement) {
      return () => element.scrollTop
    }

    return () => -1
  }

  /**
   * Handles the vertical scroll event.
   * Ensures that scroll events are processed one at a time.
   * @private
   */
  private handleScrollY(): void {
    if (this.isProcessingY) return
    this.isProcessingY = true
    const top = this.getScrollTop ? this.getScrollTop() : 0
    this.animateScrollY(top)
    this.isProcessingY = false
  }

  /**
   * Attaches a scroll event listener to the scrollable element.
   */
  onScrollY(): void {
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.handleScrollY)
    }
  }

  /**
   * Removes the scroll event listener from the scrollable element.
   */
  offScrollY(): void {
    if (this.scrollable) {
      this.scrollable.removeEventListener('scroll', this.handleScrollY)
    }
  }

  /**
   * Sets the element to listen for scroll events and updates the scrollable element.
   * @param {ScrollableElement} element - The element to listen for scroll events.
   */
  listenScrollYOn(element: ScrollableElement): void {
    this.offScrollY()
    this.scrollable = element
    this.getScrollTop = this.setGetScrollTop(element)
    this.onScrollY()
  }

  /**
   * Abstract method to animate elements based on vertical scroll position.
   * @param {number} scrollTop - The vertical scroll position.
   */
  abstract animateScrollY(scrollTop: number): void

  /**
   * Abstract method to initialize the scroll animation.
   * @returns {boolean} Returns true if initialization is successful.
   */
  abstract init(): boolean
}

export default ScrollAnimation
