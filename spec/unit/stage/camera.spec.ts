import { Vector2 } from "../../../dist/spatial/vector2.js";
import { Camera, CameraParams } from "../../../dist/stage/camera/camera.js";
import { Game } from "../../../dist/main/game.js";
import { Rectangle } from "../../../dist/spatial/rectangle.js";

describe("Camera class", () => {

  class ConcreteCamera extends Camera {

    public constructor(params?: CameraParams) {
      super(params);
    }

    public start(): void {}
    public update(): void {}
    public draw(ctx: CanvasRenderingContext2D): void {}
    public stop(): void {}
    public onStart(): void {}
    public onUpdate(): void {}
    public onDraw(ctx: CanvasRenderingContext2D): void {}
    public onStop(): void {}
    
  }

  let game: Game;
  let camera: Camera;

  beforeAll(() => {
    game = new Game();
  });

  beforeEach(() => {
    camera = new ConcreteCamera();
  });

  afterAll(() => {
    game.unmount();
  });

  it("Should instantiate properly without params", () => {
    const expectedX = 0;
    const expectedY = 0;
    const expectedWidth = game.getWidth();
    const expectedHeight = game.getHeight();

    expect(camera.getX()).toBe(expectedX);
    expect(camera.getY()).toBe(expectedY);
    expect(camera.getWidth()).toBe(expectedWidth);
    expect(camera.getHeight()).toBe(expectedHeight);
  });

  it("Should instantiate properly with x, y, width and height", () => {
    const x = 0;
    const y = 0;
    const width = 720;
    const height = 480;

    camera = new ConcreteCamera({
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

    camera = new ConcreteCamera({
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

    camera = new ConcreteCamera({
      boundingBox
    });

    expect(camera.getBoundingBox()).toEqual(boundingBox);
  });

});
