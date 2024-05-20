import { ImageResource } from "./imageResource.js";
import { Vector2 } from "../spatial/vector2.js";

export class Sprite {

  constructor(
    image: ImageResource,
    topMargin?: number,
    rightMargin?: number,
    bottomMargin?: number,
    leftMargin?: number,
    horizontalGap?: number,
    verticalGap?: number
  ) {

  }

  public getImage(): HTMLImageElement {
    return new Image();
  }

  public getWidth(): number {
    return 0;
  }

  public getHeight(): number {
    return 0;
  }

  public setTopMargin(margin: number): void {

  }

  public getTopMargin(): number {
    return 0;
  }

  public setRightMargin(margin: number): void {
    
  }

  public getRightMargin(): number {
    return 0;
  }

  public setLeftMargin(margin: number): void {
    
  }

  public getLeftMargin(): number {
    return 0;
  }

  public setBottomMargin(margin: number): void {
    
  }

  public getBottomMargin(): number {
    return 0;
  }

  public setHorizontalGap(gap: number): void {
    
  }

  public getHorizontalGap(): number {
    return 0;
  }

  public setVerticalGap(gap: number): void {
    
  }

  public getVerticalGap(): number {
    return 0;
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

  public getFrameId(): number {
    return 0;
  }

  public getFrame(): HTMLImageElement {
    return new Image();
  }

  public draw(ctx: CanvasRenderingContext2D): void {

  }

}

export default Sprite;
