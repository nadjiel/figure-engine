import { Camera, CameraParams } from "./camera.js";
import { GameObject } from "../gameObject.js";
import { Vector2 } from "../../spatial/vector2.js";

interface FollowingCameraParams extends CameraParams {

  maxSpeed?: Vector2,
  target: GameObject,

}

export class FollowingCamera extends Camera {

  private maxSpeed?: Vector2;

  private target: GameObject;

  constructor(params: FollowingCameraParams) {
    super(params);

    this.target = params.target;
  }

  public setTarget(target: GameObject): void {
    this.target = target;
  }

  public getTarget(): GameObject {
    return this.target;
  }

  public update(): void {
    super.update();

    const cameraCoordinates = this.getCenterCoordinates();
    const targetCoordinates = this.target.getCenterCoordinates();

    console.log(cameraCoordinates)
    console.log(targetCoordinates)

    const difference = targetCoordinates.minus(cameraCoordinates);

    this.setSpeed(difference);

    this.move();

    console.log(difference.getX() + " " + difference.getY())
  }

  public onStart(): void {
    
  }

  public onUpdate(): void {
    
  }

  public onDraw(ctx: CanvasRenderingContext2D): void {
    
  }

  public onStop(): void {
    
  }

}

export default FollowingCamera;
