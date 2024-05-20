/**
 * The `Resource` interface describes the classes that import external resources
 * with methods to load and get the resource.
 * 
 * @version 0.4.0
 * @author Daniel de Oliveira <oliveira.daaaaniel@gmail.com>
 */
export interface Resource<T = HTMLImageElement | HTMLAudioElement> {

  /**
   * This method is intended to return the imported `Resource`.
   */
  get(): T;

  /**
   * This method is intended to return the path from where this `Resource` was
   * imported.
   */
  getPath(): string;

  /**
   * This method is intended to load the external `Resource`.
   */
  load(): Promise<T>;

  /**
   * This method is intended to tell if the `Resource` is finished loading.
   */
  isLoaded(): boolean;

}

export default Resource;
