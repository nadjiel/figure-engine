import { GameCanvas } from "../../dist/gameCanvas.js";

describe("GameCanvas class", () => {

  it("Should instantiate without parameters", () => {
    const defaultWidth = 1280;
    const defaultHeight = 720;
    const defaultBgColor = "rgb(0, 0, 0)";

    const gameCanvas = new GameCanvas();
    
    const context = gameCanvas.getHTMLCanvas().getContext("2d")!;
    
    expect(gameCanvas.getHTMLCanvas()).toBeInstanceOf(HTMLCanvasElement);
    expect(gameCanvas.getContext()).toEqual(context);
    expect(gameCanvas.getAspectRatio()).toBeUndefined();
    expect(gameCanvas.getWidth()).toBe(defaultWidth);
    expect(gameCanvas.getHeight()).toBe(defaultHeight);
    expect(gameCanvas.getBackgroundColor()).toBe(defaultBgColor);
  });

  it("Should accept a predefined canvas", () => {
    const canvasElement = document.createElement("canvas");
    const defaultWidth = 1280;
    const defaultHeight = 720;
    const defaultBgColor = "rgb(0, 0, 0)";

    const gameCanvas = new GameCanvas(canvasElement);
    const ctx = gameCanvas.getContext();

    expect(gameCanvas.getHTMLCanvas()).toBe(canvasElement);
    expect(ctx).toBeInstanceOf(CanvasRenderingContext2D);
    expect(ctx.canvas).toBe(canvasElement);
    expect(gameCanvas.getAspectRatio()).toBeUndefined();
    expect(gameCanvas.getWidth()).toBe(defaultWidth);
    expect(gameCanvas.getHeight()).toBe(defaultHeight);
    expect(gameCanvas.getBackgroundColor()).toBe(defaultBgColor);
  });

  describe("appendTo method", () => {

    it("Should append canvas to the specified element", () => {
      const div = document.createElement("div");
      const gameCanvas = new GameCanvas();

      gameCanvas.appendTo(div);

      expect(gameCanvas.getHTMLCanvas().parentElement).toBe(div);
    });

  });

  describe("setWidth method", () => {

    it("Should only set width if aspect ratio is not set", () => {
      const newWidth = 1920;
      const defaultHeight = 720;
      const gameCanvas = new GameCanvas();

      gameCanvas.setWidth(newWidth);

      expect(gameCanvas.getWidth()).toBe(newWidth);
      expect(gameCanvas.getHeight()).toBe(defaultHeight);
    });
    
    it("Should also set height if aspect ratio is set", () => {
      const newWidth = 1920;
      const aspectRatio = 16 / 9;
      const newHeight = newWidth / aspectRatio;
      const gameCanvas = new GameCanvas();

      gameCanvas.setAspectRatio(aspectRatio);

      gameCanvas.setWidth(newWidth);

      expect(gameCanvas.getWidth()).toBe(newWidth);
      expect(gameCanvas.getHeight()).toBe(newHeight);
    });

  });

  describe("setHeight method", () => {

    it("Should only set height if aspect ratio is not set", () => {
      const newHeight = 1080;
      const defaultWidth = 1280;
      const gameCanvas = new GameCanvas();

      gameCanvas.setHeight(newHeight);

      expect(gameCanvas.getHeight()).toBe(newHeight);
      expect(gameCanvas.getWidth()).toBe(defaultWidth);
    });
    
    it("Should also set width if aspect ratio is set", () => {
      const newHeight = 1080;
      const aspectRatio = 16 / 9;
      const newWidth = newHeight * aspectRatio;
      const gameCanvas = new GameCanvas();

      gameCanvas.setAspectRatio(aspectRatio);

      gameCanvas.setHeight(newHeight);

      expect(gameCanvas.getHeight()).toBe(newHeight);
      expect(gameCanvas.getWidth()).toBe(newWidth);
    });

  });

  describe("setSize method", () => {

    it("Should set size and remove old aspect ratio", () => {
      const newWidth = 1920;
      const newHeight = 1080;
      const newAspectRatio = 1 / 1;
      const gameCanvas = new GameCanvas();

      gameCanvas.setAspectRatio(newAspectRatio);

      gameCanvas.setSize(newWidth, newHeight);

      expect(gameCanvas.getWidth()).toBe(newWidth);
      expect(gameCanvas.getHeight()).toBe(newHeight);
      expect(gameCanvas.getAspectRatio()).toBeUndefined();
    });

  });

});
