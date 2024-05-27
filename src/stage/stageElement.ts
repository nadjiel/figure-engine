import { GameIterable } from "../main/gameIterable.js";

/**
 * The `StageElement` interface represents a game iterable element that
 * is managed by a stage.
 * 
 * @version 0.3.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export interface StageElement extends GameIterable {

  /**
   * Marks the given {@linkcode Resource} as used by this {@linkcode StageElement},
   * which means that it will be loaded when the {@linkcode load} method is called.
   * 
   * @param name The name of the {@linkcode Resource} to store.
   */
  usesResource(name: string): void;

  /**
   * Loads the {@linkcode Resource}s that this {@linkcode StageElement} uses
   * according to the {@linkcode usesResource} method.
   * 
   * @returns A Promise that resolves when the `Resource`s are loaded. 
   */
  load(): Promise<Array<HTMLImageElement | HTMLAudioElement>>;

}

export default StageElement;
