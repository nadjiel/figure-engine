import { Game } from "../main/game.js";
import { Resource } from "../resources/resource.js";
import { Rectangle } from "../spatial/rectangle.js";
import { Vector2 } from "../spatial/vector2.js";
import { StageElement } from "./stageElement.js";

interface CameraParams {

  game: Game,

  x?: number,
  y?: number,
  width?: number,
  height?: number,

  coordinates?: Vector2,
  dimensions?: Vector2,

  boundingBox?: Rectangle

}

export abstract class Camera implements StageElement {
  
  private boundingBox: Rectangle;

  constructor(params: CameraParams) {
    let {
      game,
      x, y,
      width, height,
      coordinates,
      dimensions,
      boundingBox
    } = params;

    if(x === undefined) {
      x = 0;
    }
    if(y === undefined) {
      y = 0;
    }
    if(width === undefined) {
      width = game.getWidth();
    }
    if(height === undefined) {
      height = game.getHeight();
    }
    if(coordinates === undefined) {
      coordinates = new Vector2(x, y);
    }
    if(dimensions === undefined) {
      dimensions = new Vector2(width, height);
    }
    if(boundingBox === undefined) {
      boundingBox = new Rectangle(coordinates, dimensions);
    }

    this.boundingBox = boundingBox;
  }

  usesResource(name: string): void {
    throw new Error("Method not implemented.");
  }

  load(): Promise<Array<Resource>> {
    throw new Error("Method not implemented.");
  }

  getResources(): Array<Resource> {
    throw new Error("Method not implemented.");
  }

  start(): void {
    throw new Error("Method not implemented.");
  }

  update(): void {
    throw new Error("Method not implemented.");
  }

  draw(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }

  stop(): void {
    throw new Error("Method not implemented.");
  }

  onStart(): void {
    throw new Error("Method not implemented.");
  }

  onUpdate(): void {
    throw new Error("Method not implemented.");
  }

  onDraw(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }

  onStop(): void {
    throw new Error("Method not implemented.");
  }

}

export default Camera;
