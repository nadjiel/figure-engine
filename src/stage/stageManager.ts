import { Sequence } from "../util/sequence.js";
import { Stage } from "./stage.js";

/**
 * The `StageManager` class comprehends the functionality that allows the
 * addition and removal of stages and the selection of any one of them per time.
 * 
 * @version 0.3.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class StageManager {

  private stages = new Sequence<Stage>();

  private selected?: number;

  public add(index: number, stage: Stage): void {
    this.stages.add(index, stage);
  }

  public addFirst(stage: Stage): void {
    this.stages.addFirst(stage);
  }

  public addLast(stage: Stage): void {
    this.stages.addLast(stage);
  }

  public removeFrom(index: number): Stage {
    return this.stages.removeFrom(index);
  }

  public remove(stage: Stage): boolean {
    return this.stages.remove(stage);
  }

  public removeFirst(): Stage | undefined {
    return this.stages.removeFirst();
  }

  public removeLast(): Stage | undefined {
    return this.stages.removeLast();
  }

  public removeAll(): Array<Stage> {
    return this.stages.removeAll();
  }

  public getStages(): Array<Stage> {
    return this.stages.getElements();
  }

  public getFrom(index: number): Stage {
    return this.stages.getFrom(index);
  }

  public getIndex(stage: Stage): number {
    return this.stages.getIndex(stage);
  }

  public getFirst(): Stage | undefined {
    return this.stages.getFirst();
  }

  public getLast(): Stage | undefined {
    return this.stages.getLast();
  }

  public getAmount(): number {
    return this.stages.getAmount();
  }

  public select(index: number): Stage {
    const stage = this.stages.getFrom(index);

    this.selected = index;

    return stage;
  }

  public selectNext(): Stage {
    if(this.selected === undefined) {
      return this.select(0);
    }

    return this.select(this.selected + 1);
  }

  public selectPrevious(): Stage {
    if(this.selected === undefined) {
      return this.select(this.getAmount() - 1);
    }

    return this.select(this.selected - 1);
  }

  public getSelectedIndex(): number | undefined {
    return this.selected;
  }

  public getSelectedStage(): Stage | undefined {
    if(this.selected === undefined) return undefined;

    return this.stages.getFrom(this.selected);
  }

}

export default StageManager;
