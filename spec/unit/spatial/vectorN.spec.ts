import { VectorN } from "../../../dist/spatial/vectorN.js";

describe("VectorN class", () => {

  it("Should instantiate correctly", () => {
    const components = [ 1, 2 ];
    const v = new VectorN(...components);

    expect(v.getComponents()).toEqual(components);
  });

  it("Shouldn't allow adding a component", () => {
    const v = new VectorN(1, 2);

    expect(() => v.setComponent(2, 3)).toThrow();
  });

  describe("getComponent method", () => {

    it("Should return the desired component", () => {
      const component = 0;
      const value = 1;
      const v = new VectorN(value, 2);
  
      expect(v.getComponent(component)).toBe(value);
    });

  });

  describe("forEach method", () => {

    it("Should execute callback for each component", () => {
      const components = new Array<number>();
      const v = new VectorN(1, 2, 3);

      v.forEach(component => components.push(component));
  
      expect(v.getComponents()).toEqual(components);
    });

  });

});
