import { Vector2 } from "../../../../dist/spatial/vector2.js";
import { Camera } from "../../../../dist/stage/camera/camera.js";
import { FollowingCamera } from "../../../../dist/stage/camera/followingCamera.js";
import { GameObject } from "../../../../dist/stage/gameObject.js";
import { Game } from "../../../../dist/main/game.js";

describe("FollowingCamera class", () => {

  class ConcreteGameObject extends GameObject {

    onStart(): void {}
    onUpdate(): void {}
    onDraw(ctx: CanvasRenderingContext2D, camera: Camera): void {}
    onStop(): void {}

  }

  const game = Game.getInstance();
  let gameObject: GameObject;
  let camera: FollowingCamera;

  beforeEach(() => {
    gameObject = new ConcreteGameObject(
      Vector2.createZero(),
      Vector2.createZero(),
    );
    camera = new FollowingCamera({
      target: gameObject
    })
  });

  it("Should have a mandatory target object", () => {
    expect(camera.getTarget()).toBe(gameObject);
  });

  it("Should be set to default coordinates and dimensions", () => {
    expect(camera.getCoordinates()).toEqual(new Vector2(0, 0));
    expect(camera.getDimensions()).toEqual(
      new Vector2(
        game?.getWidth() || 0,
        game?.getHeight() || 0
      )
    )
  });

  describe("update method", () => {

    it("Should follow target object", () => {
      const targetCoordinates = new Vector2(100, 100);
      gameObject.setCoordinates(targetCoordinates);
      camera.setTarget(gameObject);
      
      camera.update();

      expect(camera.getCoordinates()).toEqual(targetCoordinates);
    });

  });

});
