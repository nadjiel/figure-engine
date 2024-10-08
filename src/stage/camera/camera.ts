import { Game } from "../../main/game.js";
import { Resource } from "../../resources/resource.js";
import { Rectangle } from "../../spatial/rectangle.js";
import { Vector2 } from "../../spatial/vector2.js";
import { StageElement } from "../stageElement.js";

export interface CameraParams {

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

  private speed: Vector2 = Vector2.createZero();

  constructor(params?: CameraParams) {
    let {
      x, y,
      width, height,
      coordinates,
      dimensions,
      boundingBox
    } = params || {};

    const game = Game.getInstance();

    if(x === undefined) {
      x = 0;
    }
    if(y === undefined) {
      y = 0;
    }
    if(width === undefined) {
      width = game?.getWidth() || 0;
    }
    if(height === undefined) {
      height = game?.getHeight() || 0;
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

  public getCenterCoordinates(): Vector2 {
    return new Vector2(
      this.getX() + this.getWidth() / 2,
      this.getY() + this.getHeight() / 2
    );
  }

  public setWidth(width: number): void {
    this.boundingBox.setWidth(width);
  }

  public getWidth(): number {
    return this.boundingBox.getWidth();
  }

  public setHeight(height: number): void {
    this.boundingBox.setHeight(height);
  }

  public getHeight(): number {
    return this.boundingBox.getHeight();
  }

  public setDimensions(dimensions: Vector2): void {
    this.boundingBox.setDimensions(dimensions);
  }

  public getDimensions(): Vector2 {
    return this.boundingBox.getDimensions();
  }

  public getApparentCoordinates(coordinates: Vector2, parallax?: Vector2): Vector2 {
    if(parallax === undefined) {
      parallax = new Vector2(1, 1);
    }

    const parallaxedCoords = new Vector2(
      this.getX() * parallax.getX(),
      this.getY() * parallax.getY()
    );

    return coordinates.minus(parallaxedCoords);
  }

  public setSpeed(speed: Vector2): void {
    this.speed = speed;
  }

  public getSpeed(): Vector2 {
    return this.speed;
  }

  public move(): void {
    this.setCoordinates(this.getCoordinates().plus(this.getSpeed()));
  }

  public usesResource(name: string): void {
    
  }

  public async load(): Promise<Array<Resource>> {
    return []
  }

  public getResources(): Array<Resource> {
    return []
  }

  public start(): void {}

  public update(): void {}

  public draw(ctx: CanvasRenderingContext2D): void {}

  public stop(): void {}

  public abstract onStart(): void;

  public abstract onUpdate(): void;

  public abstract onDraw(ctx: CanvasRenderingContext2D): void;

  public abstract onStop(): void;

}

export default Camera;
