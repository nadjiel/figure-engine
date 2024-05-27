import { Resource } from "./resource.js";

export class ResourceManager {

  private resources = new Map<string, Resource>();

  public addResource(name: string, resource: Resource): void {

  }

  public removeResource(name: string): boolean {
    return false;
  }

  public getResources(): Map<string, Resource> {
    return this.resources;
  }

  public getResource(name: string): Resource {
    return this.resources.get("")!;
  }

  public async loadResource(name: string): Promise<Resource> {
    return this.resources.get("")!;
  }

  public async loadAllResources(): Promise<Resource> {
    return this.resources.get("")!;
  }

}

export default ResourceManager;
