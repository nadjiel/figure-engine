import { Resource } from "./resource.js";

export class ResourceManager {

  private resources = new Map<string, Resource>();

  public addResource(name: string, resource: Resource): void {
    this.resources.set(name, resource);
  }

  public removeResource(name: string): boolean {
    return this.resources.delete(name);
  }

  public getResources(): Map<string, Resource> {
    return this.resources;
  }

  public getResource(name: string): Resource | undefined {
    return this.resources.get(name);
  }

  public async loadResource(name: string): Promise<HTMLImageElement | HTMLAudioElement | void> {
    return this.getResource(name)?.load();
  }

  public async loadAllResources(): Promise<Iterable<HTMLImageElement | HTMLAudioElement>> {
    const loadPromises = new Array<Promise<HTMLImageElement | HTMLAudioElement>>();

    this.resources.forEach(resource => {
      loadPromises.push(resource.load());
    });

    return Promise.all(loadPromises);
  }

}

export default ResourceManager;
