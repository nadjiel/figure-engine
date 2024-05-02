import { StageElement } from "./stageElement.js";
import { Rectangle } from "../spatial/rectangle.js";
import { Color, ColorFactory } from "../graphical/color.js";
import { Vector2 } from "../spatial/vector2.js";

/**
 * The `GameObject` class allows the creation and customization
 * of objects for the game.
 * These objects generally represent visual things in the game space,
 * such as the player, or enemies, but are not limited to that and
 * can be used to represent other things depending on your objective.
 * 
 * This class is meant to be extended so
 * that you can describe the custom behavior of your object. 
 * 
 * @version 0.3.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export abstract class GameObject implements StageElement {
  
  /**
   * This property represents the area that this game object occupies
   * in the game space.
   */
  private boundingBox: Rectangle;

  /**
   * This property stores the color that is used to paint the object on
   * the game canvas.
   * 
   * This is helpful for debug when you don't have set a sprite for the object
   * yet and is initially set to no color so that you adjust it to your
   * preference.
   */
  private color = ColorFactory.createTransparent();

  /**
   * @param coordinates The coordinates of this object in the game space.
   * @param dimensions The dimensions of this object in the game space.
   */
  constructor(coordinates: Vector2, dimensions: Vector2) {
    this.boundingBox = new Rectangle(coordinates, dimensions);
  }

  /**
   * @returns A rectangle representing the area that this object occupies in
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
   * Sets the width of this game object.
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
   * Sets the height of this game object.
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
   * Sets the dimensions of this game object.
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

  public setColor(color: Color): void {
    this.color = color;
  }

  public getColor(): Color {
    return this.color;
  }

  /**
   * This method is executed on the start of the stage this object is in.
   * 
   * It triggers the {@linkcode onStart} method, which you can use to define
   * what happens to this object once its stage starts.
   */
  public start(): void {
    this.onStart();
  }

  /**
   * The `update` method is executed every frame before the {@linkcode draw}
   * method.
   * 
   * It triggers the {@linkcode onUpdate} method, which you can use to define
   * what happens to this object every frame.
   */
  public update(): void {
    this.onUpdate();
  }

  /**
   * The `draw` method is executed every frame after the {@linkcode update}
   * method.
   * 
   * It triggers the {@linkcode onDraw} method, which you can use to define
   * what this game object draws.
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color.toString();
    ctx.fillRect(
      this.getX(), this.getY(),
      this.getWidth(), this.getHeight()
    );

    this.onDraw(ctx);
  }

  /**
   * This method is executed on the stop of the stage this object is in.
   * 
   * It triggers the {@linkcode onStop} method, which you can use to define
   * what happens to this object once its stage stops.
   */
  public stop(): void {
    this.onStop();
  }

  /**
   * This method allows you to define what happens to this object when its
   * stage starts.
   */
  public abstract onStart(): void;

  /**
   * This method allows you to define what happens to this object every frame
   * before its drawing.
   */
  public abstract onUpdate(): void;

  /**
   * This method allows you to define what this object draws every frame after
   * being updated.
   */
  public abstract onDraw(ctx: CanvasRenderingContext2D): void;

  /**
   * This method allows you to define what happens to this object when its
   * stage stops.
   */
  public abstract onStop(): void;

}

export default GameObject;
