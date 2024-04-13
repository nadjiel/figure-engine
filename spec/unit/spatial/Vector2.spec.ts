import { Vector2 } from "../../../dist/spatial/vector2.js";

describe("Vector2 class", () => {

  it("Should instantiate properly", () => {
    const x = 1;
    const y = 2;
    const v2 = new Vector2(x, y);

    expect(v2.getX()).toBe(x);
    expect(v2.getY()).toBe(y);
  })

  describe("ZERO constant", () => {

    it("Should instantiate a vector zero", () => {
      const v2 = Vector2.ZERO;
      const expectedComponents = [ 0, 0 ];

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

});
