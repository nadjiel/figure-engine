import { StageElement } from "./stageElement.js";
import { Vector2 } from "../spatial/vector2.js";
import { Sprite } from "../resources/sprite.js";
import { Resource } from "../resources/resource.js";
import { ResourceManager } from "../resources/resourceManager.js";
import { ResourceError } from "../errors/resourceError.js";
import { Color, ColorFactory } from "../graphical/color.js";
import { Rectangle } from "../spatial/rectangle.js";
import { DrawStrategy } from "../graphical/drawStrategy.js";
import { OneDrawStrategy } from "../graphical/oneDrawStrategy.js";

export class Scenario implements StageElement {

  private boundingBox: Rectangle;

  private parallaxSpeed: Vector2 = new Vector2(1, 1);

  private sprite?: Sprite;

  private color = ColorFactory.createTransparent();

  private drawStrategy: DrawStrategy = new OneDrawStrategy();

  private resources = new Array<Resource>();

  constructor(
    sprite?: Sprite,
    dimensions?: Vector2,
    coordinates = Vector2.createZero()
  ) {
    this.sprite = sprite;

    if(dimensions === undefined) {
      if(sprite !== undefined) {
        dimensions = new Vector2(
          sprite.getImageFrameWidth(),
          sprite.getImageFrameHeight()
        );
      } else {
        dimensions = Vector2.createZero();
      }
    }

    this.boundingBox = new Rectangle(coordinates, dimensions);
  }

  /**
   * @returns A rectangle representing the area that this scenario occupies in
   * the game space.
   */
  public getBoundingBox(): Rectangle {
    return this.boundingBox;
  }

  public setX(x: number): void {
    this.boundingBox.setX(x);
  }

  public getX(): number {
    return this.boundingBox.getX();
  }

  public setY(y: number): void {
    this.boundingBox.setY(y);
  }

  public getY(): number {
    return this.boundingBox.getY();
  }

  public setCoordinates(coordinates: Vector2): void {
    this.boundingBox.setCoordinates(coordinates);
  }

  public getCoordinates(): Vector2 {
    return this.boundingBox.getCoordinates();
  }

  /**
   * Sets the width of this {@linkcode Scenario}.
   * 
   * If the width passed is negative, an error is thrown.
   * @param width The width to set.
   * @throws {ArgumentError} If the given `width` is invalid.
   */
  public setWidth(width: number): void {
    this.boundingBox.setWidth(width);
  }

  public getWidth(): number {
    return this.boundingBox.getWidth();
  }

  /**
   * Sets the height of this {@linkcode Scenario}.
   * 
   * If the height passed is negative, an error is thrown.
   * @param height The height to set.
   * @throws {ArgumentError} If the given `height` is invalid.
   */
  public setHeight(height: number): void {
    this.boundingBox.setHeight(height);
  }

  public getHeight(): number {
    return this.boundingBox.getHeight();
  }

  /**
   * Sets the dimensions of this {@linkcode Scenario}.
   * 
   * If any of the dimensions passed are negative, an error is thrown.
   * @param dimensions A 2D vector with width and height values.
   * @throws {ArgumentError} If any of the given dimensions is invalid.
   */
  public setDimensions(dimensions: Vector2): void {
    this.boundingBox.setDimensions(dimensions);
  }

  public getDimensions(): Vector2 {
    return this.boundingBox.getDimensions();
  }

  public setParallaxSpeed(speed: Vector2): void {
    this.parallaxSpeed = speed;
  }

  public getParallaxSpeed(): Vector2 {
    return this.parallaxSpeed;
  }

  public setSprite(sprite?: Sprite): void {
    this.sprite = sprite;
  }

  public getSprite(): Sprite | undefined {
    return this.sprite;
  }

  public setColor(color: Color): void {
    this.color = color;
  }

  public getColor(): Color {
    return this.color;
  }

  public setDrawStrategy(strategy: DrawStrategy): void {
    this.drawStrategy = strategy;
  }

  public getDrawStrategy(): DrawStrategy {
    return this.drawStrategy;
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
    this.drawStrategy.drawColor(ctx, this.color, this.boundingBox);
    if(this.sprite !== undefined) {
      this.drawStrategy.drawSprite(ctx, this.sprite, this.boundingBox);
    }

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
