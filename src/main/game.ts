import { GameIterable } from "./gameIterable.js";
import { GameCanvas } from "./gameCanvas.js";
import { GameClock } from "./gameClock.js";
import { GameInput } from "../input/gameInput.js";
import { KeyboardInput } from "../input/keyboardInput.js";
import { MouseInput } from "../input/mouseInput.js";
import { StageManager } from "../stage/stageManager.js";
import { Stage } from "../stage/stage.js";
import { ArgumentError } from "../errors/argumentError.js";
import { ResourceManager } from "../resources/resourceManager.js";
import { Resource } from "../resources/resource.js";

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

  /**
   * This property defines in how many frames per second the game should run.
   */
  fps?: number;

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
 * element of the DOM so it can be displayed. Also, the default FPS of the game
 * will be `30` frames per second.
 * 
 * @version 0.0.1
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class Game implements GameIterable {

  /**
   * The `gameCanvas` property stores an instance to a {@linkcode GameCanvas}
   * used to control the game display.
   */
  private gameCanvas: GameCanvas;

  /**
   * The `gameClock` property stores an instance to a {@linkcode GameClock}
   * used to control the game flow.
   */
  private gameClock: GameClock;

  /**
   * This property stores an instance to a {@linkcode GameInput}
   * used to monitor the game input.
   */
  private gameInput: GameInput;

  private resourceManager = new ResourceManager();

  /**
   * This property stores an instance to a {@linkcode StageManager} that
   * provides methods for organizing and selecting stages.
   */
  private stageManager = new StageManager();

  /**
   * @param config An object specifying configurations for this game, or
   * `undefined`, which makes the game use the default configurations.
   */
  constructor(config?: GameConfig) {
    if(config === undefined) config = {};
    let { canvas, root, width, height, fps } = config;
    
    this.gameCanvas = new GameCanvas({ canvas, root });
    if(width !== undefined) this.gameCanvas.setWidth(width);
    if(height !== undefined) this.gameCanvas.setHeight(height);

    if(fps === undefined) fps = 30;
    this.gameClock = new GameClock(fps, () => {
      this.update();
      this.draw(this.getContext());
    });

    this.gameInput = new GameInput(this.getHTMLCanvas());
  }

  /**
   * @returns The HTML `canvas` element used to display the game.
   */
  public getHTMLCanvas(): HTMLCanvasElement {
    return this.gameCanvas.getHTMLCanvas();
  }

  /**
   * @returns The `canvas` rendering context used to render the game.
   */
  public getContext(): CanvasRenderingContext2D {
    return this.gameCanvas.getContext();
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
    this.gameCanvas.doMaintainAspectRatio();
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
    this.gameCanvas.dontMaintainAspectRatio();
  }

  /**
   * This method allows you to know if the aspect ratio is being currently
   * maintained by the game when scaled up or down.
   * @returns `true` or `false` indicating if the game is currently maintaining
   * the aspect ratio.
   */
  public isMaintainingAspectRatio(): boolean {
    return this.gameCanvas.isMaintainingAspectRatio();
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
    return this.gameCanvas.getAspectRatio();
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
    this.gameCanvas.setWidth(width);
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
    this.gameCanvas.setHeight(height);
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
    this.gameCanvas.setSize(width, height);
  }

  /**
   * @returns The original width of the game, set with the {@linkcode setWidth}
   * method.
   */
  public getOriginalWidth(): number {
    return this.gameCanvas.getOriginalWidth();
  }

  /**
   * @returns The original height of the game, set with the {@linkcode setHeight}
   * method.
   */
  public getOriginalHeight(): number {
    return this.gameCanvas.getOriginalHeight();
  }

  /**
   * @returns The current width of the game taking any applied scaling in
   * consideration.
   */
  public getWidth(): number {
    return this.gameCanvas.getWidth();
  }

  /**
   * @returns The current height of the game taking any applied scaling in
   * consideration.
   */
  public getHeight(): number {
    return this.gameCanvas.getHeight();
  }

  /**
   * This method scales the game canvas to have the passed `newWidth`.
   * 
   * If the game is currently configured to maintain its aspect ratio, its
   * height also is updated to match the new width correctly.
   * @param newWidth A new width to scale the game canvas to.
   */
  public scaleWidthTo(newWidth: number): void {
    this.gameCanvas.scaleWidthTo(newWidth);
  }

  /**
   * This method scales the game canvas to have the passed `newHeight`.
   * 
   * If the game is currently configured to maintain its aspect ratio, its
   * width also is updated to match the new height correctly.
   * @param newHeight A new height to scale the game canvas to.
   */
  public scaleHeightTo(newHeight: number): void {
    this.gameCanvas.scaleHeightTo(newHeight);
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
    this.gameCanvas.scaleTo(newWidth, newHeight);
  }

  /**
   * This method returns the game canvas to its original size set with the
   * {@linkcode setWidth} and {@linkcode setHeight} methods.
   */
  public scaleToOriginalSize(): void {
    this.gameCanvas.scaleToOriginalSize();
  }

  /**
   * This method uses inline CSS to set the background color of the game canvas,
   * which by default is black.
   * @param color The new game canvas color to set.
   */
  public setBackgroundColor(color: string): void {
    this.gameCanvas.setBackgroundColor(color);
  }

  public getBackgroundColor(): string {
    return this.gameCanvas.getBackgroundColor();
  }

  /**
   * @returns The HTML element that is the parent of the `canvas` element that
   * displays the game.
   */
  public getRoot(): HTMLElement {
    return this.gameCanvas.getRoot();
  }

  /**
   * @returns The width of the HTML element parent of the game canvas.
   */
  public getRootWidth(): number {
    return this.gameCanvas.getRootWidth();
  }

  /**
   * @returns The height of the HTML element parent of the game canvas.
   */
  public getRootHeight(): number {
    return this.gameCanvas.getRootHeight();
  }

  public fitRoot(): void {
    this.gameCanvas.fitRoot();
  }

  /**
   * @returns A boolean indicating if the `root` element of the game is
   * currently set to fullscreen.
   */
  public isFullscreen(): boolean {
    return this.gameCanvas.isFullscreen();
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
    this.gameCanvas.toggleFullscreen();
  }

  /**
   * Sets the in how many frames per second the game should run.
   * @param fps The FPS in which the game should run. This parameter only
   * accepts positive values, since a negative FPS doesn't make sense.
   * @throws { ArgumentError } If the `fps` argument is negative.
   */
  public setFps(fps: number): void {
    this.gameClock.setFps(fps);
  }

  /**
   * @returns The FPS in which the game tries to run.
   */
  public getFps(): number {
    return this.gameClock.getFps();
  }

  /**
   * This method uses a set of FPS measures collected in the most recent frames
   * to calculate a mean of in how many frames per second the game is actually
   * running.
   * 
   * If you used the {@linkcode measureFps} method passing `0` as its
   * argument, or called the {@linkcode dontMeasureFps} method, then no FPS
   * measures have been collected and that means this method has no data to work
   * with and hence will return `undefined`.
   * @returns The FPS in which the game is actually running or `undefined` if
   * there is no FPS data stored.
   */
  public getActualFps(): number | undefined {
    return this.gameClock.getActualFps();
  }

  /**
   * With this method you can determine if you want the FPS of the latest frames
   * to be stored and in what amount. That's useful if you want to be able to
   * know the actual frame rate in which the game is running.
   * 
   * By default the game always stores the last `60` frames FPS so that you can
   * use the {@linkcode getActualFps} method to know its actual framerate, but
   * the greater the amount of FPS stored, the more precise will be the FPS
   * measurement that can be obtained with the {@linkcode getActualFps} method.
   * 
   * Passing a `amount` of `0` to this method is the equivalent of calling the
   * {@linkcode dontMeasureFps} method.
   * 
   * Lastly, if you pass a floating point `amount` it will be rounded using the
   * `Math.round` method, since the amount can only be an integer.
   * 
   * @param amount The amount of the latest frames FPS you want to keep storing.
   * @throws {ArgumentError} If you pass a negative `amount`.
   */
  public measureFps(amount: number): void {
    this.gameClock.measureFps(amount);
  }

  /**
   * Use this method if you don't want to store FPS metrics.
   * 
   * Be aware that doing so will make it impossible to know the actual framerate
   * with the {@linkcode getActualFps} method.
   */
  public dontMeasureFps(): void {
    this.gameClock.dontMeasureFps();
  }

  /**
   * @returns The id of the current frame (starting in `1` for the first frame)
   * or `0` if the {@linkcode start} method wasn't called yet.
   */
  public getCurrentFrame(): number {
    return this.gameClock.getCurrentFrame();
  }

  /**
   * @returns The time in miliseconds when the {@linkcode start} method was
   * executed or `undefined` if it wasn't called yet.
   */
  public getStartTime(): number | undefined {
    return this.gameClock.getStartTime();
  }

  /**
   * @returns The time in miliseconds of the current frame or `undefined` if
   * the {@linkcode start} method wasn't called yet.
   */
  public getCurrentTime(): number | undefined {
    return this.gameClock.getCurrentTime();
  }

  /**
   * This method uses the `requestAnimationFrame` method a certain amount of
   * times to try to find out what's the refresh rate of the monitor running the
   * game based on the time interval between each call.
   * 
   * The final result is the mean between each call interval and the total
   * amount of calls, corresponding to the approximate refresh rate.
   * 
   * Note that if you pass a floating point as an argument, it will be rounded
   * using the `Math.round` method.
   * @param framesToTest This determines how many times the
   * `requestAnimationFrame` method will be called to calculate what's the
   * interval between each call.
   * @returns A promise that resolves to the approximate refresh rate of the
   * monitor or rejects if the `framesToTest` argument is less or equal to `0`.
   */
  public getRefreshRate(framesToTest: number): Promise<number> {
    return this.gameClock.getRefreshRate(framesToTest);
  }

  /**
   * @returns A boolean indicating if the game is currently running.
   */
  public isRunning(): boolean {
    return this.gameClock.isRunning();
  }

  /**
   * @returns An object representing the input from the keyboard.
   */
  public getKeyboardInput(): KeyboardInput {
    return this.gameInput.getKeyboard();
  }

  /**
   * @returns An object representing the input from the mouse.
   */
  public getMouseInput(): MouseInput {
    return this.gameInput.getMouse();
  }

  /**
   * Adds a `Resource` with a given `name` to this `Game`.
   * @param name The name to register to this `Resource`.
   * @param resource The `Resource` to store.
   */
  public addResource(name: string, resource: Resource): void {
    this.resourceManager.addResource(name, resource);
  }

  /**
   * Removes a `Resource` specified by the given `name` from this `Game`.
   * @param name The name of the `Resource` to remove.
   * @returns The removed `Resource`.
   */
  public removeResource(name: string): boolean {
    return this.resourceManager.removeResource(name);
  }

  /**
   * @returns All the `Resource`s registered in this `Game`.
   */
  public getResources(): Map<string, Resource> {
    return this.resourceManager.getResources();
  }

  /**
   * @param name The name of the `Resource` to find.
   * @returns The `Resource` identified by the passed `name`, if it exists, or
   * `undefined` if it does not.
   */
  public getResource(name: string): Resource | undefined {
    return this.resourceManager.getResource(name);
  }

  /**
   * Loads a `Resource` specified by the given `name`.
   * @param name The name of the `Resource` to load.
   * @returns A `Promise` that resolves with the value of the loaded `Resource`
   * when it finishes loading.
   */
  public async loadResource(name: string): Promise<HTMLImageElement | HTMLAudioElement | void> {
    return this.resourceManager.loadResource(name);
  }

  /**
   * Loads all `Resource`s registered in this `Game`.
   * @returns A `Promise` that resolves with the values of the loaded `Resource`s
   * when they finish loading.
   */
  public async loadAllResources(): Promise<Iterable<HTMLImageElement | HTMLAudioElement>> {
    return this.resourceManager.loadAllResources();
  }

  /**
   * This method adds a `stage` to this game in a given `index`, if it is valid.
   * 
   * To be valid, the `index` must be greater or equal to `0` and less or equal
   * to the amount of stages currently in the game.
   * Unless the game has no stages, in which case the `index` can only be `0`.
   * 
   * If the `index` is invalid, an error is thrown.
   * @param index The index where to add a stage.
   * @param stage The stage to add.
   * @throws {ArgumentError} if the received `index` is invalid.
   */
  public addStage(index: number, stage: Stage): void {
    this.stageManager.add(index, stage);
  }

  /**
   * Adds a stage as the first one of the game.
   * @param stage The stage to add.
   */
  public addFirstStage(stage: Stage): void {
    this.stageManager.addFirst(stage);
  }

  /**
   * Adds a stage as the last one of the game.
   * @param stage The stage to add.
   */
  public addLastStage(stage: Stage): void {
    this.stageManager.addLast(stage);
  }

  /**
   * Removes and returns the stage that corresponds to the given `index`, if
   * there is one. If not, an error is thrown.
   * 
   * If there are no stages added to this game whatsoever, an error also is
   * thrown.
   * @param index The index from where to remove a stage.
   * @returns The removed stage.
   * @throws {CallError} If there are no stages added to this game.
   * @throws {ArgumentError} If the `index` doesn't correspond to any added
   * stage.
   */
  public removeStageFrom(index: number): Stage {
    return this.stageManager.removeFrom(index);
  }

  /**
   * Removes a `stage` from this game and returns `true`.
   * If the `stage` is not found, though, nothing is made and `false`
   * is returned.
   * @param stage The stage to remove.
   * @returns A boolean indicating if the stage was removed.
   */
  public removeStage(stage: Stage): boolean {
    return this.stageManager.remove(stage);
  }

  /**
   * Removes and returns the first stage of this game if there are any stages
   * added. Else, does nothing and returns `undefined`.
   * @returns The removed stage or `undefined`.
   */
  public removeFirstStage(): Stage | undefined {
    return this.stageManager.removeFirst();
  }

  /**
   * Removes and returns the last stage of this game if there are any stages
   * added. Else, does nothing and returns `undefined`.
   * @returns The removed stage or `undefined`.
   */
  public removeLastStage(): Stage | undefined {
    return this.stageManager.removeLast();
  }

  /**
   * Removes and returns all stages added to this game.
   * @returns An array with the removed stages.
   */
  public removeAllStages(): Array<Stage> {
    return this.stageManager.removeAll();
  }

  /**
   * @returns An array with all the stages added to this game.
   */
  public getStages(): Array<Stage> {
    return this.stageManager.getStages();
  }

  /**
   * Returns the stage that corresponds to the given `index`.
   * 
   * If no stage corresponds to the `index` an error is thrown.
   * @param index The index of the stage to get.
   * @returns The stage specified by the given `index`.
   * @throws {CallError} If there are no stages in this manager.
   * @throws {ArgumentError} If the received `index` doesn't specify a
   * valid stage in this manager.
   */
  public getStageFrom(index: number): Stage {
    return this.stageManager.getFrom(index);
  }

  /**
   * Returns the index of the given `stage` if it is added to this game, else
   * returns `-1`.
   * @param stage The stage to get the index of.
   * @returns The index of the received `stage`, or `-1`.
   */
  public getStageIndex(stage: Stage): number {
    return this.stageManager.getIndex(stage);
  }

  /**
   * @returns The first stage of this game or `undefined` if there aren't any
   * stages added.
   */
  public getFirstStage(): Stage | undefined {
    return this.stageManager.getFirst();
  }

  /**
   * @returns The last stage of this game or `undefined` if there aren't any
   * stages added.
   */
  public getLastStage(): Stage | undefined {
    return this.stageManager.getLast();
  }

  /**
   * @returns How many stages are added to this game.
   */
  public getStageAmount(): number {
    return this.stageManager.getAmount();
  }

  /**
   * This method selects and returns the stage specified by the given `index`,
   * if there is one, if not throws an error.
   * 
   * If the `index` corresponds to the stage that is already selected, this
   * method just returns that stage.
   * 
   * When executed, this method will trigger the `stop` of the previously
   * selected stage (if there was one) and the `start` of the new one.
   * @param index The index of the stage to select.
   * @returns The new selected stage.
   * @throws {CallError} If there aren't any stages added to this game to select
   * from.
   * @throws {ArgumentError} If the received `index` doesn't correspond to any
   * stages added to this game.
   */
  public selectStage(index: number): Stage {
    return this.stageManager.select(index);
  }

  /**
   * This method selects the next stage in the list of stages relative to the
   * currently selected one.
   * 
   * If there is no next stage, that is, the current one is the last of the
   * list, an error is thrown.
   * And if there are no stages selected currently, this method selects the
   * first of the list.
   * 
   * When executed, this method will trigger the `stop` of the previously
   * selected stage (if there was one) and the `start` of the new one.
   * @returns The new selected stage.
   * @throws {CallError} If there aren't any stages added to this game to select
   * from or if the current stage is already the last of the list.
   */
  public selectNextStage(): Stage {
    return this.stageManager.selectNext();
  }

  /**
   * This method selects the previous stage in the list of stages relative to the
   * currently selected one.
   * 
   * If there is no previous stage, that is, the current one is the first of the
   * list, an error is thrown.
   * And if there are no stages selected currently, this method selects the
   * last of the list.
   * 
   * When executed, this method will trigger the `stop` of the previously
   * selected stage (if there was one) and the `start` of the new one.
   * @returns The new selected stage.
   * @throws {CallError} If there aren't any stages added to this game to select
   * from or if the current stage is already the first of the list.
   */
  public selectPreviousStage(): Stage {
    return this.stageManager.selectPrevious();
  }

  /**
   * @returns The index of the current stage or `undefined` if no stages is
   * selected.
   */
  public getSelectedStageIndex(): number | undefined {
    return this.stageManager.getSelectedIndex();
  }

  /**
   * @returns The current stage or `undefined` if no stage is selected.
   */
  public getSelectedStage(): Stage | undefined {
    return this.stageManager.getSelectedStage();
  }

  /**
   * This method starts the game execution if it hasn't already started.
   * 
   * It triggers the {@linkcode onStart} method, which you can use to define
   * what happens once the game starts.
   * @throws {CallError} If this method is called with the game already in
   * execution or after its execution is finished with the {@linkcode Game.stop}
   * method.
   */
  public start(): void {
    this.onStart();

    this.gameClock.start();
  }

  /**
   * The `update` method executes every frame of the game before the
   * {@linkcode draw} method.
   * 
   * It updates the input informaion and then triggers the {@linkcode onUpdate}
   * method, which you can use to define what happens every frame of the game.
   * 
   * It also triggers the update of the currently selected stage, if any.
   */
  public update(): void {
    this.gameInput.update();

    this.onUpdate();

    const selectedStage = this.getSelectedStage();

    if(selectedStage !== undefined) {
      selectedStage.update();
    }
  }

  /**
   * The `draw` method executes every frame of the game after the
   * {@linkcode update} method.
   * 
   * It triggers the {@linkcode onDraw} method, which you can use to define
   * what is drawn every frame of the game.
   * 
   * It also triggers the draw of the currently selected stage, if any.
   * @param ctx The canvas rendering context used to draw with.
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
    
    this.onDraw(ctx);

    const selectedStage = this.getSelectedStage();

    if(selectedStage !== undefined) {
      selectedStage.draw(ctx);
    }
  }

  /**
   * This method stops the execution of the game if it is running.
   * 
   * It triggers the {@linkcode onStop} method, which you can use to define
   * what happens when the game stops.
   * 
   * If a stage is selected, this method also triggers its `stop`.
   * 
   * @throws {CallError} If called with the game already stopped.
   */
  public stop(): void {
    this.gameClock.stop();

    this.onStop();

    const selectedStage = this.getSelectedStage();

    if(selectedStage !== undefined) {
      selectedStage.stop();
    }
  }

  public onStart(): void {
    
  }

  public onUpdate(): void {
    
  }

  public onDraw(ctx: CanvasRenderingContext2D): void {
    
  }

  public onStop(): void {

  }

}

export default Game;
