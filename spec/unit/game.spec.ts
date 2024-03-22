import { Game } from "../../dist/game.js";
import { GameCanvas } from "../../dist/gameCanvas.js";

describe("Game class", () => {

  it("Should instantiate with parameters", () => {
    const canvas = document.createElement("canvas");
    const root = document.createElement("div");
    document.body.appendChild(root);
    const width = 256;
    const height = 224;

    const game = new Game({ canvas, root, width, height });
    
    expect(game.getGameCanvas()).toBeInstanceOf(GameCanvas);
    expect(game.getHTMLCanvas()).toBe(canvas);
    expect(game.getGameCanvas().getRoot()).toBe(root);
    expect(game.getWidth()).toBe(width);
    expect(game.getHeight()).toBe(height);
  });
  
});
