import Color, { ColorFactory } from "../../../dist/graphical/color.js";
import { ImageResource } from "../../../dist/resources/imageResource.js";
import { ResourceManager } from "../../../dist/resources/resourceManager.js";
import { Sprite } from "../../../dist/resources/sprite.js";
import { Vector2 } from "../../../dist/spatial/vector2.js";
import { Scenario } from "../../../dist/stage/scenario.js";
import { StaticCamera } from "../../../dist/stage/camera/staticCamera.js";

describe("Scenario class", () => {

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const path = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA3lBMVEX////mAAAAAADjAADqAAD39/coKCjPAAC/AAA9PT1ra2vbAABIAADR0dHvAADCAAAoAADj4+NOTk7VAADs7OxCQkL4wsLIyMj719d4AAD5AAC4uLjzAABkAACqqqoLAAA4AADkEBBvAACaAACfn59EAADpPT2wAAB0dHTzpKQRERGTk5PramqDAAAkJCQYGBgUKytfX193Li4yMjJbNzdUOTk8AAAuAACvGhq9DQ3qUVGSSUl5XFz1sLCMAADoMjLzjo42RERfSUlEUlIAEREdAAAkMzNISEiKa2tuNjb7l8E6AAADlElEQVR4nO3df1fSUBjAcdguICBDfkWpaWWEWlmmWZRmmUq9/zfU6ZxO53nmGbLL2L3D7/fveZ99BM9hjm2lEhERERERERERERERrUAVy4ox7u/EwVHVpsOh1bjOO6tp1cO+vbAa2LVlJ7ScFiBEiBAhQoQIESJcbWHpveVIu0/efVthmoOL/nFdNqlZ1fsgFznZSRzXUtNO7abVah/VMq3Zwrr65dQiY9P2C7XKy8RxQ7XdyGqYMdGzFG+g/kBuu1szZZsiS6HVsHLZIESIECFChAgRPgChOgOghUFWwqQTDlp4Ziv8pIXxcxoN1ec10eTgUXJfZoysyVXaXxtJna+pDS2F5bZa5lxOOO6USsofNEPxk88fz3hDv5l3fvQ2SOosCu//+XSFZqRGtKyFlSyEo2UI1xEiRIgQIUKEmQn9/UyzgPDiQPZq3plm/CSpb8Yv4WUom39otJ1UlLVvQeHcr5rLECL0P4QI/Q8hQv9D+OCE3+XBxMWls91OUTphObQ8mnBYSmEBQ4jQ/xAi9D+ECP0PIUL/Q4jQ/xAi9D+ECP0PIUL/u19oIpHr3Z0zuc8muiMcqCbqa+8FeUHVd/Xbp9JT7ZR0lR/qF2B5vUXOmQ25z9f3XOmcyTUzOefgqqCcQ4jQ/xAi9D+ECP0vnTB2fxp1HxjXEpG+QU0qYWPa/d+0O26LfDrSaKuuuqLp7E/esSu7q7FX1DXsX2Gk9ivoWN+RtlIQYWZ3M0OYWwgRInQfQoQI3Zeh8GjlhcfyQ/vPSbMnyvlIo6eayh2rL3APWv2ZXZ/TWMvTFzZ35ezrfkbPt4hVdylUZ18WeKIFQoQIESJEiBDhQxMu+5yGWj4f4YkSjuVF0M0lCNX6vRs1fElCXUN7s/4OnAnV+re5mFSVfIV3vp+GECFChAgRIkSI0EZoMrgbkVqi6Vy4L5/3fLvXlFkS1Rq9W/nc5kH+wlK/I+pfbYh27d6zvRu5yI0a4AAYq5vBX2VPrRG4JsVCiBCh+xAiROi+mHDeT6nq3pp+C6dauClLfkGN2q7ptXC4JTtfF43GSWc1TG0kNzxVa9g9+Tqv9tWLsZcobKvtuq53O0WWwuy+3LT0ECL0P4QI/Q8hQv9bfaH+j//eZtJTybRwUCBhSx4jDH89Teq3OiSZfRG2z70OkirS+3JWCIsfwuKHsPghLH4Ii99DFhbpaGJWrZ2k/D43QURERERERFSo/gAL8xNjVSOXnwAAAABJRU5ErkJggg==";
  const image = new ImageResource(path);
  const sprite = new Sprite(image);
  let scenario: Scenario;

  beforeAll(async () => {
    ResourceManager.addResource("resource", image);
    await ResourceManager.loadResource("resource");
  });

  beforeEach(() => {
    scenario = new Scenario(sprite);
  });

  afterAll(() => {
    ResourceManager.removeAllResources();
  });

  it("Should instantiate properly with sprite", () => {
    expect(scenario.getCoordinates()).toEqual(Vector2.createZero());
    expect(scenario.getWidth()).toBe(sprite.getImageFrameWidth());
    expect(scenario.getHeight()).toBe(sprite.getImageFrameHeight());
    expect(scenario.getParallaxSpeed()).toEqual(new Vector2(1, 1));
    expect(scenario.getSprite()).toBe(sprite);
    expect(scenario.getColor()).toEqual(ColorFactory.createTransparent());
  });

  it("Should instantiate properly without arguments", () => {
    const scenario = new Scenario();

    expect(scenario.getCoordinates()).toEqual(Vector2.createZero());
    expect(scenario.getDimensions()).toEqual(Vector2.createZero());
    expect(scenario.getParallaxSpeed()).toEqual(new Vector2(1, 1));
    expect(scenario.getSprite()).toBeUndefined();
    expect(scenario.getColor()).toEqual(ColorFactory.createTransparent());
  });

  it("Should instantiate properly with sprite and dimensions", () => {
    const scenario = new Scenario(sprite, new Vector2(10, 20));

    expect(scenario.getCoordinates()).toEqual(Vector2.createZero());
    expect(scenario.getDimensions()).toEqual(new Vector2(10, 20));
    expect(scenario.getParallaxSpeed()).toEqual(new Vector2(1, 1));
    expect(scenario.getSprite()).toBe(sprite);
    expect(scenario.getColor()).toEqual(ColorFactory.createTransparent());
  });

  it("Should instantiate properly with all arguments", () => {
    const scenario = new Scenario(
      sprite,
      new Vector2(10, 20),
      new Vector2(30, 60)
    );

    expect(scenario.getCoordinates()).toEqual(new Vector2(30, 60));
    expect(scenario.getDimensions()).toEqual(new Vector2(10, 20));
    expect(scenario.getParallaxSpeed()).toEqual(new Vector2(1, 1));
    expect(scenario.getSprite()).toBe(sprite);
    expect(scenario.getColor()).toEqual(ColorFactory.createTransparent());
  });

  describe("start method", () => {

    it("Should trigger onStart method", () => {
      spyOn(scenario, "onStart");

      scenario.start();

      expect(scenario.onStart).toHaveBeenCalled();
    });

  });

  describe("update method", () => {

    it("Should trigger onUpdate method", () => {
      spyOn(scenario, "onUpdate");

      scenario.update();

      expect(scenario.onUpdate).toHaveBeenCalled();
    });

  });

  describe("draw method", () => {

    it("Should trigger onDraw method", () => {
      const camera = new StaticCamera();
      spyOn(scenario, "onDraw");

      scenario.draw(ctx, camera);

      expect(scenario.onDraw).toHaveBeenCalledWith(ctx, camera);
    });

    it("Should draw color on canvas with DrawStrategy", () => {
      const color = new Color(255, 0, 0, 0.5);
      const drawStrategy = scenario.getDrawStrategy();

      scenario.setColor(color);

      spyOn(drawStrategy, "drawColor");

      scenario.draw(ctx, new StaticCamera());

      expect(drawStrategy.drawColor).toHaveBeenCalledWith(
        ctx, color, scenario.getBoundingBox()
      );
    });

    it("Should draw sprite on canvas", () => {
      const drawStrategy = scenario.getDrawStrategy();

      spyOn(drawStrategy, "drawSprite");

      scenario.draw(ctx, new StaticCamera());

      expect(drawStrategy.drawSprite).toHaveBeenCalledWith(
        ctx, sprite, scenario.getBoundingBox()
      );
    });

  });

  describe("stop method", () => {

    it("Should trigger onStop method", () => {
      spyOn(scenario, "onStop");

      scenario.stop();

      expect(scenario.onStop).toHaveBeenCalled();
    });

  });

  describe("usesResource method", () => {

    it("Should store the resource", () => {
      scenario.usesResource("resource");

      expect(scenario.getResources()).toEqual(
        [ ResourceManager.getResource("resource")! ]
      );
    });

  });

  describe("load method", () => {

    it("Should load the resources used", async () => {
      scenario.usesResource("resource");

      const resources = await scenario.load();

      const resourcesAreLoaded = resources.reduce((prev, curr) => (
        prev && curr.isLoaded()
      ), true);

      expect(resources).toEqual([ ResourceManager.getResource("resource")! ]);
      expect(resourcesAreLoaded).toBeTrue();
    });

  });

});
