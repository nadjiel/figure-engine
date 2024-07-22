import { Sound } from "../../../dist/resources/sound.js";
import { SoundResource } from "../../../dist/resources/soundResource.js";

let sound: Sound;
const path = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
let soundResource = new SoundResource(path);

describe("Sound class", () => {

  beforeAll(async () => {
    await soundResource.load();
  });

  beforeEach(() => {
    sound = new Sound(soundResource);
  });

  it("Should instantiate properly", () => {
    expect(sound.get()).toBe(soundResource.get());
  });

  describe("setLoop method", () => {

    it("Should update sound loop property", () => {
      sound.setLoop(true);

      expect(sound.get().loop).toBeTrue();
    });

  });

  describe("play method", () => {

    it("Should not play unloaded sound", async () => {
      const soundResource = new SoundResource(path);
      const sound = new Sound(soundResource);

      await expectAsync(sound.play())
      .toBeRejectedWithError(
          `Can't play a sound that isn't loaded!`
        );
    });

    // Only works if browser allows
    it("Should play loaded sound", async () => {
      await sound.play();

      expect(sound.isPlaying()).toBeTrue();
    });

  });

  describe("playOnce method", () => {

    it("Should not play unloaded sound", async () => {
      const soundResource = new SoundResource(path);
      const sound = new Sound(soundResource);
      
      await expectAsync(sound.playOnce())
      .toBeRejectedWithError(
          `Can't play a sound that isn't loaded!`
        );
    });

    it("Should play loaded sound only once", async () => {
      await sound.playOnce();

      expect(sound.isPlaying()).toBeTrue();
      expect(sound.isLooping()).toBeFalse();
    });

  });

  describe("playLooped method", () => {

    it("Should not play unloaded sound", async () => {
      const soundResource = new SoundResource(path);
      const sound = new Sound(soundResource);
      
      await expectAsync(sound.playLooped())
        .toBeRejectedWithError(
          `Can't play a sound that isn't loaded!`
        );
    });

    it("Should play loaded sound only once", async () => {
      await sound.playLooped();

      expect(sound.isPlaying()).toBeTrue();
      expect(sound.isLooping()).toBeTrue();
    });

  });

  describe("pause method", () => {

    it("Should pause playing sound", async () => {
      await sound.play();

      sound.pause();

      expect(sound.isPlaying()).toBeFalse();
    });

  });

  describe("stop method", () => {

    it("Should pause and go to start of sound", async () => {
      await sound.play();

      sound.stop();

      expect(sound.isPlaying()).toBeFalse();
      expect(sound.get().currentTime).toBe(0);
    });

  });

  afterAll(() => {
    sound.stop();
  });

});
