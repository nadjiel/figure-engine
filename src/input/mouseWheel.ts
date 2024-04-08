/**
 * The `MouseWheel` class has useful methods for representing a mouse wheel.
 * It allows you to know if, and in what axis, the wheel is rotating.
 * 
 * @version 0.2.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class MouseWheel {

  /**
   * This property stores an `Array` with `3` items representing the current
   * rotation of the mouse wheel in the x, y and z axis, respectively.
   */
  private rotation = new Array(0, 0, 0);

  /**
   * This property stores for how much frames the rotation from a wheel event
   * is registered.
   * 
   * Each wheel event should register its rotation for only 1 frame, and that's
   * guaranteed by the {@linkcode update} method when it is called each frame.
   */
  private rotatingFrames = 0;

  private setRotation(x: number, y: number, z: number): void {
    this.rotation[0] = x;
    this.rotation[1] = y;
    this.rotation[2] = z;
    
    this.rotatingFrames = 0;
  }

  /**
   * The `wheelEvent` method stores the rotation triggered by the mouse wheel.
   * @param e The event obtained from a `wheel` event listener.
   */
  public wheelEvent(e: WheelEvent): void {
    this.setRotation(e.deltaX, e.deltaY, e.deltaZ);
  }

  /**
   * This method updates the `rotation` property to keep it consistent in a way
   * that each rotation is only stored for the duration of `1` frame. For that,
   * it is executed every frame.
   */
  public update(): void {
    if(this.isRotating()) this.rotatingFrames++;

    if(this.rotatingFrames > 1) {
      this.setRotation(0, 0, 0);
    }
  }

  /**
   * @returns The current x rotation of the mouse wheel.
   */
  public getXRotation(): number {
    return this.rotation[0];
  }

  /**
   * @returns The current y rotation of the mouse wheel.
   */
  public getYRotation(): number {
    return this.rotation[1];
  }

  /**
   * @returns The current z rotation of the mouse wheel.
   */
  public getZRotation(): number {
    return this.rotation[2];
  }

  /**
   * @returns A `boolean` indicating if the mouse wheel is cureently being
   * rotated.
   */
  public isRotating(): boolean {
    return Boolean(this.rotation.reduce((curr, next) => curr || next));
  }

}

export default MouseWheel;
