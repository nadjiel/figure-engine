import { Vector2 } from "../../../../dist/spatial/vector2.js";
import { Camera } from "../../../../dist/stage/camera/camera.js";
import { FollowingCamera } from "../../../../dist/stage/camera/followingCamera.js";
import { GameObject } from "../../../../dist/stage/gameObject.js";

describe("FollowingCamera class", () => {

  class ConcreteGameObject extends GameObject {

    onStart(): void {}
    onUpdate(): void {}
    onDraw(ctx: CanvasRenderingContext2D, camera: Camera): void {}
    onStop(): void {}

  }

  const gameObject = new ConcreteGameObject(
    Vector2.createZero(),
    Vector2.createZero(),
  );
  let camera: FollowingCamera;

  beforeEach(() => {
    camera = new FollowingCamera({
      target: gameObject
    })
  });

  it("Should have a mandatory target object", () => {
    expect(camera.getTarget()).toBe(gameObject);
  });

});
