import { ButtonGroup, Button } from "./button.js";

/**
 * The `KeyboardInput` class allows keeping track of the input coming from the
 * keyboard when the game canvas is in focus.
 * 
 * @version 0.2.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class KeyboardInput {

  /**
   * This property stores a group of buttons representing the keys with which
   * the user has interacted so far.
   */
  private keys: ButtonGroup = {};

  /**
   * @param canvas The game canvas which will listen for keyboard inputs.
   */
  constructor(canvas: HTMLCanvasElement) {
    canvas.onkeydown = e => this.onkeydown(e);
    canvas.onkeyup = e => this.onkeyup(e);
  }

  /**
   * This method is executed when a keydown event is detected (for that, the
   * game canvas needs to be in focus) and updates the information about the
   * key that was pressed.
   * @param e The event received from the event listener.
   */
  private onkeydown(e: KeyboardEvent): void {
    e.preventDefault();

    if(this.keys[e.code] === undefined) {
      this.keys[e.code] = new Button();
    }
    
    this.keys[e.code].downEvent(e);
  }
  
  /**
   * This method is executed when a keyup event is detected (for that, the
   * game canvas needs to be in focus) and updates the information about the
   * key that was released.
   * @param e The event received from the event listener.
   */
  private onkeyup(e: KeyboardEvent): void {
    e.preventDefault();

    if(this.keys[e.code] === undefined) {
      this.keys[e.code] = new Button();
    }
    
    this.keys[e.code].upEvent(e);
  }

  /**
   * This method is called every frame to update all the keyboard
   * buttons' information stored in this class, so that properties like
   * `pressed` and `released` don't stay inconsistent.
   */
  public update(): void {
    for(const code in this.keys) {
      this.keys[code].update();
    }
  }

  /**
   * Tells for how much time a certain key is being held.
   * @param code A code specifying which key to look for (as the codes from the
   * {@linkcode [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)}).
   * @returns For how much time the key specified by the given `code` is being
   * held.
   */
  public getHeldTime(code: string): number {
    if(this.keys[code] === undefined) return 0;

    return this.keys[code].getHeldTime();
  }

  /**
   * Tells if a certain key was pressed in the current frame.
   * @param code A code specifying which key to look for (as the codes from the
   * {@linkcode [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)}).
   * @returns A `boolean` indicating if the key was pressed or not.
   */
  public isPressed(code: string): boolean {
    if(this.keys[code] === undefined) return false;

    return this.keys[code].isPressed();
  }

  /**
   * Tells if a certain key is being held in the current frame.
   * @param code A code specifying which key to look for (as the codes from the
   * {@linkcode [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)}).
   * @returns A `boolean` indicating if the key is being held or not.
   */
  public isHeld(code: string): boolean {
    if(this.keys[code] === undefined) return false;

    return this.keys[code].isHeld();
  }

  /**
   * Tells if a certain key was released in the current frame.
   * @param code A code specifying which key to look for (as the codes from the
   * {@linkcode [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)}).
   * @returns A `boolean` indicating if the key was released or not.
   */
  public isReleased(code: string): boolean {
    if(this.keys[code] === undefined) return false;

    return this.keys[code].isReleased();
  }

}

export default KeyboardInput;
