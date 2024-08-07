import { Sprite } from "../resources/sprite.js";
import { Rectangle } from "../spatial/rectangle.js";
import { Vector2 } from "../spatial/vector2.js";
import { Color } from "./color.js";
import { DrawStrategy } from "./drawStrategy.js";

export class TiledDrawStrategy implements DrawStrategy {

  private tiledArea: Rectangle;

  private tileX: boolean;
  
  private tileY: boolean;

  constructor(tiledArea: Rectangle, tileX = true, tileY = true) {
    this.tiledArea = tiledArea;
    this.tileX = tileX;
    this.tileY = tileY;
  }

  public doTileX() {
    this.tileX = true;
  }

  public dontTileX() {
    this.tileX = false;
  }

  public doTileY() {
    this.tileY = true;
  }

  public dontTileY() {
    this.tileY = false;
  }

  public drawColor(
    ctx: CanvasRenderingContext2D,
    color: Color,
    area: Rectangle
  ): void {
    ctx.fillStyle = color.toString();

    let drawingX = area.getX();
    let drawingY = area.getY();
    let drawingWidth = area.getWidth();
    let drawingHeight = area.getHeight();
    
    if(this.tileX) {
      drawingX = this.tiledArea.getX();
      drawingWidth = this.tiledArea.getWidth();
    }
    if(this.tileY) {
      drawingY = this.tiledArea.getY();
      drawingHeight = this.tiledArea.getHeight();
    }

    ctx.fillRect(
      drawingX, drawingY,
      drawingWidth, drawingHeight
    );
  }

  public drawSprite(
    ctx: CanvasRenderingContext2D,
    sprite: Sprite,
    area: Rectangle
  ): void {
    let drawingX = area.getX();
    let drawingY = area.getY();
    let drawingWidth = area.getWidth();
    let drawingHeight = area.getHeight();

    if(this.tileX) {
      drawingX %= drawingWidth;

      if(drawingX > 0) drawingX -= drawingWidth;
    }
    if(this.tileY) {
      drawingY %= drawingHeight;

      if(drawingY > 0) drawingY -= drawingHeight;
    }

    let y = drawingY;

    while(y < this.tiledArea.getHeight()) {
      let x = drawingX;

      while(x < this.tiledArea.getWidth()) {
        const coordinates = new Vector2(
          x + this.tiledArea.getX(),
          y + this.tiledArea.getY()
        );
        const scale = new Vector2(
          drawingWidth / sprite.getImageFrameWidth(),
          drawingHeight / sprite.getImageFrameHeight()
        );

        sprite.draw(
          ctx,
          coordinates,
          scale
        );

        if(!this.tileX) break;

        x += drawingWidth;
      }
      
      if(!this.tileY) break;

      y += drawingHeight;
    }
  }

}

export default TiledDrawStrategy;
