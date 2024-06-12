import { StageElement } from "./stageElement.js";
import { Vector2 } from "../spatial/vector2.js";
import { Sprite } from "../resources/sprite.js";
import { Resource } from "../resources/resource.js";
import { ResourceManager } from "../resources/resourceManager.js";
import { ResourceError } from "../errors/resourceError.js";
import { ColorFactory } from "../graphical/color.js";

export class Scenario implements StageElement {

  private sprite?: Sprite;

  private color = ColorFactory.createTransparent();

  private position: Vector2;

  private parallaxSpeed: Vector2 = new Vector2(1, 1);

  // private drawingStrategy: DrawStrategy;

  private resources = new Array<Resource>();

  constructor(sprite?: Sprite, position = Vector2.createZero()) {
    this.sprite = sprite;
    this.position = position;
  }

  public setSprite(sprite?: Sprite): void {
    this.sprite = sprite;
  }

  public getSprite(): Sprite | undefined {
    return this.sprite;
  }

  public setParallaxSpeed(speed: Vector2): void {
    this.parallaxSpeed = speed;
  }

  public getParallaxSpeed(): Vector2 {
    return this.parallaxSpeed;
  }

  public setPosition(position: Vector2): void {
    this.position = position;
  }

  public getPosition(): Vector2 {
    return this.position;
  }

  public getApparentPosition(): Vector2 {
    return Vector2.createZero();
  }
  
  public usesResource(name: string): void {
    const resource = ResourceManager.getResource(name);

    if(resource === undefined) throw new ResourceError(
      `The resource ${name} isn't registered in the ResourceManager`
    );

    this.resources.push(resource);
  }

  public async load(): Promise<Array<Resource>> {
    const loadPromises = new Array<Promise<Resource>>();

    this.resources.forEach(resource => {
      loadPromises.push(resource.load());
    });

    return Promise.all(loadPromises);
  }

  public getResources(): Array<Resource> {
    return this.resources;
  }
  
  public start(): void {
    this.onStart();
  }

  public update(): void {
    this.onUpdate();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    

    this.onDraw(ctx);
  }

  public stop(): void {
    this.onStop();
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
