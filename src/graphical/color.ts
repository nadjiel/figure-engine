import ArgumentError from "../errors/argumentError.js";

/**
 * The `Color` class is an utility to create rgba color representations. 
 * 
 * @version 0.3.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class Color {

  public static readonly TRANSPARENT = new Color(0, 0, 0, 0);

  public static readonly NONE = this.TRANSPARENT;
  
  public static readonly BLACK = new Color(0, 0, 0, 1);
  
  public static readonly WHITE = new Color(255, 255, 255, 1);
  
  public static readonly RED = new Color(255, 0, 0, 1);
  
  public static readonly GREEN = new Color(0, 255, 0, 1);
  
  public static readonly BLUE = new Color(0, 0, 255, 1);
  
  public static readonly YELLOW = new Color(255, 255, 0, 1);
  
  public static readonly CYAN = new Color(0, 255, 255, 1);
  
  public static readonly MAGENTA = new Color(255, 0, 255, 1);

  /**
   * Stores a string representation of the color.
   */
  private color: string;

  /**
   * This constructor creates a new color specified by its parameters.
   * 
   * The `red`, `green` and `blue` parameters accept only values greater or
   * equal to `0` and less or equal to `255`; the `alpha` parameter accepts
   * values between `0` and `1`.
   * 
   * You don't need to pass the `alpha` parameter, in which case it will be `1`,
   * representing a fully visible color.
   * 
   * If any or the parameters are outside their specified intervals, an error is
   * thrown.
   * @param red The red component of the color `[0, 255]`.
   * @param green The green component of the color `[0, 255]`.
   * @param blue The blue component of the color `[0, 255]`.
   * @param alpha The alpha component of the color `[0, 1]`.
   * @throws {ArgumentError} If any of the parameters are outside the required
   * interval.
   */
  constructor(red: number, green: number, blue: number, alpha?: number) {
    // Supressing TS property not set in constructor error
    this.color = "";

    this.createColor(red, green, blue, alpha);
  }

  /**
   * Checks if the given color component is valid
   * (Is in the `[0, 255]` interval).
   * @param component The component to check.
   * @throws {ArgumentError} If the component is invalid.
   */
  private checkComponent(component: number): void {
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
  private checkAlpha(alpha: number): void {
    if(alpha < 0 || alpha > 1) {
      throw new ArgumentError(`color alpha component must be in [0, 1] interval (received ${alpha})`);
    }
  }

  /**
   * Creates and stores the color specified by the parameters in a `string`
   * representation if every parameter is valid.
   * 
   * If any parameter is invalid, throws an error.
   * @param red The red component of the color `[0, 255]`.
   * @param green The green component of the color `[0, 255]`.
   * @param blue The blue component of the color `[0, 255]`.
   * @param alpha The alpha component of the color `[0, 1]`.
   * @throws {ArgumentError} If any of the parameters are outside the required
   * interval.
   */
  private createColor(
    red: number,
    green: number,
    blue: number,
    alpha?: number
  ): void {
    if(alpha === undefined) alpha = 1;

    this.checkComponent(red);
    this.checkComponent(green);
    this.checkComponent(blue);
    this.checkAlpha(alpha);
    
    this.color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  /**
   * @returns A `string` representation of this color in the
   * `rgba(red, green, blue, alpha)` format.
   */
  public getColor(): string {
    return this.color;
  }

}

export default Color;
