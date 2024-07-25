import { Resource } from "../resources/resource.js";
import { Rectangle } from "../spatial/rectangle.js";
import { Vector2 } from "../spatial/vector2.js";
import { StageElement } from "./stageElement.js";

export class Camera implements StageElement {
  
  private boundingBox: Rectangle;

  constructor(x: number, y: number, width?: number, height?: number) {
    // Game width and height should be got from game
    const gameWidth = 0;
    const gameHeight = 0;
    const coords = new Vector2(x, y);
    const size = new Vector2(width || gameWidth, height || gameHeight);
    this.boundingBox = new Rectangle(coords, size);
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
