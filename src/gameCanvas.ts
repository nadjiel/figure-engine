
export class GameCanvas {

  private readonly DEFAULT_WIDTH = 1280;
  private readonly DEFAULT_HEIGHT = 720;
  private readonly DEFAULT_BACKGROUND_COLOR = "#000000";

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private aspectRatio?: number;

  constructor(canvas?: HTMLCanvasElement) {
    if(canvas === undefined) canvas = this.createCanvas();

    this.canvas = canvas;
    this.ctx = this.createContext();
    this.setSize(this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT);
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
    return this.canvas.getContext("2d")!;
  }

  public getHTMLCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  public getContext(): CanvasRenderingContext2D {
    return this.ctx;
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

  public getAspectRatio(): number | undefined {
    return this.aspectRatio;
  }

  /**
   * This method takes a `width` parameter and sets it to be the new game width.
   * 
   * If the game aspect ratio is currently set to some value, the height of the
   * game is also updated to respect that ratio with the new width.
   * @param width The new width to set to the game.
   */
  public setWidth(width: number): void {
    this.getHTMLCanvas().setAttribute("width", `${width}px`);

    if(this.aspectRatio !== undefined) {
      this.getHTMLCanvas().setAttribute(
        "height",
        `${this.getWidth() / this.aspectRatio}px`
      );
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
    this.getHTMLCanvas().setAttribute("height", `${height}px`);

    if(this.aspectRatio !== undefined) {
      this.getHTMLCanvas().setAttribute(
        "width",
        `${this.getHeight() * this.aspectRatio}px`
      );
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

  public getWidth(): number {
    return this.getHTMLCanvas().width;
  }

  public getHeight(): number {
    return this.getHTMLCanvas().height;
  }

  public setBackgroundColor(color: string): void {
    this.getHTMLCanvas().style.backgroundColor = color;
  }

  public getBackgroundColor(): string {
    return this.getHTMLCanvas().style.backgroundColor;
  }

  public appendTo(root: HTMLElement): void {
    root.appendChild(this.getHTMLCanvas());
  }

}
