import { Color } from "../../../dist/graphical/color.js";

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

});
