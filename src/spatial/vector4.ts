import { VectorN } from "./vectorN.js";

/**
 * The `Vector4` class represents a four dimensional vector.
 * 
 * @version 0.3.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class Vector4 extends VectorN<Vector4> {

  /**
   * This method returns a zero vector (a vector that has its components
   * equal to `0`).
   */
  public static createZero(): Vector4 {
    return new Vector4(0, 0, 0, 0);
  }

  /**
   * @param r The r component of the vector
   * @param g The g component of the vector
   * @param b The b component of the vector
   * @param a The a component of the vector
   */
  constructor(r: number, g: number, b: number, a: number) {
    super(r, g, b, a);
  }

  public setR(r: number) {
    return this.setComponent(0, r);
  }

  public getR(): number {
    return this.getComponent(0);
  }

  public setG(g: number) {
    return this.setComponent(1, g);
  }

  public getG(): number {
    return this.getComponent(1);
  }

  public setB(b: number) {
    return this.setComponent(2, b);
  }

  public getB(): number {
    return this.getComponent(2);
  }

  public setA(a: number) {
    return this.setComponent(3, a);
  }

  public getA(): number {
    return this.getComponent(3);
  }

}

export default { Vector4 };
