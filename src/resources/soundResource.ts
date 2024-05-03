import { Resource } from "./resource.js";

export class SoundResource implements Resource<HTMLAudioElement> {

  private sound = new Audio();

  private path: string;

  private loaded = false;

  constructor(path: string) {
    this.path = path;
  }

  public get(): HTMLAudioElement {
    return this.sound;
  }

  public getPath(): string {
    return this.path;
  }

  public async load(): Promise<HTMLAudioElement> {
    return new Promise((resolve, reject) => {
      this.sound.onload = () => {
        this.loaded = true;
        resolve(this.sound);
      }
      this.sound.onerror = () => reject("Error loading sound");

      this.sound.src = this.path;
    });
  }

  public isLoaded(): boolean {
    return this.loaded;
  }

}

export default SoundResource;
