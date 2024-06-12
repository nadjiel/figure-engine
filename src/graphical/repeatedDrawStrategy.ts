import { Sprite } from "../resources/sprite";
import { Rectangle } from "../spatial/rectangle";
import { Vector2 } from "../spatial/vector2";
import { Color } from "./color";
import { DrawStrategy } from "./drawStrategy";

export class RepeatedDrawStrategy implements DrawStrategy {

  private tiledArea: Vector2;

  private repeatX: boolean;
  
  private repeatY: boolean;

  constructor(tiledArea: Vector2, repeatX = true, repeatY = true) {
    this.tiledArea = tiledArea;
    this.repeatX = repeatX;
    this.repeatY = repeatY;
  }

  drawColor(
    ctx: CanvasRenderingContext2D,
    color: Color,
    area: Rectangle
  ): void {
    ctx.fillStyle = color.toString();

    const drawingX = this.repeatX ? 0 : area.getX();
    const drawingY = this.repeatY ? 0 : area.getY();
    const width = this.repeatX ? this.tiledArea.getX() : area.getWidth();
    const height = this.repeatY ? this.tiledArea.getY() : area.getHeight();

    ctx.fillRect(
      drawingX, drawingY,
      width, height
    );
  }

  drawSprite(
    ctx: CanvasRenderingContext2D,
    sprite: Sprite,
    area: Rectangle
  ): void {
    let drawingX = area.getX();
    let drawingY = area.getY();

    if(this.repeatX) {
      drawingX = area.getX() % area.getWidth();
      if(area.getX() >= 0) drawingX -= area.getWidth();
    }
    if(this.repeatY) {
      drawingY = area.getY() % area.getHeight();
      if(area.getY() >= 0) drawingY -= area.getHeight();
    }

    do {
      do {
        const position = new Vector2(drawingX, drawingY);
        const scale = new Vector2(
          area.getX() / sprite.getImageFrameWidth(),
          area.getY() / sprite.getImageFrameHeight()
        );
  
        sprite.draw(ctx, position, scale);
        
        drawingX += area.getWidth();
      } while(this.repeatX && drawingX < this.tiledArea.getX());

      drawingY += area.getHeight();
    } while(this.repeatY && drawingY < this.tiledArea.getY());
  }

}

export default RepeatedDrawStrategy;
