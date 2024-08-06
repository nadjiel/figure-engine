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

  describe("plus method", () => {

    it("Should not accept vector with different dimension", () => {
      const v1 = new VectorN(-1, 5);
      const v2 = new VectorN(3);

      expect(() => v1.plus(v2)).toThrowError(
        `vectors must have same dimension (tried adding vector${v1.getDimension()} with vector${v2.getDimension()})`
      );
    });

    it("Should add vectors", () => {
      const v1 = new VectorN(-1, 5);
      const v2 = new VectorN(3, -7);
      const expectedResult = new VectorN(2, -2);

      expect(v1.plus(v2)).toEqual(expectedResult);
    });

  });

  describe("minus method", () => {

    it("Should not accept vector with different dimension", () => {
      const v1 = new VectorN(-1, 5);
      const v2 = new VectorN(3);

      expect(() => v1.minus(v2)).toThrowError(
        `vectors must have same dimension (tried subtracting vector${v1.getDimension()} with vector${v2.getDimension()})`
      );
    });

    it("Should subtract vectors", () => {
      const v1 = new VectorN(-1, 5);
      const v2 = new VectorN(3, -7);
      const expectedResult = new VectorN(-4, 12);

      expect(v1.minus(v2)).toEqual(expectedResult);
    });

  });

  describe("incrementBy method", () => {

    it("Should increment vector by a value", () => {
      const v1 = new VectorN(0, -9);
      const value = 3.25;
      const expectedResult = new VectorN(3.25, -5.75);

      expect(v1.incrementBy(value)).toEqual(expectedResult);
    });

  });

  describe("decrementBy method", () => {

    it("Should decrement vector by a value", () => {
      const v1 = new VectorN(0, -9);
      const value = 3.25;
      const expectedResult = new VectorN(-3.25, -12.25);

      expect(v1.decrementBy(value)).toEqual(expectedResult);
    });

  });

  describe("increment method", () => {

    it("Should increment vector by 1", () => {
      const v = new VectorN(0, -9);
      const expectedResult = new VectorN(1, -8);

      expect(v.increment()).toEqual(expectedResult);
    });

  });

  describe("decrement method", () => {

    it("Should decrement vector by 1", () => {
      const v = new VectorN(0, -9);
      const expectedResult = new VectorN(-1, -10);

      expect(v.decrement()).toEqual(expectedResult);
    });

  });

  describe("scaleBy method", () => {

    it("Should scale vector by a scalar", () => {
      const v1 = new VectorN(-1, 5);
      const scalar = 4;
      const expectedResult = new VectorN(-4, 20);

      expect(v1.scaleBy(scalar)).toEqual(expectedResult);
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
