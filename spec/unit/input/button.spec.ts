import { Button } from "../../../dist/input/button.js";

describe("Button class", () => {

  it("Should instantiate with default values", () => {
    const button = new Button();

    expect(button.isPressed()).toBeFalse();
    expect(button.isHeld()).toBeFalse();
    expect(button.isReleased()).toBeFalse();
    expect(button.getHeldTime()).toBe(0);
  });

  it("Should register press and hold on key down", async () => {
    const button = new Button();

    const eventListener = (e: KeyboardEvent) => {
      button.downEvent(e);
    };

    window.addEventListener("keydown", eventListener);

    window.dispatchEvent(new KeyboardEvent("keydown"));

    window.removeEventListener("keydown", eventListener);

    expect(button.isPressed()).toBeTrue();
    expect(button.isHeld()).toBeTrue();
    expect(button.isReleased()).toBeFalse();
  });

  it("Should unregister press and keep hold on consecutive key down", async () => {
    const button = new Button();
    const waitTime = 10;

    const eventListener = (e: KeyboardEvent) => {
      button.downEvent(e);
    };

    window.addEventListener("keydown", eventListener);

    window.dispatchEvent(new KeyboardEvent("keydown"));
    window.dispatchEvent(new KeyboardEvent("keydown"));

    window.removeEventListener("keydown", eventListener);

    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, waitTime);
    });

    expect(button.isPressed()).toBeFalse();
    expect(button.isHeld()).toBeTrue();
    expect(button.isReleased()).toBeFalse();
    expect(button.getHeldTime()).toBeGreaterThanOrEqual(waitTime);
  });

  it("Should register release on key up", () => {
    const button = new Button();

    const eventListener = (e: KeyboardEvent) => {
      button.upEvent(e);
    }

    window.addEventListener("keyup", eventListener);

    window.dispatchEvent(new KeyboardEvent("keyup"));

    window.removeEventListener("keyup", eventListener);

    expect(button.isPressed()).toBeFalse();
    expect(button.isHeld()).toBeFalse();
    expect(button.isReleased()).toBeTrue();
    expect(button.getHeldTime()).toBe(0);
  });

  it("Should register release on key up after key down", () => {
    const button = new Button();
    
    const downEventListener = (e: KeyboardEvent) => {
      button.downEvent(e);
    }

    const upEventListener = (e: KeyboardEvent) => {
      button.upEvent(e);
    }

    window.addEventListener("keydown", downEventListener);
    window.addEventListener("keyup", upEventListener);

    window.dispatchEvent(new KeyboardEvent("keydown"));
    window.dispatchEvent(new KeyboardEvent("keyup"));

    window.removeEventListener("keydown", downEventListener);
    window.removeEventListener("keyup", upEventListener);

    expect(button.isPressed()).toBeFalse();
    expect(button.isHeld()).toBeFalse();
    expect(button.isReleased()).toBeTrue();
    expect(button.getHeldTime()).toBe(0);
  });

  it("Should keep press registered only for 1 frame", () => {
    const button = new Button();

    const eventListener = (e: KeyboardEvent) => {
      button.downEvent(e);
    };

    window.addEventListener("keydown", eventListener);

    window.dispatchEvent(new KeyboardEvent("keydown"));

    window.removeEventListener("keydown", eventListener);

    button.update();
    button.update();

    expect(button.isPressed()).toBeFalse();
    expect(button.isHeld()).toBeTrue();
    expect(button.isReleased()).toBeFalse();
  });

  it("Should keep release registered only for 1 frame", () => {
    const button = new Button();

    const eventListener = (e: KeyboardEvent) => {
      button.upEvent(e);
    };

    window.addEventListener("keyup", eventListener);

    window.dispatchEvent(new KeyboardEvent("keyup"));

    window.removeEventListener("keyup", eventListener);

    button.update();
    button.update();

    expect(button.isPressed()).toBeFalse();
    expect(button.isHeld()).toBeFalse();
    expect(button.isReleased()).toBeFalse();
  });

  it("Should return right held time", async () => {
    const button = new Button();
    const waitTime = 10;

    const eventListener = (e: KeyboardEvent) => {
      button.downEvent(e);
    };

    window.addEventListener("keydown", eventListener);

    window.dispatchEvent(new KeyboardEvent("keydown"));

    window.removeEventListener("keydown", eventListener);

    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, waitTime);
    });

    expect(button.getHeldTime()).toBeGreaterThanOrEqual(waitTime);
  });

});
