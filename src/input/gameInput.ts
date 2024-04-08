import { KeyboardInput } from "./keyboardInput.js";
import { MouseInput } from "./mouseInput.js";

/**
 * The `GameInput` class is used to centralize the inputs that the game might
 * receive from different places, such as keyboard and mouse.
 * 
 * This class needs the game canvas in order to add its input event listeners
 * to it, so that events out of the canvas scope aren't registered by the game.
 * 
 * @version 0.2.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class GameInput {

  private keyboard: KeyboardInput;

  private mouse: MouseInput;

  /**
   * @param canvas The game canvas that should listen to inputs.
   */
  constructor(canvas: HTMLCanvasElement) {
    this.keyboard = new KeyboardInput(canvas);
    this.mouse = new MouseInput(canvas);
  }

  public getKeyboard(): KeyboardInput {
    return this.keyboard;
  }

  public getMouse(): MouseInput {
    return this.mouse;
  }

  /**
   * The `update` method is called every frame to keep the input
   * information consistent.
   */
  public update(): void {
    this.getKeyboard().update();
    this.getMouse().update();
  }

}

export default GameInput;
