import { GameCanvas } from "../../../dist/main/gameCanvas.js";

describe("GameCanvas class", () => {

  let gameCanvas: GameCanvas;

  beforeEach(() => {
    gameCanvas = new GameCanvas();
  });

  afterEach(() => {
    gameCanvas.unmount();
  });

  it("Should instantiate without parameters", () => {
    const defaultWidth = 1280;
    const defaultHeight = 720;
    const originalWidth = defaultWidth;
    const originalHeight = defaultHeight;
    const defaultAspectRatioMaintanance = false;
    const defaultAspectRatio = 16 / 9;
    const defaultBgColor = "rgb(0, 0, 0)";
    
    const context = gameCanvas.getHTMLCanvas().getContext("2d")!;
    
    expect(gameCanvas.getHTMLCanvas()).toBeInstanceOf(HTMLCanvasElement);
    expect(gameCanvas.getHTMLCanvas().parentElement).toBe(document.body);
    expect(gameCanvas.getContext()).toEqual(context);
    expect(gameCanvas.getWidth()).toBe(defaultWidth);
    expect(gameCanvas.getHeight()).toBe(defaultHeight);
    expect(gameCanvas.getOriginalWidth()).toBe(originalWidth);
    expect(gameCanvas.getOriginalHeight()).toBe(originalHeight);
    expect(gameCanvas.getAspectRatio()).toBe(defaultAspectRatio);
    expect(gameCanvas.isMaintainingAspectRatio()).toBe(defaultAspectRatioMaintanance);
    expect(gameCanvas.getBackgroundColor()).toBe(defaultBgColor);
  });

  it("Should accept a predefined canvas", () => {
    const canvasElement = document.createElement("canvas");
    document.body.appendChild(canvasElement);
    const canvasRoot = canvasElement.parentElement;
    const canvasElementCtx = canvasElement.getContext("2d")!;
    const defaultWidth = 1280;
    const defaultHeight = 720;
    const originalWidth = defaultWidth;
    const originalHeight = defaultHeight;
    const defaultAspectRatioMaintanance = false;
    const defaultAspectRatio = 16 / 9;
    const defaultBgColor = "rgb(0, 0, 0)";

    const gameCanvas = new GameCanvas({ canvas: canvasElement });

    expect(gameCanvas.getHTMLCanvas()).toBe(canvasElement);
    expect(gameCanvas.getRoot()).toBe(canvasRoot!);
    expect(gameCanvas.getContext()).toEqual(canvasElementCtx);
    expect(gameCanvas.getWidth()).toBe(defaultWidth);
    expect(gameCanvas.getHeight()).toBe(defaultHeight);
    expect(gameCanvas.getOriginalWidth()).toBe(originalWidth);
    expect(gameCanvas.getOriginalHeight()).toBe(originalHeight);
    expect(gameCanvas.getAspectRatio()).toBe(defaultAspectRatio);
    expect(gameCanvas.isMaintainingAspectRatio()).toBe(defaultAspectRatioMaintanance);
    expect(gameCanvas.getBackgroundColor()).toBe(defaultBgColor);

    gameCanvas.unmount();
  });

  it("Should accept a predefined root", () => {
    const root = document.createElement("div");
    const defaultWidth = 1280;
    const defaultHeight = 720;
    const originalWidth = defaultWidth;
    const originalHeight = defaultHeight;
    const defaultAspectRatioMaintanance = false;
    const defaultAspectRatio = 16 / 9;
    const defaultBgColor = "rgb(0, 0, 0)";

    const gameCanvas = new GameCanvas({ root });
    
    const context = gameCanvas.getHTMLCanvas().getContext("2d")!;

    expect(gameCanvas.getHTMLCanvas()).toBeInstanceOf(HTMLCanvasElement);
    expect(gameCanvas.getRoot()).toBe(root);
    expect(gameCanvas.getContext()).toEqual(context);
    expect(gameCanvas.getWidth()).toBe(defaultWidth);
    expect(gameCanvas.getHeight()).toBe(defaultHeight);
    expect(gameCanvas.getOriginalWidth()).toBe(originalWidth);
    expect(gameCanvas.getOriginalHeight()).toBe(originalHeight);
    expect(gameCanvas.getAspectRatio()).toBe(defaultAspectRatio);
    expect(gameCanvas.isMaintainingAspectRatio()).toBe(defaultAspectRatioMaintanance);
    expect(gameCanvas.getBackgroundColor()).toBe(defaultBgColor);

    gameCanvas.unmount();
  });

  describe("setWidth method", () => {

    it("Should set original width and update current width", () => {
      const newWidth = 1920;

      gameCanvas.setWidth(newWidth);

      expect(gameCanvas.getOriginalWidth()).toBe(newWidth);
      expect(gameCanvas.getWidth()).toBe(newWidth);
    });

  });

  describe("setHeight method", () => {

    it("Should set original height and update current height", () => {
      const newHeight = 1080;

      gameCanvas.setHeight(newHeight);

      expect(gameCanvas.getOriginalHeight()).toBe(newHeight);
      expect(gameCanvas.getHeight()).toBe(newHeight);
    });

  });

  describe("scaleWidthTo method", () => {

    it("Should scale width only if game isn't maintaining aspect ratio", () => {
      const defaultWidth = 1280;
      const newWidth = 1920;

      gameCanvas.scaleWidthTo(newWidth);

      expect(gameCanvas.getOriginalWidth()).toBe(defaultWidth);
      expect(gameCanvas.getWidth()).toBe(newWidth);
    });

    it("Should scale width and height if aspect ratio is maintained", () => {
      const defaultWidth = 1280;
      const defaultHeight = 720;
      const newWidth = 1920;
      const newHeight = 1080;

      gameCanvas.doMaintainAspectRatio();

      gameCanvas.scaleWidthTo(newWidth);

      expect(gameCanvas.getOriginalWidth()).toBe(defaultWidth);
      expect(gameCanvas.getOriginalHeight()).toBe(defaultHeight);
      expect(gameCanvas.getWidth()).toBe(newWidth);
      expect(gameCanvas.getHeight()).toBe(newHeight);
    });

  });

  describe("scaleHeightTo method", () => {

    it("Should scale height only if game isn't maintaining aspect ratio", () => {
      const defaultHeight = 720;
      const newHeight = 1080;

      gameCanvas.scaleHeightTo(newHeight);

      expect(gameCanvas.getOriginalHeight()).toBe(defaultHeight);
      expect(gameCanvas.getHeight()).toBe(newHeight);
    });

    it("Should scale width and height if aspect ratio is maintained", () => {
      const defaultWidth = 1280;
      const defaultHeight = 720;
      const newWidth = 1920;
      const newHeight = 1080;

      gameCanvas.doMaintainAspectRatio();

      gameCanvas.scaleHeightTo(newHeight);

      expect(gameCanvas.getOriginalWidth()).toBe(defaultWidth);
      expect(gameCanvas.getOriginalHeight()).toBe(defaultHeight);
      expect(gameCanvas.getWidth()).toBe(newWidth);
      expect(gameCanvas.getHeight()).toBe(newHeight);
    });

  });

  describe("scaleTo method", () => {

    it("Should stop maintaining aspect ratio and scale width and height", () => {
      const defaultWidth = 1280;
      const defaultHeight = 720;
      const newWidth = 256;
      const newHeight = 224;

      gameCanvas.doMaintainAspectRatio();

      gameCanvas.scaleTo(newWidth, newHeight);

      expect(gameCanvas.isMaintainingAspectRatio()).toBeFalse();
      expect(gameCanvas.getOriginalWidth()).toBe(defaultWidth);
      expect(gameCanvas.getOriginalHeight()).toBe(defaultHeight);
      expect(gameCanvas.getWidth()).toBe(newWidth);
      expect(gameCanvas.getHeight()).toBe(newHeight);
    });

  });

  describe("unmount method", () => {

    it("Should remove the game canvas from the DOM", () => {
      const gameCanvas = new GameCanvas();

      gameCanvas.unmount();

      expect(gameCanvas.getRoot()).toBeNull();
    });

  });

  describe("fitRoot method", () => {

    it("Should cover root if no aspect ratio is set", () => {
      const gameCanvas = new GameCanvas();
      const rootWidth = gameCanvas.getRootWidth();
      const rootHeight = gameCanvas.getRootHeight();

      gameCanvas.fitRoot();

      expect(gameCanvas.getWidth()).toBe(rootWidth);
      expect(gameCanvas.getHeight()).toBe(rootHeight);
    });

    it("Should fit root respecting aspect ratio if set", () => {
      const root = document.createElement("div");
      document.body.appendChild(root);
      const rootWidth = 1000;
      const rootHeight = 1000;
      root.style.width = `${rootWidth}px`;
      root.style.height = `${rootHeight}px`;
      const gameCanvas = new GameCanvas({ root });
      const aspectRatio = gameCanvas.getAspectRatio();
      const scaledWidth = rootWidth;
      const scaledHeight = Math.floor(scaledWidth / aspectRatio);

      gameCanvas.doMaintainAspectRatio();

      gameCanvas.fitRoot();

      expect(gameCanvas.getWidth()).toBe(scaledWidth);
      expect(gameCanvas.getHeight()).toBe(scaledHeight);
    });

    it("Should make broad roots contain game without overflow", () => {
      const root = document.createElement("div");
      document.body.appendChild(root);
      const rootWidth = 2000;
      const rootHeight = 1000;
      root.style.width = `${rootWidth}px`;
      root.style.height = `${rootHeight}px`;
      const gameCanvas = new GameCanvas({ root });
      const aspectRatio = gameCanvas.getAspectRatio();
      const scaledWidth = Math.floor(rootHeight * aspectRatio);
      const scaledHeight = rootHeight;

      gameCanvas.doMaintainAspectRatio();

      gameCanvas.fitRoot();

      expect(gameCanvas.getWidth()).toBe(scaledWidth);
      expect(gameCanvas.getHeight()).toBe(scaledHeight);
    });

  });

  // WARNING: toggleFullscreen method can't be automatically tested since it has to be triggered by the user

});
