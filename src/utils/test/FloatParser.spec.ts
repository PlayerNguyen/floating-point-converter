import { expect } from "chai";
import {
  parseBinaryFromBitPattern,
  parseFloat32,
  parseIntFromBitPattern,
} from "../FloatParser";

describe("[unit] FloatParser", () => {
  it(`parseIntFromBinary should return an exact value`, () => {
    expect(parseIntFromBitPattern(false, [true, false])).to.eq(2);
    expect(parseIntFromBitPattern(false, [false, false])).to.eq(0);
    expect(
      parseIntFromBitPattern(false, [false, false, true, false, false])
    ).to.eq(4);

    expect(parseIntFromBitPattern(true, [true])).to.eq(0.5);
  });

  it(`parseFloat should return a true float value`, () => {
    expect(
      parseFloat32([
        false,
        //
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        //
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ])
    ).to.eq(3);

    expect(
      parseFloat32([
        true,
        //
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        //
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ])
    ).to.eq(-3.75);

    expect(
      parseFloat32([
        false,
        //
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        //
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ])
    ).to.closeTo(1.175e-38, 0.001);
  });

  it(`parseBinaryFromBitPattern should return a string binary`, () => {
    expect(parseBinaryFromBitPattern([true, true])).to.eq(`11`);
    expect(parseBinaryFromBitPattern([false, false])).to.eq(`00`);
    expect(parseBinaryFromBitPattern([])).to.eq("");
  });
});
