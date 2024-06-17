import { Color } from "../../../dist/graphical/color.js";
import { TiledDrawStrategy } from "../../../dist/graphical/tiledDrawStrategy.js";
import { ImageResource } from "../../../dist/resources/imageResource.js";
import { Sprite } from "../../../dist/resources/sprite.js";
import { Rectangle } from "../../../dist/spatial/rectangle.js";
import { Vector2 } from "../../../dist/spatial/vector2.js";

describe("TiledDrawStrategy class", () => {

  const canvas = document.createElement("canvas");
  canvas.width = 450;
  canvas.height = 450;
  const ctx = canvas.getContext("2d")!;
  const path = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA3lBMVEX////mAAAAAADjAADqAAD39/coKCjPAAC/AAA9PT1ra2vbAABIAADR0dHvAADCAAAoAADj4+NOTk7VAADs7OxCQkL4wsLIyMj719d4AAD5AAC4uLjzAABkAACqqqoLAAA4AADkEBBvAACaAACfn59EAADpPT2wAAB0dHTzpKQRERGTk5PramqDAAAkJCQYGBgUKytfX193Li4yMjJbNzdUOTk8AAAuAACvGhq9DQ3qUVGSSUl5XFz1sLCMAADoMjLzjo42RERfSUlEUlIAEREdAAAkMzNISEiKa2tuNjb7l8E6AAADlElEQVR4nO3df1fSUBjAcdguICBDfkWpaWWEWlmmWZRmmUq9/zfU6ZxO53nmGbLL2L3D7/fveZ99BM9hjm2lEhERERERERERERERrUAVy4ox7u/EwVHVpsOh1bjOO6tp1cO+vbAa2LVlJ7ScFiBEiBAhQoQIESJcbWHpveVIu0/efVthmoOL/nFdNqlZ1fsgFznZSRzXUtNO7abVah/VMq3Zwrr65dQiY9P2C7XKy8RxQ7XdyGqYMdGzFG+g/kBuu1szZZsiS6HVsHLZIESIECFChAgRPgChOgOghUFWwqQTDlp4Ziv8pIXxcxoN1ec10eTgUXJfZoysyVXaXxtJna+pDS2F5bZa5lxOOO6USsofNEPxk88fz3hDv5l3fvQ2SOosCu//+XSFZqRGtKyFlSyEo2UI1xEiRIgQIUKEmQn9/UyzgPDiQPZq3plm/CSpb8Yv4WUom39otJ1UlLVvQeHcr5rLECL0P4QI/Q8hQv9D+OCE3+XBxMWls91OUTphObQ8mnBYSmEBQ4jQ/xAi9D+ECP0PIUL/Q4jQ/xAi9D+ECP0PIUL/u19oIpHr3Z0zuc8muiMcqCbqa+8FeUHVd/Xbp9JT7ZR0lR/qF2B5vUXOmQ25z9f3XOmcyTUzOefgqqCcQ4jQ/xAi9D+ECP0vnTB2fxp1HxjXEpG+QU0qYWPa/d+0O26LfDrSaKuuuqLp7E/esSu7q7FX1DXsX2Gk9ivoWN+RtlIQYWZ3M0OYWwgRInQfQoQI3Zeh8GjlhcfyQ/vPSbMnyvlIo6eayh2rL3APWv2ZXZ/TWMvTFzZ35ezrfkbPt4hVdylUZ18WeKIFQoQIESJEiBDhQxMu+5yGWj4f4YkSjuVF0M0lCNX6vRs1fElCXUN7s/4OnAnV+re5mFSVfIV3vp+GECFChAgRIkSI0EZoMrgbkVqi6Vy4L5/3fLvXlFkS1Rq9W/nc5kH+wlK/I+pfbYh27d6zvRu5yI0a4AAYq5vBX2VPrRG4JsVCiBCh+xAiROi+mHDeT6nq3pp+C6dauClLfkGN2q7ptXC4JTtfF43GSWc1TG0kNzxVa9g9+Tqv9tWLsZcobKvtuq53O0WWwuy+3LT0ECL0P4QI/Q8hQv9bfaH+j//eZtJTybRwUCBhSx4jDH89Teq3OiSZfRG2z70OkirS+3JWCIsfwuKHsPghLH4Ii99DFhbpaGJWrZ2k/D43QURERERERFSo/gAL8xNjVSOXnwAAAABJRU5ErkJggg==";
  const image = new ImageResource(path);
  const sprite = new Sprite(image);
  let drawStrategy: TiledDrawStrategy;

  beforeAll(async () => {
    await image.load();
  });

  beforeEach(() => {
    drawStrategy = new TiledDrawStrategy(
      new Rectangle(
        new Vector2(0, 0),
        new Vector2(ctx.canvas.width, ctx.canvas.height)
      )
    );
  });

  describe("drawColor method", () => {

    it("Should tile when tiling is on", () => {
      const color = new Color(250, 10, 50, 1);
      const x = 20;
      const y = 3;
      const width = 50;
      const height = 45;
      const area = new Rectangle(
        new Vector2(x, y),
        new Vector2(width, height)
      );

      spyOn(ctx, "fillRect");

      drawStrategy.drawColor(ctx, color, area);

      expect(ctx.fillRect).toHaveBeenCalledWith(
        0,
        0,
        canvas.width,
        canvas.height
      );
    });

    it("Should tile in x axis when tileX is on", () => {
      const color = new Color(250, 10, 50, 1);
      const x = 20;
      const y = 3;
      const width = 50;
      const height = 45;
      const area = new Rectangle(
        new Vector2(x, y),
        new Vector2(width, height)
      );

      drawStrategy.dontTileY();

      spyOn(ctx, "fillRect");

      drawStrategy.drawColor(ctx, color, area);

      expect(ctx.fillRect).toHaveBeenCalledWith(
        0,
        y,
        canvas.width,
        height
      );
    });

    it("Should tile in y axis when tileY is on", () => {
      const color = new Color(250, 10, 50, 1);
      const x = 20;
      const y = 3;
      const width = 50;
      const height = 45;
      const area = new Rectangle(
        new Vector2(x, y),
        new Vector2(width, height)
      );

      drawStrategy.dontTileX();

      spyOn(ctx, "fillRect");

      drawStrategy.drawColor(ctx, color, area);

      expect(ctx.fillRect).toHaveBeenCalledWith(
        x,
        0,
        width,
        canvas.height
      );
    });

    it("Should draw in designated area when tiling is off", () => {
      const color = new Color(250, 10, 50, 1);
      const x = 20;
      const y = 3;
      const width = 50;
      const height = 45;
      const area = new Rectangle(
        new Vector2(x, y),
        new Vector2(width, height)
      );

      drawStrategy.dontTileX();
      drawStrategy.dontTileY();

      spyOn(ctx, "fillRect");

      drawStrategy.drawColor(ctx, color, area);

      expect(ctx.fillRect).toHaveBeenCalledWith(
        x,
        y,
        width,
        height
      );
    });

  });

  describe("drawSprite method", () => {

    it("Should tile when tiling is on", () => {
      // Canvas size is 450 x 450
      // 450 divided by 5 is 90
      // On the x axis there'll be 5 iterations
      // On the y axis there'll be 6 iterations
      // 5 times 6 equals 30 draws
      const x = -90;
      const y = -91;
      const width = 90;
      const height = 90;
      const area = new Rectangle(
        new Vector2(x, y),
        new Vector2(width, height)
      );
      const expectedDraws = 30;

      spyOn(sprite, "draw");

      drawStrategy.drawSprite(ctx, sprite, area);

      expect(sprite.draw).toHaveBeenCalledTimes(expectedDraws);
    });

    it("Should tile in x axis when tileX is on", () => {
      // Canvas size is 450 x 450
      // 450 divided by 5 is 90
      // On the x axis there'll be 5 iterations
      // On the y axis there'll be 1 iteration
      // 5 times 1 equals 5 draws
      const x = 90;
      const y = 45;
      const width = 90;
      const height = 90;
      const area = new Rectangle(
        new Vector2(x, y),
        new Vector2(width, height)
      );
      const expectedDraws = 5;

      drawStrategy.dontTileY();

      spyOn(sprite, "draw");

      drawStrategy.drawSprite(ctx, sprite, area);

      expect(sprite.draw).toHaveBeenCalledTimes(expectedDraws);
    });

    it("Should tile in y axis when tileY is on", () => {
      // Canvas size is 450 x 450
      // 450 divided by 5 is 90
      // On the x axis there'll be 1 iteration
      // On the y axis there'll be 6 iterations
      // 1 times 6 equals 6 draws
      const x = 90;
      const y = -45;
      const width = 90;
      const height = 90;
      const area = new Rectangle(
        new Vector2(x, y),
        new Vector2(width, height)
      );
      const expectedDraws = 6;

      drawStrategy.dontTileX();

      spyOn(sprite, "draw");

      drawStrategy.drawSprite(ctx, sprite, area);

      expect(sprite.draw).toHaveBeenCalledTimes(expectedDraws);
    });

    it("Should draw in designated area when tiling is off", () => {
      const x = 90;
      const y = -45;
      const width = 90;
      const height = 90;
      const area = new Rectangle(
        new Vector2(x, y),
        new Vector2(width, height)
      );
      const expectedDraws = 1;

      drawStrategy.dontTileX();
      drawStrategy.dontTileY();

      spyOn(sprite, "draw");

      drawStrategy.drawSprite(ctx, sprite, area);

      expect(sprite.draw).toHaveBeenCalledTimes(expectedDraws);
    });

  });

});
