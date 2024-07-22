import { ImageResource } from "../../../dist/resources/imageResource.js";
import { ResourceError } from "../../../dist/errors/resourceError.js";

let imgResource: ImageResource;
const path = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA3lBMVEX////mAAAAAADjAADqAAD39/coKCjPAAC/AAA9PT1ra2vbAABIAADR0dHvAADCAAAoAADj4+NOTk7VAADs7OxCQkL4wsLIyMj719d4AAD5AAC4uLjzAABkAACqqqoLAAA4AADkEBBvAACaAACfn59EAADpPT2wAAB0dHTzpKQRERGTk5PramqDAAAkJCQYGBgUKytfX193Li4yMjJbNzdUOTk8AAAuAACvGhq9DQ3qUVGSSUl5XFz1sLCMAADoMjLzjo42RERfSUlEUlIAEREdAAAkMzNISEiKa2tuNjb7l8E6AAADlElEQVR4nO3df1fSUBjAcdguICBDfkWpaWWEWlmmWZRmmUq9/zfU6ZxO53nmGbLL2L3D7/fveZ99BM9hjm2lEhERERERERERERERrUAVy4ox7u/EwVHVpsOh1bjOO6tp1cO+vbAa2LVlJ7ScFiBEiBAhQoQIESJcbWHpveVIu0/efVthmoOL/nFdNqlZ1fsgFznZSRzXUtNO7abVah/VMq3Zwrr65dQiY9P2C7XKy8RxQ7XdyGqYMdGzFG+g/kBuu1szZZsiS6HVsHLZIESIECFChAgRPgChOgOghUFWwqQTDlp4Ziv8pIXxcxoN1ec10eTgUXJfZoysyVXaXxtJna+pDS2F5bZa5lxOOO6USsofNEPxk88fz3hDv5l3fvQ2SOosCu//+XSFZqRGtKyFlSyEo2UI1xEiRIgQIUKEmQn9/UyzgPDiQPZq3plm/CSpb8Yv4WUom39otJ1UlLVvQeHcr5rLECL0P4QI/Q8hQv9D+OCE3+XBxMWls91OUTphObQ8mnBYSmEBQ4jQ/xAi9D+ECP0PIUL/Q4jQ/xAi9D+ECP0PIUL/u19oIpHr3Z0zuc8muiMcqCbqa+8FeUHVd/Xbp9JT7ZR0lR/qF2B5vUXOmQ25z9f3XOmcyTUzOefgqqCcQ4jQ/xAi9D+ECP0vnTB2fxp1HxjXEpG+QU0qYWPa/d+0O26LfDrSaKuuuqLp7E/esSu7q7FX1DXsX2Gk9ivoWN+RtlIQYWZ3M0OYWwgRInQfQoQI3Zeh8GjlhcfyQ/vPSbMnyvlIo6eayh2rL3APWv2ZXZ/TWMvTFzZ35ezrfkbPt4hVdylUZ18WeKIFQoQIESJEiBDhQxMu+5yGWj4f4YkSjuVF0M0lCNX6vRs1fElCXUN7s/4OnAnV+re5mFSVfIV3vp+GECFChAgRIkSI0EZoMrgbkVqi6Vy4L5/3fLvXlFkS1Rq9W/nc5kH+wlK/I+pfbYh27d6zvRu5yI0a4AAYq5vBX2VPrRG4JsVCiBCh+xAiROi+mHDeT6nq3pp+C6dauClLfkGN2q7ptXC4JTtfF43GSWc1TG0kNzxVa9g9+Tqv9tWLsZcobKvtuq53O0WWwuy+3LT0ECL0P4QI/Q8hQv9bfaH+j//eZtJTybRwUCBhSx4jDH89Teq3OiSZfRG2z70OkirS+3JWCIsfwuKHsPghLH4Ii99DFhbpaGJWrZ2k/D43QURERERERFSo/gAL8xNjVSOXnwAAAABJRU5ErkJggg==";

beforeEach(() => {
  imgResource = new ImageResource(path);
});

describe("ImageResource class", () => {

  it("Should instantiate properly", () => {
    expect(imgResource.get()).toBeInstanceOf(Image);
    expect(imgResource.getPath()).toBe(path);
    expect(imgResource.isLoaded()).toBeFalse();
  });

  describe("load method", () => {

    it("Should reject if path is invalid", async () => {
      const path = "";
      const imgResource = new ImageResource(path);

      await expectAsync(imgResource.load())
        .toBeRejectedWithError(ResourceError, `Couldn't load the resource with path "${path}".`);
      expect(imgResource.isLoaded()).toBeFalse();
    });

    it("Should resolve if path is valid", async () => {
      await expectAsync(imgResource.load())
        .toBeResolvedTo(imgResource);
      expect(imgResource.isLoaded()).toBeTrue();
    });

  });

});
