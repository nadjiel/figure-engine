import { Resource } from "./resource.js";
import { ResourceError } from "../errors/resourceError.js";

/**
 * The `ImageResource` class allows importing and loading an image from
 * elsewhere.
 * 
 * @version 0.4.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class ImageResource implements Resource<HTMLImageElement> {

  /**
   * This property stores the image itself in an {@linkcode HTMLImageElement}.
   */
  private image = new Image();

  /**
   * This property stores the path to where the image resource is located.
   */
  private path: string;

  /**
   * This property indicates if this `ImageResource` is loaded.
   */
  private loaded = false;

  /**
   * @param path The path to the image to import.
   */
  constructor(path: string) {
    this.path = path;
  }

  /**
   * @returns The image that this `ImageResource` imports.
   */
  public get(): HTMLImageElement {
    return this.image;
  }

  /**
   * @returns The width of this image resource if it is loaded or `0` otherwise.
   */
  public getWidth(): number {
    return this.image.width;
  }

  /**
   * @returns The height of this image resource if it is loaded or `0` otherwise.
   */
  public getHeight(): number {
    return this.image.height;
  }

  /**
   * @returns The path of the image that this `ImageResource` imports.
   */
  public getPath(): string {
    return this.path;
  }

  /**
   * Returns a promise that tries to load the resource in the path specified in
   * this `ImageResource`.
   * 
   * If the loading is successful, the promise resolves with the loaded image,
   * if it fails, it rejects with a {@linkcode ResourceError}.
   * @returns A promise that tries to load the image.
   */
  public async load(): Promise<Resource> {
    return new Promise((resolve, reject) => {
      this.image.onload = () => {
        this.loaded = true;
        resolve(this);
      }
      this.image.onerror = () => reject(
        new ResourceError(`Couldn't load the resource with path "${this.path}".`)
      );

      this.image.src = this.path;
    });
  }

  /**
   * @returns A `boolean` indicating if this `ImageResource` is loaded.
   */
  public isLoaded(): boolean {
    return this.loaded;
  }

}

export default ImageResource;
