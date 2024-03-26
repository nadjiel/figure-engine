import { Game } from "../../dist/game.js";

describe("Game class", () => {

  it("Should instantiate with parameters", () => {
    const canvas = document.createElement("canvas");
    const root = document.createElement("div");
    document.body.appendChild(root);
    const width = 256;
    const height = 224;
    const fps = 60;

    const game = new Game({ canvas, root, width, height, fps });
    
    expect(game.getHTMLCanvas()).toBe(canvas);
    expect(game.getRoot()).toBe(root);
    expect(game.getWidth()).toBe(width);
    expect(game.getHeight()).toBe(height);
    expect(game.getFps()).toBe(fps);
    expect(game.isRunning()).toBeFalse();
  });
  
});
