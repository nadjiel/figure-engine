import { Sprite } from "../resources/sprite";
import { Rectangle } from "../spatial/rectangle";
import { Color } from "./color";

export interface DrawStrategy {

  drawColor(ctx: CanvasRenderingContext2D, color: Color, area: Rectangle): void;
  
  drawSprite(ctx: CanvasRenderingContext2D, sprite: Sprite, area: Rectangle): void;

}

export default DrawStrategy;
