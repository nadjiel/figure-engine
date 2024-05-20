import { Resource } from "./resource.js";
import { ResourceError } from "../errors/resourceError.js";

export class ImageResource implements Resource<HTMLImageElement> {

  private image = new Image();

  private path: string;

  private loaded = false;

  constructor(path: string) {
    this.path = path;
  }

  public get(): HTMLImageElement {
    return this.image;
  }

  public getPath(): string {
    return this.path;
  }

  public async load(): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      this.image.onload = () => {
        this.loaded = true;
        resolve(this.image);
      }
      this.image.onerror = () => reject(
        new ResourceError(`Couldn't load the resource with path "${this.path}".`)
      );

      this.image.src = this.path;
    });
  }

  public isLoaded(): boolean {
    return this.loaded;
  }

}

export default ImageResource;
