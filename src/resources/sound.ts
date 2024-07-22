import { SoundResource } from "./soundResource.js";
import { ResourceError } from "../errors/resourceError.js";

/**
 * The `Sound` class allows playing sounds in different ways.
 * 
 * @version 0.4.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class Sound {

  /**
   * Stores a reference to the {@linkcode SoundResource} of this
   * {@linkcode Sound}.
   */
  private sound: SoundResource;

  /**
   * @param sound The {@linkcode SoundResource} which this
   * {@linkcode Sound} will control.
   */
  constructor(sound: SoundResource) {
    this.sound = sound;
  }

  /**
   * @returns The `HTMLAudioElement` that this {@linkcode Sound} controls.
   */
  public get(): HTMLAudioElement {
    return this.sound.get();
  }

  /**
   * @returns A `boolean` indicating if this {@linkcode Sound}
   * is currently playing.
   */
  public isPlaying(): boolean {
    return !this.sound.get().paused;
  }

  /**
   * Tells if this {@linkcode Sound} should loop.
   * @param loop A `boolean` indicating if this `Sound` should loop.
   */
  public setLoop(loop: boolean): void {
    this.sound.get().loop = loop;
  }

  /**
   * @returns A `boolean` indicating if this {@linkcode Sound} is currently set
   * to loop.
   */
  public isLooping(): boolean {
    return this.sound.get().loop;
  }

  /**
   * Pauses the execution of this {@linkcode Sound}.
   */
  public pause(): void {
    this.sound.get().pause();
  }

  /**
   * Pauses the execution of this {@linkcode Sound} and goes back to the start.
   */
  public stop(): void {
    this.pause();
    this.sound.get().currentTime = 0;
  }

  /**
   * Plays this {@linkcode Sound} and returns a `Promise` that is resolved when
   * the execution starts.
   * If this `Sound`'s {@linkcode SoundResource} isn't loaded, the resulting
   * `Promise` will reject with a `ResourceError`.
   * @returns A `Promise` that resolves on the execution start.
   */
  public async play(): Promise<void> {
    if(!this.sound.isLoaded()) throw new ResourceError(
      `Can't play a sound that isn't loaded!`
    );

    this.stop();
    return this.sound.get().play();
  }

  /**
   * Plays this {@linkcode Sound}, setting it to play only once,
   * and returns a `Promise` that is resolved when
   * the execution starts.
   * If this `Sound`'s {@linkcode SoundResource} isn't loaded, the resulting
   * `Promise` will reject with a `ResourceError`.
   * @returns A `Promise` that resolves on the execution start.
   */
  public playOnce(): Promise<void> {
    this.setLoop(false);
    return this.play();
  }

  /**
   * Plays this {@linkcode Sound}, setting it to loop,
   * and returns a `Promise` that is resolved when
   * the execution starts.
   * If this `Sound`'s {@linkcode SoundResource} isn't loaded, the resulting
   * `Promise` will reject with a `ResourceError`.
   * @returns A `Promise` that resolves on the execution start.
   */
  public playLooped(): Promise<void> {
    this.setLoop(true);
    return this.play();
  }

}

export default Sound;
