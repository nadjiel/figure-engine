import { Sprite } from "../resources/sprite.js";
import { Rectangle } from "../spatial/rectangle.js";
import { Vector2 } from "../spatial/vector2.js";
import { Color } from "./color.js";
import { DrawStrategy } from "./drawStrategy.js";

export class OneDrawStrategy implements DrawStrategy {

  public drawColor(
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

  public drawSprite(
    ctx: CanvasRenderingContext2D,
    sprite: Sprite,
    area: Rectangle
  ): void {
    const scale = new Vector2(
      area.getWidth() / sprite.getImageFrameWidth(),
      area.getHeight() / sprite.getImageFrameHeight(),
    );

    sprite.draw(
      ctx,
      area.getCoordinates(),
      scale
    );
  }

}

export default OneDrawStrategy;
