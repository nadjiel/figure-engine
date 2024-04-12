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
