import { Resource } from "./resource.js";

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
  private resources = new Map<string, Resource>();

  /**
   * Adds a `Resource` with a given `name` to this `ResourceManager`.
   * @param name The name to register to this `Resource`.
   * @param resource The `Resource` to store.
   */
  public addResource(name: string, resource: Resource): void {
    this.resources.set(name, resource);
  }

  /**
   * Removes a `Resource` specified by the given `name` from this
   * `ResourceManager`.
   * @param name The name of the `Resource` to remove.
   * @returns The removed `Resource`.
   */
  public removeResource(name: string): boolean {
    return this.resources.delete(name);
  }

  /**
   * @returns All the `Resource`s registered in this `ResourceManager`.
   */
  public getResources(): Map<string, Resource> {
    return this.resources;
  }

  /**
   * @param name The name of the `Resource` to find.
   * @returns The `Resource` identified by the passed `name`, if it exists, or
   * `undefined` if it does not.
   */
  public getResource(name: string): Resource | undefined {
    return this.resources.get(name);
  }

  /**
   * Loads a `Resource` specified by the given `name`.
   * @param name The name of the `Resource` to load.
   * @returns A `Promise` that resolves with the value of the loaded `Resource`
   * when it finishes loading.
   */
  public async loadResource(name: string): Promise<HTMLImageElement | HTMLAudioElement | void> {
    return this.getResource(name)?.load();
  }

  /**
   * Loads all `Resource`s registered in this `ResourceManager`.
   * @returns A `Promise` that resolves with the values of the loaded `Resource`s
   * when they finish loading.
   */
  public async loadAllResources(): Promise<Iterable<HTMLImageElement | HTMLAudioElement>> {
    const loadPromises = new Array<Promise<HTMLImageElement | HTMLAudioElement>>();

    this.resources.forEach(resource => {
      loadPromises.push(resource.load());
    });

    return Promise.all(loadPromises);
  }

}

export default ResourceManager;
