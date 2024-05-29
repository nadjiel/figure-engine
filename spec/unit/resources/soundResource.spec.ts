import { SoundResource } from "../../../dist/resources/soundResource.js";
import { ResourceError } from "../../../dist/errors/resourceError.js";

let sndResource: SoundResource;
const path = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";

describe("SoundResource class", () => {

  beforeEach(() => {
    sndResource = new SoundResource(path);
  });

  it("Should instantiate properly", () => {
    expect(sndResource.get()).toBeInstanceOf(Audio);
    expect(sndResource.getPath()).toBe(path);
    expect(sndResource.isLoaded()).toBeFalse();
  });

  describe("load method", () => {

    it("Should reject if path is invalid", async () => {
      const path = "";
      const sndResource = new SoundResource(path);

      await expectAsync(sndResource.load())
        .toBeRejectedWithError(ResourceError, `Couldn't load the resource with path "${path}".`);
      expect(sndResource.isLoaded()).toBeFalse();
    });

    it("Should resolve if path is valid", async () => {
      await expectAsync(sndResource.load())
        .toBeResolvedTo(sndResource);
      expect(sndResource.isLoaded()).toBeTrue();
    });

  });

});
