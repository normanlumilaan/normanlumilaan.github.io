import { AnimationStrategy } from "./Animation";

export class FadeOnScroll implements AnimationStrategy {
  readonly name = "fade-on-scroll";

  constructor(
    private container: HTMLElement,
    private items: NodeListOf<HTMLElement>
  ) {}

  init(): void {
    console.log(this.name, "container is", this.container);
    console.log(this.name, "items count", this.items.length);
  }
}

export default FadeOnScroll;
