
export interface Resource<T = HTMLImageElement | HTMLAudioElement> {

  get(): T;

  getPath(): string;

  load(): Promise<T>;

  isLoaded(): boolean;

}

export default Resource;
