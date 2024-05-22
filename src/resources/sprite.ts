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

  private cells = new Vector2(1, 1);

  private margins: BoundingBox = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  private gaps = Vector2.createZero();

  private includedFrames = new Map<number, boolean>();

  private frame = 0;

  constructor(image: ImageResource) {
    this.image = image;
    this.includedFrames.set(0, true);
  }

  public getImage(): HTMLImageElement {
    return this.image.get();
  }

  public getWidth(): number {
    return this.image.getWidth();
  }

  public getHeight(): number {
    return this.image.getHeight();
  }

  private treatCells(amount: number): number {
    if(amount < 1) throw new ArgumentError(
      `Sprite must have 1 or more columns and rows (received ${amount})`
    );

    // Makes sure cell amount is an integer
    return Math.floor(amount);
  }

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

  public setColumns(amount: number): Sprite {
    amount = this.treatCells(amount);

    this.cells.setX(amount);

    this.updateFrameAmount();

    return this;
  }

  public setRows(amount: number): Sprite {
    amount = this.treatCells(amount);

    this.cells.setY(amount);

    this.updateFrameAmount();

    return this;
  }

  public getColumns(): number {
    return this.cells.getX();
  }

  public getRows(): number {
    return this.cells.getY();
  }

  private treatMargin(margin: number): number {
    if(margin < 0) throw new ArgumentError(
      `Sprite can't have negative margins (received ${margin})`
    );
    
    return Math.floor(margin);
  }

  public setLeftMargin(margin: number): Sprite {
    margin = this.treatMargin(margin);

    this.margins.left = margin;

    return this;
  }

  public setRightMargin(margin: number): Sprite {
    margin = this.treatMargin(margin);

    this.margins.right = margin;

    return this;
  }

  public setTopMargin(margin: number): Sprite {
    margin = this.treatMargin(margin);

    this.margins.top = margin;

    return this;
  }

  public setBottomMargin(margin: number): Sprite {
    margin = this.treatMargin(margin);

    this.margins.bottom = margin;

    return this;
  }

  public getLeftMargin(): number {
    return this.margins.left;
  }

  public getRightMargin(): number {
    return this.margins.right;
  }

  public getTopMargin(): number {
    return this.margins.top;
  }

  public getBottomMargin(): number {
    return this.margins.bottom;
  }

  private treatGap(gap: number): number {
    if(gap < 0) throw new ArgumentError(
      `Sprite can't have negative gaps (received ${gap})`
    );
    
    return Math.floor(gap);
  }

  public setHorizontalGap(gap: number): Sprite {
    gap = this.treatGap(gap);

    this.gaps.setX(gap);

    return this;
  }

  public setVerticalGap(gap: number): Sprite {
    gap = this.treatGap(gap);

    this.gaps.setY(gap);

    return this;
  }

  public getHorizontalGap(): number {
    return this.gaps.getX();
  }

  public getVerticalGap(): number {
    return this.gaps.getY();
  }

  public includeFrame(frame: number): Sprite {
    if(this.includedFrames.get(frame) === undefined) {
      throw new ArgumentError(
        `This sprite doesn't have a frame ${frame}`
      );
    }

    this.includedFrames.set(frame, true);

    return this;
  }

  // Specify the only frames that should be considered
  public includeOnlyFrames(...frames: Array<number>): Sprite {
    frames.forEach(frame => this.includeFrame(frame));

    return this;
  }

  public getIncludedFrames(): Array<number> {
    const frames = [ ...this.includedFrames.keys() ];
    const includedFrames = frames.filter(
      frame => this.includedFrames.get(frame)
    );

    return includedFrames;
  }

  public getFrameAmount(): number {
    return this.getColumns() * this.getRows();
  }

  private treatFrame(frame: number): void {
    const frameAmount = this.getFrameAmount();

    if(frame < 0 || frame >= frameAmount) {
      throw new ArgumentError(
        `This Sprite has only [0, ${frameAmount - 1} frames (received ${frame}).`
      );
    }
    if(!this.includedFrames.get(frame)) {
      throw new ArgumentError(
        `The frame ${frame} isn't included in this Sprite.`
      );
    }
  }

  public selectFrame(frame: number): void {
    this.treatFrame(frame);

    this.frame = frame;
  }

  public selectFrameCoordinates(coordinate: Vector2): void {
    const frame = coordinate.getX() + coordinate.getY() * this.getColumns();

    this.selectFrame(frame);
  }

  public getFrameCoordinates(): Vector2 {
    const frameX = this.frame % this.getColumns();
    const frameY = Math.floor(this.frame / this.getColumns());

    return new Vector2(frameX, frameY);
  }

  public nextFrame(): void {
    let nextFrame = this.frame + 1;

    if(nextFrame === this.getFrameAmount()) nextFrame = 0;
  }

  public previousFrame(): void {
    let previousFrame = this.frame - 1;

    if(previousFrame === -1) previousFrame = this.getFrameAmount() - 1;
  }

  public nextFrameInRow(): void {
    const frameCoords = this.getFrameCoordinates();
    
    if(frameCoords.getX() === this.getColumns() - 1) {
      this.selectFrameCoordinates(
        new Vector2(0, frameCoords.getY())
      );
    } else {
      this.nextFrame();
    }
  }

  public previousFrameInRow(): void {
    const frameCoords = this.getFrameCoordinates();
    
    if(frameCoords.getX() === 0) {
      this.selectFrameCoordinates(
        new Vector2(this.getColumns() - 1, frameCoords.getY())
      );
    } else {
      this.previousFrame();
    }
  }

  public nextFrameInColumn(): void {
    const frameCoords = this.getFrameCoordinates();
    
    if(frameCoords.getY() === this.getRows() - 1) {
      this.selectFrameCoordinates(
        new Vector2(frameCoords.getX(), 0)
      );
    } else {
      this.selectFrameCoordinates(
        new Vector2(frameCoords.getX(), frameCoords.getY() + 1)
      );
    }
  }

  public previousFrameInColumn(): void {
    const frameCoords = this.getFrameCoordinates();
    
    if(frameCoords.getY() === 0) {
      this.selectFrameCoordinates(
        new Vector2(frameCoords.getX(), this.getRows() - 1)
      );
    } else {
      this.selectFrameCoordinates(
        new Vector2(frameCoords.getX(), frameCoords.getY() - 1)
      );
    }
  }

  public getFrame(): number {
    return this.frame;
  }

  private getImageFrameX(): number {
    let x = 0;

    x += this.margins.left;
    x += this.gaps.getX() * this.getFrameCoordinates().getX();

    return x;
  }

  private getImageFrameY(): number {
    let y = 0;

    y += this.margins.top;
    y += this.gaps.getY() * this.getFrameCoordinates().getY();

    return y;
  }

  private getImageFrameWidth(): number {
    let width = this.getWidth();

    width -= this.margins.left;
    width -= this.margins.right;
    width -= this.gaps.getX() * (this.getColumns() - 1);
    width = Math.floor(width / this.getColumns());

    return width;
  }

  private getImageFrameHeight(): number {
    let height = this.getHeight();

    height -= this.margins.top;
    height -= this.margins.bottom;
    height -= this.gaps.getY() * (this.getRows() - 1);
    height = Math.floor(height / this.getRows());

    return height;
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    position: Vector2,
    scale = new Vector2(1, 1)
  ): void {
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
