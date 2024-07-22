import { GameObject } from "../../../dist/stage/gameObject.js";
import { Vector2 } from "../../../dist/spatial/vector2.js";
import { Rectangle } from "../../../dist/spatial/rectangle.js";
import { Color, ColorFactory } from "../../../dist/graphical/color.js";
import ResourceManager from "../../../dist/resources/resourceManager.js";
import ImageResource from "../../../dist/resources/imageResource.js";

const path = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA3lBMVEX////mAAAAAADjAADqAAD39/coKCjPAAC/AAA9PT1ra2vbAABIAADR0dHvAADCAAAoAADj4+NOTk7VAADs7OxCQkL4wsLIyMj719d4AAD5AAC4uLjzAABkAACqqqoLAAA4AADkEBBvAACaAACfn59EAADpPT2wAAB0dHTzpKQRERGTk5PramqDAAAkJCQYGBgUKytfX193Li4yMjJbNzdUOTk8AAAuAACvGhq9DQ3qUVGSSUl5XFz1sLCMAADoMjLzjo42RERfSUlEUlIAEREdAAAkMzNISEiKa2tuNjb7l8E6AAADlElEQVR4nO3df1fSUBjAcdguICBDfkWpaWWEWlmmWZRmmUq9/zfU6ZxO53nmGbLL2L3D7/fveZ99BM9hjm2lEhERERERERERERERrUAVy4ox7u/EwVHVpsOh1bjOO6tp1cO+vbAa2LVlJ7ScFiBEiBAhQoQIESJcbWHpveVIu0/efVthmoOL/nFdNqlZ1fsgFznZSRzXUtNO7abVah/VMq3Zwrr65dQiY9P2C7XKy8RxQ7XdyGqYMdGzFG+g/kBuu1szZZsiS6HVsHLZIESIECFChAgRPgChOgOghUFWwqQTDlp4Ziv8pIXxcxoN1ec10eTgUXJfZoysyVXaXxtJna+pDS2F5bZa5lxOOO6USsofNEPxk88fz3hDv5l3fvQ2SOosCu//+XSFZqRGtKyFlSyEo2UI1xEiRIgQIUKEmQn9/UyzgPDiQPZq3plm/CSpb8Yv4WUom39otJ1UlLVvQeHcr5rLECL0P4QI/Q8hQv9D+OCE3+XBxMWls91OUTphObQ8mnBYSmEBQ4jQ/xAi9D+ECP0PIUL/Q4jQ/xAi9D+ECP0PIUL/u19oIpHr3Z0zuc8muiMcqCbqa+8FeUHVd/Xbp9JT7ZR0lR/qF2B5vUXOmQ25z9f3XOmcyTUzOefgqqCcQ4jQ/xAi9D+ECP0vnTB2fxp1HxjXEpG+QU0qYWPa/d+0O26LfDrSaKuuuqLp7E/esSu7q7FX1DXsX2Gk9ivoWN+RtlIQYWZ3M0OYWwgRInQfQoQI3Zeh8GjlhcfyQ/vPSbMnyvlIo6eayh2rL3APWv2ZXZ/TWMvTFzZ35ezrfkbPt4hVdylUZ18WeKIFQoQIESJEiBDhQxMu+5yGWj4f4YkSjuVF0M0lCNX6vRs1fElCXUN7s/4OnAnV+re5mFSVfIV3vp+GECFChAgRIkSI0EZoMrgbkVqi6Vy4L5/3fLvXlFkS1Rq9W/nc5kH+wlK/I+pfbYh27d6zvRu5yI0a4AAYq5vBX2VPrRG4JsVCiBCh+xAiROi+mHDeT6nq3pp+C6dauClLfkGN2q7ptXC4JTtfF43GSWc1TG0kNzxVa9g9+Tqv9tWLsZcobKvtuq53O0WWwuy+3LT0ECL0P4QI/Q8hQv9bfaH+j//eZtJTybRwUCBhSx4jDH89Teq3OiSZfRG2z70OkirS+3JWCIsfwuKHsPghLH4Ii99DFhbpaGJWrZ2k/D43QURERERERFSo/gAL8xNjVSOXnwAAAABJRU5ErkJggg==";

describe("GameObject class", () => {

  class ConcreteGameObject extends GameObject {
    
    onStart(): void {}
    onUpdate(): void {}
    onDraw(ctx: CanvasRenderingContext2D): void {}
    onStop(): void {}
    
  }

  let gameObject: GameObject;

  beforeAll(() => {
    ResourceManager.addResource("resource", new ImageResource(path));
  });

  beforeEach(() => {
    gameObject = new ConcreteGameObject(
      Vector2.createZero(),
      Vector2.createZero()
    );
  });

  afterAll(() => {
    ResourceManager.removeAllResources();
  })

  it("Should instantiate properly", () => {
    const coordinates = Vector2.createZero();
    const dimensions = new Vector2(10, 15);
    const gameObject = new ConcreteGameObject(coordinates, dimensions);

    expect(gameObject.getBoundingBox()).toEqual(new Rectangle(coordinates, dimensions));
    expect(gameObject.getX()).toBe(coordinates.getX());
    expect(gameObject.getY()).toBe(coordinates.getY());
    expect(gameObject.getCoordinates()).toBe(coordinates);
    expect(gameObject.getWidth()).toBe(dimensions.getComponent(0));
    expect(gameObject.getHeight()).toBe(dimensions.getComponent(1));
    expect(gameObject.getDimensions()).toBe(dimensions);
    expect(gameObject.getColor()).toEqual(ColorFactory.createTransparent());
  });

  describe("start method", () => {

    it("Should trigger onStart method", () => {
      const coordinates = Vector2.createZero();
      const dimensions = new Vector2(10, 20);
      const gameObject = new ConcreteGameObject(coordinates, dimensions);

      spyOn(gameObject, "onStart");

      gameObject.start();

      expect(gameObject.onStart).toHaveBeenCalled();
    });

  });

  describe("update method", () => {

    it("Should trigger onUpdate method", () => {
      const coordinates = Vector2.createZero();
      const dimensions = new Vector2(10, 20);
      const gameObject = new ConcreteGameObject(coordinates, dimensions);

      spyOn(gameObject, "onUpdate");

      gameObject.update();

      expect(gameObject.onUpdate).toHaveBeenCalled();
    });

  });

  describe("draw method", () => {

    it("Should trigger onDraw method", () => {
      const coordinates = Vector2.createZero();
      const dimensions = new Vector2(10, 20);
      const gameObject = new ConcreteGameObject(coordinates, dimensions);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      spyOn(gameObject, "onDraw");

      gameObject.draw(ctx);

      expect(gameObject.onDraw).toHaveBeenCalledWith(ctx);
    });

    it("Should draw on canvas", () => {
      const coordinates = Vector2.createZero();
      const dimensions = new Vector2(10, 20);
      const gameObject = new ConcreteGameObject(coordinates, dimensions);
      gameObject.setColor(new Color(255, 0, 0, 0.5));
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      spyOn(ctx, "fillRect");

      gameObject.draw(ctx);

      expect(ctx.fillStyle).toBe(gameObject.getColor().toString());
      expect(ctx.fillRect).toHaveBeenCalledWith(
        gameObject.getX(),
        gameObject.getY(),
        gameObject.getWidth(),
        gameObject.getHeight()
      );
    });

  });

  describe("stop method", () => {

    it("Should trigger onStop method", () => {
      const coordinates = Vector2.createZero();
      const dimensions = new Vector2(10, 20);
      const gameObject = new ConcreteGameObject(coordinates, dimensions);

      spyOn(gameObject, "onStop");

      gameObject.stop();

      expect(gameObject.onStop).toHaveBeenCalled();
    });

  });

  describe("usesResource method", () => {

    it("Should store the resource", () => {
      gameObject.usesResource("resource");

      expect(gameObject.getResources()).toEqual(
        [ ResourceManager.getResource("resource")! ]
      );
    });

  });

  describe("load method", () => {

    it("Should load the resources used", async () => {
      gameObject.usesResource("resource");

      const resources = await gameObject.load();

      const resourcesAreLoaded = resources.reduce((prev, curr) => (
        prev && curr.isLoaded()
      ), true);

      expect(resources).toEqual([ ResourceManager.getResource("resource")! ]);
      expect(resourcesAreLoaded).toBeTrue();
    });

  });

});
