import { Rectangle } from "../../../dist/spatial/rectangle.js";
import { Vector2 } from "../../../dist/spatial/vector2.js";

describe("Rectangle class", () => {

  it("Should instantiate properly", () => {
    const coordinates = new Vector2(10, 20);
    const dimensions = new Vector2(200, 100);
    const rect = new Rectangle(coordinates, dimensions);

    expect(rect.getX()).toBe(coordinates.getX());
    expect(rect.getY()).toBe(coordinates.getY());
    expect(rect.getWidth()).toBe(dimensions.getComponent(0));
    expect(rect.getHeight()).toBe(dimensions.getComponent(1));
  });

  it("Should not allow negative width", () => {
    const width = -200;
    const coordinates = new Vector2(10, 20);
    const dimensions = new Vector2(width, 100);

    expect(() => new Rectangle(coordinates, dimensions))
      .toThrowError(`rectangle dimensions must be non negative (received ${width})`);
  });
  
  it("Should allow width zero", () => {
    const width = 0;
    const coordinates = new Vector2(10, 20);
    const dimensions = new Vector2(width, 100);
    const rect = new Rectangle(coordinates, dimensions);

    expect(rect.getWidth()).toBe(width);
  });

  it("Should allow positive width", () => {
    const width = 1;
    const coordinates = new Vector2(10, 20);
    const dimensions = new Vector2(width, 100);
    const rect = new Rectangle(coordinates, dimensions);

    expect(rect.getWidth()).toBe(width);
  });

  it("Should not allow negative height", () => {
    const height = -200;
    const coordinates = new Vector2(10, 20);
    const dimensions = new Vector2(100, height);

    expect(() => new Rectangle(coordinates, dimensions))
      .toThrowError(`rectangle dimensions must be non negative (received ${height})`);
  });
  
  it("Should allow height zero", () => {
    const height = 0;
    const coordinates = new Vector2(10, 20);
    const dimensions = new Vector2(3, height);
    const rect = new Rectangle(coordinates, dimensions);

    expect(rect.getHeight()).toBe(height);
  });

  it("Should allow positive height", () => {
    const height = 1;
    const coordinates = new Vector2(10, 20);
    const dimensions = new Vector2(3, height);
    const rect = new Rectangle(coordinates, dimensions);

    expect(rect.getHeight()).toBe(height);
  });

  describe("setDimensions method", () => {

    it("Should not allow negative width", () => {
      const coordinates = new Vector2(10, 20);
      const dimensions = new Vector2(100, 100);
      const rect = new Rectangle(coordinates, dimensions);
      const newWidth = -2;
      const newDimensions = new Vector2(newWidth, 20);
  
      expect(() => rect.setDimensions(newDimensions))
        .toThrowError(`rectangle dimensions must be non negative (received ${newWidth})`);
    });
    
    it("Should allow width zero", () => {
      const coordinates = new Vector2(10, 20);
      const dimensions = new Vector2(100, 100);
      const rect = new Rectangle(coordinates, dimensions);
      const newWidth = 0;
      const newDimensions = new Vector2(newWidth, 20);

      rect.setDimensions(newDimensions);
  
      expect(rect.getDimensions()).toBe(newDimensions);
    });
  
    it("Should allow positive width", () => {
      const coordinates = new Vector2(10, 20);
      const dimensions = new Vector2(100, 100);
      const rect = new Rectangle(coordinates, dimensions);
      const newWidth = 9;
      const newDimensions = new Vector2(newWidth, 20);

      rect.setDimensions(newDimensions);
  
      expect(rect.getDimensions()).toBe(newDimensions);
    });

    it("Should not allow negative height", () => {
      const coordinates = new Vector2(10, 20);
      const dimensions = new Vector2(100, 100);
      const rect = new Rectangle(coordinates, dimensions);
      const newHeight = -2;
      const newDimensions = new Vector2(30, newHeight);
  
      expect(() => rect.setDimensions(newDimensions))
        .toThrowError(`rectangle dimensions must be non negative (received ${newHeight})`);
    });
    
    it("Should allow height zero", () => {
      const coordinates = new Vector2(10, 20);
      const dimensions = new Vector2(100, 100);
      const rect = new Rectangle(coordinates, dimensions);
      const newHeight = 0;
      const newDimensions = new Vector2(50, newHeight);

      rect.setDimensions(newDimensions);
  
      expect(rect.getDimensions()).toBe(newDimensions);
    });
  
    it("Should allow positive height", () => {
      const coordinates = new Vector2(10, 20);
      const dimensions = new Vector2(100, 100);
      const rect = new Rectangle(coordinates, dimensions);
      const newHeight = 9;
      const newDimensions = new Vector2(8, newHeight);

      rect.setDimensions(newDimensions);
  
      expect(rect.getDimensions()).toBe(newDimensions);
    });

  });

  describe("setWidth method", () => {

    it("Should not allow negative values", () => {
      const coordinates = new Vector2(10, 20);
      const dimensions = new Vector2(200, 100);
      const rect = new Rectangle(coordinates, dimensions);
      const newWidth = -1;
  
      expect(() => rect.setWidth(newWidth))
        .toThrowError(`rectangle dimensions must be non negative (received ${newWidth})`);
    });
  
    it("Should accept zero", () => {
      const coordinates = new Vector2(10, 20);
      const dimensions = new Vector2(200, 100);
      const rect = new Rectangle(coordinates, dimensions);
      const newWidth = 0;

      rect.setWidth(newWidth);
  
      expect(rect.getWidth()).toBe(newWidth);
    });
  
    it("Should accept positive values", () => {
      const coordinates = new Vector2(10, 20);
      const dimensions = new Vector2(200, 100);
      const rect = new Rectangle(coordinates, dimensions);
      const newWidth = 10;

      rect.setWidth(newWidth);
  
      expect(rect.getWidth()).toBe(newWidth);
    });

  });

  describe("setHeight method", () => {

    it("Should not allow negative values", () => {
      const coordinates = new Vector2(10, 20);
      const dimensions = new Vector2(200, 100);
      const rect = new Rectangle(coordinates, dimensions);
      const newHeight = -1;
  
      expect(() => rect.setHeight(newHeight))
        .toThrowError(`rectangle dimensions must be non negative (received ${newHeight})`);
    });
  
    it("Should accept zero", () => {
      const coordinates = new Vector2(10, 20);
      const dimensions = new Vector2(200, 100);
      const rect = new Rectangle(coordinates, dimensions);
      const newHeight = 0;

      rect.setHeight(newHeight);
  
      expect(rect.getHeight()).toBe(newHeight);
    });
  
    it("Should accept positive values", () => {
      const coordinates = new Vector2(10, 20);
      const dimensions = new Vector2(200, 100);
      const rect = new Rectangle(coordinates, dimensions);
      const newHeight = 10;

      rect.setHeight(newHeight);
  
      expect(rect.getHeight()).toBe(newHeight);
    });

  });

  describe("getTop method", () => {

    it("Should return the y coordinate", () => {
      const y = 20;
      const coordinates = new Vector2(10, y);
      const dimensions = new Vector2(100, 40);
      const rect = new Rectangle(coordinates, dimensions);
      const expectedTop = y;

      expect(rect.getTop()).toBe(expectedTop);
    });

  });

  describe("getRight method", () => {

    it("Should return the x coordinate plus width", () => {
      const x = 10;
      const coordinates = new Vector2(x, 20);
      const width = 100;
      const dimensions = new Vector2(width, 40);
      const rect = new Rectangle(coordinates, dimensions);
      const expectedRight = x + width;

      expect(rect.getRight()).toBe(expectedRight);
    });

  });

  describe("getBottom method", () => {

    it("Should return the y coordinate plus height", () => {
      const y = 20;
      const coordinates = new Vector2(10, y);
      const height = 40;
      const dimensions = new Vector2(100, height);
      const rect = new Rectangle(coordinates, dimensions);
      const expectedBottom = y + height;

      expect(rect.getBottom()).toBe(expectedBottom);
    });

  });

  describe("getLeft method", () => {

    it("Should return the x coordinate", () => {
      const x = 10;
      const coordinates = new Vector2(x, 20);
      const dimensions = new Vector2(100, 40);
      const rect = new Rectangle(coordinates, dimensions);
      const expectedLeft = x;

      expect(rect.getLeft()).toBe(expectedLeft);
    });

  });

});
