import { Vector2 } from "../../../dist/spatial/vector2.js";

describe("Vector2 class", () => {

  it("Should instantiate properly", () => {
    const x = 1;
    const y = 2;
    const v2 = new Vector2(x, y);

    expect(v2.getX()).toBe(x);
    expect(v2.getY()).toBe(y);
  });

  describe("createZero method", () => {

    it("Should instantiate a vector zero", () => {
      const v2 = Vector2.createZero();
      const expectedComponents = [ 0, 0 ];

      expect(v2.getComponents()).toEqual(expectedComponents);
    });

    it("Should instantiate a vector zero each call", () => {
      const v1 = Vector2.createZero();
      const v2 = Vector2.createZero();

      expect(v1).not.toBe(v2);
    });

  });

  describe("createUp method", () => {

    it("Should instantiate a vector pointing up", () => {
      const v2 = Vector2.createUp();
      const expectedComponents = [ 0, -1 ];

      expect(v2.getComponents()).toEqual(expectedComponents);
    });

  });

  describe("createRight method", () => {

    it("Should instantiate a vector pointing right", () => {
      const v2 = Vector2.createRight();
      const expectedComponents = [ 1, 0 ];

      expect(v2.getComponents()).toEqual(expectedComponents);
    });

  });

  describe("createDown method", () => {

    it("Should instantiate a vector pointing down", () => {
      const v2 = Vector2.createDown();
      const expectedComponents = [ 0, 1 ];

      expect(v2.getComponents()).toEqual(expectedComponents);
    });

  });

  describe("createLeft method", () => {

    it("Should instantiate a vector pointing left", () => {
      const v2 = Vector2.createLeft();
      const expectedComponents = [ -1, 0 ];

      expect(v2.getComponents()).toEqual(expectedComponents);
    });

  });

  describe("X getter", () => {

    it("Should return the first component", () => {
      const x = 1;
      const v2 = new Vector2(x, 2);
      const expectedComponent = x;

      expect(v2.getComponent(0)).toBe(expectedComponent);
    });

  });

  describe("X setter", () => {

    it("Should set the first component", () => {
      const v2 = new Vector2(1, 2);
      const newX = 3;

      v2.setX(newX);
      
      const expectedComponents = [ newX, 2 ];

      expect(v2.getComponents()).toEqual(expectedComponents);
    });

  });

  describe("Y getter", () => {

    it("Should return the second component", () => {
      const y = 2;
      const v2 = new Vector2(1, y);
      const expectedComponent = y;

      expect(v2.getComponent(1)).toBe(expectedComponent);
    });

  });

  describe("Y setter", () => {

    it("Should set the second component", () => {
      const v2 = new Vector2(1, 2);
      const newY = 3;

      v2.setY(newY);
      
      const expectedComponents = [ 1, newY ];

      expect(v2.getComponents()).toEqual(expectedComponents);
    });

  });

  describe("Plus method", () => {

    it("Should add vectors", () => {
      const v1 = new Vector2(-1, 5);
      const v2 = new Vector2(3, -7);
      const expectedResult = new Vector2(2, -2);

      expect(v1.plus(v2)).toEqual(expectedResult);
    });

    it("Should return Vector2 instance", () => {
      const vec1 = new Vector2(0, 0);
      const vec2 = new Vector2(-5.4, 3);
      
      expect(vec1.plus(vec2)).toBeInstanceOf(Vector2);
    });

  });

});
