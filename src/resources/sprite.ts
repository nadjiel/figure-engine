import { ImageResource } from "./imageResource.js";
import { Vector2 } from "../spatial/vector2.js";
import { ArgumentError } from "../errors/argumentError.js";

interface BoundingBox {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export class Sprite {

  private image: ImageResource;

  private columns = 1;

  private rows = 1;

  private margins: BoundingBox = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  private gaps: Vector2 = Vector2.createZero();

  private includedFrames: Array<number> = [0];

  private frame: number = 0;

  constructor(
    image: ImageResource,
    columns = 1,
    rows = 1,
    leftMargin = 0,
    rightMargin = 0,
    topMargin = 0,
    bottomMargin = 0,
    horizontalGap = 0,
    verticalGap = 0
  ) {
    this.image = image;
  }

  public getImage(): HTMLImageElement {
    return this.image.get();
  }

  public getWidth(): number {
    return this.image.get().width;
  }

  public getHeight(): number {
    return this.image.get().height;
  }

  public setColumns(amount: number): void {
    if(amount < 1) throw new ArgumentError(
      `Sprite must have 1 or more columns (received ${amount})`
    );
    amount = Math.floor(amount);

    this.columns = amount;
  }

  public getColumns(): number {
    return this.columns;
  }

  public setRows(amount: number): void {
    if(amount < 1) throw new ArgumentError(
      `Sprite must have 1 or more rows (received ${amount})`
    );
    amount = Math.floor(amount);

    this.rows = amount;
  }

  public getRows(): number {
    return this.rows;
  }

  public setLeftMargin(margin: number): void {
    if(margin < 0) throw new ArgumentError(
      `Sprite can't have negative margins (received ${margin})`
    );
    margin = Math.floor(margin);

    // Actually this must also take into account the horizontal gaps and right margin
    if(margin > this.getWidth()) margin = this.getWidth();

    this.margins.left = margin;
  }

  public getLeftMargin(): number {
    return this.margins.left;
  }

  public setRightMargin(margin: number): void {
    if(margin < 0) throw new ArgumentError(
      `Sprite can't have negative margins (received ${margin})`
    );
    margin = Math.floor(margin);

    // Actually this must also take into account the horizontal gaps and left margin
    if(margin > this.getWidth()) margin = this.getWidth();

    this.margins.right = margin;
  }

  public getRightMargin(): number {
    return this.margins.right;
  }

  public setTopMargin(margin: number): void {
    if(margin < 0) throw new ArgumentError(
      `Sprite can't have negative margins (received ${margin})`
    );
    margin = Math.floor(margin);

    // Actually this must also take into account the vertical gaps and bottom margin
    if(margin > this.getHeight()) margin = this.getHeight();

    this.margins.top = margin;
  }

  public getTopMargin(): number {
    return this.margins.top;
  }

  public setBottomMargin(margin: number): void {
    if(margin < 0) throw new ArgumentError(
      `Sprite can't have negative margins (received ${margin})`
    );
    margin = Math.floor(margin);

    // Actually this must also take into account the vertical gaps and top margin
    if(margin > this.getHeight()) margin = this.getHeight();

    this.margins.bottom = margin;
  }

  public getBottomMargin(): number {
    return this.margins.bottom;
  }

  public setHorizontalGap(gap: number): void {
    if(gap < 0) throw new ArgumentError(
      `Sprite can't have negative gaps (received ${gap})`
    );
    gap = Math.floor(gap);

    // Actually this must also take into account the horizontal gaps and margins
    if(gap > this.getWidth()) gap = this.getWidth();

    this.gaps.setX(gap);
  }

  public getHorizontalGap(): number {
    return this.gaps.getX();
  }

  public setVerticalGap(gap: number): void {
    if(gap < 0) throw new ArgumentError(
      `Sprite can't have negative gaps (received ${gap})`
    );
    gap = Math.floor(gap);

    // Actually this must also take into account the vertical gaps and margins
    if(gap > this.getHeight()) gap = this.getHeight();

    this.gaps.setY(gap);
  }

  public getVerticalGap(): number {
    return this.gaps.getY();
  }

  // Specify the only frames that should be considered
  public includeOnly(...frames: Array<number>): void {

  }

  public getIncludedFrames(): Array<number> {
    return [];
  }

  public selectFrame(frame: number): void {

  }

  public selectFrameCoordinates(coordinate: Vector2): void {

  }

  public nextFrame(): void {

  }

  public previousFrame(): void {

  }

  public nextFrameInRow(): void {

  }

  public nextFrameInColumn(): void {

  }

  public getFrame(): number {
    return 0;
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    position: Vector2,
    scale = new Vector2(1, 1)
  ): void {

  }

}

export default Sprite;
