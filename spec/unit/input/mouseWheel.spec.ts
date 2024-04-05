import { MouseWheel } from "../../../dist/input/mouseWheel.js";

describe("MouseWheel class", () => {

  it("Should instantiate with default values", () => {
    const mouseWheel = new MouseWheel();

    expect(mouseWheel.getXRotation()).toBe(0);
    expect(mouseWheel.getYRotation()).toBe(0);
    expect(mouseWheel.getZRotation()).toBe(0);
    expect(mouseWheel.isRotating()).toBeFalse();
  });

  it("Should register mouse wheel rotation", () => {
    const mouseWheel = new MouseWheel();
    const xRotation = 1;
    const yRotation = 2;
    const zRotation = 3;

    const eventListener = (e: WheelEvent) => {
      mouseWheel.wheelEvent(e);
    };

    window.addEventListener("wheel", eventListener);

    window.dispatchEvent(new WheelEvent("wheel", {
      deltaX: xRotation,
      deltaY: yRotation,
      deltaZ: zRotation
    }));

    window.removeEventListener("wheel", eventListener);
    
    mouseWheel.update();

    expect(mouseWheel.getXRotation()).toBe(xRotation);
    expect(mouseWheel.getYRotation()).toBe(yRotation);
    expect(mouseWheel.getZRotation()).toBe(zRotation);
    expect(mouseWheel.isRotating()).toBeTrue();
  });

  it("Should register rotation only for 1 frame", () => {
    const mouseWheel = new MouseWheel();
    const xRotation = 1;
    const yRotation = 2;
    const zRotation = 3;

    const eventListener = (e: WheelEvent) => {
      mouseWheel.wheelEvent(e);
    };

    window.addEventListener("wheel", eventListener);

    window.dispatchEvent(new WheelEvent("wheel", {
      deltaX: xRotation,
      deltaY: yRotation,
      deltaZ: zRotation
    }));

    window.removeEventListener("wheel", eventListener);

    mouseWheel.update();
    mouseWheel.update();

    expect(mouseWheel.getXRotation()).toBe(0);
    expect(mouseWheel.getYRotation()).toBe(0);
    expect(mouseWheel.getZRotation()).toBe(0);
    expect(mouseWheel.isRotating()).toBeFalse();
  });

});
