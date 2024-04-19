import { Stage } from "../../../dist/stage/stage.js";
import { GameObject } from "../../../dist/stage/gameObject.js";
import { Vector2 } from "../../../dist/spatial/vector2.js";

describe("Stage class", () => {

  class ConcreteGameObject extends GameObject {

    constructor() {
      super(Vector2.ZERO, Vector2.ZERO);
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

  describe("addObject method", () => {

    it("Should not allow adding objects to negative indexes", () => {
      const stage = new Stage();
      const index = -1;
  
      expect(() => stage.addObject(index, new ConcreteGameObject()))
        .toThrowError(``);
    });

    it("Should not allow adding objects to indexes too great", () => {
      const stage = new Stage();
      const index = 1;
  
      expect(() => stage.addObject(index, new ConcreteGameObject()))
        .toThrowError(``);
    });

    it("Should allow adding objects to valid indexes", () => {
      const stage = new Stage();
      const index = 0;
      const gameObj = new ConcreteGameObject();
  
      stage.addObject(index, gameObj);

      expect(stage.getObject(index)).toBe(gameObj);
      expect(stage.getObjects()).toEqual([ gameObj ]);
    });

    it("Should push forward existing objects", () => {
      const stage = new Stage();
      const index = 0;
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();
  
      stage.addObject(index, gameObj1);
      stage.addObject(index, gameObj2);

      expect(stage.getObjects()).toEqual([ gameObj2, gameObj1 ]);
    });

  });

  describe("addFirstObject", () => {

    it("Should add object to the start of the list", () => {
      const stage = new Stage();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();

      stage.addFirstObject(gameObj1);
      stage.addFirstObject(gameObj2);

      expect(stage.getObject(0)).toBe(gameObj2);
    });

  });

  describe("addLastObject", () => {

    it("Should add object to the end of the list", () => {
      const stage = new Stage();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();

      stage.addLastObject(gameObj1);
      stage.addLastObject(gameObj2);

      expect(stage.getLastObject()).toBe(gameObj2);
    });

  });

  describe("removeObjectFromIndex method", () => {

    it("Should not allow removing objects from negative indexes", () => {
      const stage = new Stage();
      const index = -1;
  
      expect(() => stage.removeObjectFromIndex(index))
        .toThrowError(``);
    });

    it("Should not allow removing objects from indexes too big", () => {
      const stage = new Stage();
      const index = 1;
  
      expect(() => stage.removeObjectFromIndex(index))
        .toThrowError(``);
    });

    it("Should allow removing objects from valid indexes", () => {
      const stage = new Stage();
      const index = 0;
      const gameObj = new ConcreteGameObject();

      stage.addObject(index, gameObj);
      stage.removeObjectFromIndex(index);

      expect(stage.getObject(index)).not.toBe(gameObj);
      expect(stage.getObjects()).toEqual([]);
    });

  });

  describe("removeObject method", () => {

    it("Should remove found object", () => {
      const stage = new Stage();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();

      stage.addFirstObject(gameObj1);
      stage.addFirstObject(gameObj2);
      stage.removeObject(gameObj1);

      expect(stage.getObjects()).toEqual([ gameObj2 ]);
    });

    it("Should not remove not found object", () => {
      const stage = new Stage();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();

      stage.addFirstObject(gameObj2);
      stage.removeObject(gameObj1);

      expect(stage.getObjects()).toEqual([ gameObj2 ]);
    });

  });

  describe("getObjectIndex method", () => {

    it("Should return index of found object index", () => {
      const stage = new Stage();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();

      stage.addFirstObject(index, gameObj1);
      stage.addFirstObject(index, gameObj2);

      expect(stage.getObjectIndex(gameObj1)).toBe(1);
    });

    it("Should not return index of not found object", () => {
      const stage = new Stage();
      const gameObj = new ConcreteGameObject();

      expect(stage.getObjectIndex(gameObj)).toBeUndefined();
    });

  });

  describe("getObjectFromIndex method", () => {

    it("Should not allow getting objects from negative indexes", () => {
      const stage = new Stage();
      const index = -1;
  
      expect(() => stage.getObjectFromIndex(index))
        .toThrowError(``);
    });

    it("Should not allow getting objects from indexes too big", () => {
      const stage = new Stage();
      const index = 1;
  
      expect(() => stage.getObjectFromIndex(index))
        .toThrowError(``);
    });

    it("Should allow getting objects from valid indexes", () => {
      const stage = new Stage();
      const index = 0;
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();

      stage.addObject(index, gameObj1);
      stage.addObject(index, gameObj2);

      expect(stage.getObjectFromIndex(index)).toBe(gameObj2);
    });

  });

  describe("setObjectUpdateOrder method", () => {

    it("Should determine update order", () => {
      let ordened = 0;
      const stage = new Stage();
      const gameObj1 = new ConcreteGameObject();
      gameObj1.setX(1);
      gameObj1.update(() => ordened = ordened < gameObj1.getX());
      const gameObj2 = new ConcreteGameObject();
      gameObj2.setX(2);
      gameObj2.update(() => ordened = ordened < gameObj2.getX());
      const gameObj3 = new ConcreteGameObject();
      gameObj3.setX(3);
      gameObj3.update(() => ordened = ordened < gameObj3.getX());

      stage.addFirstObject(gameObj1);
      stage.addFirstObject(gameObj2);
      stage.addFirstObject(gameObj3);

      stage.updateObjectsBy((obj1, obj2) => {
        return obj1.getX() - obj2.getX();
      });

      stage.update();

      expect(ordened).toBeTrue();
    });

  });

  describe("setObjectDrawOrder method", () => {

    it("Should determine draw order", () => {
      let ordened = 0;
      const stage = new Stage();
      const gameObj1 = new ConcreteGameObject();
      gameObj1.setX(1);
      gameObj1.draw(() => ordened = ordened < gameObj1.getX());
      const gameObj2 = new ConcreteGameObject();
      gameObj2.setX(2);
      gameObj2.draw(() => ordened = ordened < gameObj2.getX());
      const gameObj3 = new ConcreteGameObject();
      gameObj3.setX(3);
      gameObj3.draw(() => ordened = ordened < gameObj3.getX());

      stage.addFirstObject(gameObj1);
      stage.addFirstObject(gameObj2);
      stage.addFirstObject(gameObj3);

      stage.updateObjectsBy((obj1, obj2) => {
        return obj1.getX() - obj2.getX();
      });

      stage.draw();

      expect(ordened).toBeTrue();
    });

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

      stage.addLastObject(gameObject1);
      stage.addLastObject(gameObject2);
      stage.addLastObject(gameObject3);

      spyOn(gameObject1, "draw");
      spyOn(gameObject2, "draw");
      spyOn(gameObject3, "draw");

      stage.draw();

      expect(gameObject1.draw).toHaveBeenCalled();
      expect(gameObject2.draw).toHaveBeenCalled();
      expect(gameObject3.draw).toHaveBeenCalled();
    });

    it("Should trigger onDraw method", () => {
      const stage = new Stage();
      
      spyOn(stage, "onDraw");

      stage.draw();

      expect(stage.onDraw).toHaveBeenCalled();
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

    it("Should trigger onStop method", () => {
      const stage = new Stage();
      
      spyOn(stage, "onStop");

      stage.stop();

      expect(stage.onStop).toHaveBeenCalled();
    });

  });

});
