import { ImageResource } from "./imageResource.js";
import { Vector2 } from "../spatial/vector2.js";

export class Sprite {

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

  public setRows(amount: number): void {

  }

  public getRows(): number {
    return 0;
  }

  public setColumns(amount: number): void {

  }

  public getColumns(): number {
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
