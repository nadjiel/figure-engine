import { GameIterable } from "../main/gameIterable.js";
import {
  StageElementManager,
  StageElementComparer
} from "./stageElementManager.js";
import { GameObject } from "./gameObject.js";
import { Resource } from "../resources/resource.js";

/**
 * The `Stage` class provides the structure for organizing and arranging all
 * the elements a game level needs to run.
 * 
 * @version 0.3.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class Stage implements GameIterable {

  /**
   * Indicates if this {@linkcode Stage} is loaded.
   */
  private loaded = false;

  /**
   * This property stores an instance of a `StageElementManager`, which provides
   * utilities for organizing the game objects of this stage.
   */
  private objectManager = new StageElementManager<GameObject>();

  /**
   * This method adds a game object to this stage in a given index, if it is
   * valid.
   * @param index The index where to add the object.
   * @param object The object to add.
   * @throws {ArgumentError} If the received `index` is invalid (doesn't
   * represent a valid position).
   */
  public addObject(index: number, object: GameObject): void {
    this.objectManager.add(index, object);
  }

  /**
   * This method adds a game object as the first object of this stage.
   * @param object The object to add.
   */
  public addFirstObject(object: GameObject): void {
    this.objectManager.addFirst(object);
  }

  /**
   * This method adds a game object as the last object of this stage.
   * @param object The object to add.
   */
  public addLastObject(object: GameObject): void {
    this.objectManager.addLast(object);
  }

  /**
   * Removes a game object from the given `index` if there is one.
   * If not, throws an error.
   * @param index The index from where to remove an object.
   * @returns The removed object.
   * @throws {CallError} If there are no objects to remove.
   * @throws {ArgumentError} If the index doesn't specify a valid place from
   * where to remove an object.
   */
  public removeObjectFrom(index: number): GameObject {
    return this.objectManager.removeFrom(index);
  }

  /**
   * Removes a game object (if it exists) from the list of elements of
   * this manager.
   * @param element The object to remove.
   * @returns A boolean indicating if the object was removed.
   */
  public removeObject(object: GameObject): boolean {
    return this.objectManager.remove(object);
  }

  /**
   * Removes the first game object from the list of objects of this stage if
   * it has any.
   * @returns The removed object, or `undefined` if no object was
   * removed.
   */
  public removeFirstObject(): GameObject | undefined {
    return this.objectManager.removeFirst();
  }

  /**
   * Removes the last game object from the list of objects of this stage if
   * it has any.
   * @returns The removed object, or `undefined` if no object was
   * removed.
   */
  public removeLastObject(): GameObject | undefined {
    return this.objectManager.removeLast();
  }

  /**
   * @returns The game objects added to this stage.
   */
  public getObjects(): Array<GameObject> {
    return this.objectManager.getElements();
  }

  /**
   * Returns the game object that is specified by the passed `index` if
   * it exists, else, throws an error.
   * @param index The index where to get an object from.
   * @returns The object specified by the given `index`.
   * @throws {CallError} If there are no objects in this stage.
   * @throws {ArgumentError} If the received `index` doesn't specify an
   * object in this manager.
   */
  public getObject(index: number): GameObject {
    return this.objectManager.getFrom(index);
  }

  /**
   * Returns the index of the passed game `object` if it exists in this stage,
   * else, returns `-1`;
   * @param element The object to look for the index of.
   * @returns The index of the given `object`.
   */
  public getObjectIndex(object: GameObject): number {
    return this.objectManager.getIndex(object);
  }

  /**
   * @returns The first game object added to this stage.
   */
  public getFirstObject(): GameObject | undefined {
    return this.objectManager.getFirst();
  }

  /**
   * @returns The last game object added to this stage.
   */
  public getLastObject(): GameObject | undefined {
    return this.objectManager.getLast();
  }

  /**
   * @returns The amount of game objects added to this stage.
   */
  public getObjectAmount(): number {
    return this.objectManager.getAmount();
  }

  /**
   * Accepts a comparer function that tells the order in which the game objects
   * of this stage should be started.
   * 
   * If no `comparer` is received, the objects are started in the insertion
   * order.
   * 
   * Note that setting a start order makes starting the objects costlier
   * because a sort operation has to be made to make sure they attend to
   * that order.
   * @param comparer A function determining in what order the game objects
   * of this stage should be iterated on its start.
   */
  public setObjectStartOrder(comparer?: StageElementComparer<GameObject>): void {
    this.objectManager.setStartOrder(comparer);
  }

  /**
   * Returns the comparer function that tells the order in which the elements
   * should be started or `undefined` if such function doesn't exist.
   */
  public getObjectStartOrder(): StageElementComparer<GameObject> | undefined {
    return this.objectManager.getStartOrder();
  }

  /**
   * Accepts a comparer function that tells the order in which the game objects
   * of this stage should be updated.
   * 
   * If no `comparer` is received, the objects are updated in the insertion
   * order.
   * 
   * Note that setting an update order makes starting the objects costlier
   * because a sort operation has to be made to make sure they attend to
   * that order every frame.
   * @param comparer A function determining in what order the game objects
   * of this stage should be iterated on its update.
   */
  public setObjectUpdateOrder(comparer?: StageElementComparer<GameObject>): void {
    this.objectManager.setUpdateOrder(comparer);
  }

  /**
   * Returns the comparer function that tells the order in which the elements
   * should be updated or `undefined` if such function doesn't exist.
   */
  public getObjectUpdateOrder(): StageElementComparer<GameObject> | undefined {
    return this.objectManager.getUpdateOrder();
  }

  /**
   * Accepts a comparer function that tells the order in which the game objects
   * of this stage should be drawn.
   * 
   * If no `comparer` is received, the objects are drawn in the insertion
   * order.
   * 
   * Note that setting a draw order makes starting the objects costlier
   * because a sort operation has to be made to make sure they attend to
   * that order every frame.
   * @param comparer A function determining in what order the game objects
   * of this stage should be iterated on its draw.
   */
  public setObjectDrawOrder(comparer?: StageElementComparer<GameObject>): void {
    this.objectManager.setDrawOrder(comparer);
  }

  /**
   * Returns the comparer function that tells the order in which the elements
   * should be drawn or `undefined` if such function doesn't exist.
   */
  public getObjectDrawOrder(): StageElementComparer<GameObject> | undefined {
    return this.objectManager.getDrawOrder();
  }

  /**
   * Accepts a comparer function that tells the order in which the game objects
   * of this stage should be stopped.
   * 
   * If no `comparer` is received, the objects are stopped in the insertion
   * order.
   * 
   * Note that setting a stop order makes starting the objects costlier
   * because a sort operation has to be made to make sure they attend to
   * that order.
   * @param comparer A function determining in what order the game objects
   * of this stage should be iterated on its stop.
   */
  public setObjectStopOrder(comparer?: StageElementComparer<GameObject>): void {
    this.objectManager.setStopOrder(comparer);
  }

  /**
   * Returns the comparer function that tells the order in which the elements
   * should be stopped or `undefined` if such function doesn't exist.
   */
  public getObjectStopOrder(): StageElementComparer<GameObject> | undefined {
    return this.objectManager.getStopOrder();
  }

  /**
   * Loads the {@linkcode Resource}s that this {@linkcode Stage} uses.
   * @returns A `Promise` that resolves when this `Stage` is loaded.
   */
  public async load(): Promise<Array<Resource>> {
    const resources = new Array<Resource>();

    this.getObjects().forEach(async obj => {
      resources.push(...(await obj.load()));
    });

    this.loaded = true;

    return resources;
  }

  /**
   * @returns A `boolean` indicating if this {@linkcode Stage} is loaded.
   */
  public isLoaded(): boolean {
    return this.loaded;
  }

  /**
   * Defines what happens on the stage start and triggers the
   * {@linkcode onStart} method.
   */
  start(): void {
    this.objectManager.start();

    this.onStart();
  }

  /**
   * Defines what happens every frame to the stage before drawing it and
   * triggers the {@linkcode onUpdate} method.
   */
  update(): void {
    this.objectManager.update();

    this.onUpdate();
  }

  /**
   * Defines what this stage draws every frame after being updated and
   * triggers the {@linkcode onDraw} method.
   * @param ctx A Canvas rendering context with which to draw.
   */
  draw(ctx: CanvasRenderingContext2D): void {
    this.objectManager.draw(ctx);

    this.onDraw(ctx);
  }

  /**
   * Defines what happens on the stage stop and triggers the
   * {@linkcode onStop} method.
   */
  stop(): void {
    this.objectManager.stop();

    this.onStop();
  }

  onStart(): void {
    
  }

  onUpdate(): void {
    
  }

  onDraw(ctx: CanvasRenderingContext2D): void {
    
  }

  onStop(): void {
    
  }

}

export default Stage;
