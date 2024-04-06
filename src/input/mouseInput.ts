import { ButtonGroup, Button } from "./button.js";
import { MouseWheel } from "./mouseWheel.js";

/**
 * The `MouseInput` class stores information about the input that comes from the
 * mouse: its coordinates, its buttons interacted with, and if its wheel is
 * rotated.
 * 
 * These informations are obtained from event listeners added to a the canvas
 * provided in the constructor.
 * 
 * @version 0.2.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class MouseInput {

  /**
   * This property stores the x coordinate of the mouse pointer inside the
   * canvas.
   * 
   * It is `undefined` if the mouse wasn't moved yet on top of the canvas.
   */
  private x?: number;

  /**
   * This property stores the y coordinate of the mouse pointer inside the
   * canvas.
   * 
   * It is `undefined` if the mouse wasn't moved yet on top of the canvas.
   */
  private y?: number;

  /**
   * This property stores information about the mouse buttons that the user
   * interacts with.
   */
  private buttons: ButtonGroup = {};

  /**
   * This property stores information about the mouse wheel.
   */
  private wheel = new MouseWheel();

  /**
   * @param canvas The canvas that will listen to mouse inputs.
   */
  constructor(canvas: HTMLCanvasElement) {
    canvas.onmousemove = e => this.onmousemove(e);
    canvas.onmousedown = e => this.onmousedown(e);
    canvas.onmouseup = e => this.onmouseup(e);
    canvas.onwheel = e => this.onwheel(e);
  }

  /**
   * This method is executed when a mousemove event is detected (for that, the
   * movement has to occur on top of the canvas) and updates the information
   * about the mouse coordinates.
   * @param e The event received from the event listener.
   */
  private onmousemove(e: MouseEvent): void {
    e.preventDefault();

    const canvas = e.target as HTMLCanvasElement;
    const canvasBB = canvas.getBoundingClientRect();

    this.x = e.clientX - canvasBB.x;
    this.y = e.clientY - canvasBB.y;
  }

  /**
   * This method is executed when a mousedown event is detected (for that, the
   * button press has to occur with the mouse on top of the canvas) and updates
   * the information about the button that was pressed.
   * @param e The event received from the event listener.
   */
  private onmousedown(e: MouseEvent): void {
    e.preventDefault();

    if(this.buttons[e.button] === undefined) {
      this.buttons[e.button] = new Button();
    }
    
    this.buttons[e.button].downEvent(e);
  }
  
  /**
   * This method is executed when a mouseup event is detected (for that, the
   * button release has to occur with the mouse on top of the canvas) and updates
   * the information about the button that was released.
   * @param e The event received from the event listener.
   */
  private onmouseup(e: MouseEvent): void {
    e.preventDefault();

    if(this.buttons[e.button] === undefined) {
      this.buttons[e.button] = new Button();
    }

    this.buttons[e.button].upEvent(e);
  }

  /**
   * This method is executed when a wheel event is detected (for that, the
   * wheel has to be rotated with the mouse on top of the canvas) and updates
   * the information about the mouse wheel state.
   * @param e The event received from the event listener.
   */
  private onwheel(e: WheelEvent): void {
    e.preventDefault();

    this.wheel.wheelEvent(e);
  }

  /**
   * This method should be called every frame to update all the mouse
   * information stored in this class, so that there isn't inconsistancy with
   * the stored values.
   */
  public update(): void {
    for(const code in this.buttons) {
      this.buttons[code].update();
    }

    this.wheel.update();
  }

  /**
   * Returns the current x coordinate of the mouse, or its last x coordinate
   * when it was inside the canvas. If the mouse wasn't moved inside of the
   * canvas yet, this method returns `undefined`.
   * 
   * The x coordinate starts from `0` and goes from the left to the right of the
   * canvas.
   * @returns The x coordinate of the mouse.
   */
  public getX(): number | undefined {
    return this.x;
  }

  /**
   * Returns the current y coordinate of the mouse, or its last y coordinate
   * when it was inside the canvas. If the mouse wasn't moved inside of the
   * canvas yet, this method returns `undefined`.
   * 
   * The y coordinate starts from `0` and goes from the top to the bottom of the
   * canvas.
   * @returns The y coordinate of the mouse.
   */
  public getY(): number | undefined {
    return this.y;
  }

  /**
   * Tells for how much time a certain button is being held if it started being
   * held inside the canvas.
   * @param code A code specifying which button to look for (as the codes from the
   * {@linkcode [MouseEvent.button](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)}).
   * @returns For how much time the button specified by the given `code` is
   * being held.
   */
  public getHeldTime(code: number): number {
    if(this.buttons[code] === undefined) return 0;

    return this.buttons[code].getHeldTime();
  }

  /**
   * Tells if a certain button was pressed in the current frame if it was
   * pressed inside the canvas.
   * @param code A code specifying which button to look for (as the codes from the
   * {@linkcode [MouseEvent.button](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)}).
   * @returns A `boolean` indicating if the button was pressed or not.
   */
  public isPressed(code: number): boolean {
    if(this.buttons[code] === undefined) return false;

    return this.buttons[code].isPressed();
  }

  /**
   * Tells if a certain button is being held in the current frame if it started
   * being held inside the canvas.
   * @param code A code specifying which button to look for (as the codes from the
   * {@linkcode [MouseEvent.button](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)}).
   * @returns A `boolean` indicating if the button is being held or not.
   */
  public isHeld(code: number): boolean {
    if(this.buttons[code] === undefined) return false;

    return this.buttons[code].isHeld();
  }

  /**
   * Tells if a certain button was released in the current frame if it was
   * released inside the canvas.
   * @param code A code specifying which button to look for (as the codes from the
   * {@linkcode [MouseEvent.button](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)}).
   * @returns A `boolean` indicating if the button was released or not.
   */
  public isReleased(code: number): boolean {
    if(this.buttons[code] === undefined) return false;

    return this.buttons[code].isReleased();
  }

  /**
   * @returns The current x rotation of the mouse wheel if it is inside the
   * canvas.
   */
  public getWheelXRotation(): number {
    return this.wheel.getXRotation();
  }

  /**
   * @returns The current y rotation of the mouse wheel if it is inside the
   * canvas.
   */
  public getWheelYRotation(): number {
    return this.wheel.getYRotation();
  }

  /**
   * @returns The current z rotation of the mouse wheel if it is inside the
   * canvas.
   */
  public getWheelZRotation(): number {
    return this.wheel.getZRotation();
  }

  /**
   * @returns A `boolean` indicating if the mouse wheel is cureently being
   * rotated if it is inside the canvas.
   */
  public isRotatingWheel(): boolean {
    return this.wheel.isRotating();
  }

}

export default MouseInput;
