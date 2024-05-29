import { SoundResource } from "./soundResource.js";
import { ResourceError } from "../errors/resourceError";

export class Sound {

  private sound: SoundResource;

  constructor(sound: SoundResource) {
    this.sound = sound;
  }

  public isPlaying(): boolean {
    return !this.sound.get().paused;
  }

  public setLoop(loop: boolean): void {
    this.sound.get().loop = loop;
  }

  public play(): void {
    if(!this.sound.isLoaded()) throw new ResourceError(
      `Can't play a sound that isn't loaded!`
    );

    const sound = this.sound.get();

    sound.pause();
    sound.currentTime = 0;
    sound.play();
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
