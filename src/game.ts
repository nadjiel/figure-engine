import { GameCanvas } from "./gameCanvas.js";

/**
 * This interface describes the possible properties the game configuration can
 * accept.
 * 
 * @version 0.0.1
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
interface GameConfig {

  /**
   * This property accepts an HTML `canvas` element that is set as
   * the place where the game is displayed.
   * 
   * If left `undefined` a new `canvas` element is created.
   * 
   * If you pass a `canvas` and don't pass a `root` it's expected that that
   * `canvas` is already appended to the DOM.
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
   * This attribute defines the original width of the game canvas.
   * 
   * If undefined, the default HD width `1280` is set.
   */
  width?: number;
  
  /**
   * This attribute defines the original height of the game canvas.
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
 * By default, this class will create a black HTML `canvas` element with the
 * default width and height set to `1280` by `720` and append it to the `body`
 * element of the DOM so it can be displayed.
 * 
 * @version 0.0.1
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class Game {

  /**
   * The `gameCanvas` property stores an instance to a {@linkcode GameCanvas}
   * used to control the game display.
   */
  private gameCanvas: GameCanvas;

  /**
   * @param config An object specifying configurations for this game, or
   * `undefined`, which makes the game use the default configurations.
   */
  constructor(config?: GameConfig) {
    if(config === undefined) config = {};
    let { canvas, root, width, height } = config;
    
    this.gameCanvas = new GameCanvas({ canvas, root });
    if(width !== undefined) this.gameCanvas.setWidth(width);
    if(height !== undefined) this.gameCanvas.setHeight(height);
  }

  /**
   * @returns The {@link GameCanvas} instance used to control visual aspects of
   * the game such as aspect ratio, fullscreen and size.
   */
  public getGameCanvas(): GameCanvas {
    return this.gameCanvas;
  }

  /**
   * @returns The HTML `canvas` element used to display the game.
   */
  public getHTMLCanvas(): HTMLCanvasElement {
    return this.getGameCanvas().getHTMLCanvas();
  }

  /**
   * @returns The `canvas` rendering context used to render the game.
   */
  public getContext(): CanvasRenderingContext2D {
    return this.getGameCanvas().getContext();
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
    this.getGameCanvas().doMaintainAspectRatio();
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
    this.getGameCanvas().dontMaintainAspectRatio();
  }

  /**
   * This method allows you to know if the aspect ratio is being currently
   * maintained by the game when scaled up or down.
   * @returns `true` or `false` indicating if the game is currently maintaining
   * the aspect ratio.
   */
  public isMaintainingAspectRatio(): boolean {
    return this.getGameCanvas().isMaintainingAspectRatio();
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
    return this.getGameCanvas().getAspectRatio();
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
    this.getGameCanvas().setWidth(width);
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
    this.getGameCanvas().setHeight(height);
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
    this.getGameCanvas().setSize(width, height);
  }

  /**
   * @returns The original width of the game, set with the {@linkcode setWidth}
   * method.
   */
  public getOriginalWidth(): number {
    return this.getGameCanvas().getOriginalWidth();
  }

  /**
   * @returns The original height of the game, set with the {@linkcode setHeight}
   * method.
   */
  public getOriginalHeight(): number {
    return this.getGameCanvas().getOriginalHeight();
  }

  /**
   * @returns The current width of the game taking any applied scaling in
   * consideration.
   */
  public getWidth(): number {
    return this.getGameCanvas().getWidth();
  }

  /**
   * @returns The current height of the game taking any applied scaling in
   * consideration.
   */
  public getHeight(): number {
    return this.getGameCanvas().getHeight();
  }

  /**
   * This method scales the game canvas to have the passed `newWidth`.
   * 
   * If the game is currently configured to maintain its aspect ratio, its
   * height also is updated to match the new width correctly.
   * @param newWidth A new width to scale the game canvas to.
   */
  public scaleWidthTo(newWidth: number): void {
    this.getGameCanvas().scaleWidthTo(newWidth);
  }

  /**
   * This method scales the game canvas to have the passed `newHeight`.
   * 
   * If the game is currently configured to maintain its aspect ratio, its
   * width also is updated to match the new height correctly.
   * @param newHeight A new height to scale the game canvas to.
   */
  public scaleHeightTo(newHeight: number): void {
    this.getGameCanvas().scaleHeightTo(newHeight);
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
    this.getGameCanvas().scaleTo(newWidth, newHeight);
  }

  /**
   * This method returns the game canvas to its original size set with the
   * {@linkcode setWidth} and {@linkcode setHeight} methods.
   */
  public scaleToOriginalSize(): void {
    this.getGameCanvas().scaleToOriginalSize();
  }

  /**
   * This method uses inline CSS to set the background color of the game canvas,
   * which by default is black.
   * @param color The new game canvas color to set.
   */
  public setBackgroundColor(color: string): void {
    this.getGameCanvas().setBackgroundColor(color);
  }

  public getBackgroundColor(): string {
    return this.getGameCanvas().getBackgroundColor();
  }

  /**
   * @returns A boolean indicating if the `root` element of the game is
   * currently set to fullscreen.
   */
  public isFullscreen(): boolean {
    return this.getGameCanvas().isFullscreen();
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
  public toggleFullscreen(): void {
    this.getGameCanvas().toggleFullscreen();
  }

}

export default Game;
