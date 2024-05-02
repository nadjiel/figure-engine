import { ArgumentError } from "../errors/argumentError.js";

/**
 * The `VectorN` class represents a generic sized vector that can't change it's
 * dimension once created.
 * Under the hood, it uses a common array, but prevents it's size changes with
 * the
 * {@linkcode [Object.seal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)}
 * method under the hood.
 * 
 * @version 0.3.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class VectorN {

  /**
   * This property stores the components that compose this vector. For
   * bidimensional vectors, they're often called x and y.
   */
  private components: Array<number>;

  /**
   * @param components The components that will be stored in this vector.
   */
  constructor(...components: Array<number>) {
    this.components = Object.seal(components);
  }

  /**
   * Checks if a component is inside this vector (is in the `[0,
   * <vectorDimension>)` interval).
   * If it isn't, throws an error.
   * @param component The component to check.
   * @throws {ArgumentError} If the passed `component` is outside of the vector.
   */
  private checkComponent(component: number): void {
    if(component < 0 || component >= this.getDimension()) {
      throw new ArgumentError(`component must be inside of vector [0, ${this.getDimension()}[ (received ${component})`);
    }
  }

  /**
   * Sets the component identified by the given `component` to the new value or throws
   * an error if you try to set a component outside of the vector.
   * @param component The index of the component you want to set.
   * @param value The new value you want to set for the component.
   * @throws {ArgumentError} If you pass a `component` outside of the vector
   * (not in the `[0, <vectorDimension>)` interval)
   */
  public setComponent(component: number, value: number) {
    this.checkComponent(component);

    this.components[component] = value;
  }

  /**
   * Returns the array used to store the components of this vector. This array
   * is not meant to be changed directly, instead you should only use the
   * setters provided by this class.
   * @returns The array with the components of this vector.
   */
  public getComponents(): Array<number> {
    return this.components;
  }

  /**
   * Returns the component corresponding to the passed index or throws an error
   * if you try to access a component outside of the vector.
   * @param component The index of the component you want to get.
   * @returns The component identified by the given index.
   * @throws {ArgumentError} If the `component` looked for is outside of the
   * vector (isn't in `[0, <vectorDimension>)` interval)
   */
  public getComponent(component: number): number {
    this.checkComponent(component);

    return this.components[component];
  }

  /**
   * @returns The dimension of this vector (it's amount of components).
   */
  public getDimension(): number {
    return this.components.length;
  }

  /**
   * Sums this vector with another vector and returns the result.
   * 
   * If the `vector` passed in the parameter has a different dimension than this
   * one, an error is thrown. 
   * @param vector A vector with which to sum.
   * @returns The result of the sum.
   * @throws {ArgumentError} If the received `vector` has a different dimension.
   */
  public plus(vector: VectorN): VectorN {
    if(vector.getDimension() !== this.getDimension()) {
      throw new ArgumentError(`vectors must have same dimension (tried adding vector${this.getDimension()} with vector${vector.getDimension()})`);
    }

    const adder = (component: number, index: number) => {
      return component + vector.getComponent(index);
    };

    return new VectorN(...this.getComponents().map(adder));
  }

  /**
   * Returns the result of the increment of the components of this vector by a
   * given `value`.
   * @param value A number by which to increment this vector components.
   * @returns The result of the increment operation.
   */
  public incrementBy(value: number): VectorN {
    const incrementer = (component: number) => {
      return component + value;
    };

    return new VectorN(...this.getComponents().map(incrementer));
  }

  /**
   * @returns A vector corresponding to this vector with every component
   * incremented by `1`.
   */
  public increment(): VectorN {
    return this.incrementBy(1);
  }

  /**
   * Returns a new vector corresponding to this vector scaled by a
   * given `value`.
   * @param scalar A number by which to scale this vector.
   * @returns A vector resulting of the scale of this vector by the received
   * `value`.
   */
  public scaleBy(scalar: number): VectorN {
    const scaler = (component: number) => {
      return component * scalar;
    };

    return new VectorN(...this.getComponents().map(scaler));
  }

  /**
   * This method iterates through each component of this vector and calls the
   * given callback passing each one of them.
   * 
   * This is the equivalent of using `forEach` on the array returned
   * by the {@linkcode getComponents} method to iterate everyone of them.
   * @param callback A callback that receives each component of this vector per
   * call.
   */
  public forEach(callback: (component: number) => void): void {
    this.components.forEach(component => callback(component));
  }

}

export default VectorN;
