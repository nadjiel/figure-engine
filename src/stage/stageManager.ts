import { Sequence } from "../util/sequence.js";
import { Stage } from "./stage.js";
import { ArgumentError } from "../errors/argumentError.js";
import { CallError } from "../errors/callError.js";

/**
 * The `StageManager` class comprehends the functionality that allows the
 * addition and removal of stages and the selection of any one of them per time.
 * 
 * @version 0.3.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class StageManager {

  /**
   * This property stores the sequence of stages that are managed by this
   * class.
   */
  private stages = new Sequence<Stage>();

  /**
   * This property stores the index of the currently selected stage in the
   * sequence of stages this manager has. If no stage is selected, this property
   * is `undefined`.
   */
  private selected?: number;

  /**
   * This method adds a `stage` to this manager in a given `index`, if it is
   * valid.
   * @param index The index where to add the stage.
   * @param stage The stage to add.
   * @throws {ArgumentError} If the received `index` is invalid (doesn't
   * represent a valid position).
   */
  public add(index: number, stage: Stage): void {
    this.stages.add(index, stage);
  }

  /**
   * Adds a stage to the start of this manager.
   * @param stage The stage to add.
   */
  public addFirst(stage: Stage): void {
    this.stages.addFirst(stage);
  }

  /**
   * Adds a stage to the end of this manager.
   * @param stage The stage to add.
   */
  public addLast(stage: Stage): void {
    this.stages.addLast(stage);
  }

  /**
   * Removes a stage from the given `index` if there is one.
   * If not, throws an error.
   * @param index The index from where to remove a stage.
   * @returns The removed stage.
   * @throws {CallError} If there are no stages in this manager.
   * @throws {ArgumentError} If the `index` doesn't specify a valid place from
   * where to remove a stage.
   */
  public removeFrom(index: number): Stage {
    return this.stages.removeFrom(index);
  }

  /**
   * Removes a `stage` (if it exists) from this manager.
   * @param stage The stage to remove.
   * @returns A boolean indicating if the stage was removed.
   */
  public remove(stage: Stage): boolean {
    return this.stages.remove(stage);
  }

  /**
   * Removes the first stage of this manager if it has any.
   * @returns The removed stage, or `undefined` if no stage was
   * removed.
   */
  public removeFirst(): Stage | undefined {
    return this.stages.removeFirst();
  }

  /**
   * Removes the last stage of this manager if it has any.
   * @returns The removed stage, or `undefined` if no stage was
   * removed.
   */
  public removeLast(): Stage | undefined {
    return this.stages.removeLast();
  }

  /**
   * Removes all the stages of this manager and returns them.
   * @returns All the former stages of this manager.
   */
  public removeAll(): Array<Stage> {
    return this.stages.removeAll();
  }

  /**
   * @returns The stages of this manager.
   */
  public getStages(): Array<Stage> {
    return this.stages.getElements();
  }

  /**
   * Returns the stage specified by the passed `index` if it exists, else,
   * throws an error.
   * @param index The index where to get a stage from.
   * @returns The stage specified by the given `index`.
   * @throws {CallError} If there are no stages in this manager.
   * @throws {ArgumentError} If the received `index` doesn't specify a
   * valid stage in this manager.
   */
  public getFrom(index: number): Stage {
    return this.stages.getFrom(index);
  }

  /**
   * Returns the index of the passed `stage` if it exists in this manager,
   * else, returns `-1`;
   * @param stage The stage to look for the index of.
   * @returns The index of the given `stage`.
   */
  public getIndex(stage: Stage): number {
    return this.stages.getIndex(stage);
  }

  /**
   * @returns The first stage of this manager or `undefined` if there are
   * no stages.
   */
  public getFirst(): Stage | undefined {
    return this.stages.getFirst();
  }

  /**
   * @returns The last stage of this manager or `undefined` if there are
   * no stages.
   */
  public getLast(): Stage | undefined {
    return this.stages.getLast();
  }

  /**
   * @returns The amount of stages in this manager.
   */
  public getAmount(): number {
    return this.stages.getAmount();
  }

  /**
   * This method selects and returns the stage specified by the given `index`,
   * if there is one, if not throws an error.
   * 
   * If the `index` corresponds to the stage that is already selected, this
   * method just returns that stage.
   * 
   * When executed, this method will trigger the `stop` of the previously
   * selected stage (if there was one) and the `start` of the new one.
   * @param index The index of the stage to select.
   * @returns The new selected stage.
   * @throws {CallError} If there aren't any stages in this manager to select
   * from.
   * @throws {ArgumentError} If the received `index` doesn't correspond to any
   * stages stored in this manager.
   */
  public select(index: number): Stage {
    const selectedStage = this.getSelectedStage();
    
    if(index === this.getSelectedIndex()) return selectedStage!;

    const newStage = this.getFrom(index);

    if(selectedStage !== undefined) selectedStage.stop();

    this.selected = index;

    newStage.start();

    return newStage;
  }

  /**
   * This method selects the next stage in the list of stages relative to the
   * currently selected one.
   * 
   * If there is no next stage, that is, the current one is the last of the
   * list, an error is thrown.
   * And if there are no stages selected currently, this method selects the
   * first of the list.
   * 
   * When executed, this method will trigger the `stop` of the previously
   * selected stage (if there was one) and the `start` of the new one.
   * @returns The new selected stage.
   * @throws {CallError} If there aren't any stages in this manager to select
   * from or if the current stage is already the last of the list.
   */
  public selectNext(): Stage {
    if(this.getSelectedIndex() === this.getAmount() - 1) {
      throw new CallError(`can't select next stage from last one`);
    }

    if(this.selected === undefined) {
      return this.select(0);
    }

    return this.select(this.selected + 1);
  }

  /**
   * This method selects the previous stage in the list of stages relative to
   * the currently selected one.
   * 
   * If there is no previous stage, that is, the current one is the first of the
   * list, an error is thrown.
   * And if there are no stages selected currently, this method selects the
   * last of the list.
   * 
   * When executed, this method will trigger the `stop` of the previously
   * selected stage (if there was one) and the `start` of the new one.
   * @returns The new selected stage.
   * @throws {CallError} If there aren't any stages in this manager to select
   * from or if the current stage is already the first of the list.
   */
  public selectPrevious(): Stage {
    if(this.getSelectedIndex() === 0) {
      throw new CallError(`can't select previous stage from first one`);
    }

    if(this.selected === undefined) {
      return this.select(this.getAmount() - 1);
    }

    return this.select(this.selected - 1);
  }

  /**
   * @returns The index of the currently selected stage or `undefined` if no
   * stage is selected.
   */
  public getSelectedIndex(): number | undefined {
    return this.selected;
  }

  /**
   * @returns The currently selected stage or `undefined` if no
   * stage is selected.
   */
  public getSelectedStage(): Stage | undefined {
    if(this.selected === undefined) return undefined;

    return this.getFrom(this.selected);
  }

}

export default StageManager;
