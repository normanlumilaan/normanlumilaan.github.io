import { describe, it, expect, vi } from "vitest";
import Animate, { AnimationStrategy } from "../../src/animation/Animate";

class MockAnimationStrategy implements AnimationStrategy {
  private success: boolean;

  constructor(success: boolean) {
    this.success = success;
  }

  init(): boolean {
    return this.success;
  }
}

describe("Animate", () => {
  it("should initialize with an optional animation strategy", () => {
    const mockStrategy = new MockAnimationStrategy(true);
    const animate = new Animate(mockStrategy);

    expect(animate).toBeInstanceOf(Animate);
    expect(animate.init()).toBe(true);
  });

  it("should set an animation strategy correctly", () => {
    const animate = new Animate();
    const mockStrategy = new MockAnimationStrategy(true);

    animate.setAnimation(mockStrategy);

    expect(animate.init()).toBe(true);
  });

  it("should return false and log a warning if no animation strategy is set", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});
    const animate = new Animate();

    const result = animate.init();

    expect(result).toBe(false);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Animation strategy is not defined."
    );
    consoleWarnSpy.mockRestore();
  });

  it("should return the result of the animation strategy init method", () => {
    const mockStrategy = new MockAnimationStrategy(false);
    const animate = new Animate(mockStrategy);

    expect(animate.init()).toBe(false);
  });
});
