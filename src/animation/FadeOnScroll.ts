'use strict'

import { ScrollAnimation } from './ScrollAnimation'

/**
 * Scroll animation that fades elements in and out as the user scrolls.
 * @extends ScrollAnimation
 */
export class FadeOnScroll extends ScrollAnimation {
  readonly name = 'fade-on-scroll'

  /** @type {number} The scroll height of each item. */
  private itemScrollHeight: number = 0

  /** @type {number} The total scrollable height based on the number of items. */
  private totalScrollHeight: number = 0

  /**
   * Creates a FadeOnScroll instance.
   * @param {HTMLElement} container - The container element that wraps the items to be animated.
   * @param {NodeListOf<HTMLElement>} items - The items that will fade in/out based on scroll position.
   */
  constructor(
    private container: HTMLElement,
    private items: NodeListOf<HTMLElement>
  ) {
    super()
    this.resizeHandler = this.resizeHandler.bind(this)
  }

  /**
   * Sets the visibility and opacity of an element based on scroll progress.
   * @param {HTMLElement} elem - The element whose visibility is being modified.
   * @param {number} opacity - The opacity value to be applied (clamped between 0 and 1).
   * @private
   */
  private setItemVisibility(elem: HTMLElement, opacity: number): void {
    const clampedOpacity = Math.max(0, Math.min(1, opacity))
    const visibility = clampedOpacity === 0 ? 'hidden' : 'visible'
    const ariaHidden = clampedOpacity === 0 ? 'true' : 'false'

    requestAnimationFrame(() => {
      Object.assign(elem.style, {
        opacity: clampedOpacity.toFixed(2),
        visibility,
      })
      elem.setAttribute('aria-hidden', ariaHidden)
    })
  }

  /**
   * Calculates the scroll height for individual items and the total scrollable area.
   * @private
   */
  private calculateDimensions(): void {
    const itemHeight = Math.floor(this.container.getBoundingClientRect().height)
    this.itemScrollHeight = itemHeight
    this.totalScrollHeight = itemHeight * this.items.length
  }

  /**
   * Updates the scrollable height of the container or the document based on the total scroll height.
   * @private
   */
  private updateScrollableHeight(): void {
    const target =
      this.scrollable instanceof HTMLElement
        ? this.scrollable
        : document.documentElement
    target.style.height = `${this.totalScrollHeight}px`
  }

  /**
   * Animates the opacity of elements based on the current scroll position.
   * @param {number} scrollTop - The current vertical scroll position.
   */
  animateScrollY(scrollTop: number): void {
    if (scrollTop < 0) return

    const activeItemIndex = Math.floor(scrollTop / this.itemScrollHeight)
    const itemScrollProgress =
      (scrollTop % this.itemScrollHeight) / this.itemScrollHeight

    this.items.forEach((item, index) => {
      let opacity = 0

      if (index === activeItemIndex) {
        opacity = 1 - itemScrollProgress
      } else if (index === activeItemIndex + 1) {
        opacity = itemScrollProgress
      }

      this.setItemVisibility(item, opacity)
    })
  }

  /**
   * Handles resize events and recalculates dimensions and scrollable height.
   */
  resizeHandler(): void {
    this.calculateDimensions()
    this.updateScrollableHeight()
  }

  /**
   * Initializes each item in the container, setting the correct class and visibility.
   * @private
   */
  private initializeItems(): void {
    this.items.forEach((item, index) => {
      item.classList.add(`${this.name}__frame`)
      this.setItemVisibility(item, index === 0 ? 1 : 0)
    })
  }

  /**
   * Initializes the fade-on-scroll animation.
   * @returns {boolean} Returns true when initialization is complete.
   */
  init(): boolean {
    this.scrollable = this.scrollable || this.container
    this.container.classList.add(`${this.name}__container`)

    this.initializeItems()
    this.calculateDimensions()
    this.updateScrollableHeight()

    this.observeResize = new ResizeObserver(this.resizeHandler)
    this.observeResize.observe(this.container)

    this.getScrollTop = this.setGetScrollTop(this.scrollable)
    this.onScrollY()
    return true
  }
}

export default FadeOnScroll
