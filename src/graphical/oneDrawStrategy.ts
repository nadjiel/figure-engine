import { Sprite } from "../resources/sprite";
import { Rectangle } from "../spatial/rectangle";
import { Color } from "./color";
import { DrawStrategy } from "./drawStrategy";

export class OneDrawStrategy implements DrawStrategy {

  drawColor(
    ctx: CanvasRenderingContext2D,
    color: Color,
    area: Rectangle
  ): void {
    ctx.fillStyle = color.toString();
    ctx.fillRect(
      area.getX(), area.getY(),
      area.getWidth(), area.getHeight()
    );
  }

  drawSprite(
    ctx: CanvasRenderingContext2D,
    sprite: Sprite,
    area: Rectangle
  ): void {
    sprite.draw(
      ctx,
      area.getCoordinates(),
      area.getDimensions()
    );
  }

}

export default OneDrawStrategy;
