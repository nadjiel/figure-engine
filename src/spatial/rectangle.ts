import { Vector2 } from "./vector2.js";
import { ArgumentError } from "../errors/argumentError.js";

/**
 * The `Rectangle` class represents a rectangle in space that has coordinates
 * indicating its position and values indicating its width and height.
 * 
 * @version 0.3.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class Rectangle {

  /**
   * This property stores a bidimensional vector representing the coordinates
   * of this rectangle.
   */
  private coordinates: Vector2;

  /**
   * This property stores a bidimensional vector representing the dimensions
   * of this rectangle.
   */
  private dimensions: Vector2;

  /**
   * This constructor accepts two 2D vectors representing the coordinates and
   * dimensions of this rectangle.
   * 
   * The `dimensions` vector must have its components greater or equal to `0`.
   * If you pass a negative component, an error will be thrown.
   * @param coordinates The x and y coordinates of this rectangle.
   * @param dimensions The width and height dimensions of this rectangle.
   * @throws {ArgumentError} If you pass any negative dimension, either width or
   * height.
   */
  constructor(coordinates: Vector2, dimensions: Vector2) {
    // Suppressing TS error of not setting properties on constructor
    this.coordinates = coordinates;
    this.dimensions = dimensions;

    this.setCoordinates(coordinates);
    this.setDimensions(dimensions);
  }

  /**
   * Sets the coordinates of this rectangle in space.
   * @param coordinates A 2D vector with x and y coordinates.
   */
  public setCoordinates(coordinates: Vector2): void {
    this.coordinates = coordinates;
  }

  /**
   * Sets the x coordinate of this rectangle in space.
   * @param x The x coordinate.
   */
  public setX(x: number): void {
    this.coordinates.setX(x);
  }

  /**
   * Sets the y coordinate of this rectangle in space.
   * @param y The y coordinate.
   */
  public setY(y: number): void {
    this.coordinates.setY(y);
  }

  /**
   * @returns A 2D vector with the x and y coordinates of this rectangle in
   * space.
   */
  public getCoordinates(): Vector2 {
    return this.coordinates;
  }

  /**
   * @returns The x coordinate of this rectangle in space.
   */
  public getX(): number {
    return this.coordinates.getX();
  }

  /**
   * @returns The y coordinate of this rectangle in space.
   */
  public getY(): number {
    return this.coordinates.getY();
  }

  /**
   * Checks if the given `dimension` is valid (greater or equal to `0`).
   * 
   * If it isn't, throws an error.
   * @param dimension A dimension to check.
   * @throws {ArgumentError} If the given `dimension` is invalid.
   */
  private checkDimension(dimension: number): void {
    if(dimension < 0) {
      throw new ArgumentError(`rectangle dimensions must be non negative (received ${dimension})`);
    }
  }

  /**
   * Sets the dimensions of this rectangle.
   * 
   * If any of the dimensions passed are negative, an error is thrown.
   * @param dimensions A 2D vector with width and height values.
   * @throws {ArgumentError} If any of the given dimensions is invalid.
   */
  public setDimensions(dimensions: Vector2): void {
    dimensions.forEach(dimension => this.checkDimension(dimension));

    this.dimensions = dimensions;
  }

  /**
   * Sets the width of this rectangle.
   * 
   * If the width passed is negative, an error is thrown.
   * @param width The width to set.
   * @throws {ArgumentError} If the given `width` is invalid.
   */
  public setWidth(width: number): void {
    this.checkDimension(width);

    this.dimensions.setComponent(0, width);
  }

  /**
   * Sets the height of this rectangle.
   * 
   * If the height passed is negative, an error is thrown.
   * @param height The height to set.
   * @throws {ArgumentError} If the given `height` is invalid.
   */
  public setHeight(height: number): void {
    this.checkDimension(height);

    this.dimensions.setComponent(1, height);
  }

  /**
   * @returns A 2D vector with the width and height dimensions of this
   * rectangle.
   */
  public getDimensions(): Vector2 {
    return this.dimensions;
  }

  /**
   * @returns The width of this rectangle.
   */
  public getWidth(): number {
    return this.dimensions.getComponent(0);
  }

  /**
   * @returns The height of this rectangle.
   */
  public getHeight(): number {
    return this.dimensions.getComponent(1);
  }

  /**
   * @returns The y coordinate referring to the top boundary of this rectangle.
   */
  public getTop(): number {
    return this.getY();
  }

  /**
   * @returns The x coordinate referring to the right boundary of this rectangle.
   */
  public getRight(): number {
    return this.getX() + this.getWidth();
  }

  /**
   * @returns The y coordinate referring to the bottom boundary of this rectangle.
   */
  public getBottom(): number {
    return this.getY() + this.getHeight();
  }

  /**
   * @returns The x coordinate referring to the left boundary of this rectangle.
   */
  public getLeft(): number {
    return this.getX();
  }

}

export default Rectangle;
