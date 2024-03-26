/**
 * The `GameCanvasOptions` describes the possible options that the
 * {@linkcode GameCanvas} class accepts.
 * 
 * @version 0.0.1
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
interface GameCanvasOptions {

  /**
   * The `canvas` property expects an HTML `canvas` element which will be where
   * the game displays itself. This property can also be `undefined` which means
   * the game will create automatically a `canvas`.
   * 
   * If you pass a `canvas` and don't pass a `root` it's expected that that
   * canvas is already appended to the DOM.
   */
  canvas?: HTMLCanvasElement;

  /**
   * The `root` property refers to the HTML element that will be the parent of
   * the game `canvas`. If you don't set anything, the default value to this
   * property is the `document.body` when you do not pass your own `canvas`. If
   * you do, then it's expected that you have already set it to the DOM.
   */
  root?: HTMLElement;

}

/**
 * The `GameCanvas` class provides functionality for configuring the game
 * display properties such as its dimensions and fullscreen mode.
 * 
 * This class accepts some options that can be passed through an object to its
 * constructor but can also be created without any of that.
 * 
 * If no options are provided the default behavior of this class is to create a
 * new `canvas` for displaying the game and append it to the `document.body`.
 * This `canvas` will have a size of `1280` by `720` and a black background
 * color and will also be configured to not maintain the aspect ratio when
 * resizing.
 * 
 * @version 0.0.1
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class GameCanvas {

  private readonly DEFAULT_WIDTH = 1280;
  private readonly DEFAULT_HEIGHT = 720;
  private readonly DEFAULT_BACKGROUND_COLOR = "#000000";

  /**
   * This property stores the canvas used to display the game.
   */
  private canvas: HTMLCanvasElement;
  
  /**
   * The `ctx` property (short for context) stores the game canvas rendering
   * context, which provides functionality to do the game rendering.
   */
  private ctx: CanvasRenderingContext2D;
  
  /**
   * This property tells if the {@linkcode scaleWidthTo} and
   * {@linkcode scaleHeightTo} methods should maintain the original aspect ratio
   * when resizing the game.
   * That means when this property is true, whenever one dimension is scaled,
   * the other one is too.
   * 
   * For example, if the `originalWidth` and `originalHeight` of the game are
   * (`1280 / 720`), that means when {@linkcode scaleWidthTo} is called with
   * `1920`, the height is automatically set to `1080`, maintaining the aspect
   * ratio.
   * 
   * If left `false` the scaling won't take any aspect ratio in
   * consideration, only scaling the dimension asked.
   * 
   * Take into account that using the {@linkcode scaleTo} method automatically
   * sets this property to `false`, since you will manually pass a new width and
   * height.
   */
  private maintainAspectRatio: boolean;

  /**
   * This property keeps track of the original width of the game that's set
   * using the {@linkcode setWidth} method.
   */
  private originalWidth: number;
  
  /**
   * This property keeps track of the original height of the game that's set
   * using the {@linkcode setHeight} method.
   */
  private originalHeight: number;

  /**
   * @param options An object where you can pass custom options for this game
   * canvas. If you don't pass anything, the default options are used.
   */
  constructor(options?: GameCanvasOptions) {
    if(options === undefined) options = {};
    let { canvas, root } = options;

    if(canvas === undefined) {
      canvas = this.createCanvas();
      if(root === undefined) root = document.body;
    }

    this.canvas = canvas;
    this.ctx = this.createContext();
    if(root !== undefined) this.appendTo(root);
    this.originalWidth = this.DEFAULT_WIDTH;
    this.originalHeight = this.DEFAULT_HEIGHT;
    this.setSize(this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT);
    this.maintainAspectRatio = false;
    this.setBackgroundColor(this.DEFAULT_BACKGROUND_COLOR);
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
    return this.getHTMLCanvas().getContext("2d")!;
  }

  /**
   * @returns The HTML `canvas` element used to display the game.
   */
  public getHTMLCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  /**
   * @returns The `canvas` rendering context used to render the game.
   */
  public getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }

  /**
   * This method is used to tell the game if the {@linkcode scaleWidthTo} and
   * {@linkcode scaleHeightTo} methods should maintain the original aspect ratio
   * when resizing the game.
   * That means if this method is called, whenever one dimension is scaled,
   * the other one is as well.
   * 
   * For example, if the `originalWidth` and `originalHeight` of the game are
   * (`1280 / 720`), that means when {@linkcode scaleWidthTo} is called with
   * `1920`, the height is automatically set to `1080`, maintaining the aspect
   * ratio.
   * 
   * If this method isn't called, or the {@linkcode dontMaintainAspectRatio}
   * method is called, the scaling won't respect the aspect ratio of the game.
   * 
   * Take into account that using the {@linkcode scaleTo} method automatically
   * makes it so the aspect ratio stops being automatically maintained, since
   * you will manually pass a new width and height.
   */
  public doMaintainAspectRatio(): void {
    this.maintainAspectRatio = true;
  }

  /**
   * This method is a way to stop automatically maintaining the aspect ratio of
   * the game, making so you have to adjust manually its height whenever you
   * scale the width, or vice-versa, if you want to keep them consistent.
   * 
   * If this method is called, it also means that when the game is set to
   * fullscreen it might be distorted, if its `originalWidth` and
   * `originalHeight` don't have an equivalent aspect ratio to the screen.
   */
  public dontMaintainAspectRatio(): void {
    this.maintainAspectRatio = false;
  }

  /**
   * This method allows you to know if the aspect ratio is being currently
   * maintained by the game when scaled up or down.
   * @returns `true` or `false` indicating if the game is currently maintaining
   * the aspect ratio.
   */
  public isMaintainingAspectRatio(): boolean {
    return this.maintainAspectRatio;
  }

  /**
   * This method returns the aspect ratio formed by the `originalWidth` and
   * `originalHeight` of this game.
   * These properties can be set manually using the {@linkcode setWidth} and
   * {@linkcode setHeight} methods and are set to `1280` by `720`
   * (HD aspect ratio) by default.
   * @returns The aspect ratio of the `originalWidth` and `originalHeight` of
   * the game.
   */
  public getAspectRatio(): number {
    return this.getOriginalWidth() / this.getOriginalHeight();
  }

  /**
   * This method takes a `width` parameter and sets it to be the new game width.
   * 
   * This defines the `originalWidth` of the game as being this new width.
   * 
   * That, together with the `originalHeight`, are the parameters used to
   * calculate the aspect ratio of the game.
   * @param width The new width to set to the game.
   */
  public setWidth(width: number): void {
    this.originalWidth = width;

    this.getHTMLCanvas().setAttribute("width", `${width}`);
  }

  /**
   * This method takes a `height` parameter and sets it to be the new game
   * height.
   * 
   * This defines the `originalHeight` of the game as being this new height.
   * 
   * That, together with the `originalWidth`, are the parameters used to
   * calculate the aspect ratio of the game.
   * @param height The new height to set to the game.
   */
  public setHeight(height: number): void {
    this.originalHeight = height;

    this.getHTMLCanvas().setAttribute("height", `${height}`);
  }

  /**
   * This method takes a `width` and a `height` and sets them to be the new
   * game dimensions.
   * 
   * This defines the `originalWidth` and `originalHeight` of the game as being
   * these new dimensions.
   * 
   * Those dimensions are the parameters used to calculate the aspect ratio of
   * the game.
   * @param width The new width to set to the game.
   * @param height The new height to set to the game.
   */
  public setSize(width: number, height: number): void {
    this.setWidth(width);
    this.setHeight(height);
  }

  /**
   * @returns The original width of the game, set with the {@linkcode setWidth}
   * method.
   */
  public getOriginalWidth(): number {
    return this.originalWidth;
  }

  /**
   * @returns The original height of the game, set with the {@linkcode setHeight}
   * method.
   */
  public getOriginalHeight(): number {
    return this.originalHeight;
  }

  /**
   * @returns The current width of the game taking any applied scaling in
   * consideration.
   */
  public getWidth(): number {
    return this.getHTMLCanvas().width;
  }

  /**
   * @returns The current height of the game taking any applied scaling in
   * consideration.
   */
  public getHeight(): number {
    return this.getHTMLCanvas().height;
  }

  /**
   * This method scales the game canvas to have the passed `newWidth`.
   * 
   * If the game is currently configured to maintain its aspect ratio, its
   * height also is updated to match the new width correctly.
   * @param newWidth A new width to scale the game canvas to.
   */
  public scaleWidthTo(newWidth: number): void {
    this.getHTMLCanvas().setAttribute("width", `${newWidth}`);

    if(this.isMaintainingAspectRatio()) {
      const aspectRatio = this.getAspectRatio();
      const newHeight = newWidth / aspectRatio;

      this.getHTMLCanvas().setAttribute("height", `${newHeight}`);
    }
  }

  /**
   * This method scales the game canvas to have the passed `newHeight`.
   * 
   * If the game is currently configured to maintain its aspect ratio, its
   * width also is updated to match the new height correctly.
   * @param newHeight A new height to scale the game canvas to.
   */
  public scaleHeightTo(newHeight: number): void {
    this.getHTMLCanvas().setAttribute("height", `${newHeight}`);

    if(this.isMaintainingAspectRatio()) {
      const aspectRatio = this.getAspectRatio();
      const newWidth = newHeight * aspectRatio;

      this.getHTMLCanvas().setAttribute("width", `${newWidth}`);
    }
  }

  /**
   * This method scales the game canvas to have the passed `newWidth` and
   * `newHeight`.
   * 
   * Note that, consequentially, this method makes it so the game stops
   * maintaining its aspect ratio since you manually will pass new width and
   * height values.
   * @param newWidth A new width to scale the game canvas to.
   */
  public scaleTo(newWidth: number, newHeight: number): void {
    this.dontMaintainAspectRatio();

    this.scaleWidthTo(newWidth);
    this.scaleHeightTo(newHeight);
  }

  /**
   * This method returns the game canvas to its original size set with the
   * {@linkcode setWidth} and {@linkcode setHeight} methods.
   */
  public scaleToOriginalSize(): void {
    this.scaleWidthTo(this.getOriginalWidth());
    this.scaleHeightTo(this.getOriginalHeight());
  }

  /**
   * This method uses inline CSS to set the background color of the game canvas,
   * which by default is black.
   * @param color The new game canvas color to set.
   */
  public setBackgroundColor(color: string): void {
    this.getHTMLCanvas().style.backgroundColor = color;
  }

  public getBackgroundColor(): string {
    return this.getHTMLCanvas().style.backgroundColor;
  }

  /**
   * @returns The HTML element that is the parent of the `canvas` element that
   * displays the game.
   */
  public getRoot(): HTMLElement {
    return this.getHTMLCanvas().parentElement!;
  }

  /**
   * @returns The width of the HTML element parent of the game canvas.
   */
  public getRootWidth(): number {
    return parseInt(window.getComputedStyle(this.getRoot()).width);
  }

  /**
   * @returns The height of the HTML element parent of the game canvas.
   */
  public getRootHeight(): number {
    return parseInt(window.getComputedStyle(this.getRoot()).height);
  }

  /**
   * The `appendTo` method takes an HTML element and sets it to be the parent
   * of the game `canvas` element.
   * @param root The element that you want to be the parent of the game
   * `canvas`.
   */
  private appendTo(root: HTMLElement): void {
    root.appendChild(this.getHTMLCanvas());
  }

  /**
   * This method calculates the biggest dimensions that the game canvas can have
   * to fit its parent without overflowing it and then scales the canvas to
   * these new dimensions.
   * 
   * If the game is configured to maintain aspect ratio that is taken into
   * account when scaling it with this method.
   */
  public fitRoot(): void {
    const rootWidth = this.getRootWidth();
    const rootHeight = this.getRootHeight();
    const aspectRatio = this.getAspectRatio();
    let scaledWidth = rootWidth;
    let scaledHeight = rootHeight;

    if(this.isMaintainingAspectRatio()) {
      scaledWidth = rootHeight * aspectRatio;
      scaledHeight = rootWidth / aspectRatio;

      if(scaledWidth > rootWidth) {
        scaledWidth = rootWidth;
        scaledHeight = scaledWidth / aspectRatio;
      }
      if(scaledHeight > rootHeight) {
        scaledHeight = rootHeight;
        scaledWidth = scaledHeight * aspectRatio;
      }
    }
    
    this.scaleWidthTo(scaledWidth);
    this.scaleHeightTo(scaledHeight);
  }

  /**
   * @returns A boolean indicating if the `root` element of the game is
   * currently set to fullscreen.
   */
  public isFullscreen(): boolean {
    return document.fullscreenElement === this.getRoot();
  }

  /**
   * This method allows switching between fullscreen and nonfullscreen mode.
   * 
   * It's important to know that, because of the
   * {@link [FullscreenAPI](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)}
   * used to implement this mechanism, this method only works properly if
   * triggered by an user event (for example, a button click).
   * That's explained in this link of the API documentation
   * {@link [FullscreenAPI docs](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API/Guide)}.
   */
  public async toggleFullscreen(): Promise<void> {
    try {
      if(this.isFullscreen()) {
        await document.exitFullscreen();
        this.scaleToOriginalSize();
      } else {
        await this.getRoot().requestFullscreen();
        this.fitRoot();
      }
    } catch(err) {
      console.error(err);
    }
  }

}

export default GameCanvas;
