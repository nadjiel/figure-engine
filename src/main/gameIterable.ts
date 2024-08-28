import { Camera } from "../stage/camera/camera";

/**
 * This interface describes a class that is iterated by the game.
 * It has methods for describing the class behavior on the iteration start,
 * update, draw and stop and also methods for the user to define what happens in
 * such events.
 * 
 * @version 0.3.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export interface GameIterable {

  /**
   * Defines what happens once the iteration starts.
   */
  start(): void;
  
  /**
   * Defines what happens every iteration before drawing.
   */
  update(): void;

  /**
   * Defines what is drawn every iteration after updating.
   * @param ctx The canvas on which to draw.
   */
  draw(ctx: CanvasRenderingContext2D, camera?: Camera): void;
  
  /**
   * Defines what happens once the iteration stops.
   */
  stop(): void;

  /**
   * Should be overriden by the user, if they wish to define a custom behavior
   * on the iteration start.
   */
  onStart(): void;
  
  /**
   * Should be overriden by the user, if they wish to define a custom behavior
   * on every iteration before the draw event.
   */
  onUpdate(): void;

  /**
   * Should be overriden by the user, if they wish to define a custom drawing
   * behavior after the update event.
   * @param ctx The canvas on which to draw.
   */
  onDraw(ctx: CanvasRenderingContext2D, camera?: Camera): void;
  
  /**
   * Should be overriden by the user, if they wish to define a custom behavior
   * on the iteration stop.
   */
  onStop(): void;

}

export default GameIterable;
