import { KeyboardInput } from "../../../dist/input/keyboardInput.js";

describe("KeyboardInput class", () => {

  let canvas: HTMLCanvasElement;

  beforeAll(() => {
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.tabIndex = 0;
    canvas.style.outline = "none";
  });

  it("Should return default values when no info is present", () => {
    const keyboardInput = new KeyboardInput(canvas);
    const keyCode = "Space";

    expect(keyboardInput.isPressed(keyCode)).toBeFalse();
    expect(keyboardInput.isHeld(keyCode)).toBeFalse();
    expect(keyboardInput.isReleased(keyCode)).toBeFalse();
    expect(keyboardInput.getHeldTime(keyCode)).toBe(0);
  });

  it("Should listen to keydown events", () => {
    const keyboardInput = new KeyboardInput(canvas);
    const keyCode = "Space";

    canvas.dispatchEvent(new KeyboardEvent("keydown", { code: keyCode }));

    expect(keyboardInput.isPressed(keyCode)).toBeTrue();
  });

  it("Should listen to keyup events", () => {
    const keyboardInput = new KeyboardInput(canvas);
    const keyCode = "Space";

    canvas.dispatchEvent(new KeyboardEvent("keyup", { code: keyCode }));

    expect(keyboardInput.isReleased(keyCode)).toBeTrue();
  });

  it("Should update button state correctly", () => {
    const keyboardInput = new KeyboardInput(canvas);
    const keyCode = "Space";

    canvas.dispatchEvent(new KeyboardEvent("keydown", { code: keyCode }));

    keyboardInput.update();
    keyboardInput.update();

    expect(keyboardInput.isPressed(keyCode)).toBeFalse();
  });

  afterAll(() => {
    document.body.removeChild(canvas);
  });

});
