import { StageElement } from "./stageElement.js";
import { ArgumentError } from "../errors/argumentError.js";
import { CallError } from "../errors/callError.js";

/**
 * This type defines a function that takes two stage elements and compares both,
 * returning a number representing the result.
 * 
 * A negative result means the `element1` should come before the `element2` and
 * a positive result means the `element1` should como after the `element2`,
 * while a `0` result means both of them can come in any order.
 */
export type StageElementComparer<E extends StageElement> = (element1: E, element2: E) => number;

/**
 * The `StageElementManager` class has useful methods for adding, removing and
 * organizing a group of stage elements.
 * 
 * It accepts a type parameter `E`, which indicates what type of stage element
 * it is going to manage.
 * 
 * @version 0.3.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class StageElementManager<E extends StageElement> {

  /**
   * This property stores all the elements this class manages.
   */
  private elements = new Array<E>();

  /**
   * The `elementStartComparer` property stores a comparer function that tells
   * the order in which the elements should be started.
   * 
   * It can also be `undefined`, meaning the elements should start in the
   * insertion order.
   * 
   * Note that setting this comparer is costlier than letting it `undefined`,
   * since when defined it makes a sort operation happen on the stage start.
   */
  private elementStartComparer?: StageElementComparer<E>;

  /**
   * The `elementUpdateComparer` property stores a comparer function that tells
   * the order in which the elements should be updated.
   * 
   * It can also be `undefined`, meaning the elements should update in the
   * insertion order.
   * 
   * Note that setting this comparer is costlier than letting it `undefined`,
   * since when defined it makes a sort operation happen on every stage update.
   */
  private elementUpdateComparer?: StageElementComparer<E>;

  /**
   * The `elementDrawComparer` property stores a comparer function that tells
   * the order in which the elements should be drawn.
   * 
   * It can also be `undefined`, meaning the elements should be drawn in the
   * insertion order.
   * 
   * Note that setting this comparer is costlier than letting it `undefined`,
   * since when defined it makes a sort operation happen on every stage drawing.
   */
  private elementDrawComparer?: StageElementComparer<E>;

  /**
   * The `elementStopComparer` property stores a comparer function that tells
   * the order in which the elements should be stopped.
   * 
   * It can also be `undefined`, meaning the elements should stop in the
   * insertion order.
   * 
   * Note that setting this comparer is costlier than letting it `undefined`,
   * since when defined it makes a sort operation happen on the stage stop.
   */
  private elementStopComparer?: StageElementComparer<E>;

  /**
   * Checks if a given index is valid.
   * That means it specifies a valid position where to insert an element from.
   * @param index The index to check.
   * @throws {ArgumentError} If the `index` is less than `0` or greater than the
   * amount of elements currently in this manager.
   */
  private checkAdditionIndex(index: number): void {
    if(index < 0 || index > this.getAmount()) {
      throw new ArgumentError(`index must be inside [0, ${this.getAmount()}] (received ${index})`);
    }
  }

  /**
   * This method adds an element to this manager in a given index, if it is
   * valid.
   * @param index The index where to add the element.
   * @param element The element to add.
   * @throws {ArgumentError} If the received `index` is invalid (doesn't
   * represent a valid position).
   */
  public add(index: number, element: E): void {
    this.checkAdditionIndex(index);

    this.elements.splice(index, 0, element);
  }

  /**
   * Adds an element to the start of the list of this manager.
   * @param element The element to add.
   */
  public addFirst(element: E): void {
    this.elements.unshift(element);
  }

  /**
   * Adds an element to the end of the list of this manager.
   * @param element The element to add.
   */
  public addLast(element: E): void {
    this.elements.push(element);
  }

  /**
   * Checks if a given index is valid.
   * That means it specifies a valid position where to access an element from.
   * @param index The index to check.
   * @throws {CallError} If there aren't any elements in this manager to access.
   * @throws {ArgumentError} If the `index` is less than `0` or greater or equal
   * to the amount of elements currently in this manager.
   */
  private checkAccessIndex(index: number): void {
    if(this.getAmount() === 0) {
      throw new CallError(`can't access element in empty manager`);
    }

    if(index < 0 || index >= this.getAmount()) {
      throw new ArgumentError(`index must be inside [0, ${this.getAmount()}[ (received ${index})`);
    }
  }

  /**
   * Removes an element from the given `index` if there is one.
   * If not, throws an error.
   * @param index The index from where to remove an element.
   * @returns The removed element.
   * @throws {CallError} If there are no elements in this manager.
   * @throws {ArgumentError} If the index doesn't specify a valid place from
   * where to remove an element.
   */
  public removeFrom(index: number): E {
    this.checkAccessIndex(index);

    return this.elements.splice(index, 1)[0];
  }

  /**
   * Removes an element (if it exists) from the list of elements of
   * this manager.
   * @param element The element to remove.
   * @returns A boolean indicating if the element was removed.
   */
  public remove(element: E): boolean {
    const elementIndex = this.getIndex(element);

    if(elementIndex === -1) return false;

    this.removeFrom(elementIndex);

    return true;
  }

  /**
   * Removes the first element of the list of elements of this manager if
   * it has any.
   * @returns The removed element, or `undefined` if no element was
   * removed.
   */
  public removeFirst(): E | undefined {
    return this.elements.shift();
  }

  /**
   * Removes the last element of the list of elements of this manager if
   * it has any.
   * @returns The removed element, or `undefined` if no element was
   * removed.
   */
  public removeLast(): E | undefined {
    return this.elements.pop();
  }

  /**
   * @returns The stage elements of this manager.
   */
  public getElements(): Array<E> {
    return this.elements;
  }

  /**
   * Returns the stage element that is specified by the passed `index` if
   * it exists, else, throws an error.
   * @param index The index where to get an element from.
   * @returns The element specified by the given `index`.
   * @throws {CallError} If there are no elements in this manager.
   * @throws {ArgumentError} If the received `index` doesn't specify a
   * valid stage element in this manager.
   */
  public getFrom(index: number): E {
    this.checkAccessIndex(index);
    
    return this.elements[index];
  }

  /**
   * Returns the index of the passed `element` if it exists in this manager,
   * else, returns `-1`;
   * @param element The element to look for the index of.
   * @returns The index of the given `element`.
   */
  public getIndex(element: E): number {
    return this.elements.indexOf(element);
  }

  /**
   * @returns The first element of this manager, or `undefined` if there are
   * no elements.
   */
  public getFirst(): E | undefined {
    return this.elements[0];
  }

  /**
   * @returns The last element of this manager, or `undefined` if there are
   * no elements.
   */
  public getLast(): E | undefined {
    return this.elements[this.getAmount() - 1];
  }

  /**
   * @returns The amount of elements in this manager.
   */
  public getAmount(): number {
    return this.elements.length;
  }

  /**
   * Accepts a comparer function that tells the order in which the elements
   * should be started.
   * 
   * If no `comparer` is received, the elements are started in the insertion
   * order.
   * 
   * Note that setting a start order makes starting the elements costlier
   * because a sort operation has to be made to make sure they attend to
   * that order.
   * @param comparer A function determining in what order the elements
   * of this manager should be iterated on the stage start.
   */
  public setStartOrder(comparer?: StageElementComparer<E>): void {
    this.elementStartComparer = comparer;
  }

  /**
   * Returns the comparer function that tells the order in which the elements
   * should be started or `undefined` if such function doesn't exist.
   */
  public getStartOrder(): StageElementComparer<E> | undefined {
    return this.elementStartComparer;
  }

  /**
   * Accepts a comparer function that tells the order in which the elements
   * should be updated.
   * 
   * If no `comparer` is received, the elements are updated in the insertion
   * order.
   * 
   * Note that setting an update order makes updating the elements costlier
   * because a sort operation has to be made every frame to make sure they
   * attend to that order.
   * @param comparer A function determining in what order the elements
   * of this manager should be iterated on the stage update.
   */
  public setUpdateOrder(comparer?: StageElementComparer<E>): void {
    this.elementUpdateComparer = comparer;
  }

  /**
   * Returns the comparer function that tells the order in which the elements
   * should be updated or `undefined` if such function doesn't exist.
   */
  public getUpdateOrder(): StageElementComparer<E> | undefined {
    return this.elementUpdateComparer;
  }

  /**
   * Accepts a comparer function that tells the order in which the elements
   * should be drawn.
   * 
   * If no `comparer` is received, the elements are drawn in the insertion
   * order.
   * 
   * Note that setting a draw order makes drawing the elements costlier
   * because a sort operation has to be made every frame to make sure they
   * attend to that order.
   * @param comparer A function determining in what order the elements
   * of this manager should be iterated on the stage draw.
   */
  public setDrawOrder(comparer?: StageElementComparer<E>): void {
    this.elementDrawComparer = comparer;
  }

  /**
   * Returns the comparer function that tells the order in which the elements
   * should be drawn or `undefined` if such function doesn't exist.
   */
  public getDrawOrder(): StageElementComparer<E> | undefined {
    return this.elementDrawComparer;
  }

  /**
   * Accepts a comparer function that tells the order in which the elements
   * should be stopped.
   * 
   * If no `comparer` is received, the elements are stopped in the insertion
   * order.
   * 
   * Note that setting a stop order makes stopping the elements costlier
   * because a sort operation has to be made to make sure they attend to
   * that order.
   * @param comparer A function determining in what order the elements
   * of this manager should be iterated on the stage stop.
   */
  public setStopOrder(comparer?: StageElementComparer<E>): void {
    this.elementStopComparer = comparer;
  }

  /**
   * Returns the comparer function that tells the order in which the elements
   * should be stopped or `undefined` if such function doesn't exist.
   */
  public getStopOrder(): StageElementComparer<E> | undefined {
    return this.elementStopComparer;
  }

  /**
   * Returns the elements of this manager sorted by a certain order.
   * @param comparer A function that specifies how the elements should
   * be sorted.
   * @returns The stage elements of this manager, but attending to the order
   * specified by the `comparer` parameter.
   */
  public getSortedElements(comparer: StageElementComparer<E>): Array<E> {
    const elementsClone = [ ...this.elements ];

    return elementsClone.sort(comparer);
  }

  /**
   * Starts all the elements in this manager following the predefined order.
   */
  public start(): void {
    let elements = this.elements;

    if(this.elementStartComparer !== undefined) {
      elements = this.getSortedElements(this.elementStartComparer);
    }

    elements.forEach(element => element.start());
  }

  /**
   * Updates all the elements in this manager following the predefined order.
   */
  public update(): void {
    let elements = this.elements;

    if(this.elementUpdateComparer !== undefined) {
      elements = this.getSortedElements(this.elementUpdateComparer);
    }

    elements.forEach(element => element.update());
  }

  /**
   * Draws all the elements in this manager following the predefined order.
   * @param ctx The canvas rendering context used for drawing the elements.
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    let elements = this.elements;

    if(this.elementDrawComparer !== undefined) {
      elements = this.getSortedElements(this.elementDrawComparer);
    }

    elements.forEach(element => element.draw(ctx));
  }

  /**
   * Stops all the elements in this manager following the predefined order.
   */
  public stop(): void {
    let elements = this.elements;

    if(this.elementStopComparer !== undefined) {
      elements = this.getSortedElements(this.elementStopComparer);
    }

    elements.forEach(element => element.stop());
  }

}

export default StageElementManager;
