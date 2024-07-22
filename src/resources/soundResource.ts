import { Resource } from "./resource.js";
import { ResourceError } from "../errors/resourceError.js";

/**
 * The `SoundResource` class allows importing and loading a sound from
 * elsewhere.
 * 
 * @version 0.4.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class SoundResource implements Resource<HTMLAudioElement> {

  /**
   * This property stores the sound itself in an {@linkcode HTMLAudioElement}.
   */
  private sound = new Audio();

  /**
   * This property stores the path to where the sound resource is located.
   */
  private path: string;

  /**
   * This property indicates if this `SoundResource` is loaded.
   */
  private loaded = false;

  /**
   * @param path The path to the sound to import.
   */
  constructor(path: string) {
    this.path = path;
  }

  /**
   * @returns The sound that this `SoundResource` imports.
   */
  public get(): HTMLAudioElement {
    return this.sound;
  }

  /**
   * @returns The path of the sound that this `SoundResource` imports.
   */
  public getPath(): string {
    return this.path;
  }

  /**
   * Returns a promise that tries to load the resource in the path specified in
   * this `SoundResource`.
   * 
   * If the loading is successful, the promise resolves with the loaded sound,
   * if it fails, it rejects with a {@linkcode ResourceError}.
   * @returns A promise that tries to load the sound.
   */
  public async load(): Promise<Resource> {
    return new Promise((resolve, reject) => {
      this.sound.oncanplaythrough = () => {
        this.loaded = true;
        resolve(this);
      }
      this.sound.onerror = () => reject(
        new ResourceError(`Couldn't load the resource with path "${this.path}".`)
      );

      this.sound.src = this.path;
    });
  }

  /**
   * @returns A `boolean` indicating if this `SoundResource` is loaded.
   */
  public isLoaded(): boolean {
    return this.loaded;
  }

}

export default SoundResource;
