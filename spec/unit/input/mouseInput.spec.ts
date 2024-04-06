import { MouseInput } from "../../../dist/input/mouseInput.js";

describe("MouseInput class", () => {

  let canvas: HTMLCanvasElement;

  beforeAll(() => {
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
  });

  it("Should return default values when no info is present", () => {
    const mouseInput = new MouseInput(canvas);
    const button = 0;

    expect(mouseInput.getX()).toBeUndefined();
    expect(mouseInput.getY()).toBeUndefined();
    expect(mouseInput.isPressed(button)).toBeFalse();
    expect(mouseInput.isHeld(button)).toBeFalse();
    expect(mouseInput.isReleased(button)).toBeFalse();
    expect(mouseInput.getHeldTime(button)).toBe(0);
    expect(mouseInput.getWheelXRotation()).toBe(0);
    expect(mouseInput.getWheelYRotation()).toBe(0);
    expect(mouseInput.getWheelZRotation()).toBe(0);
    expect(mouseInput.isRotatingWheel()).toBeFalse();
  });

  it("Should register mouse movement", () => {
    const mouseInput = new MouseInput(canvas);
    const canvasBB = canvas.getBoundingClientRect();
    let mouseX = 30;
    let mouseY = 15;
    // Apparently, clientX and clientY are parsed to int when they
    // are sent to the event, so a little math had to be done
    const clientX = Math.floor(canvasBB.x + mouseX);
    const clientY = Math.floor(canvasBB.y + mouseY);
    mouseX = clientX - canvasBB.x;
    mouseY = clientY - canvasBB.y;
    
    canvas.dispatchEvent(new MouseEvent("mousemove", {
      clientX, clientY
    }));

    expect(mouseInput.getX()).toBe(mouseX);
    expect(mouseInput.getY()).toBe(mouseY);
  });

  it("Should register mouse button presses", () => {
    const mouseInput = new MouseInput(canvas);
    const button = 0;
    
    canvas.dispatchEvent(new MouseEvent("mousedown", { button }));

    mouseInput.update();

    expect(mouseInput.isPressed(button)).toBeTrue();
  });

  it("Should register mouse button releases", () => {
    const mouseInput = new MouseInput(canvas);
    const button = 0;
    
    canvas.dispatchEvent(new MouseEvent("mouseup", { button }));

    mouseInput.update();

    expect(mouseInput.isReleased(button)).toBeTrue();
  });

  it("Should register mouse wheel rotation", () => {
    const mouseInput = new MouseInput(canvas);
    const yRotation = 10;
    
    canvas.dispatchEvent(new WheelEvent("wheel", { deltaY: yRotation }));

    mouseInput.update();

    expect(mouseInput.getWheelYRotation()).toBe(yRotation);
  });

  it("Should update mouse input correctly", () => {
    const mouseInput = new MouseInput(canvas);
    const button = 0;
    
    canvas.dispatchEvent(new MouseEvent("mousedown", { button }));

    mouseInput.update();
    mouseInput.update();

    expect(mouseInput.isPressed(button)).toBeFalse();
  });

  afterAll(() => {
    document.body.removeChild(canvas);
  })

});
