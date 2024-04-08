import { Button } from "./button.js";

/**
 * The `ButtonGroup` class is useful to represent a group of buttons, like
 * the ones from a keyboard, a mouse, or a gamepad.
 * 
 * @version 0.2.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class ButtonGroup {

  /**
   * Stores a group of buttons identified by codes, that can be `strings` or
   * `numbers`.
   */
  private buttons = new Map<string | number, Button>();

  /**
   * Returns a given button with the specified code from this group, or
   * `undefined` if such button doesn't exist.
   * @param code The button code.
   * @returns The button specified by the passed `code`.
   */
  public get(code: string | number): Button | undefined {
    return this.buttons.get(code);
  }

  /**
   * Adds a new button with the specified code to this group.
   * @param code The button code.
   */
  public add(code: string | number): void {
    this.buttons.set(code, new Button());
  }

  /**
   * This method is called every frame to update all the stored button's
   * informations.
   */
  public update(): void {
    this.buttons.forEach(button => button.update());
  }

  /**
   * Tells for how much time a certain button is being held.
   * @param code A code specifying which button to look for (as the codes from
   * the
   * {@linkcode [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)}
   * or
   * {@linkcode [MouseEvent.button](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)}).
   * @returns For how much time the button specified by the given `code` is being
   * held.
   */
  public getHeldTime(code: string | number): number {
    const button = this.buttons.get(code);

    if(button === undefined) return 0;

    return button.getHeldTime();
  }

  /**
   * Tells if a certain button was pressed in the current frame.
   * @param code A code specifying which button to look for (as the codes from
   * the
   * {@linkcode [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)}
   * or
   * {@linkcode [MouseEvent.button](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)}).
   * @returns A `boolean` indicating if the button was pressed or not.
   */
  public isPressed(code: string | number): boolean {
    const button = this.buttons.get(code);

    if(button === undefined) return false;

    return button.isPressed();
  }

  /**
   * Tells if a certain button is being held in the current frame.
   * @param code A code specifying which button to look for (as the codes from
   * the
   * {@linkcode [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)}
   * or
   * {@linkcode [MouseEvent.button](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)}).
   * @returns A `boolean` indicating if the button is being held or not.
   */
  public isHeld(code: string | number): boolean {
    const button = this.buttons.get(code);

    if(button === undefined) return false;

    return button.isHeld();
  }

  /**
   * Tells if a certain button was released in the current frame.
   * @param code A code specifying which button to look for (as the codes from
   * the
   * {@linkcode [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)}
   * or
   * {@linkcode [MouseEvent.button](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)}).
   * @returns A `boolean` indicating if the button was released or not.
   */
  public isReleased(code: string | number): boolean {
    const button = this.buttons.get(code);

    if(button === undefined) return false;

    return button.isReleased();
  }

}

export default ButtonGroup;
