import { Resource } from "./resource.js";
import { ImageResource } from "./imageResource.js";
import { SoundResource } from "./soundResource.js";

/**
 * The `ResourceManager` class allows managing and loading `Resource`s.
 * 
 * @version 0.4.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export class ResourceManager {

  /**
   * This property stores a `Map` that stores the names and values of the
   * registered `Resource`s.
   */
  private static resources = new Map<string, Resource>();

  /**
   * Adds a `Resource` with a given `name` to this `ResourceManager`.
   * @param name The name to register to this `Resource`.
   * @param resource The `Resource` to store.
   */
  public static addResource(name: string, resource: Resource): void {
    ResourceManager.resources.set(name, resource);
  }

  /**
   * Removes a `Resource` specified by the given `name` from this
   * `ResourceManager`.
   * @param name The name of the `Resource` to remove.
   * @returns The removed `Resource`.
   */
  public static removeResource(name: string): boolean {
    return ResourceManager.resources.delete(name);
  }

  public static removeAllResources(): void {
    const resourceNames = ResourceManager.resources.keys();

    for(const name of resourceNames) {
      this.removeResource(name);
    }
  }

  /**
   * @returns All the `Resource`s registered in this `ResourceManager`.
   */
  public static getResources(): Map<string, Resource> {
    return ResourceManager.resources;
  }

  /**
   * @param name The name of the `Resource` to find.
   * @returns The `Resource` identified by the passed `name`, if it exists, or
   * `undefined` if it does not.
   */
  public static getResource(name: string): Resource | undefined {
    return ResourceManager.resources.get(name);
  }

  /**
   * @param name The name of the `ImageResource` to find.
   * @returns The `ImageResource` identified by the passed `name`, if it exists, or
   * `undefined` if it does not.
   */
  public static getImageResource(name: string): ImageResource | undefined {
    return ResourceManager.getResource(name) as ImageResource;
  }

  /**
   * @param name The name of the `SoundResource` to find.
   * @returns The `SoundResource` identified by the passed `name`, if it exists, or
   * `undefined` if it does not.
   */
  public static getSoundResource(name: string): SoundResource | undefined {
    return ResourceManager.getResource(name) as SoundResource;
  }

  /**
   * Loads a `Resource` specified by the given `name`.
   * @param name The name of the `Resource` to load.
   * @returns A `Promise` that resolves with the value of the loaded `Resource`
   * when it finishes loading.
   */
  public static async loadResource(name: string): Promise<Resource | void> {
    return this.getResource(name)?.load();
  }

  /**
   * Loads all `Resource`s registered in this `ResourceManager`.
   * @returns A `Promise` that resolves with the values of the loaded `Resource`s
   * when they finish loading.
   */
  public static async loadAllResources(): Promise<Iterable<Resource>> {
    const loadPromises = new Array<Promise<Resource>>();

    ResourceManager.resources.forEach(resource => {
      loadPromises.push(resource.load());
    });

    return Promise.all(loadPromises);
  }

}

export default ResourceManager;
