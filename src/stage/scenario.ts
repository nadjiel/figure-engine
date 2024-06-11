import { StageElement } from "./stageElement.js";
import { Vector2 } from "../spatial/vector2.js";
import { Sprite } from "../resources/sprite.js";
import { Resource } from "../resources/resource.js";

export class Scenario implements StageElement {

  private parallaxSpeed: Vector2 = new Vector2(1, 1);

  // private drawingStrategy: DrawStrategy;

  constructor(sprite?: Sprite, position?: Vector2) {
    
  }

  public getApparentPosition(): Vector2 {
    return Vector2.createZero();
  }

  public setParallaxSpeed(speed: Vector2): void {
    // set parallax speed
  }

  public getParallaxSpeed(): Vector2 {
    return Vector2.createZero();
  }
  
  public usesResource(name: string): void {
    // mark resource as used
  }

  public async load(): Promise<Array<Resource>> {
    return [];
  }

  public getResources(): Array<Resource> {
    return [];
  }
  
  public start(): void {
    // start
  }

  public update(): void {
    // update
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    // draw
  }

  public stop(): void {
    // stop
  }

  public onStart(): void {
    
  }

  public onUpdate(): void {
    
  }

  public onDraw(ctx: CanvasRenderingContext2D): void {
    
  }

  public onStop(): void {
    
  }

}
