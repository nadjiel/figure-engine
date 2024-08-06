import { VectorN } from "./vectorN.js";

/**
 * The `Vector2` class represents a static bidimensional vector.
 * 
 * @version 0.3.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class Vector2 extends VectorN {

  /**
   * This method returns a zero vector (a vector that has its components
   * equal to `0`).
   */
  public static createZero(): Vector2 {
    return new Vector2(0, 0);
  }

  /**
   * This method returns a normalized vector pointing up.
   * (Considering that the y axis goes up negatively)
   */
  public static createUp(): Vector2 {
    return new Vector2(0, -1);
  }

  /**
   * This method returns a normalized vector pointing up.
   */
  public static createRight(): Vector2 {
    return new Vector2(1, 0);
  }

  /**
   * This method returns a normalized vector pointing down.
   * (Considering that the y axis goes down positively)
   */
  public static createDown(): Vector2 {
    return new Vector2(0, 1);
  }

  /**
   * This method returns a normalized vector pointing up.
   */
  public static createLeft(): Vector2 {
    return new Vector2(-1, 0);
  }

  /**
   * @param x The x component of the vector
   * @param y The y component of the vector
   */
  constructor(x: number, y: number) {
    super(x, y);
  }

  public setX(x: number) {
    return this.setComponent(0, x);
  }

  public getX(): number {
    return this.getComponent(0);
  }

  public setY(y: number) {
    return this.setComponent(1, y);
  }

  public getY(): number {
    return this.getComponent(1);
  }

  public plus(vector: Vector2): Vector2 {
    return super.plus(vector) as Vector2;
  }

  public minus(vector: Vector2): Vector2 {
    return super.minus(vector) as Vector2;
  }

  public incrementBy(value: number): Vector2 {
    return super.incrementBy(value) as Vector2;
  }

  public decrementBy(value: number): Vector2 {
    return super.decrementBy(value) as Vector2;
  }

  public increment(): Vector2 {
    return super.increment() as Vector2;
  }

  public decrement(): Vector2 {
    return super.decrement() as Vector2;
  }

  public scaleBy(scalar: number): Vector2 {
    return super.scaleBy(scalar) as Vector2;
  }

}

export default { Vector2 };
