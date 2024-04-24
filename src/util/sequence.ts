import { ArgumentError } from "../errors/argumentError.js";
import { CallError } from "../errors/callError.js";

/**
 * The `Sequence` class represents a list of items that can only be arranged
 * contiguously, different from a common array that allows you to append
 * elements with "gaps" between them.
 * 
 * @version 0.3.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class Sequence<T> {

  /**
   * This property stores all the elements of this sequence.
   */
  private elements = new Array<T>();

  /**
   * Checks if a given index is valid.
   * That means it specifies a valid position where to insert an element.
   * @param index The index to check.
   * @throws {ArgumentError} If the `index` is less than `0` or greater than the
   * amount of elements currently in this sequence.
   */
  private checkAdditionIndex(index: number): void {
    if(index < 0 || index > this.getAmount()) {
      throw new ArgumentError(`index must be inside [0, ${this.getAmount()}] (received ${index})`);
    }
  }

  /**
   * This method adds an element to this sequence in a given index, if it is
   * valid.
   * @param index The index where to add the element.
   * @param element The element to add.
   * @throws {ArgumentError} If the received `index` is invalid (doesn't
   * represent a valid position).
   */
  public add(index: number, element: T): void {
    this.checkAdditionIndex(index);

    this.elements.splice(index, 0, element);
  }

  /**
   * Adds an element to the start of this sequence.
   * @param element The element to add.
   */
  public addFirst(element: T): void {
    this.elements.unshift(element);
  }

  /**
   * Adds an element to the end of this sequence.
   * @param element The element to add.
   */
  public addLast(element: T): void {
    this.elements.push(element);
  }

  /**
   * Checks if a given index is valid.
   * That means it specifies a valid position where to access an element from.
   * @param index The index to check.
   * @throws {CallError} If there aren't any elements in this sequence to access.
   * @throws {ArgumentError} If the `index` is less than `0` or greater or equal
   * to the amount of elements currently in this sequence.
   */
  private checkAccessIndex(index: number): void {
    if(this.getAmount() === 0) {
      throw new CallError(`can't access element from empty sequence`);
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
   * @throws {CallError} If there are no elements in this sequence.
   * @throws {ArgumentError} If the index doesn't specify a valid place from
   * where to remove an element.
   */
  public removeFrom(index: number): T {
    this.checkAccessIndex(index);

    return this.elements.splice(index, 1)[0];
  }

  /**
   * Removes an element (if it exists) from this sequence.
   * @param element The element to remove.
   * @returns A boolean indicating if the element was removed.
   */
  public remove(element: T): boolean {
    const elementIndex = this.getIndex(element);

    if(elementIndex === -1) return false;

    this.removeFrom(elementIndex);

    return true;
  }

  /**
   * Removes the first element of this sequence if it has any.
   * @returns The removed element, or `undefined` if no element was
   * removed.
   */
  public removeFirst(): T | undefined {
    return this.elements.shift();
  }

  /**
   * Removes the last element of this sequence if it has any.
   * @returns The removed element, or `undefined` if no element was
   * removed.
   */
  public removeLast(): T | undefined {
    return this.elements.pop();
  }

  /**
   * Removes all the elements of this sequence and returns them.
   * @returns All the former elements of this sequence.
   */
  public removeAll(): Array<T> {
    return this.elements.splice(0);
  }

  /**
   * This method returns the elements of this sequence in a clone array, which
   * is not the one used to store them.
   * @returns The elements of this sequence.
   */
  public getElements(): Array<T> {
    return [ ...this.elements ];
  }

  /**
   * Returns the element specified by the passed `index` if it exists, else,
   * throws an error.
   * @param index The index where to get an element from.
   * @returns The element specified by the given `index`.
   * @throws {CallError} If there are no elements in this sequence.
   * @throws {ArgumentError} If the received `index` doesn't specify a
   * valid element in this sequence.
   */
  public getFrom(index: number): T {
    this.checkAccessIndex(index);
    
    return this.elements[index];
  }

  /**
   * Returns the index of the passed `element` if it exists in this sequence,
   * else, returns `-1`;
   * @param element The element to look for the index of.
   * @returns The index of the given `element`.
   */
  public getIndex(element: T): number {
    return this.elements.indexOf(element);
  }

  /**
   * @returns The first element of this sequence or `undefined` if there are
   * no elements.
   */
  public getFirst(): T | undefined {
    return this.elements[0];
  }

  /**
   * @returns The last element of this sequence or `undefined` if there are
   * no elements.
   */
  public getLast(): T | undefined {
    return this.elements[this.getAmount() - 1];
  }

  /**
   * @returns The amount of elements in this sequence.
   */
  public getAmount(): number {
    return this.elements.length;
  }

}

export default Sequence;
