import { ImageResource } from "./imageResource.js";
import { Vector2 } from "../spatial/vector2.js";
import { ArgumentError } from "../errors/argumentError.js";
import { ResourceError } from "../errors/resourceError.js";

/**
 * This interface describes the four boundings of a rectangular area.
 * 
 * @version 0.4.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
interface BoundingBox {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * The `Sprite` class allows defining and customizing the properties of a sprite
 * for the `Game`.
 * 
 * @version 0.4.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class Sprite {

  /**
   * Stores the {@linkcode ImageResource} that was imported to this `Sprite`.
   */
  private image: ImageResource;

  /**
   * Stores a {@linkcode Vector2} describing how many columns and rows,
   * respectively, this `Sprite` has in the case it is a sprite sheet with
   * various sprites.
   */
  private cells = new Vector2(1, 1);

  /**
   * Describes how many pixels this sprites has in its top, right, left and
   * bottom margins.
   */
  private margins: BoundingBox = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  /**
   * Stores a {@linkcode Vector2} describing how many pixels are there between
   * the sprites (horizontally and vertically) in the case this `Sprite`
   * represents a sprite sheet.
   */
  private gaps = Vector2.createZero();

  /**
   * Stores information about wether a frame is supposed to be counted in the
   * sprite sheet or not.
   */
  private includedFrames = new Map<number, boolean>();

  /**
   * Points to what is the currently selected frame.
   */
  private frame = 0;

  /**
   * @param image A {@linkcode ImageResource} with which to create this `Sprite`.
   */
  constructor(image: ImageResource) {
    this.image = image;
    this.includedFrames.set(0, true);
  }

  /**
   * @returns The {@linkcode ImageResource} that this sprite stores.
   */
  public getImageResource(): ImageResource {
    return this.image;
  }

  /**
   * @returns The {@linkcode HTMLImageElement} that this sprite stores.
   * If this `Sprite`'s {@linkcode ImageResource} wasn't loaded yet, this
   * returns an `HTMLImageElement` without a `src`.
   */
  public getImage(): HTMLImageElement {
    return this.image.get();
  }

  /**
   * @returns Returns the width of this `Sprite` or `0` if it's
   * {@linkcode ImageResource} wasn't loaded yet.
   */
  public getWidth(): number {
    return this.image.getWidth();
  }

  /**
   * @returns Returns the height of this `Sprite` or `0` if it's
   * {@linkcode ImageResource} wasn't loaded yet.
   */
  public getHeight(): number {
    return this.image.getHeight();
  }

  private treatCells(amount: number): number {
    if(amount < 1) throw new ArgumentError(
      `Sprite must have 1 or more columns and rows (received ${amount})`
    );

    return Math.floor(amount);
  }

  /**
   * Updates the information of the amount of frames this `Sprite` stores
   * according to the current `rows` and `columns` set.
   */
  private updateFrameAmount(): void {
    const totalFrames = this.getColumns() * this.getRows();

    for(let frame = 0; frame < totalFrames; frame++) {
      if(this.includedFrames.has(frame)) continue;

      this.includedFrames.set(frame, true);
    }

    if(this.includedFrames.size === totalFrames) return;

    for(const frame of this.includedFrames.keys()) {
      if(frame >= totalFrames) this.includedFrames.delete(frame);
    }
  }

  /**
   * Configures this `Sprite` to have a certain amount of `columns`.
   * @param amount The new amount of `columns` to considerate.
   * @returns This `Sprite`, for chaining methods.
   */
  public setColumns(amount: number): Sprite {
    amount = this.treatCells(amount);

    this.cells.setX(amount);

    this.updateFrameAmount();

    return this;
  }

  /**
   * Configures this `Sprite` to have a certain amount of `rows`.
   * @param amount The new amount of `rows` to considerate.
   * @returns This `Sprite`, for chaining methods.
   */
  public setRows(amount: number): Sprite {
    amount = this.treatCells(amount);

    this.cells.setY(amount);

    this.updateFrameAmount();

    return this;
  }

  /**
   * @returns How many `columns` are set for this `Sprite`.
   */
  public getColumns(): number {
    return this.cells.getX();
  }

  /**
   * @returns How many `rows` are set for this `Sprite`.
   */
  public getRows(): number {
    return this.cells.getY();
  }

  private treatMargin(margin: number): number {
    if(margin < 0) throw new ArgumentError(
      `Sprite can't have negative margins (received ${margin})`
    );
    
    return Math.floor(margin);
  }

  /**
   * Sets how many pixels are there of left `margin` in the image of this `Sprite`.
   * @param margin The new left `margin` to set.
   * @returns This `Sprite`, for chaining methods.
   */
  public setLeftMargin(margin: number): Sprite {
    margin = this.treatMargin(margin);

    this.margins.left = margin;

    return this;
  }

  /**
   * Sets how many pixels are there of right `margin` in the image of this `Sprite`.
   * @param margin The new right `margin` to set.
   * @returns This `Sprite`, for chaining methods.
   */
  public setRightMargin(margin: number): Sprite {
    margin = this.treatMargin(margin);

    this.margins.right = margin;

    return this;
  }

  /**
   * Sets how many pixels are there of top `margin` in the image of this `Sprite`.
   * @param margin The new top `margin` to set.
   * @returns This `Sprite`, for chaining methods.
   */
  public setTopMargin(margin: number): Sprite {
    margin = this.treatMargin(margin);

    this.margins.top = margin;

    return this;
  }

  /**
   * Sets how many pixels are there of bottom `margin` in the image of this `Sprite`.
   * @param margin The new bottom `margin` to set.
   * @returns This `Sprite`, for chaining methods.
   */
  public setBottomMargin(margin: number): Sprite {
    margin = this.treatMargin(margin);

    this.margins.bottom = margin;

    return this;
  }

  /**
   * @returns The margin in pixels in the left of the image of this `Sprite`s
   */
  public getLeftMargin(): number {
    return this.margins.left;
  }

  /**
   * @returns The margin in pixels in the right of the image of this `Sprite`s
   */
  public getRightMargin(): number {
    return this.margins.right;
  }

  /**
   * @returns The margin in pixels in the top of the image of this `Sprite`s
   */
  public getTopMargin(): number {
    return this.margins.top;
  }

  /**
   * @returns The margin in pixels in the bottom of the image of this `Sprite`s
   */
  public getBottomMargin(): number {
    return this.margins.bottom;
  }

  private treatGap(gap: number): number {
    if(gap < 0) throw new ArgumentError(
      `Sprite can't have negative gaps (received ${gap})`
    );
    
    return Math.floor(gap);
  }

  /**
   * Sets how many pixels are there of horizontal gap
   * between the frames of this sprite sheet.
   * @param gap The new horizontal `gap` to set.
   * @returns This `Sprite`, for chaining methods.
   */
  public setHorizontalGap(gap: number): Sprite {
    gap = this.treatGap(gap);

    this.gaps.setX(gap);

    return this;
  }

  /**
   * Sets how many pixels are there of vertical gap
   * between the frames of this sprite sheet.
   * @param gap The new vertical `gap` to set.
   * @returns This `Sprite`, for chaining methods.
   */
  public setVerticalGap(gap: number): Sprite {
    gap = this.treatGap(gap);

    this.gaps.setY(gap);

    return this;
  }

  /**
   * @returns How many pixels are there of horizontal gap
   * between the frames of this sprite sheet.
   */
  public getHorizontalGap(): number {
    return this.gaps.getX();
  }

  /**
   * @returns How many pixels are there of vertical gap
   * between the frames of this sprite sheet.
   */
  public getVerticalGap(): number {
    return this.gaps.getY();
  }

  /**
   * Marks the given `frame` as included in this sprite sheet, so that it
   * can be used with the frame selection methods.
   * @param frame The frame to include in frame selections.
   * @returns This `Sprite`, for chaining methods.
   */
  public includeFrame(frame: number): Sprite {
    if(this.includedFrames.get(frame) === undefined) {
      throw new ArgumentError(
        `This sprite doesn't have a frame ${frame}`
      );
    }

    this.includedFrames.set(frame, true);

    return this;
  }

  /**
   * Marks the given `frame` as excluded in this sprite sheet, so that it
   * can't be used with the frame selection methods.
   * @param frame The frame to exclude in frame selections.
   * @returns This `Sprite`, for chaining methods.
   */
  public excludeFrame(frame: number): Sprite {
    if(this.includedFrames.get(frame) === undefined) {
      throw new ArgumentError(
        `This sprite doesn't have a frame ${frame}`
      );
    }

    this.includedFrames.set(frame, false);

    return this;
  }

  /**
   * Marks the given `frame`s as included in this sprite sheet, so that they
   * can be used with the frame selection methods.
   * @param frames The various frames that you want to be included in this
   * sprite sheet.
   * @returns This `Sprite`, for chaining methods.
   */
  public includeFrames(...frames: Array<number>): Sprite {
    frames.forEach(frame => this.includeFrame(frame));

    return this;
  }

  /**
   * Marks the given `frame`s as excluded in this sprite sheet, so that they
   * can't be used with the frame selection methods.
   * @param frames The various frames that you want to be excluded in this
   * sprite sheet.
   * @returns This `Sprite`, for chaining methods.
   */
  public excludeFrames(...frames: Array<number>): Sprite {
    frames.forEach(frame => this.excludeFrame(frame));

    return this;
  }

  /**
   * @returns An `Array` with the included frames.
   */
  public getIncludedFrames(): Array<number> {
    const frames = [ ...this.includedFrames.keys() ];
    const includedFrames = frames.filter(
      frame => this.includedFrames.get(frame)
    );

    return includedFrames;
  }

  /**
   * @returns How many frames are there in this `Sprite`, counting the ones
   * marked as excluded.
   */
  public getFrameAmount(): number {
    return this.getColumns() * this.getRows();
  }

  private treatFrame(frame: number): void {
    const frameAmount = this.getFrameAmount();

    if(frame < 0 || frame >= frameAmount) {
      throw new ArgumentError(
        `This Sprite has only [0, ${frameAmount - 1}] frames (received ${frame}).`
      );
    }
    if(!this.includedFrames.get(frame)) {
      throw new ArgumentError(
        `The frame ${frame} isn't included in this Sprite.`
      );
    }
  }

  /**
   * Selects a `frame` to be used by this `Sprite` when the {@linkcode draw}
   * method is used.
   * @param frame The frame to select.
   */
  public selectFrame(frame: number): void {
    this.treatFrame(frame);

    this.frame = frame;
  }

  private coordToFrame(coordinate: Vector2): number {
    return coordinate.getX() + coordinate.getY() * this.getColumns();
  }

  /**
   * Selects a `frame` to be used by this `Sprite` when the {@linkcode draw}
   * method is used through a {@linkcode Vector2} representing its coordinates
   * in the sheet, starting from `[0, 0]` all the way to
   * `[<columns> - 1, <rows> - 1]`.
   * @param coordinate The `Vector2` with the coordinates of the
   * `frame` to select.
   */
  public selectFrameCoordinates(coordinate: Vector2): void {
    const frame = this.coordToFrame(coordinate);

    this.selectFrame(frame);
  }

  private frameToCoord(frame: number): Vector2 {
    const frameX = frame % this.getColumns();
    const frameY = Math.floor(frame / this.getColumns());

    return new Vector2(frameX, frameY);
  }

  /**
   * @returns A {@linkcode Vector2} representing what are the coordinates of
   * the `frame` selected in the moment.
   */
  public getFrameCoordinates(): Vector2 {
    return this.frameToCoord(this.frame);
  }

  private calculateNextFrame(frame = this.frame): number {
    let nextFrame = frame + 1;
    if(nextFrame === this.getFrameAmount()) nextFrame = 0;

    return nextFrame;
  }

  /**
   * Selects the next `frame` in this `Sprite` if there is one available.
   * If the last `frame` is selected, the selection goes to the first included
   * one.
   */
  public nextFrame(): void {
    let nextFrame = this.calculateNextFrame();

    if(this.getIncludedFrames().length === 0) return;

    while(!this.includedFrames.get(nextFrame)) {
      nextFrame = this.calculateNextFrame(nextFrame);

      if(nextFrame === this.frame) return;
    }

    this.selectFrame(nextFrame);
  }

  private calculatePreviousFrame(frame = this.frame): number {
    let previousFrame = frame - 1;
    if(previousFrame === -1) previousFrame = this.getFrameAmount() - 1;

    return previousFrame;
  }

  /**
   * Selects the previous `frame` in this `Sprite`.
   * If the first `frame` is selected, the selection goes to the last one.
   */
  public previousFrame(): void {
    let previousFrame = this.calculatePreviousFrame();

    if(this.getIncludedFrames().length === 0) return;

    while(!this.includedFrames.get(previousFrame)) {
      previousFrame = this.calculatePreviousFrame(previousFrame);

      if(previousFrame === this.frame) return;
    }

    this.selectFrame(previousFrame);
  }

  private calculateNextFrameInRow(frame = this.frame): number {
    let frameCoord = this.frameToCoord(frame);
    frameCoord.setX(frameCoord.getX() + 1);

    if(frameCoord.getX() === this.getColumns()) frameCoord.setX(0);

    return this.coordToFrame(frameCoord);
  }

  /**
   * Selects the next `frame` in the current row of this `Sprite`.
   * If the last `frame` is selected, the selection goes to the first one.
   */
  public nextFrameInRow(): void {
    let nextFrame = this.calculateNextFrameInRow();

    while(!this.includedFrames.get(nextFrame)) {
      nextFrame = this.calculateNextFrameInRow(nextFrame);

      if(nextFrame === this.frame) return;
    }

    this.selectFrame(nextFrame);
  }

  private calculatePreviousFrameInRow(frame = this.frame): number {
    let frameCoord = this.frameToCoord(frame);
    frameCoord.setX(frameCoord.getX() - 1);

    if(frameCoord.getX() === -1) frameCoord.setX(this.getColumns() - 1);

    return this.coordToFrame(frameCoord);
  }

  /**
   * Selects the previous `frame` in the current row of this `Sprite`.
   * If the first `frame` is selected, the selection goes to the last one.
   */
  public previousFrameInRow(): void {
    let previousFrame = this.calculatePreviousFrameInRow();

    while(!this.includedFrames.get(previousFrame)) {
      previousFrame = this.calculatePreviousFrameInRow(previousFrame);

      if(previousFrame === this.frame) return;
    }

    this.selectFrame(previousFrame);
  }

  private calculateNextFrameInColumn(frame = this.frame): number {
    let frameCoord = this.frameToCoord(frame);
    frameCoord.setY(frameCoord.getY() + 1);

    if(frameCoord.getY() === this.getRows()) frameCoord.setY(0);

    return this.coordToFrame(frameCoord);
  }

  /**
   * Selects the next `frame` in the current column of this `Sprite`.
   * If the last `frame` is selected, the selection goes to the first one.
   */
  public nextFrameInColumn(): void {
    let nextFrame = this.calculateNextFrameInColumn();

    while(!this.includedFrames.get(nextFrame)) {
      nextFrame = this.calculateNextFrameInColumn(nextFrame);

      if(nextFrame === this.frame) return;
    }

    this.selectFrame(nextFrame);
  }

  private calculatePreviousFrameInColumn(frame = this.frame): number {
    let frameCoord = this.frameToCoord(frame);
    frameCoord.setY(frameCoord.getY() - 1);

    if(frameCoord.getY() === -1) frameCoord.setY(this.getRows() - 1);

    return this.coordToFrame(frameCoord);
  }

  /**
   * Selects the previous `frame` in the current column of this `Sprite`.
   * If the first `frame` is selected, the selection goes to the last one.
   */
  public previousFrameInColumn(): void {
    let previousFrame = this.calculatePreviousFrameInColumn();

    while(!this.includedFrames.get(previousFrame)) {
      previousFrame = this.calculatePreviousFrameInColumn(previousFrame);

      if(previousFrame === this.frame) return;
    }

    this.selectFrame(previousFrame);
  }

  /**
   * @returns What is the current `frame` selected in this `Sprite`.
   */
  public getFrame(): number {
    return this.frame;
  }

  /**
   * @returns The x coordinate in the image of this `Sprite` where the current
   * frame begins.
   */
  public getImageFrameX(): number {
    let x = 0;

    const frameCoords = this.getFrameCoordinates();

    x += this.margins.left;
    x += this.gaps.getX() * frameCoords.getX();
    x += this.getImageFrameWidth() * frameCoords.getX();

    return x;
  }

  /**
   * @returns The y coordinate in the image of this `Sprite` where the current
   * frame begins.
   */
  public getImageFrameY(): number {
    let y = 0;

    const frameCoords = this.getFrameCoordinates();

    y += this.margins.top;
    y += this.gaps.getY() * this.getFrameCoordinates().getY();
    y += this.getImageFrameHeight() * frameCoords.getY();

    return y;
  }

  /**
   * @returns The width of the current `frame` of this `Sprite`.
   */
  public getImageFrameWidth(): number {
    let width = this.getWidth();

    width -= this.margins.left;
    width -= this.margins.right;
    width -= this.gaps.getX() * (this.getColumns() - 1);
    width = Math.floor(width / this.getColumns());

    return width;
  }

  /**
   * @returns The height of the current `frame` of this `Sprite`.
   */
  public getImageFrameHeight(): number {
    let height = this.getHeight();

    height -= this.margins.top;
    height -= this.margins.bottom;
    height -= this.gaps.getY() * (this.getRows() - 1);
    height = Math.floor(height / this.getRows());

    return height;
  }

  /**
   * Draws this `Sprite` in a given `position` scaled by a given `scale` in the
   * passed rendering context.
   * @param ctx The {@linkcode CanvasRenderingContext2D} where to draw this `Sprite`.
   * @param position The position where to draw this `Sprite`.
   * @param scale The scale by which to draw this `Sprite`.
   */
  public draw(
    ctx: CanvasRenderingContext2D,
    position: Vector2,
    scale = new Vector2(1, 1)
  ): void {
    if(!this.image.isLoaded()) throw new ResourceError(
      `Can't draw a Sprite that isn't loaded`
    );
    
    const frameX = this.getImageFrameX();
    const frameY = this.getImageFrameY();
    const frameWidth = this.getImageFrameWidth();
    const frameHeight = this.getImageFrameHeight();

    ctx.drawImage(
      this.image.get(),
      frameX, frameY,
      frameWidth, frameHeight,
      position.getX(),
      position.getY(),
      frameWidth * scale.getX(),
      frameHeight * scale.getY()
    );
  }

}

export default Sprite;
