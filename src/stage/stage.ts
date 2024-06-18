import { GameIterable } from "../main/gameIterable.js";
import {
  StageElementManager,
  StageElementComparer
} from "./stageElementManager.js";
import { GameObject } from "./gameObject.js";
import { Resource } from "../resources/resource.js";
import { Scenario } from "./scenario.js";
import { ArgumentError, CallError } from "../errors/index.js";

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
   * This property stores an instance of a `StageElementManager`, which provides
   * utilities for organizing the backgrounds of this stage.
   */
  private backgroundManager = new StageElementManager<Scenario>();

  /**
   * This property stores an instance of a `StageElementManager`, which provides
   * utilities for organizing the foreground of this stage.
   */
  private foregroundManager = new StageElementManager<Scenario>();

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
   * This method adds a background to this stage in a given index, if it is
   * valid.
   * @param index The index where to add the background.
   * @param background The background to add.
   * @throws {ArgumentError} If the received `index` is invalid (doesn't
   * represent a valid position).
   */
  public addBackground(index: number, background: Scenario): void {
    this.backgroundManager.add(index, background);
  }

  /**
   * This method adds a background as the first one of this stage.
   * @param background The background to add.
   */
  public addFirstBackground(background: Scenario): void {
    this.backgroundManager.addFirst(background);
  }

  /**
   * This method adds a background as the last one of this stage.
   * @param background The background to add.
   */
  public addLastBackground(background: Scenario): void {
    this.backgroundManager.addLast(background);
  }

  /**
   * Removes a background from the given `index` if there is one.
   * If not, throws an error.
   * @param index The index from where to remove a background.
   * @returns The removed background.
   * @throws {CallError} If there are no backgrounds to remove.
   * @throws {ArgumentError} If the index doesn't specify a valid place from
   * where to remove a background.
   */
  public removeBackgroundFrom(index: number): Scenario {
    return this.backgroundManager.removeFrom(index);
  }

  /**
   * Removes a background (if it exists) from the list of elements of
   * this manager.
   * @param element The background to remove.
   * @returns A boolean indicating if the background was removed.
   */
  public removeBackground(background: Scenario): boolean {
    return this.backgroundManager.remove(background);
  }

  /**
   * Removes the first background from the list of backgrounds of this stage if
   * it has any.
   * @returns The removed background, or `undefined` if no background was
   * removed.
   */
  public removeFirstBackground(): Scenario | undefined {
    return this.backgroundManager.removeFirst();
  }

  /**
   * Removes the last background from the list of backgrounds of this stage if
   * it has any.
   * @returns The removed background, or `undefined` if no background was
   * removed.
   */
  public removeLastBackground(): Scenario | undefined {
    return this.backgroundManager.removeLast();
  }

  /**
   * @returns The backgrounds added to this stage.
   */
  public getBackgrounds(): Array<Scenario> {
    return this.backgroundManager.getElements();
  }

  /**
   * Returns the background that is specified by the passed `index` if
   * it exists, else, throws an error.
   * @param index The index where to get a background from.
   * @returns The background specified by the given `index`.
   * @throws {CallError} If there are no backgrounds in this stage.
   * @throws {ArgumentError} If the received `index` doesn't specify a
   * background in this manager.
   */
  public getBackground(index: number): Scenario {
    return this.backgroundManager.getFrom(index);
  }

  /**
   * Returns the index of the passed background if it exists in this stage,
   * else, returns `-1`;
   * @param element The background to look for the index of.
   * @returns The index of the given `background`.
   */
  public getBackgroundIndex(background: Scenario): number {
    return this.backgroundManager.getIndex(background);
  }

  /**
   * @returns The first background added to this stage.
   */
  public getFirstBackground(): Scenario | undefined {
    return this.backgroundManager.getFirst();
  }

  /**
   * @returns The last background added to this stage.
   */
  public getLastBackground(): Scenario | undefined {
    return this.backgroundManager.getLast();
  }

  /**
   * @returns The amount of background added to this stage.
   */
  public getBackgroundAmount(): number {
    return this.backgroundManager.getAmount();
  }

  /**
   * Accepts a comparer function that tells the order in which the background
   * of this stage should be started.
   * 
   * If no `comparer` is received, the backgrounds are started in the insertion
   * order.
   * 
   * Note that setting a start order makes starting the backgrounds costlier
   * because a sort operation has to be made to make sure they attend to
   * that order.
   * @param comparer A function determining in what order the backgrounds
   * of this stage should be iterated on its start.
   */
  public setBackgroundStartOrder(comparer?: StageElementComparer<Scenario>): void {
    this.backgroundManager.setStartOrder(comparer);
  }

  /**
   * Returns the comparer function that tells the order in which the backgrounds
   * should be started or `undefined` if such function doesn't exist.
   */
  public getBackgroundStartOrder(): StageElementComparer<Scenario> | undefined {
    return this.backgroundManager.getStartOrder();
  }

  /**
   * Accepts a comparer function that tells the order in which the backgrounds
   * of this stage should be updated.
   * 
   * If no `comparer` is received, the backgrounds are updated in the insertion
   * order.
   * 
   * Note that setting an update order makes starting the backgrounds costlier
   * because a sort operation has to be made to make sure they attend to
   * that order every frame.
   * @param comparer A function determining in what order the backgrounds
   * of this stage should be iterated on its update.
   */
  public setBackgroundUpdateOrder(comparer?: StageElementComparer<Scenario>): void {
    this.backgroundManager.setUpdateOrder(comparer);
  }

  /**
   * Returns the comparer function that tells the order in which the backgrounds
   * should be updated or `undefined` if such function doesn't exist.
   */
  public getBackgroundUpdateOrder(): StageElementComparer<Scenario> | undefined {
    return this.backgroundManager.getUpdateOrder();
  }

  /**
   * Accepts a comparer function that tells the order in which the backgrounds
   * of this stage should be drawn.
   * 
   * If no `comparer` is received, the backgrounds are drawn in the insertion
   * order.
   * 
   * Note that setting a draw order makes starting the backgrounds costlier
   * because a sort operation has to be made to make sure they attend to
   * that order every frame.
   * @param comparer A function determining in what order the backgrounds
   * of this stage should be iterated on its draw.
   */
  public setBackgroundDrawOrder(comparer?: StageElementComparer<Scenario>): void {
    this.backgroundManager.setDrawOrder(comparer);
  }

  /**
   * Returns the comparer function that tells the order in which the backgrounds
   * should be drawn or `undefined` if such function doesn't exist.
   */
  public getBackgroundDrawOrder(): StageElementComparer<Scenario> | undefined {
    return this.backgroundManager.getDrawOrder();
  }

  /**
   * Accepts a comparer function that tells the order in which the backgrounds
   * of this stage should be stopped.
   * 
   * If no `comparer` is received, the backgrounds are stopped in the insertion
   * order.
   * 
   * Note that setting a stop order makes starting the backgrounds costlier
   * because a sort operation has to be made to make sure they attend to
   * that order.
   * @param comparer A function determining in what order the backgrounds
   * of this stage should be iterated on its stop.
   */
  public setBackgroundStopOrder(comparer?: StageElementComparer<Scenario>): void {
    this.backgroundManager.setStopOrder(comparer);
  }

  /**
   * Returns the comparer function that tells the order in which the backgrounds
   * should be stopped or `undefined` if such function doesn't exist.
   */
  public getBackgroundStopOrder(): StageElementComparer<Scenario> | undefined {
    return this.backgroundManager.getStopOrder();
  }

  /**
   * This method adds a foreground to this stage in a given index, if it is
   * valid.
   * @param index The index where to add the foreground.
   * @param foreground The foreground to add.
   * @throws {ArgumentError} If the received `index` is invalid (doesn't
   * represent a valid position).
   */
  public addForeground(index: number, foreground: Scenario): void {
    this.foregroundManager.add(index, foreground);
  }

  /**
   * This method adds a foreground as the first one of this stage.
   * @param foreground The foreground to add.
   */
  public addFirstForeground(foreground: Scenario): void {
    this.foregroundManager.addFirst(foreground);
  }

  /**
   * This method adds a foreground as the last one of this stage.
   * @param foreground The foreground to add.
   */
  public addLastForeground(foreground: Scenario): void {
    this.foregroundManager.addLast(foreground);
  }

  /**
   * Removes a foreground from the given `index` if there is one.
   * If not, throws an error.
   * @param index The index from where to remove a foreground.
   * @returns The removed foreground.
   * @throws {CallError} If there are no foregrounds to remove.
   * @throws {ArgumentError} If the index doesn't specify a valid place from
   * where to remove a foreground.
   */
  public removeForegroundFrom(index: number): Scenario {
    return this.foregroundManager.removeFrom(index);
  }

  /**
   * Removes a foreground (if it exists) from the list of elements of
   * this manager.
   * @param element The foreground to remove.
   * @returns A boolean indicating if the foreground was removed.
   */
  public removeForeground(foreground: Scenario): boolean {
    return this.foregroundManager.remove(foreground);
  }

  /**
   * Removes the first foreground from the list of foregrounds of this stage if
   * it has any.
   * @returns The removed foreground, or `undefined` if no foreground was
   * removed.
   */
  public removeFirstForeground(): Scenario | undefined {
    return this.foregroundManager.removeFirst();
  }

  /**
   * Removes the last foreground from the list of foregrounds of this stage if
   * it has any.
   * @returns The removed foreground, or `undefined` if no foreground was
   * removed.
   */
  public removeLastForeground(): Scenario | undefined {
    return this.foregroundManager.removeLast();
  }

  /**
   * @returns The foregrounds added to this stage.
   */
  public getForegrounds(): Array<Scenario> {
    return this.foregroundManager.getElements();
  }

  /**
   * Returns the foreground that is specified by the passed `index` if
   * it exists, else, throws an error.
   * @param index The index where to get a foreground from.
   * @returns The foreground specified by the given `index`.
   * @throws {CallError} If there are no foregrounds in this stage.
   * @throws {ArgumentError} If the received `index` doesn't specify a
   * foreground in this manager.
   */
  public getForeground(index: number): Scenario {
    return this.foregroundManager.getFrom(index);
  }

  /**
   * Returns the index of the passed foreground if it exists in this stage,
   * else, returns `-1`;
   * @param element The foreground to look for the index of.
   * @returns The index of the given `foreground`.
   */
  public getForegroundIndex(foreground: Scenario): number {
    return this.foregroundManager.getIndex(foreground);
  }

  /**
   * @returns The first foreground added to this stage.
   */
  public getFirstForeground(): Scenario | undefined {
    return this.foregroundManager.getFirst();
  }

  /**
   * @returns The last foreground added to this stage.
   */
  public getLastForeground(): Scenario | undefined {
    return this.foregroundManager.getLast();
  }

  /**
   * @returns The amount of foreground added to this stage.
   */
  public getForegroundAmount(): number {
    return this.foregroundManager.getAmount();
  }

  /**
   * Accepts a comparer function that tells the order in which the foreground
   * of this stage should be started.
   * 
   * If no `comparer` is received, the foregrounds are started in the insertion
   * order.
   * 
   * Note that setting a start order makes starting the foregrounds costlier
   * because a sort operation has to be made to make sure they attend to
   * that order.
   * @param comparer A function determining in what order the foregrounds
   * of this stage should be iterated on its start.
   */
  public setForegroundStartOrder(comparer?: StageElementComparer<Scenario>): void {
    this.foregroundManager.setStartOrder(comparer);
  }

  /**
   * Returns the comparer function that tells the order in which the foregrounds
   * should be started or `undefined` if such function doesn't exist.
   */
  public getForegroundStartOrder(): StageElementComparer<Scenario> | undefined {
    return this.foregroundManager.getStartOrder();
  }

  /**
   * Accepts a comparer function that tells the order in which the foregrounds
   * of this stage should be updated.
   * 
   * If no `comparer` is received, the foregrounds are updated in the insertion
   * order.
   * 
   * Note that setting an update order makes starting the foregrounds costlier
   * because a sort operation has to be made to make sure they attend to
   * that order every frame.
   * @param comparer A function determining in what order the foregrounds
   * of this stage should be iterated on its update.
   */
  public setForegroundUpdateOrder(comparer?: StageElementComparer<Scenario>): void {
    this.foregroundManager.setUpdateOrder(comparer);
  }

  /**
   * Returns the comparer function that tells the order in which the foregrounds
   * should be updated or `undefined` if such function doesn't exist.
   */
  public getForegroundUpdateOrder(): StageElementComparer<Scenario> | undefined {
    return this.foregroundManager.getUpdateOrder();
  }

  /**
   * Accepts a comparer function that tells the order in which the foregrounds
   * of this stage should be drawn.
   * 
   * If no `comparer` is received, the foregrounds are drawn in the insertion
   * order.
   * 
   * Note that setting a draw order makes starting the foregrounds costlier
   * because a sort operation has to be made to make sure they attend to
   * that order every frame.
   * @param comparer A function determining in what order the foregrounds
   * of this stage should be iterated on its draw.
   */
  public setForegroundDrawOrder(comparer?: StageElementComparer<Scenario>): void {
    this.foregroundManager.setDrawOrder(comparer);
  }

  /**
   * Returns the comparer function that tells the order in which the foregrounds
   * should be drawn or `undefined` if such function doesn't exist.
   */
  public getForegroundDrawOrder(): StageElementComparer<Scenario> | undefined {
    return this.foregroundManager.getDrawOrder();
  }

  /**
   * Accepts a comparer function that tells the order in which the foregrounds
   * of this stage should be stopped.
   * 
   * If no `comparer` is received, the foregrounds are stopped in the insertion
   * order.
   * 
   * Note that setting a stop order makes starting the foregrounds costlier
   * because a sort operation has to be made to make sure they attend to
   * that order.
   * @param comparer A function determining in what order the foregrounds
   * of this stage should be iterated on its stop.
   */
  public setForegroundStopOrder(comparer?: StageElementComparer<Scenario>): void {
    this.foregroundManager.setStopOrder(comparer);
  }

  /**
   * Returns the comparer function that tells the order in which the foregrounds
   * should be stopped or `undefined` if such function doesn't exist.
   */
  public getForegroundStopOrder(): StageElementComparer<Scenario> | undefined {
    return this.foregroundManager.getStopOrder();
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
