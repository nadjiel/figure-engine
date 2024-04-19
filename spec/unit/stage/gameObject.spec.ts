import { GameObject } from "../../../dist/stage/gameObject.js";
import { Vector2 } from "../../../dist/spatial/vector2.js";
import { Rectangle } from "../../../dist/spatial/rectangle.js";
import Color from "../../../dist/graphical/color.js";

describe("GameObject class", () => {

  class ConcreteGameObject extends GameObject {

    onStart(): void {
      
    }

    onUpdate(): void {
      
    }

    onDraw(ctx: CanvasRenderingContext2D): void {
      
    }

    onStop(): void {
      
    }
    
  }

  it("Should instantiate properly", () => {
    const coordinates = Vector2.ZERO;
    const dimensions = new Vector2(10, 15);
    const gameObject = new ConcreteGameObject(coordinates, dimensions);

    expect(gameObject.getBoundingBox()).toEqual(new Rectangle(coordinates, dimensions));
    expect(gameObject.getX()).toBe(coordinates.getX());
    expect(gameObject.getY()).toBe(coordinates.getY());
    expect(gameObject.getCoordinates()).toBe(coordinates);
    expect(gameObject.getWidth()).toBe(dimensions.getComponent(0));
    expect(gameObject.getHeight()).toBe(dimensions.getComponent(1));
    expect(gameObject.getDimensions()).toBe(dimensions);
    expect(gameObject.getColor()).toEqual(Color.NONE);
  });

  describe("start method", () => {

    it("Should trigger onStart method", () => {
      const coordinates = Vector2.ZERO;
      const dimensions = new Vector2(10, 20);
      const gameObject = new ConcreteGameObject(coordinates, dimensions);

      spyOn(gameObject, "onStart");

      gameObject.start();

      expect(gameObject.onStart).toHaveBeenCalled();
    });

  });

  describe("update method", () => {

    it("Should trigger onUpdate method", () => {
      const coordinates = Vector2.ZERO;
      const dimensions = new Vector2(10, 20);
      const gameObject = new ConcreteGameObject(coordinates, dimensions);

      spyOn(gameObject, "onUpdate");

      gameObject.update();

      expect(gameObject.onUpdate).toHaveBeenCalled();
    });

  });

  describe("draw method", () => {

    it("Should trigger onDraw method", () => {
      const coordinates = Vector2.ZERO;
      const dimensions = new Vector2(10, 20);
      const gameObject = new ConcreteGameObject(coordinates, dimensions);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      spyOn(gameObject, "onDraw");

      gameObject.draw(ctx);

      expect(gameObject.onDraw).toHaveBeenCalledWith(ctx);
    });

    it("Should draw on canvas", () => {
      const coordinates = Vector2.ZERO;
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
      const coordinates = Vector2.ZERO;
      const dimensions = new Vector2(10, 20);
      const gameObject = new ConcreteGameObject(coordinates, dimensions);

      spyOn(gameObject, "onStop");

      gameObject.stop();

      expect(gameObject.onStop).toHaveBeenCalled();
    });

  });

});
