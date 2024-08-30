import { Stage } from "../../../dist/stage/stage.js";
import { GameObject } from "../../../dist/stage/gameObject.js";
import { Vector2 } from "../../../dist/spatial/vector2.js";
import { ResourceManager } from "../../../dist/resources/resourceManager.js";
import { ImageResource } from "../../../dist/resources/imageResource.js";

describe("Stage class", () => {

  class ConcreteGameObject extends GameObject {

    constructor() {
      super(
        Vector2.createZero(),
        Vector2.createZero()
      );
    }

    onStart(): void {}
    onUpdate(): void {}
    onDraw(ctx: CanvasRenderingContext2D): void {}
    onStop(): void {}
    
  }

  const path = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA3lBMVEX////mAAAAAADjAADqAAD39/coKCjPAAC/AAA9PT1ra2vbAABIAADR0dHvAADCAAAoAADj4+NOTk7VAADs7OxCQkL4wsLIyMj719d4AAD5AAC4uLjzAABkAACqqqoLAAA4AADkEBBvAACaAACfn59EAADpPT2wAAB0dHTzpKQRERGTk5PramqDAAAkJCQYGBgUKytfX193Li4yMjJbNzdUOTk8AAAuAACvGhq9DQ3qUVGSSUl5XFz1sLCMAADoMjLzjo42RERfSUlEUlIAEREdAAAkMzNISEiKa2tuNjb7l8E6AAADlElEQVR4nO3df1fSUBjAcdguICBDfkWpaWWEWlmmWZRmmUq9/zfU6ZxO53nmGbLL2L3D7/fveZ99BM9hjm2lEhERERERERERERERrUAVy4ox7u/EwVHVpsOh1bjOO6tp1cO+vbAa2LVlJ7ScFiBEiBAhQoQIESJcbWHpveVIu0/efVthmoOL/nFdNqlZ1fsgFznZSRzXUtNO7abVah/VMq3Zwrr65dQiY9P2C7XKy8RxQ7XdyGqYMdGzFG+g/kBuu1szZZsiS6HVsHLZIESIECFChAgRPgChOgOghUFWwqQTDlp4Ziv8pIXxcxoN1ec10eTgUXJfZoysyVXaXxtJna+pDS2F5bZa5lxOOO6USsofNEPxk88fz3hDv5l3fvQ2SOosCu//+XSFZqRGtKyFlSyEo2UI1xEiRIgQIUKEmQn9/UyzgPDiQPZq3plm/CSpb8Yv4WUom39otJ1UlLVvQeHcr5rLECL0P4QI/Q8hQv9D+OCE3+XBxMWls91OUTphObQ8mnBYSmEBQ4jQ/xAi9D+ECP0PIUL/Q4jQ/xAi9D+ECP0PIUL/u19oIpHr3Z0zuc8muiMcqCbqa+8FeUHVd/Xbp9JT7ZR0lR/qF2B5vUXOmQ25z9f3XOmcyTUzOefgqqCcQ4jQ/xAi9D+ECP0vnTB2fxp1HxjXEpG+QU0qYWPa/d+0O26LfDrSaKuuuqLp7E/esSu7q7FX1DXsX2Gk9ivoWN+RtlIQYWZ3M0OYWwgRInQfQoQI3Zeh8GjlhcfyQ/vPSbMnyvlIo6eayh2rL3APWv2ZXZ/TWMvTFzZ35ezrfkbPt4hVdylUZ18WeKIFQoQIESJEiBDhQxMu+5yGWj4f4YkSjuVF0M0lCNX6vRs1fElCXUN7s/4OnAnV+re5mFSVfIV3vp+GECFChAgRIkSI0EZoMrgbkVqi6Vy4L5/3fLvXlFkS1Rq9W/nc5kH+wlK/I+pfbYh27d6zvRu5yI0a4AAYq5vBX2VPrRG4JsVCiBCh+xAiROi+mHDeT6nq3pp+C6dauClLfkGN2q7ptXC4JTtfF43GSWc1TG0kNzxVa9g9+Tqv9tWLsZcobKvtuq53O0WWwuy+3LT0ECL0P4QI/Q8hQv9bfaH+j//eZtJTybRwUCBhSx4jDH89Teq3OiSZfRG2z70OkirS+3JWCIsfwuKHsPghLH4Ii99DFhbpaGJWrZ2k/D43QURERERERFSo/gAL8xNjVSOXnwAAAABJRU5ErkJggg==";
  let stage: Stage;

  beforeAll(() => {
    ResourceManager.addResource("resource1", new ImageResource(path));
    ResourceManager.addResource("resource2", new ImageResource(path));
    ResourceManager.addResource("resource3", new ImageResource(path));
  });

  beforeEach(() => {
    stage = new Stage();
  });

  afterAll(() => {
    ResourceManager.removeAllResources();
  });

  it("Should instantiate properly", () => {
    expect(stage.getObjects()).toEqual([]);
    expect(stage.isLoaded()).toBeFalse();
  });

  describe("load method", () => {

    it("Should resolve when loaded", async () => {
      const gameObj1 = new ConcreteGameObject();
      gameObj1.usesResource("resource1");
      gameObj1.usesResource("resource2");

      const gameObj2 = new ConcreteGameObject();
      gameObj2.usesResource("resource3");

      stage.addFirstObject(gameObj1);
      stage.addFirstObject(gameObj2);

      const usedResources = await stage.load();
      
      const resourcesAreLoaded = usedResources.reduce((prev, curr) => (
        prev && curr.isLoaded()
      ), true);

      expect(usedResources).toEqual(
        [ ...ResourceManager.getResources().values() ]
      );
      expect(resourcesAreLoaded).toBeTrue();
      expect(stage.isLoaded()).toBeTrue();
    });

  });

  describe("start method", () => {

    it("Should start the game objects", () => {
      const gameObject1 = new ConcreteGameObject();
      const gameObject2 = new ConcreteGameObject();
      const gameObject3 = new ConcreteGameObject();

      stage.addLastObject(gameObject1);
      stage.addLastObject(gameObject2);
      stage.addLastObject(gameObject3);

      spyOn(gameObject1, "start");
      spyOn(gameObject2, "start");
      spyOn(gameObject3, "start");

      stage.start();

      expect(gameObject1.start).toHaveBeenCalled();
      expect(gameObject2.start).toHaveBeenCalled();
      expect(gameObject3.start).toHaveBeenCalled();
    });

    it("Should start the game objects in determined order", () => {
      let order = "";
      const gameObject1 = new ConcreteGameObject();
      gameObject1.setY(1);
      gameObject1.onStart = () => order += '1';
      const gameObject2 = new ConcreteGameObject();
      gameObject2.setY(2);
      gameObject2.onStart = () => order += '2';
      const gameObject3 = new ConcreteGameObject();
      gameObject3.setY(3);
      gameObject3.onStart = () => order += '3';

      stage.setObjectStartOrder((obj1, obj2) => obj1.getY() - obj2.getY());

      stage.addFirstObject(gameObject1);
      stage.addFirstObject(gameObject2);
      stage.addFirstObject(gameObject3);

      stage.start();

      expect(order).toBe("123");
    });

    it("Should trigger onStart method", () => {
      spyOn(stage, "onStart");

      stage.start();

      expect(stage.onStart).toHaveBeenCalled();
    });

  });

  describe("update method", () => {

    it("Should update the game objects", () => {
      const gameObject1 = new ConcreteGameObject();
      const gameObject2 = new ConcreteGameObject();
      const gameObject3 = new ConcreteGameObject();

      stage.addLastObject(gameObject1);
      stage.addLastObject(gameObject2);
      stage.addLastObject(gameObject3);

      spyOn(gameObject1, "update");
      spyOn(gameObject2, "update");
      spyOn(gameObject3, "update");

      stage.update();

      expect(gameObject1.update).toHaveBeenCalled();
      expect(gameObject2.update).toHaveBeenCalled();
      expect(gameObject3.update).toHaveBeenCalled();
    });

    it("Should update the game objects in determined order", () => {
      let order = "";
      const gameObject1 = new ConcreteGameObject();
      gameObject1.setY(1);
      gameObject1.onUpdate = () => order += '1';
      const gameObject2 = new ConcreteGameObject();
      gameObject2.setY(2);
      gameObject2.onUpdate = () => order += '2';
      const gameObject3 = new ConcreteGameObject();
      gameObject3.setY(3);
      gameObject3.onUpdate = () => order += '3';

      stage.setObjectUpdateOrder((obj1, obj2) => obj1.getY() - obj2.getY());

      stage.addFirstObject(gameObject1);
      stage.addFirstObject(gameObject2);
      stage.addFirstObject(gameObject3);

      stage.update();

      expect(order).toBe("123");
    });

    it("Should trigger onUpdate method", () => {
      spyOn(stage, "onUpdate");

      stage.update();

      expect(stage.onUpdate).toHaveBeenCalled();
    });

  });

  describe("draw method", () => {

    it("Should draw the game objects", () => {
      const gameObject1 = new ConcreteGameObject();
      const gameObject2 = new ConcreteGameObject();
      const gameObject3 = new ConcreteGameObject();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      stage.addLastObject(gameObject1);
      stage.addLastObject(gameObject2);
      stage.addLastObject(gameObject3);

      spyOn(gameObject1, "draw");
      spyOn(gameObject2, "draw");
      spyOn(gameObject3, "draw");

      stage.draw(ctx);

      expect(gameObject1.draw).toHaveBeenCalledWith(ctx, stage.getCamera());
      expect(gameObject2.draw).toHaveBeenCalledWith(ctx, stage.getCamera());
      expect(gameObject3.draw).toHaveBeenCalledWith(ctx, stage.getCamera());
    });

    it("Should draw the game objects in determined order", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      let order = "";

      const gameObject1 = new ConcreteGameObject();
      gameObject1.setY(1);
      gameObject1.onDraw = () => order += '1';
      const gameObject2 = new ConcreteGameObject();
      gameObject2.setY(2);
      gameObject2.onDraw = () => order += '2';
      const gameObject3 = new ConcreteGameObject();
      gameObject3.setY(3);
      gameObject3.onDraw = () => order += '3';

      stage.setObjectDrawOrder((obj1, obj2) => obj1.getY() - obj2.getY());

      stage.addFirstObject(gameObject1);
      stage.addFirstObject(gameObject2);
      stage.addFirstObject(gameObject3);

      stage.draw(ctx);

      expect(order).toBe("123");
    });

    it("Should trigger onDraw method", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      
      spyOn(stage, "onDraw");

      stage.draw(ctx);

      expect(stage.onDraw).toHaveBeenCalledWith(ctx);
    });

  });

  describe("stop method", () => {

    it("Should stop the game objects", () => {
      const gameObject1 = new ConcreteGameObject();
      const gameObject2 = new ConcreteGameObject();
      const gameObject3 = new ConcreteGameObject();

      stage.addLastObject(gameObject1);
      stage.addLastObject(gameObject2);
      stage.addLastObject(gameObject3);

      spyOn(gameObject1, "stop");
      spyOn(gameObject2, "stop");
      spyOn(gameObject3, "stop");

      stage.stop();

      expect(gameObject1.stop).toHaveBeenCalled();
      expect(gameObject2.stop).toHaveBeenCalled();
      expect(gameObject3.stop).toHaveBeenCalled();
    });

    it("Should stop the game objects in determined order", () => {
      let order = "";
      const gameObject1 = new ConcreteGameObject();
      gameObject1.setY(1);
      gameObject1.onStop = () => order += '1';
      const gameObject2 = new ConcreteGameObject();
      gameObject2.setY(2);
      gameObject2.onStop = () => order += '2';
      const gameObject3 = new ConcreteGameObject();
      gameObject3.setY(3);
      gameObject3.onStop = () => order += '3';

      stage.setObjectStopOrder((obj1, obj2) => obj1.getY() - obj2.getY());

      stage.addFirstObject(gameObject1);
      stage.addFirstObject(gameObject2);
      stage.addFirstObject(gameObject3);

      stage.stop();

      expect(order).toBe("123");
    });

    it("Should trigger onStop method", () => {
      spyOn(stage, "onStop");

      stage.stop();

      expect(stage.onStop).toHaveBeenCalled();
    });

  });

});
