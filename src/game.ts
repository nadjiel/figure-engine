/**
 * This interface describes the possible properties the game configuration can
 * accept.
 */
interface GameConfig {

  /**
   * This property accepts an HTML `canvas` element that is set as
   * the place where the game is displayed.
   * 
   * If left `undefined`, the `Game` class creates a new `canvas` element.
   */
  canvas?: HTMLCanvasElement;

  /**
   * This property defines what HTML element will be the parent of the game
   * canvas.
   * 
   * By default, the game canvas is appended to the `body` element.
   */
  root?: HTMLElement;

  /**
   * This attribute defines the width of the game canvas.
   * 
   * If undefined, the default HD width `1280` is set.
   */
  width?: number;
  
  /**
   * This attribute defines the height of the game canvas.
   * 
   * If undefined, the default HD height `720` is set.
   */
  height?: number;
}

/**
 * The `Game` class is the entry point when creating a game with the
 * Figure engine.
 * 
 * To use it you can either instantiate it and use its methods or you can extend
 * it directly.
 * 
 * This class accepts some configurations passed through a `config` object, but
 * can also be instantiated without any setup.
 * 
 * By default, this class will create an HTML `canvas` element with the default
 * width and height set to `1280` by `720` and append it to the `body` element
 * of the DOM so it can be displayed.
 * 
 * @version 0.0.1
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class Game {

  /**
   * This property stores the canvas used to display the game.
   */
  private canvas: HTMLCanvasElement;

  /**
   * The `ctx` property (short for context) stores the game canvas' rendering
   * context, which provides functionality to do the game rendering.
   */
  private ctx: CanvasRenderingContext2D;

  /**
   * This property stores what aspect ratio should be used when resizing the
   * game canvas with the {@linkcode setWidth} or {@linkcode setHeight} methods.
   * Therefore, it provides a way of automatically setting one dimension
   * whenever the other is changed.
   * 
   * For example, if the `aspectRatio` is `1.77` (`16 / 9`), that means when
   * {@linkcode setWidth} is called with `1920`, the height is automatically set
   * to `1080`, mainteining the aspect ratio.
   * 
   * If left `undefined` the resizing won't take any aspect ratio in
   * consideration, only resizing the dimension asked.
   * 
   * Take into account that, when the `aspectRatio` is set, you have to manually
   * call either {@linkcode setWidth} or {@linkcode setHeight} to make sure the
   * canvas starts in fact using the new ratio.
   * 
   * Also note that using the {@linkcode setSize} method automatically removes
   * any `aspectRatio` set, since you will pass manually a new width and height.
   */
  private aspectRatio?: number;

  /**
   * @param config An object specifying configurations for this game, or
   * `undefined`, which makes the game use the default configurations.
   */
  constructor(config?: GameConfig) {
    if(config === undefined) config = {};
    let { canvas, root, width, height } = config;

    if(canvas === undefined) canvas = this.createCanvas();
    if(root === undefined) root = document.body;
    if(width === undefined) width = 1280;
    if(height === undefined) height = 720;

    this.canvas = canvas;
    this.ctx = this.createContext();
    root.appendChild(this.canvas);
    this.setWidth(width);
    this.setHeight(height);
  }

  /**
   * The `createCanvas` method simply uses the
   * {@link [DOM](https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model)}
   * to create and return a new `canvas` element.
   * @returns A new HTML `canvas` element.
   */
  private createCanvas(): HTMLCanvasElement {
    return document.createElement("canvas");
  }

  /**
   * The `createContext` method uses the
   * {@link [CanvasAPI](https://developer.mozilla.org/pt-BR/docs/Web/API/Canvas_API)}
   * to create a 2D rendering context from the canvas element that is used to
   * render the game.
   * @returns The canvas 2D rendering context.
   */
  private createContext(): CanvasRenderingContext2D {
    return this.canvas.getContext("2d")!;
  }

  /**
   * This method takes a `ratio` and sets it to be the new aspect ratio of the
   * game.
   * 
   * This aspect ratio allows you to automatically resize one dimension of the
   * game when you set the other using the {@linkcode setWidth} or
   * {@linkcode setHeight} methods.
   * 
   * For example, if the aspect ratio is set to `1.77` (`16 / 9`), that means
   * when {@linkcode setWidth} is called with `1920`, the height is
   * automatically set to `1080`, mainteining the aspect ratio.
   * 
   * Keep in mind that if the {@linkcode setSize} method is called, though, the
   * aspect ratio is automatically removed since you will manually pass a new
   * width and height.
   * @param ratio The new aspect ratio to set to the game.
   */
  public setAspectRatio(ratio: number): void {
    this.aspectRatio = ratio;
  }

  /**
   * This method is a way to remove the current aspect ratio of the game,
   * making so you have to adjust manually its height whenever you change the
   * width, or vice-versa, if you want to keep them consistent.
   */
  public removeAspectRatio(): void {
    this.aspectRatio = undefined;
  }

  /**
   * This method takes a `width` parameter and sets it to be the new game width.
   * 
   * If the game aspect ratio is currently set to some value, the height of the
   * game is also updated to respect that ratio with the new width.
   * @param width The new width to set to the game.
   */
  public setWidth(width: number): void {
    this.canvas.setAttribute("width", `${width}px`);

    if(this.aspectRatio !== undefined) {
      this.setHeight(this.canvas.width / this.aspectRatio);
    }
  }

  /**
   * This method takes a `height` parameter and sets it to be the new game height.
   * 
   * If the game aspect ratio is currently set to some value, the width of the
   * game is also updated to respect that ratio with the new height.
   * @param height The new height to set to the game.
   */
  public setHeight(height: number): void {
    this.canvas.setAttribute("height", `${height}px`);

    if(this.aspectRatio !== undefined) {
      this.setWidth(this.canvas.height * this.aspectRatio);
    }
  }

  /**
   * This method takes a `width` and a `height` and sets them to be the new
   * game dimensions.
   * 
   * Consequentially, this method also removes the current aspect ratio of the
   * game, if there is any, since the width and height are being explicitly
   * passed.
   * @param width The new width to set to the game.
   * @param height The new height to set to the game.
   */
  public setSize(width: number, height: number): void {
    this.removeAspectRatio();

    this.setWidth(width);
    this.setHeight(height);
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  public getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }

}
