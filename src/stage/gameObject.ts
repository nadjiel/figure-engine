import { StageElement } from "./stageElement.js";
import { Rectangle } from "../spatial/rectangle.js";
import { Color, ColorFactory } from "../graphical/color.js";
import { Vector2 } from "../spatial/vector2.js";
import { Resource } from "../resources/resource.js";
import { Sprite } from "../resources/sprite.js";
import { ResourceManager } from "../resources/resourceManager.js";
import { ResourceError } from "../errors/resourceError.js";
import { Game } from "../main/game.js";

/**
 * The `GameObject` class allows the creation and customization
 * of objects for the game.
 * These objects generally represent visual things in the game space,
 * such as the player, or enemies, but are not limited to that and
 * can be used to represent other things depending on your objective.
 * 
 * This class is meant to be extended so
 * that you can describe the custom behavior of your object. 
 * 
 * @version 0.3.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export abstract class GameObject implements StageElement {

  /**
   * The resources that this `GameObject` is able to use thanks to the
   * {@linkcode usesResource} method. 
   */
  private resources = new Array<Resource>();
  
  /**
   * The `Sprite` of this `GameObject`.
   */
  private sprite?: Sprite;

  /**
   * This property represents the area that this game object occupies
   * in the game space.
   */
  private boundingBox: Rectangle;

  /**
   * This property stores the color that is used to paint the object on
   * the game canvas.
   * 
   * This is helpful for debug when you don't have set a sprite for the object
   * yet and is initially set to no color so that you adjust it to your
   * preference.
   */
  private color = ColorFactory.createTransparent();

  /**
   * @param coordinates The coordinates of this object in the game space.
   * @param dimensions The dimensions of this object in the game space.
   * @param sprite The sprite of this object that will be drawn on the game.
   */
  constructor(coordinates: Vector2, dimensions: Vector2, sprite?: Sprite) {
    this.boundingBox = new Rectangle(coordinates, dimensions);
    this.sprite = sprite;
  }

  /**
   * @returns A rectangle representing the area that this object occupies in
   * the game space.
   */
  public getBoundingBox(): Rectangle {
    return this.boundingBox;
  }

  public setX(x: number): void {
    this.boundingBox.setX(x);
  }

  public getX(): number {
    return this.boundingBox.getX();
  }

  public setY(y: number): void {
    this.boundingBox.setY(y);
  }

  public getY(): number {
    return this.boundingBox.getY();
  }

  public setCoordinates(coordinates: Vector2): void {
    this.boundingBox.setCoordinates(coordinates);
  }

  public getCoordinates(): Vector2 {
    return this.boundingBox.getCoordinates();
  }

  /**
   * Sets the width of this game object.
   * 
   * If the width passed is negative, an error is thrown.
   * @param width The width to set.
   * @throws {ArgumentError} If the given `width` is invalid.
   */
  public setWidth(width: number): void {
    this.boundingBox.setWidth(width);
  }

  public getWidth(): number {
    return this.boundingBox.getWidth();
  }

  /**
   * Sets the height of this game object.
   * 
   * If the height passed is negative, an error is thrown.
   * @param height The height to set.
   * @throws {ArgumentError} If the given `height` is invalid.
   */
  public setHeight(height: number): void {
    this.boundingBox.setHeight(height);
  }

  public getHeight(): number {
    return this.boundingBox.getHeight();
  }

  /**
   * Sets the dimensions of this game object.
   * 
   * If any of the dimensions passed are negative, an error is thrown.
   * @param dimensions A 2D vector with width and height values.
   * @throws {ArgumentError} If any of the given dimensions is invalid.
   */
  public setDimensions(dimensions: Vector2): void {
    this.boundingBox.setDimensions(dimensions);
  }

  public getDimensions(): Vector2 {
    return this.boundingBox.getDimensions();
  }

  public getApparentCoordinates(): Vector2 {
    const coords = this.getCoordinates();

    const game = Game.getInstance();
    if(game === undefined) return coords;

    const stage = game.getSelectedStage();
    if(stage === undefined) return coords;

    const cameraCoords = stage.getCamera().getCoordinates();

    return coords.minus(cameraCoords);
  }

  public setColor(color: Color): void {
    this.color = color;
  }

  public getColor(): Color {
    return this.color;
  }

  public setSprite(sprite: Sprite): void {
    this.sprite = sprite;
  }

  public getSprite(): Sprite | undefined {
    return this.sprite;
  }

  /**
   * This method is executed on the start of the stage this object is in.
   * 
   * It triggers the {@linkcode onStart} method, which you can use to define
   * what happens to this object once its stage starts.
   */
  public start(): void {
    this.onStart();
  }

  /**
   * The `update` method is executed every frame before the {@linkcode draw}
   * method.
   * 
   * It triggers the {@linkcode onUpdate} method, which you can use to define
   * what happens to this object every frame.
   */
  public update(): void {
    this.onUpdate();
  }

  /**
   * The `draw` method is executed every frame after the {@linkcode update}
   * method.
   * 
   * It draws the bounding box of this `GameObject` using the defined
   * {@linkcode Color} and its {@linkcode Sprite} on top of it.
   * 
   * It triggers the {@linkcode onDraw} method, which you can use to define
   * what this game object draws.
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    const apparentCoords = this.getApparentCoordinates();

    ctx.fillStyle = this.color.toString();
    ctx.fillRect(
      apparentCoords.getX(), apparentCoords.getY(),
      this.getWidth(), this.getHeight()
    );

    if(this.sprite !== undefined) {
      const scale = new Vector2(
        this.getWidth() / this.sprite.getImageFrameWidth(),
        this.getHeight() / this.sprite.getImageFrameHeight()
      );

      this.sprite.draw(
        ctx,
        apparentCoords,
        scale
      );
    }

    this.onDraw(ctx);
  }

  /**
   * This method is executed on the stop of the stage this object is in.
   * 
   * It triggers the {@linkcode onStop} method, which you can use to define
   * what happens to this object once its stage stops.
   */
  public stop(): void {
    this.onStop();
  }

  /**
   * This method marks a certain {@linkcode Resource} as used by this
   * {@linkcode GameObject}, which means that when this `GameObject` loads
   * itself that `Resource` must be loaded as well, so it can be used.
   * @param name The name of the `Resource` this `GameObject` uses.
   */
  public usesResource(name: string): void {
    const resource = ResourceManager.getResource(name);

    if(resource === undefined) throw new ResourceError(
      `The resource ${name} isn't registered in the ResourceManager`
    );

    this.resources.push(resource);
  }

  /**
   * Loads all the {@linkcode Resource}s that this {@linkcode GameObject}
   * will need according to what was set with the {@linkcode usesResource}
   * method.
   * @returns A `Promise` that resolves with an `Array` of `Resource`s once
   * they are loaded.
   */
  public async load(): Promise<Array<Resource>> {
    const loadPromises = new Array<Promise<Resource>>();

    this.resources.forEach(resource => {
      loadPromises.push(resource.load());
    });

    return Promise.all(loadPromises);
  }

  /**
   * @returns An `Array` with the {@linkcode Resource}s this
   * {@linkcode GameObject} uses according to what was set with the
   * {@linkcode usesResource} method.
   */
  public getResources(): Array<Resource> {
    return this.resources;
  }

  /**
   * This method allows you to define what happens to this object when its
   * stage starts.
   */
  public abstract onStart(): void;

  /**
   * This method allows you to define what happens to this object every frame
   * before its drawing.
   */
  public abstract onUpdate(): void;

  /**
   * This method allows you to define what this object draws every frame after
   * being updated.
   */
  public abstract onDraw(ctx: CanvasRenderingContext2D): void;

  /**
   * This method allows you to define what happens to this object when its
   * stage stops.
   */
  public abstract onStop(): void;

}

export default GameObject;
