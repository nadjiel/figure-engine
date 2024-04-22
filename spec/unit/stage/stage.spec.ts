import { Stage } from "../../../dist/stage/stage.js";
import { GameObject } from "../../../dist/stage/gameObject.js";
import { Vector2 } from "../../../dist/spatial/vector2.js";

describe("Stage class", () => {

  class ConcreteGameObject extends GameObject {

    constructor() {
      super(Vector2.createZero(), Vector2.createZero());
    }

    onStart(): void {}
    onUpdate(): void {}
    onDraw(ctx: CanvasRenderingContext2D): void {}
    onStop(): void {}
    
  }

  it("Should instantiate properly", () => {
    const stage = new Stage();

    expect(stage.getObjects()).toEqual([]);
  });

  describe("start method", () => {

    it("Should start the game objects", () => {
      const stage = new Stage();
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
      const stage = new Stage();
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
      const stage = new Stage();
      
      spyOn(stage, "onStart");

      stage.start();

      expect(stage.onStart).toHaveBeenCalled();
    });

  });

  describe("update method", () => {

    it("Should update the game objects", () => {
      const stage = new Stage();
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
      const stage = new Stage();
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
      const stage = new Stage();
      
      spyOn(stage, "onUpdate");

      stage.update();

      expect(stage.onUpdate).toHaveBeenCalled();
    });

  });

  describe("draw method", () => {

    it("Should draw the game objects", () => {
      const stage = new Stage();
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

      expect(gameObject1.draw).toHaveBeenCalledWith(ctx);
      expect(gameObject2.draw).toHaveBeenCalledWith(ctx);
      expect(gameObject3.draw).toHaveBeenCalledWith(ctx);
    });

    it("Should draw the game objects in determined order", () => {
      const stage = new Stage();
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
      const stage = new Stage();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      
      spyOn(stage, "onDraw");

      stage.draw(ctx);

      expect(stage.onDraw).toHaveBeenCalledWith(ctx);
    });

  });

  describe("stop method", () => {

    it("Should stop the game objects", () => {
      const stage = new Stage();
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
      const stage = new Stage();
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
      const stage = new Stage();
      
      spyOn(stage, "onStop");

      stage.stop();

      expect(stage.onStop).toHaveBeenCalled();
    });

  });

});
