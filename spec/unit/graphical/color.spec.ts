import { Color, ColorFactory } from "../../../dist/graphical/color.js";

describe("Color class", () => {

  it("Should not allow negative red component", () => {
    const red = -255;
    const green = 255;
    const blue = 255;

    expect(() => new Color(red, green, blue))
      .toThrowError(`color components must be in [0, 255] interval (received ${red})`);
  });

  it("Should not allow red component greater than 255", () => {
    const red = 256;
    const green = 255;
    const blue = 255;

    expect(() => new Color(red, green, blue))
      .toThrowError(`color components must be in [0, 255] interval (received ${red})`);
  });

  it("Should not allow negative green component", () => {
    const red = 255;
    const green = -255;
    const blue = 255;

    expect(() => new Color(red, green, blue))
      .toThrowError(`color components must be in [0, 255] interval (received ${green})`);
  });

  it("Should not allow green component greater than 255", () => {
    const red = 255;
    const green = 256;
    const blue = 255;

    expect(() => new Color(red, green, blue))
      .toThrowError(`color components must be in [0, 255] interval (received ${green})`);
  });

  it("Should not allow negative blue component", () => {
    const red = 255;
    const green = 255;
    const blue = -255;

    expect(() => new Color(red, green, blue))
      .toThrowError(`color components must be in [0, 255] interval (received ${blue})`);
  });

  it("Should not allow blue component greater than 255", () => {
    const red = 255;
    const green = 255;
    const blue = 256;

    expect(() => new Color(red, green, blue))
      .toThrowError(`color components must be in [0, 255] interval (received ${blue})`);
  });

  it("Should not allow negative alpha component", () => {
    const red = 255;
    const green = 255;
    const blue = 255;
    const alpha = -1;

    expect(() => new Color(red, green, blue, alpha))
      .toThrowError(`color alpha component must be in [0, 1] interval (received ${alpha})`);
  });

  it("Should not allow alpha component greater than 1", () => {
    const red = 255;
    const green = 255;
    const blue = 255;
    const alpha = 2;

    expect(() => new Color(red, green, blue, alpha))
      .toThrowError(`color alpha component must be in [0, 1] interval (received ${alpha})`);
  });

  it("Should intantiate without alpha", () => {
    const red = 255;
    const green = 255;
    const blue = 255;
    const color = new Color(red, green, blue);

    expect(color.toString()).toBe(`rgba(${red}, ${green}, ${blue}, 1)`);
  });

  it("Should intantiate with alpha", () => {
    const red = 255;
    const green = 255;
    const blue = 255;
    const alpha = 0;
    const color = new Color(red, green, blue, alpha);

    expect(color.toString()).toBe(`rgba(${red}, ${green}, ${blue}, ${alpha})`);
  });

  describe("setR method", () => {

    it("Should not allow negative red component", () => {
      const color = new Color(255, 255, 255);
      const newRed = -255;
  
      expect(() => color.setR(newRed))
        .toThrowError(`color components must be in [0, 255] interval (received ${newRed})`);
    });
  
    it("Should not allow red component greater than 255", () => {
      const color = new Color(255, 255, 255);
      const newRed = 256;
  
      expect(() => color.setR(newRed))
        .toThrowError(`color components must be in [0, 255] interval (received ${newRed})`);
    });

    it("Should allow valid red components", () => {
      const color = new Color(255, 255, 255);
      const newRed = 200;
  
      color.setR(newRed);
  
      expect(color.getR()).toBe(newRed);
    });

  });

  describe("setG method", () => {

    it("Should not allow negative green component", () => {
      const color = new Color(255, 255, 255);
      const newGreen = -255;
  
      expect(() => color.setG(newGreen))
        .toThrowError(`color components must be in [0, 255] interval (received ${newGreen})`);
    });
  
    it("Should not allow green component greater than 255", () => {
      const color = new Color(255, 255, 255);
      const newGreen = 256;
  
      expect(() => color.setG(newGreen))
        .toThrowError(`color components must be in [0, 255] interval (received ${newGreen})`);
    });

    it("Should allow valid green components", () => {
      const color = new Color(255, 255, 255);
      const newGreen = 200;
  
      color.setG(newGreen);
  
      expect(color.getG()).toBe(newGreen);
    });

  });

  describe("setB method", () => {

    it("Should not allow negative blue component", () => {
      const color = new Color(255, 255, 255);
      const newBlue = -255;
  
      expect(() => color.setB(newBlue))
        .toThrowError(`color components must be in [0, 255] interval (received ${newBlue})`);
    });
  
    it("Should not allow blue component greater than 255", () => {
      const color = new Color(255, 255, 255);
      const newBlue = 256;
  
      expect(() => color.setB(newBlue))
        .toThrowError(`color components must be in [0, 255] interval (received ${newBlue})`);
    });

    it("Should allow valid blue components", () => {
      const color = new Color(255, 255, 255);
      const newBlue = 200;
  
      color.setB(newBlue);
  
      expect(color.getB()).toBe(newBlue);
    });

  });

  describe("setA method", () => {

    it("Should not allow negative alpha component", () => {
      const color = new Color(255, 255, 255);
      const newAlpha = -1;
  
      expect(() => color.setA(newAlpha))
        .toThrowError(`color alpha component must be in [0, 1] interval (received ${newAlpha})`);
    });
  
    it("Should not allow alpha component greater than 1", () => {
      const color = new Color(255, 255, 255);
      const newAlpha = 2;
  
      expect(() => color.setA(newAlpha))
        .toThrowError(`color alpha component must be in [0, 1] interval (received ${newAlpha})`);
    });

    it("Should allow valid alpha components", () => {
      const color = new Color(255, 255, 255);
      const newAlpha = 0.5;
  
      color.setA(newAlpha);
  
      expect(color.getA()).toBe(newAlpha);
    });

  });

});

describe("ColorFactory class", () => {

  it("Should instantiate new colors every time", () => {
    const transparent1 = ColorFactory.createTransparent();
    const transparent2 = ColorFactory.createTransparent();

    expect(transparent1).not.toBe(transparent2);
    expect(transparent1).toEqual(transparent2);
  });

});
