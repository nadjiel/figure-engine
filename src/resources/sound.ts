import { SoundResource } from "./soundResource.js";
import { ResourceError } from "../errors/resourceError.js";

export class Sound {

  private sound: SoundResource;

  constructor(sound: SoundResource) {
    this.sound = sound;
  }

  public get(): HTMLAudioElement {
    return this.sound.get();
  }

  public isPlaying(): boolean {
    return !this.sound.get().paused;
  }

  public setLoop(loop: boolean): void {
    this.sound.get().loop = loop;
  }

  public isLooping(): boolean {
    return this.sound.get().loop;
  }

  public pause(): void {
    this.sound.get().pause();
  }

  public stop(): void {
    this.pause();
    this.sound.get().currentTime = 0;
  }

  public play(): void {
    if(!this.sound.isLoaded()) throw new ResourceError(
      `Can't play a sound that isn't loaded!`
    );

    this.stop();
    this.sound.get().play();
  }

  public playOnce(): void {
    this.setLoop(false);
    this.play();
  }

  public playLooped(): void {
    this.setLoop(true);
    this.play();
  }

}

export default Sound;
