import { ArgumentError, CallError } from "../errors/index.js";

type OnStep = () => void;

/**
 * The `GameClock` class is responsible for iterating the game in a determined
 * fps using the `requestAnimationFrame` method provided by the
 * {@link [Window Interface](https://developer.mozilla.org/en-US/docs/Web/API/window)}.
 * 
 * This class requires some parameters for its construction that describe how
 * it should behave.
 * 
 * @version 0.1.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class GameClock {

  public readonly MILISECONDS_IN_SECOND = 1000;

  /**
   * The `animationFrameHandler` property stores the id returned by the last
   * call to the `requestAnimationFrame` method, or `undefined`, in the case the
   * {@linkcode start} method wasn't called yet, which means no
   * `requestAnimationFrame` was called as well.
   * 
   * This is useful for when you want to stop the game, cancelling the chain of
   * `requestAnimationFrame` calls that make it run. That's because to do
   * that the method {@linkcode GameClock.stop} uses the `cancelAnimationFrame` method
   * which requires that id.
   * 
   * Once the game is stopped, this property is set to `0`.
   */
  private animationFrameHandler?: number;

  /**
   * The `fps` property stores in how many frames per second the game should run.
   */
  private fps: number;

  /**
   * The `frameInterval` property is set whenever the `fps` is set.
   * It is just the calculation of how many miliseconds should be awaited
   * between frames to accomplish the desired fps.
   */
  private frameInterval: number;

  /**
   * The `fpsMeasures` is an array that stores the actual intervals in
   * miliseconds between the last frames.
   * 
   * By default the last `60` intervals are stored, but that can be configured
   * via the {@linkcode measureFps} method.
   * 
   * This property is useful when you want to know the actual frames per second
   * in which the game is running, since it always tries to maintain the
   * configured fps, but that's not always possible.
   */
  private fpsMeasures = new Array<number>();

  /**
   * This property indicates how many fps samples from the last frames should
   * be collected in order to be able to provide a measure of the actual fps in
   * which the game is running.
   * 
   * By default this is set to `60`, but you can change it with the
   * {@linkcode measureFps} method.
   * 
   * If you set it to `0`, the fps measures won't be collected at all and you
   * won't be able to know in how many frames per second the game is currently
   * running.
   */
  private fpsSamples = 60;

  /**
   * The `currentFrame` property stores the id of the current game frame.
   * That id is just a number that starts in `1` and increments in each frame.
   * 
   * If the game wasn't started yet, though, this property stores the number `0`
   * as its value.
   */
  private currentFrame = 0;

  /**
   * This property stores the start time in miliseconds
   * (using the `document.timeline.currentTime` property)
   * when the {@linkcode start} method was executed.
   * 
   * If the {@linkcode start} method wasn't executed yet, this property is
   * `undefined`.
   */
  private startTime?: number;

  /**
   * This property stores the time in miliseconds when the frame previous to the
   * current one was executed. To get that information, both the
   * `document.timeline.currentTime` property and the time got from the
   * `requestAnimationFrame` callback are used.
   * 
   * If the {@linkcode start} method wasn't executed yet, this property is
   * `undefined`.
   */
  private previousTime?: number;

  /**
   * This property stores the time in miliseconds of the current frame being
   * executed. To get that information, both the
   * `document.timeline.currentTime` property and the time got from the
   * `requestAnimationFrame` callback are used.
   * 
   * If the {@linkcode start} method wasn't executed yet, this property is
   * `undefined`.
   */
  private currentTime?: number;

  /**
   * The `onStep` property holds a callback that describes what should happen in
   * each frame of the game.
   */
  private onStep: OnStep;

  /**
   * @param fps The `fps` parameter defines in how many frames per second the
   * game will run.
   * @param onStep The `onStep` parameter is a callback that defines what should
   * be executed in each frame of the game.
   */
  constructor(fps: number, onStep: OnStep) {
    // Placeholding fps and frameInterval with 0 to initialize them with setFps()
    this.fps = 0; this.frameInterval = 0;

    this.setFps(fps);
    this.onStep = onStep;
  }

  /**
   * Sets the in how many frames per second the game should run.
   * @param fps The FPS in which the game should run. This parameter only
   * accepts positive values, since a negative FPS doesn't make sense.
   * @throws { ArgumentError } If the `fps` argument is negative.
   */
  public setFps(fps: number): void {
    if(fps <= 0) throw new ArgumentError(
      `fps must be positive (received ${fps})`
    );

    this.fps = fps;
    this.frameInterval = this.MILISECONDS_IN_SECOND / this.fps;
  }

  /**
   * @returns The FPS in which the game tries to run.
   */
  public getFps(): number {
    return this.fps;
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
    const fpsMeasuresAmount = this.fpsMeasures.length;

    if(fpsMeasuresAmount === 0) return;

    const fpsMeasuresSum = this.fpsMeasures.reduce((prev, curr) => prev + curr);
    const fpsMeasuresMean = fpsMeasuresSum / fpsMeasuresAmount;

    return this.MILISECONDS_IN_SECOND / fpsMeasuresMean;
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
  public measureFps(amount: number) {
    if(amount < 0) throw new ArgumentError(
      `amount must be greater or equal to 0 (received ${amount})`
    );

    amount = Math.round(amount);

    this.fpsSamples = amount;
  }

  /**
   * Use this method if you don't want to store FPS metrics.
   * 
   * Be aware that doing so will make it impossible to know the actual framerate
   * with the {@linkcode getActualFps} method.
   */
  public dontMeasureFps() {
    this.measureFps(0);
  }

  /**
   * @returns The time in miliseconds when the {@linkcode start} method was
   * executed or `undefined` if it wasn't called yet.
   */
  public getStartTime(): number | undefined {
    return this.startTime;
  }

  /**
   * @returns The time in miliseconds of the current frame or `undefined` if
   * the {@linkcode start} method wasn't called yet.
   */
  public getCurrentTime(): number | undefined {
    return this.currentTime;
  }

  /**
   * @returns The id of the current frame (starting in `1` for the first frame)
   * or `0` if the {@linkcode start} method wasn't called yet.
   */
  public getCurrentFrame(): number {
    return this.currentFrame;
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
  public async getRefreshRate(framesToTest: number): Promise<number> {
    return new Promise((resolve, reject) => {
      if(framesToTest <= 0) reject(new ArgumentError(
        `framesToTest must be positive (received ${framesToTest})`
      ));
      framesToTest = Math.round(framesToTest);

      const intervals = new Array<number>();
      let i = 0;
      let previousTime = document.timeline.currentTime as number;
      let currentTime = 0;
  
      const checkFps = (timestamp: number) => {
        currentTime = timestamp;
  
        intervals.push(currentTime - previousTime);
  
        if(i == framesToTest) {
          const intervalsSum = intervals.reduce((prev, curr) => prev + curr);
          const intervalsMean = intervalsSum / intervals.length;
          const fps = this.MILISECONDS_IN_SECOND / intervalsMean;

          resolve(fps);
        }
  
        previousTime = currentTime;
        i++;
  
        requestAnimationFrame(checkFps);
      }
  
      requestAnimationFrame(checkFps);
    });
  }

  /**
   * This method updates the stored fps measures to contain the latest frame
   * intervals in the amount described by the {@linkcode fpsSamples} property.
   * 
   * If that property tells to store `0` intervals this method will make sure
   * any stored intervals are deleted.
   * @param interval The frame interval in miliseconds to store.
   */
  private collectFrameInterval(interval: number): void {
    let fpsMeasuresAmount = this.fpsMeasures.length;

    if(this.fpsSamples === 0) {
      if(fpsMeasuresAmount > 0) this.fpsMeasures.splice(0, fpsMeasuresAmount);
      return;
    }

    fpsMeasuresAmount = this.fpsMeasures.push(interval);

    if(fpsMeasuresAmount > this.fpsSamples) {
      const remainderMeasures = fpsMeasuresAmount - this.fpsSamples;

      this.fpsMeasures.splice(0, remainderMeasures);
    }
  }

  /**
   * @returns A boolean indicating if the game is currently running.
   */
  public isRunning(): boolean {
    return !!this.animationFrameHandler;
  }

  /**
   * This method stops the execution of the game if it is running.
   * 
   * @throws {CallError} If called with the game already stopped.
   */
  public stop(): void {
    if(!this.animationFrameHandler) {
      throw new CallError(`can't call stop on already stopped game`);
    }

    cancelAnimationFrame(this.animationFrameHandler);
    this.animationFrameHandler = 0;
  }

  /**
   * The `step` method is passed as an argument to a `requestAnimationFrame`
   * method each time it finishes executing forming a loop that starts with the
   * {@linkcode start} method. This loop finishes once the
   * {@linkcode GameClock.stop} method is called, making the game stop.
   * 
   * This method ensures that the {@linkcode onStep} method is executed each
   * frame of the game.
   * @param timestamp The parameter passed by the `requestAnimationFrame` to its
   * callback. Used here as the current time.
   */
  private step(timestamp: number): void {
    this.currentTime = timestamp;

    const actualFrameInterval = this.currentTime - this.previousTime!;

    if(actualFrameInterval >= this.frameInterval) {
      this.currentFrame++;

      this.collectFrameInterval(actualFrameInterval);

      this.onStep();
  
      this.previousTime = this.currentTime;
    }

    if(!this.animationFrameHandler) return;

    this.animationFrameHandler = requestAnimationFrame(
      nextTimestamp => this.step(nextTimestamp)
    );
  }

  /**
   * This method starts the game execution if it hasn't already started.
   * @throws {CallError} If this method is called with the game already in
   * execution or after its execution is finished with the {@linkcode GameClock.stop}
   * method.
   */
  public start(): void {
    if(this.animationFrameHandler === 0) {
      throw new CallError(`can't call start on game that has been stopped`);
    }
    if(this.animationFrameHandler !== undefined) {
      throw new CallError(`can't call start on already running game`);
    }

    this.startTime = document.timeline.currentTime as number;
    this.previousTime = this.startTime;

    this.animationFrameHandler = requestAnimationFrame(
      timestamp => this.step(timestamp)
    );
  }

}

export default GameClock;
