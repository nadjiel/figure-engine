import { GameIterable } from "../main/gameIterable.js";
import {
  StageElementManager,
  StageElementComparer
} from "./stageElementManager.js";
import { GameObject } from "./gameObject.js";

export class Stage implements GameIterable {

  private objectManager = new StageElementManager<GameObject>();

  public addObject(index: number, object: GameObject): void {
    this.objectManager.add(index, object);
  }

  public addFirstObject(object: GameObject): void {
    this.objectManager.addFirst(object);
  }

  public addLastObject(object: GameObject): void {
    this.objectManager.addLast(object);
  }

  public removeObjectFrom(index: number): GameObject {
    return this.objectManager.removeFrom(index);
  }

  public removeObject(object: GameObject): boolean {
    return this.objectManager.remove(object);
  }

  public removeFirstObject(): GameObject | undefined {
    return this.objectManager.removeFirst();
  }

  public removeLastObject(): GameObject | undefined {
    return this.objectManager.removeLast();
  }

  public getObjects(): Array<GameObject> {
    return this.objectManager.getElements();
  }

  public getObject(index: number): GameObject {
    return this.objectManager.getFrom(index);
  }

  public getObjectIndex(object: GameObject): number {
    return this.objectManager.getIndex(object);
  }

  public getFirstObject(): GameObject | undefined {
    return this.objectManager.getFirst();
  }

  public getLastObject(): GameObject | undefined {
    return this.objectManager.getLast();
  }

  public getObjectAmount(): number {
    return this.objectManager.getAmount();
  }

  public setObjectStartOrder(comparer?: StageElementComparer<GameObject>): void {
    this.objectManager.setStartOrder(comparer);
  }

  public getObjectStartOrder(): StageElementComparer<GameObject> | undefined {
    return this.objectManager.getStartOrder();
  }

  public setObjectUpdateOrder(comparer?: StageElementComparer<GameObject>): void {
    this.objectManager.setUpdateOrder(comparer);
  }

  public getObjectUpdateOrder(): StageElementComparer<GameObject> | undefined {
    return this.objectManager.getUpdateOrder();
  }

  public setObjectDrawOrder(comparer?: StageElementComparer<GameObject>): void {
    this.objectManager.setDrawOrder(comparer);
  }

  public getObjectDrawOrder(): StageElementComparer<GameObject> | undefined {
    return this.objectManager.getDrawOrder();
  }

  public setObjectStopOrder(comparer?: StageElementComparer<GameObject>): void {
    this.objectManager.setStopOrder(comparer);
  }

  public getObjectStopOrder(): StageElementComparer<GameObject> | undefined {
    return this.objectManager.getStopOrder();
  }

  start(): void {
    this.objectManager.start();

    this.onStart();
  }

  update(): void {
    this.objectManager.update();

    this.onUpdate();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.objectManager.draw(ctx);

    this.onDraw(ctx);
  }

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
