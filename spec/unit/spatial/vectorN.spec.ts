import { VectorN } from "../../../dist/spatial/vectorN.js";

describe("VectorN class", () => {

  it("Should instantiate correctly", () => {
    const components = [ 1, 2 ];
    const v = new VectorN(...components);

    expect(v.getComponents()).toEqual(components);
  });

  describe("setComponent method", () => {

    it("Should set the desired component", () => {
      const component = 0;
      const value = 1;
      const newValue = 3;
      const v = new VectorN(value, 2);
  
      v.setComponent(component, newValue)

      expect(v.getComponent(component)).toBe(newValue);
    });

    it("Should throw error if the component is negative", () => {
      const component = -1;
      const v = new VectorN(1, 2);
      const dimension = v.getDimension();

      expect(() => v.setComponent(component, 0)).toThrowError(`component must be inside of vector [0, ${dimension}[ (received ${component})`);
    });

    it("Should throw error if the component greater than the vector", () => {
      const component = 2;
      const v = new VectorN(1, 2);
      const dimension = v.getDimension();

      expect(() => v.setComponent(component, 0)).toThrowError(`component must be inside of vector [0, ${dimension}[ (received ${component})`);
    });

  });

  describe("getComponent method", () => {

    it("Should return the desired component", () => {
      const component = 0;
      const value = 1;
      const v = new VectorN(value, 2);
  
      expect(v.getComponent(component)).toBe(value);
    });

    it("Should throw error if the component is negative", () => {
      const v = new VectorN(1, 2);
  
      expect(() => v.getComponent(-1)).toThrow();
    });

    it("Should throw error if the component greater than the vector", () => {
      const components = [ 1, 2 ];
      const dimension = components.length;
      const v = new VectorN(...components);
  
      expect(() => v.getComponent(dimension)).toThrow();
    });

  });

  describe("getDimension method", () => {

    it("Should return the vector dimension", () => {
      const components = [ 1, 2 ];
      const expectedDimension = components.length;
      const v = new VectorN(...components);
  
      expect(v.getDimension()).toBe(expectedDimension);
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
