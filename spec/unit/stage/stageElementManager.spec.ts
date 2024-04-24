import { StageElementManager } from "../../../dist/stage/stageElementManager.js";
import { GameObject } from "../../../dist/stage/gameObject.js";
import { Vector2 } from "../../../dist/spatial/vector2.js";

describe("StageElementManager class", () => {

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
    const stage = new StageElementManager();

    expect(stage.getElements()).toEqual([]);
    expect(stage.getStartOrder()).toBeUndefined();
    expect(stage.getUpdateOrder()).toBeUndefined();
    expect(stage.getDrawOrder()).toBeUndefined();
    expect(stage.getStopOrder()).toBeUndefined();
  });

  describe("add method", () => {

    it("Should not allow adding elements to negative indexes", () => {
      const manager = new StageElementManager<GameObject>();
      const index = -1;
  
      expect(() => manager.add(index, new ConcreteGameObject()))
        .toThrowError(`index must be inside [0, ${manager.getAmount()}] (received ${index})`);
    });

    it("Should not allow adding elements to indexes too great", () => {
      const manager = new StageElementManager<GameObject>();
      const index = 1;
  
      expect(() => manager.add(index, new ConcreteGameObject()))
        .toThrowError(`index must be inside [0, ${manager.getAmount()}] (received ${index})`);
    });

    it("Should allow adding elements to index 0", () => {
      const manager = new StageElementManager<GameObject>();
      const gameObj = new ConcreteGameObject();
      const index = 0;
  
      manager.add(index, gameObj);

      expect(manager.getElements()).toEqual([ gameObj ]);
    });

    it("Should allow adding elements to valid indexes", () => {
      const manager = new StageElementManager<GameObject>();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();
      manager.add(0, gameObj1);
      const index = 1;
  
      manager.add(index, gameObj2);

      expect(manager.getElements()).toEqual([ gameObj1, gameObj2 ]);
    });

    it("Should push forward existing objects", () => {
      const manager = new StageElementManager<GameObject>();
      const index = 0;
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();
  
      manager.add(index, gameObj1);
      manager.add(index, gameObj2);

      expect(manager.getElements()).toEqual([ gameObj2, gameObj1 ]);
    });

  });

  describe("addFirst method", () => {

    it("Should add element to the start of the list", () => {
      const manager = new StageElementManager<GameObject>();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);

      expect(manager.getElements()).toEqual([ gameObj2, gameObj1 ]);
    });

  });

  describe("addLast method", () => {

    it("Should add element to the end of the list", () => {
      const manager = new StageElementManager<GameObject>();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();

      manager.addLast(gameObj1);
      manager.addLast(gameObj2);

      expect(manager.getElements()).toEqual([ gameObj1, gameObj2 ]);
    });

  });

  describe("remove method", () => {

    it("Should not remove not found object", () => {
      const manager = new StageElementManager<GameObject>();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();

      manager.addFirst(gameObj1);
      
      expect(manager.remove(gameObj2)).toBeFalse();
      expect(manager.getElements()).toEqual([ gameObj1 ]);
    });

    it("Should remove found object", () => {
      const manager = new StageElementManager<GameObject>();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);

      expect(manager.remove(gameObj1)).toBeTrue();
      expect(manager.getElements()).toEqual([ gameObj2 ]);
    });

  });

  describe("removeFrom method", () => {

    it("Should not allow removing when empty", () => {
      const manager = new StageElementManager<GameObject>();
      const index = 0;
  
      expect(() => manager.removeFrom(index))
        .toThrowError(`can't access element from empty sequence`);
    });

    it("Should not allow removing elements from negative indexes", () => {
      const manager = new StageElementManager<GameObject>();
      manager.addFirst(new ConcreteGameObject());
      const index = -1;
  
      expect(() => manager.removeFrom(index))
        .toThrowError(`index must be inside [0, ${manager.getAmount()}[ (received ${index})`);
    });

    it("Should not allow removing elements from indexes too big", () => {
      const manager = new StageElementManager<GameObject>();
      manager.addFirst(new ConcreteGameObject());
      const index = 1;
  
      expect(() => manager.removeFrom(index))
        .toThrowError(`index must be inside [0, ${manager.getAmount()}[ (received ${index})`);
    });

    it("Should allow removing elements from valid indexes", () => {
      const manager = new StageElementManager<GameObject>();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();
      const index = 1;

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);
      
      expect(manager.removeFrom(index)).toBe(gameObj1);
      expect(manager.getElements()).toEqual([ gameObj2 ]);
    });

  });

  describe("removeFirst method", () => {

    it("Should return undefined on empty list", () => {
      const manager = new StageElementManager<GameObject>();

      expect(manager.removeFirst()).toBeUndefined();
    });

    it("Should remove first element from list", () => {
      const manager = new StageElementManager<GameObject>();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);

      expect(manager.removeFirst()).toBe(gameObj2);
      expect(manager.getElements()).toEqual([ gameObj1 ]);
    });

  });

  describe("removeLast method", () => {

    it("Should return undefined on empty list", () => {
      const manager = new StageElementManager<GameObject>();

      expect(manager.removeLast()).toBeUndefined();
    });

    it("Should remove last element from list", () => {
      const manager = new StageElementManager<GameObject>();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);

      expect(manager.removeLast()).toBe(gameObj1);
      expect(manager.getElements()).toEqual([ gameObj2 ]);
    });

  });

  describe("getFrom method", () => {

    it("Should not allow getting when empty", () => {
      const manager = new StageElementManager<GameObject>();
      const index = 0;
  
      expect(() => manager.getFrom(index))
        .toThrowError(`can't access element from empty sequence`);
    });

    it("Should not allow getting elements from negative indexes", () => {
      const manager = new StageElementManager<GameObject>();
      manager.addFirst(new ConcreteGameObject());
      const index = -1;
  
      expect(() => manager.getFrom(index))
        .toThrowError(`index must be inside [0, ${manager.getAmount()}[ (received ${index})`);
    });

    it("Should not allow getting elements from indexes too big", () => {
      const manager = new StageElementManager<GameObject>();
      manager.addFirst(new ConcreteGameObject());
      const index = 1;
  
      expect(() => manager.getFrom(index))
        .toThrowError(`index must be inside [0, ${manager.getAmount()}[ (received ${index})`);
    });

    it("Should allow getting elements from valid indexes", () => {
      const manager = new StageElementManager<GameObject>();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();
      const index = 1;

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);

      expect(manager.getFrom(index)).toBe(gameObj1);
    });

  });

  describe("getIndex method", () => {

    it("Should return index of found object", () => {
      const manager = new StageElementManager<GameObject>();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();
      const expectedIndex = 1;

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);

      expect(manager.getIndex(gameObj1)).toBe(expectedIndex);
    });

    it("Should not return index of not found object", () => {
      const manager = new StageElementManager<GameObject>();
      const gameObj = new ConcreteGameObject();
      const expectedIndex = -1;

      expect(manager.getIndex(gameObj)).toBe(expectedIndex);
    });

  });

  describe("getFirst method", () => {

    it("Should return undefined on empty list", () => {
      const manager = new StageElementManager<GameObject>();

      expect(manager.getFirst()).toBeUndefined();
    });

    it("Should return first element from list", () => {
      const manager = new StageElementManager<GameObject>();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);

      expect(manager.getFirst()).toBe(gameObj2);
    });

  });

  describe("getLast method", () => {

    it("Should return undefined on empty list", () => {
      const manager = new StageElementManager<GameObject>();

      expect(manager.getLast()).toBeUndefined();
    });

    it("Should return last element from list", () => {
      const manager = new StageElementManager<GameObject>();
      const gameObj1 = new ConcreteGameObject();
      const gameObj2 = new ConcreteGameObject();

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);

      expect(manager.getLast()).toBe(gameObj1);
    });

  });

  describe("start method", () => {

    it("Should iterate in insertion order" , () => {
      const manager = new StageElementManager<GameObject>();
      let order = "";
      const gameObj1 = new ConcreteGameObject();
      gameObj1.start = () => order += '1';
      const gameObj2 = new ConcreteGameObject();
      gameObj2.start = () => order += '2';
      const gameObj3 = new ConcreteGameObject();
      gameObj3.start = () => order += '3';

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);
      manager.addFirst(gameObj3);

      manager.start();

      expect(order).toBe("321");
    });

    it("Should iterate in determined order" , () => {
      const manager = new StageElementManager<GameObject>();
      let order = "";
      const gameObj1 = new ConcreteGameObject();
      gameObj1.setY(1);
      gameObj1.start = () => order += '1';
      const gameObj2 = new ConcreteGameObject();
      gameObj2.setY(2);
      gameObj2.start = () => order += '2';
      const gameObj3 = new ConcreteGameObject();
      gameObj3.setY(3);
      gameObj3.start = () => order += '3';

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);
      manager.addFirst(gameObj3);

      manager.setStartOrder((el1, el2) => el1.getY() - el2.getY());

      manager.start();

      expect(order).toBe("123");
    });

  });

  describe("update method", () => {

    it("Should iterate in insertion order" , () => {
      const manager = new StageElementManager<GameObject>();
      let order = "";
      const gameObj1 = new ConcreteGameObject();
      gameObj1.update = () => order += '1';
      const gameObj2 = new ConcreteGameObject();
      gameObj2.update = () => order += '2';
      const gameObj3 = new ConcreteGameObject();
      gameObj3.update = () => order += '3';

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);
      manager.addFirst(gameObj3);

      manager.update();

      expect(order).toBe("321");
    });

    it("Should iterate in determined order" , () => {
      const manager = new StageElementManager<GameObject>();
      let order = "";
      const gameObj1 = new ConcreteGameObject();
      gameObj1.setY(1);
      gameObj1.update = () => order += '1';
      const gameObj2 = new ConcreteGameObject();
      gameObj2.setY(2);
      gameObj2.update = () => order += '2';
      const gameObj3 = new ConcreteGameObject();
      gameObj3.setY(3);
      gameObj3.update = () => order += '3';

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);
      manager.addFirst(gameObj3);

      manager.setUpdateOrder((el1, el2) => el1.getY() - el2.getY());

      manager.update();

      expect(order).toBe("123");
    });

  });

  describe("draw method", () => {

    it("Should iterate in insertion order" , () => {
      const manager = new StageElementManager<GameObject>();
      let order = "";
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const gameObj1 = new ConcreteGameObject();
      gameObj1.draw = (ctx) => order += '1';
      const gameObj2 = new ConcreteGameObject();
      gameObj2.draw = (ctx) => order += '2';
      const gameObj3 = new ConcreteGameObject();
      gameObj3.draw = (ctx) => order += '3';

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);
      manager.addFirst(gameObj3);

      manager.draw(ctx);

      expect(order).toBe("321");
    });

    it("Should iterate in determined order" , () => {
      const manager = new StageElementManager<GameObject>();
      let order = "";
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const gameObj1 = new ConcreteGameObject();
      gameObj1.setY(1);
      gameObj1.draw = (ctx) => order += '1';
      const gameObj2 = new ConcreteGameObject();
      gameObj2.setY(2);
      gameObj2.draw = (ctx) => order += '2';
      const gameObj3 = new ConcreteGameObject();
      gameObj3.setY(3);
      gameObj3.draw = (ctx) => order += '3';

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);
      manager.addFirst(gameObj3);

      manager.setDrawOrder((el1, el2) => el1.getY() - el2.getY());

      manager.draw(ctx);

      expect(order).toBe("123");
    });

  });

  describe("stop method", () => {

    it("Should iterate in insertion order" , () => {
      const manager = new StageElementManager<GameObject>();
      let order = "";
      const gameObj1 = new ConcreteGameObject();
      gameObj1.stop = () => order += '1';
      const gameObj2 = new ConcreteGameObject();
      gameObj2.stop = () => order += '2';
      const gameObj3 = new ConcreteGameObject();
      gameObj3.stop = () => order += '3';

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);
      manager.addFirst(gameObj3);

      manager.stop();

      expect(order).toBe("321");
    });

    it("Should iterate in determined order" , () => {
      const manager = new StageElementManager<GameObject>();
      let order = "";
      const gameObj1 = new ConcreteGameObject();
      gameObj1.setY(1);
      gameObj1.stop = () => order += '1';
      const gameObj2 = new ConcreteGameObject();
      gameObj2.setY(2);
      gameObj2.stop = () => order += '2';
      const gameObj3 = new ConcreteGameObject();
      gameObj3.setY(3);
      gameObj3.stop = () => order += '3';

      manager.addFirst(gameObj1);
      manager.addFirst(gameObj2);
      manager.addFirst(gameObj3);

      manager.setStopOrder((el1, el2) => el1.getY() - el2.getY());

      manager.stop();

      expect(order).toBe("123");
    });

  });

});
