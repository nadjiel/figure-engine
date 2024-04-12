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
   * Sets the component identified by the given index to the new value.
   * @param component The index of the component you want to set.
   * @param value The new value you want to set for the component.
   */
  public setComponent(component: number, value: number) {
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
   * @param component The index of the component you want to get.
   * @returns The component identified by the given index.
   */
  public getComponent(component: number): number {
    return this.components[component];
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
