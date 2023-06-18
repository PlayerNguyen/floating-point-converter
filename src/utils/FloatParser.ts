const FLOAT_BIAS = 127;

export function parseIntFromBitPattern(
  negative: boolean,
  bitPattern: boolean[]
) {
  let t = 0;

  for (
    let i = negative ? 0 : bitPattern.length - 1;
    negative ? i < bitPattern.length : i >= 0;
    negative ? i++ : i--
  ) {
    let exp = negative ? (i + 1) * -1 : bitPattern.length - i - 1;

    if (bitPattern[i]) {
      t += Math.pow(2, exp);
    }
  }
  return t;
}

export function parseFloat32(bitPattern: boolean[]) {
  if (bitPattern.length !== 32) {
    throw new Error(`Bit pattern 32 is invalid, the length is invalid`);
  }

  if (
    bitPattern
      .filter((_v, _i) => _i > 0 && _i < bitPattern.length)
      .every((v) => v === false)
  ) {
    return bitPattern[0] ? 0.0 : -0.0;
  }

  if (bitPattern.filter((_, i) => i >= 1 && i <= 8).every((v) => v === true)) {
    return bitPattern.filter((_, i) => i >= 9 && i < 32).some((v) => v === true)
      ? Infinity
      : NaN;
  }

  const sign = Math.pow(-1, bitPattern[0] ? 1 : 0);
  const exponent =
    parseIntFromBitPattern(false, [...bitPattern].splice(1, 8)) - FLOAT_BIAS;

  const mantissa = parseIntFromBitPattern(
    true,
    [...bitPattern].splice(9, bitPattern.length - 1)
  );

  return sign * (1 + mantissa) * Math.pow(2, exponent);
}
