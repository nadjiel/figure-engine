import { ArgumentError } from "../errors/argumentError.js";
import { Vector4 } from "../spatial/vector4.js";

/**
 * The `Color` class is an utility to create rgba color representations. 
 * 
 * @version 0.3.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class Color extends Vector4 {

  /**
   * This constructor creates a new color specified by its parameters.
   * 
   * The `r`, `g` and `b` parameters accept only values greater or
   * equal to `0` and less or equal to `255`; the `a` parameter accepts
   * values between `0` and `1`.
   * 
   * You don't need to pass the `a` parameter, in which case it will be `1`,
   * representing a fully visible color.
   * 
   * If any or the parameters are outside their specified intervals, an error is
   * thrown.
   * @param r The red component of the color `[0, 255]`.
   * @param g The green component of the color `[0, 255]`.
   * @param b The blue component of the color `[0, 255]`.
   * @param a The alpha component of the color `[0, 1]`.
   * @throws {ArgumentError} If any of the parameters are outside the required
   * interval.
   */
  constructor(r: number, g: number, b: number, a?: number) {
    super(r, g, b, a ?? 1);

    this.checkColorComponent(r);
    this.checkColorComponent(g);
    this.checkColorComponent(b);
    this.checkAlphaComponent(a ?? 1);
  }

  /**
   * Checks if the given color component is valid
   * (Is in the `[0, 255]` interval).
   * @param component The component to check.
   * @throws {ArgumentError} If the component is invalid.
   */
  private checkColorComponent(component: number): void {
    if(component < 0 || component > 255) {
      throw new ArgumentError(`color components must be in [0, 255] interval (received ${component})`);
    }
  }

  /**
   * Checks if the given alpha component is valid
   * (Is in the `[0, 1]` interval).
   * @param alpha The alpha to check.
   * @throws {ArgumentError} If the alpha is invalid.
   */
  private checkAlphaComponent(alpha: number): void {
    if(alpha < 0 || alpha > 1) {
      throw new ArgumentError(`color alpha component must be in [0, 1] interval (received ${alpha})`);
    }
  }

  /**
   * Sets a new value to the red component of this color
   * (which must be in the `[0, 255]` interval).
   * @param value The new value to set to the red component.
   * @throws {ArgumentError} If the value is invalid.
   */
  public setR(value: number): void {
    super.setR(value);

    this.checkColorComponent(value);
  }

  /**
   * Sets a new value to the green component of this color
   * (which must be in the `[0, 255]` interval).
   * @param value The new value to set to the green component.
   * @throws {ArgumentError} If the value is invalid.
   */
  public setG(value: number): void {
    super.setG(value);
    
    this.checkColorComponent(value);
  }

  /**
   * Sets a new value to the blue component of this color
   * (which must be in the `[0, 255]` interval).
   * @param value The new value to set to the blue component.
   * @throws {ArgumentError} If the value is invalid.
   */
  public setB(value: number): void {
    super.setB(value);
    
    this.checkColorComponent(value);
  }

  /**
   * Sets a new value to the alpha component of this color
   * (which must be in the `[0, 1]` interval).
   * @param value The new value to set to the alpha component.
   * @throws {ArgumentError} If the value is invalid.
   */
  public setA(value: number): void {
    super.setA(value);
    
    this.checkAlphaComponent(value);
  }

  /**
   * @returns A `string` representation of this color in the
   * `rgba(red, green, blue, alpha)` format.
   */
  public toString(): string {
    return `rgba(${this.getR()}, ${this.getG()}, ${this.getB()}, ${this.getA()})`;
  }

}

/**
 * The `ColorFactory` class holds static methods for predefined colors creation.
 */
export class ColorFactory {

  public static createTransparent(): Color {
    return new Color(0, 0, 0, 0);
  }

  public static createBlack(): Color {
    return new Color(0, 0, 0, 1);
  }

  public static createWhite(): Color {
    return new Color(255, 255, 255, 1);
  }
  
  public static createRed(): Color {
    return new Color(255, 0, 0, 1);
  }

  public static createGreen(): Color {
    return new Color(0, 255, 0, 1);
  }

  public static createBlue(): Color {
    return new Color(0, 0, 255, 1);
  }
  
  public static createYellow(): Color {
    return new Color(255, 255, 0, 1);
  }

  public static createCyan(): Color {
    return new Color(0, 255, 255, 1);
  }
  
  public static createMagenta(): Color {
    return new Color(255, 0, 255, 1);
  }

}

export default Color;
