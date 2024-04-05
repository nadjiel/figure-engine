/**
 * The `ButtonGroup` interface is useful to represent a group of buttons, like
 * the ones from a keyboard, a mouse, or a gamepad.
 * 
 * @version 0.2.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export interface ButtonGroup {

  [ code: string ]: Button;

}

/**
 * The `Button` class has useful methods for representing an input button state.
 * The class helps to keep track of button properties such as if it is pressed,
 * held or released.
 * 
 * @version 0.2.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class Button {

  /**
   * This property stores when
   * (via the
   * {@linkcode [Event.TimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp)}
   * property) this button started being held.
   * 
   * If it isn't being held, this property is `undefined`.
   */
  private holdStart?: number;

  /**
   * This property serves to keep track of how many frames have passed with the
   * {@linkcode pressed} property set to `true`.
   * 
   * Only one frame per key press is supposed to have it set to `true`.
   * That's guaranteed with the {@linkcode update} method being called every
   * frame.
   */
  private pressedFrames = 0;

  /**
   * This property serves to keep track of how many frames have passed with the
   * {@linkcode released} property set to `true`.
   * 
   * Only one frame per key release is supposed to have it set to `true`.
   * That's guaranteed with the {@linkcode update} method being called every
   * frame.
   */
  private releasedFrames = 0;

  /**
   * This property tells if this button was pressed in the current frame.
   */
  private pressed = false;

  /**
   * This property tells if this button is being held in the current frame.
   */
  private held = false;

  /**
   * This property tells if this button was released in the current frame.
   */
  private released = false;

  private setPressed(pressed: boolean): void {
    this.pressed = pressed;
    this.pressedFrames = 0;
  }

  private setReleased(released: boolean): void {
    this.released = released;
    this.releasedFrames = 0;
  }

  /**
   * The `downEvent` method updates the properties of this button to indicate
   * that it was pressed or is being held.
   * @param e The event received from the `keydown` event listener.
   */
  public downEvent(e: UIEvent): void {
    if(!this.held) {
      this.setPressed(true);

      this.holdStart = e.timeStamp;
    } else {
      this.setPressed(false);
    }

    this.held = true;
  }

  /**
   * The `upEvent` method updates the properties of this button to indicate
   * that it was released.
   * @param e The event received from the `keyup` event listener.
   */
  public upEvent(e: UIEvent): void {
    this.setPressed(false);
    this.held = false;
    this.holdStart = undefined;

    this.setReleased(true);
  }

  /**
   * The `update` method should be executed every frame to update the button's
   * `pressed` and `released` properties making them register presses and
   * releases at maximum only one frame per time.
   */
  public update(): void {
    if(this.pressed) this.pressedFrames++;
    if(this.released) this.releasedFrames++;

    if(this.pressedFrames > 1) {
      this.setPressed(false);
    }

    if(this.releasedFrames > 1) {
      this.setReleased(false);
    }
  }

  public getHeldTime(): number {
    if(this.holdStart === undefined) return 0;

    return performance.now() - this.holdStart;
  }

  public isPressed(): boolean {
    return this.pressed;
  }

  public isHeld(): boolean {
    return this.held;
  }

  public isReleased(): boolean {
    return this.released;
  }

}

export default Button;
