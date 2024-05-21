import { Sprite } from "../../../dist/resources/sprite.js";
import { ImageResource } from "../../../dist/resources/imageResource.js";
import { Vector2 } from "../../../dist/spatial/vector2.js";

let sprite: Sprite;
const image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA3lBMVEX////mAAAAAADjAADqAAD39/coKCjPAAC/AAA9PT1ra2vbAABIAADR0dHvAADCAAAoAADj4+NOTk7VAADs7OxCQkL4wsLIyMj719d4AAD5AAC4uLjzAABkAACqqqoLAAA4AADkEBBvAACaAACfn59EAADpPT2wAAB0dHTzpKQRERGTk5PramqDAAAkJCQYGBgUKytfX193Li4yMjJbNzdUOTk8AAAuAACvGhq9DQ3qUVGSSUl5XFz1sLCMAADoMjLzjo42RERfSUlEUlIAEREdAAAkMzNISEiKa2tuNjb7l8E6AAADlElEQVR4nO3df1fSUBjAcdguICBDfkWpaWWEWlmmWZRmmUq9/zfU6ZxO53nmGbLL2L3D7/fveZ99BM9hjm2lEhERERERERERERERrUAVy4ox7u/EwVHVpsOh1bjOO6tp1cO+vbAa2LVlJ7ScFiBEiBAhQoQIESJcbWHpveVIu0/efVthmoOL/nFdNqlZ1fsgFznZSRzXUtNO7abVah/VMq3Zwrr65dQiY9P2C7XKy8RxQ7XdyGqYMdGzFG+g/kBuu1szZZsiS6HVsHLZIESIECFChAgRPgChOgOghUFWwqQTDlp4Ziv8pIXxcxoN1ec10eTgUXJfZoysyVXaXxtJna+pDS2F5bZa5lxOOO6USsofNEPxk88fz3hDv5l3fvQ2SOosCu//+XSFZqRGtKyFlSyEo2UI1xEiRIgQIUKEmQn9/UyzgPDiQPZq3plm/CSpb8Yv4WUom39otJ1UlLVvQeHcr5rLECL0P4QI/Q8hQv9D+OCE3+XBxMWls91OUTphObQ8mnBYSmEBQ4jQ/xAi9D+ECP0PIUL/Q4jQ/xAi9D+ECP0PIUL/u19oIpHr3Z0zuc8muiMcqCbqa+8FeUHVd/Xbp9JT7ZR0lR/qF2B5vUXOmQ25z9f3XOmcyTUzOefgqqCcQ4jQ/xAi9D+ECP0vnTB2fxp1HxjXEpG+QU0qYWPa/d+0O26LfDrSaKuuuqLp7E/esSu7q7FX1DXsX2Gk9ivoWN+RtlIQYWZ3M0OYWwgRInQfQoQI3Zeh8GjlhcfyQ/vPSbMnyvlIo6eayh2rL3APWv2ZXZ/TWMvTFzZ35ezrfkbPt4hVdylUZ18WeKIFQoQIESJEiBDhQxMu+5yGWj4f4YkSjuVF0M0lCNX6vRs1fElCXUN7s/4OnAnV+re5mFSVfIV3vp+GECFChAgRIkSI0EZoMrgbkVqi6Vy4L5/3fLvXlFkS1Rq9W/nc5kH+wlK/I+pfbYh27d6zvRu5yI0a4AAYq5vBX2VPrRG4JsVCiBCh+xAiROi+mHDeT6nq3pp+C6dauClLfkGN2q7ptXC4JTtfF43GSWc1TG0kNzxVa9g9+Tqv9tWLsZcobKvtuq53O0WWwuy+3LT0ECL0P4QI/Q8hQv9bfaH+j//eZtJTybRwUCBhSx4jDH89Teq3OiSZfRG2z70OkirS+3JWCIsfwuKHsPghLH4Ii99DFhbpaGJWrZ2k/D43QURERERERFSo/gAL8xNjVSOXnwAAAABJRU5ErkJggg==";
const imageResource = new ImageResource(image);
let initialWidth: number;
let initialHeight: number;
let initialRows: number;
let initialColumns: number;
let initialMargins = 0;
let initialGaps = 0;
let initialIncludedFrames = [0];
let initialFrame = 0;

describe("Sprite class", () => {

  beforeAll(async () => {
    await imageResource.load();
    initialWidth = imageResource.get().width; // This image's width is 225
    initialHeight = imageResource.get().height; // This image's width is 225
  });

  beforeEach(() => {
    sprite = new Sprite(imageResource);
  });

  it("Should instantiate properly without configurations", () => {
    expect(sprite.getImage()).toBe(imageResource.get());
    expect(sprite.getWidth()).toBe(initialWidth);
    expect(sprite.getHeight()).toBe(initialHeight);

    expect(sprite.getColumns()).toBe(initialColumns);
    expect(sprite.getRows()).toBe(initialRows);

    expect(sprite.getLeftMargin()).toBe(initialMargins);
    expect(sprite.getRightMargin()).toBe(initialMargins);
    expect(sprite.getTopMargin()).toBe(initialMargins);
    expect(sprite.getBottomMargin()).toBe(initialMargins);

    expect(sprite.getHorizontalGap()).toBe(initialGaps);
    expect(sprite.getVerticalGap()).toBe(initialGaps);

    expect(sprite.getIncludedFrames()).toBe(initialIncludedFrames);
    expect(sprite.getFrame()).toBe(initialFrame);
  });

  describe("setColumns method", () => {

    it("Shouldn't accept 0 or less", () => {
      const columns = 0;

      expect(() => sprite.setColumns(columns))
        .toThrowError(`Sprite must have 1 or more columns (received ${columns})`);
    });

    it("Should accept values greater or equal to 1", () => {
      const columns = 2;

      sprite.setColumns(columns);

      expect(sprite.getColumns()).toBe(columns);
    });

  });

  describe("setRows method", () => {

    it("Shouldn't accept 0 or less", () => {
      const rows = 0;

      expect(() => sprite.setRows(rows))
        .toThrowError(`Sprite must have 1 or more rows (received ${rows})`);
    });

    it("Should accept values greater or equal to 1", () => {
      const rows = 2;

      sprite.setRows(rows);

      expect(sprite.getRows()).toBe(rows);
    });

  });

  describe("setLeftMargin method", () => {

    it("Shouldn't accept negative values", () => {
      const margin = -1;

      expect(() => sprite.setLeftMargin(margin))
        .toThrowError(`Sprite can't have negative margins (received ${margin})`);
    });

    it("Should accept values greater or equal to 0", () => {
      const margin = 25;

      sprite.setLeftMargin(margin);

      expect(sprite.getLeftMargin()).toBe(margin);
    });

    it("Should handle values bigger than the image usable area", () => {
      const margin = 250;
      // Expected 225 because it's the image width
      const expectedMargin = 225;

      sprite.setLeftMargin(margin);

      expect(sprite.getLeftMargin()).toBe(expectedMargin);
    });

  });

  describe("setRightMargin method", () => {

    it("Shouldn't accept negative values", () => {
      const margin = -1;

      expect(() => sprite.setRightMargin(margin))
        .toThrowError(`Sprite can't have negative margins (received ${margin})`);
    });

    it("Should accept values greater or equal to 0", () => {
      const margin = 25;

      sprite.setRightMargin(margin);

      expect(sprite.getRightMargin()).toBe(margin);
    });

    it("Should handle values bigger than the image usable area", () => {
      const margin = 250;
      // Expected 225 because it's the image width
      const expectedMargin = 225;

      sprite.setRightMargin(margin);

      expect(sprite.getRightMargin()).toBe(expectedMargin);
    });

  });

  describe("setTopMargin method", () => {

    it("Shouldn't accept negative values", () => {
      const margin = -1;

      expect(() => sprite.setTopMargin(margin))
        .toThrowError(`Sprite can't have negative margins (received ${margin})`);
    });

    it("Should accept values greater or equal to 0", () => {
      const margin = 25;

      sprite.setTopMargin(margin);

      expect(sprite.getTopMargin()).toBe(margin);
    });

    it("Should handle values bigger than the image usable area", () => {
      const margin = 250;
      // Expected 225 because it's the image width
      const expectedMargin = 225;

      sprite.setTopMargin(margin);

      expect(sprite.getTopMargin()).toBe(expectedMargin);
    });

  });

  describe("setBottomMargin method", () => {

    it("Shouldn't accept negative values", () => {
      const margin = -1;

      expect(() => sprite.setBottomMargin(margin))
        .toThrowError(`Sprite can't have negative margins (received ${margin})`);
    });

    it("Should accept values greater or equal to 0", () => {
      const margin = 25;

      sprite.setBottomMargin(margin);

      expect(sprite.getBottomMargin()).toBe(margin);
    });

    it("Should handle values bigger than the image usable area", () => {
      const margin = 250;
      // Expected 225 because it's the image width
      const expectedMargin = 225;

      sprite.setBottomMargin(margin);

      expect(sprite.getBottomMargin()).toBe(expectedMargin);
    });

  });

  describe("setHorizontalGap method", () => {

    it("Shouldn't accept negative values", () => {
      const gap = -1;

      expect(() => sprite.setHorizontalGap(gap))
        .toThrowError(`Sprite can't have negative gaps (received ${gap})`);
    });

    it("Should accept values greater or equal to 0", () => {
      const gap = 25;

      sprite.setHorizontalGap(gap);

      expect(sprite.getHorizontalGap()).toBe(gap);
    });

    it("Should handle values bigger than the image usable area", () => {
      const gap = 250;
      // Expected 225 because it's the image width
      const expectedGap = 225;

      sprite.setHorizontalGap(gap);

      expect(sprite.getHorizontalGap()).toBe(expectedGap);
    });

  });

  describe("setVerticalGap method", () => {

    it("Shouldn't accept negative values", () => {
      const gap = -1;

      expect(() => sprite.setVerticalGap(gap))
        .toThrowError(`Sprite can't have negative gaps (received ${gap})`);
    });

    it("Should accept values greater or equal to 0", () => {
      const gap = 25;

      sprite.setVerticalGap(gap);

      expect(sprite.getVerticalGap()).toBe(gap);
    });

    it("Should handle values bigger than the image usable area", () => {
      const gap = 250;
      // Expected 225 because it's the image width
      const expectedGap = 225;

      sprite.setVerticalGap(gap);

      expect(sprite.getVerticalGap()).toBe(expectedGap);
    });

  });

  describe("includeOnly method", () => {

    it("Shouldn't accept empty array", () => {
      const frames: Array<number> = [];

      expect(() => sprite.includeOnly(...frames))
        .toThrowError(`Sprite can't have no included frames (received ${frames})`);
    });

    it("Should not accept unavailable frames", () => {
      const frames: Array<number> = [ 0, 1 ];
      const expectedErrorFrame = 1;

      expect(() => sprite.includeOnly(...frames))
        .toThrowError(`Sprite can't include unexisting frame ${expectedErrorFrame}`);
    });

    it("Should accept available frames", () => {
      const frames: Array<number> = [ 0 ];

      sprite.includeOnly(...frames);

      expect(sprite.getIncludedFrames()).toBe(frames);
    });

  });

  describe("selectFrame method", () => {

    it("Should not accept unexisting frames", () => {
      const frame = 1;

      expect(() => sprite.selectFrame(frame))
        .toThrowError(`Can't select unexisting frame ${frame}`);
    });

    it("Should not accept unincluded frames", () => {
      sprite.setColumns(2);
      sprite.includeOnly(0);
      const frame = 1;

      expect(() => sprite.selectFrame(frame))
        .toThrowError(`Can't select unincluded frame ${frame}`);
    });

    it("Should accept valid frames", () => {
      sprite.setColumns(2);
      const frame = 1;

      sprite.selectFrame(frame);

      expect(sprite.getFrame()).toBe(frame);
    });

  });

  describe("nextFrame method", () => {

    it("Should select next frame", () => {
      sprite.setColumns(2); // Makes it 2 frames total
      sprite.setRows(2); // Makes it 4 frames total
      sprite.selectFrame(0);
      const expectedFrame = 1;

      sprite.nextFrame();

      expect(sprite.getFrame()).toBe(expectedFrame);
    });

    it("Should select first frame if on last", () => {
      sprite.setColumns(2); // Makes it 2 frames total
      sprite.setRows(2); // Makes it 4 frames total
      sprite.selectFrame(3);
      const expectedFrame = 0;

      sprite.nextFrame();

      expect(sprite.getFrame()).toBe(expectedFrame);
    });

  });

  describe("nextFrameInRow method", () => {

    it("Should select next frame", () => {
      sprite.setColumns(2); // Makes it 2 frames total
      sprite.setRows(2); // Makes it 4 frames total
      sprite.selectFrame(0);
      const expectedFrame = 1;

      sprite.nextFrameInRow();

      expect(sprite.getFrame()).toBe(expectedFrame);
    });

    it("Should select first frame if on last of row", () => {
      sprite.setColumns(2); // Makes it 2 frames total
      sprite.setRows(2); // Makes it 4 frames total
      sprite.selectFrame(1);
      const expectedFrame = 0;

      sprite.nextFrameInRow();

      expect(sprite.getFrame()).toBe(expectedFrame);
    });

  });

  describe("nextFrameInColumn method", () => {

    it("Should select next frame", () => {
      sprite.setColumns(2); // Makes it 2 frames total
      sprite.setRows(2); // Makes it 4 frames total
      sprite.selectFrame(0);
      const expectedFrame = 2;

      sprite.nextFrameInColumn();

      expect(sprite.getFrame()).toBe(expectedFrame);
    });

    it("Should select first frame if on last of column", () => {
      sprite.setColumns(2); // Makes it 2 frames total
      sprite.setRows(2); // Makes it 4 frames total
      sprite.selectFrame(2);
      const expectedFrame = 0;

      sprite.nextFrameInColumn();

      expect(sprite.getFrame()).toBe(expectedFrame);
    });

  });

  describe("draw method", () => {

    it("Should draw with default scale", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const initialFrameX = 0;
      const initialFrameY = 0;
      const drawPosition = new Vector2(0, 0);

      spyOn(ctx, "drawImage");

      sprite.draw(ctx, drawPosition);

      expect(ctx.drawImage).toHaveBeenCalledWith(
        sprite.getImage(),
        initialFrameX,
        initialFrameY,
        sprite.getWidth(),
        sprite.getHeight(),
        drawPosition.getX(),
        drawPosition.getY(),
        sprite.getWidth(),
        sprite.getHeight()
      );
    });

    it("Should draw scaled", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const initialFrameX = 0;
      const initialFrameY = 0;
      const drawPosition = new Vector2(25, 25);
      const drawScale = new Vector2(2, 2);

      spyOn(ctx, "drawImage");

      sprite.draw(ctx, drawPosition);

      expect(ctx.drawImage).toHaveBeenCalledWith(
        sprite.getImage(),
        initialFrameX,
        initialFrameY,
        sprite.getWidth(),
        sprite.getHeight(),
        drawPosition.getX(),
        drawPosition.getY(),
        sprite.getWidth() * drawScale.getX(),
        sprite.getHeight() * drawScale.getY()
      );
    });

  });

});
