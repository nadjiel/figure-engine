import { Vector2 } from "../../../dist/spatial/vector2.js";
import { Camera, CameraParams } from "../../../dist/stage/camera.js";
import { Game } from "../../../dist/main/game.js";
import { Rectangle } from "../../../dist/spatial/rectangle.js";

describe("Camera class", () => {

  const game = new Game();

  class ConcreteCamera extends Camera {

    public constructor(params: CameraParams) {
      super(params);
    }

    public start(): void {
      throw new Error("Method not implemented.");
    }

    public update(): void {
      throw new Error("Method not implemented.");
    }

    public draw(ctx: CanvasRenderingContext2D): void {
      throw new Error("Method not implemented.");
    }

    public stop(): void {
      throw new Error("Method not implemented.");
    }

    public onStart(): void {
      throw new Error("Method not implemented.");
    }

    public onUpdate(): void {
      throw new Error("Method not implemented.");
    }

    public onDraw(ctx: CanvasRenderingContext2D): void {
      throw new Error("Method not implemented.");
    }

    public onStop(): void {
      throw new Error("Method not implemented.");
    }
    
  }

  afterAll(() => {
    game.getRoot().removeChild(game.getHTMLCanvas());
  });

  it("Should instantiate properly with x, y, width and height", () => {
    const x = 0;
    const y = 0;
    const width = 720;
    const height = 480;

    const camera = new ConcreteCamera({
      game,
      x, y,
      width, height
    });

    expect(camera.getX()).toBe(x);
    expect(camera.getY()).toBe(y);
    expect(camera.getWidth()).toBe(width);
    expect(camera.getHeight()).toBe(height);
  });

  it("Should instantiate properly with coordinates and dimensions", () => {
    const coordinates = new Vector2(0, 0);
    const dimensions = new Vector2(720, 480);

    const camera = new ConcreteCamera({
      game,
      coordinates,
      dimensions
    });

    expect(camera.getCoordinates()).toEqual(coordinates);
    expect(camera.getDimensions()).toEqual(dimensions);
  });

  it("Should instantiate properly with bounding box", () => {
    const boundingBox = new Rectangle(
      new Vector2(0, 0),
      new Vector2(720, 480)
    );

    const camera = new ConcreteCamera({
      game,
      boundingBox
    });

    expect(camera.getBoundingBox()).toEqual(boundingBox);
  });

});
