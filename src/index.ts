function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function sample(values: readonly number[], max = 2048): void {
  if (!Array.isArray(values) || !values.length || values.length > max)
    throw new RangeError('Nonempty bounded sample required');
  for (const v of values) finite(v, -1e6, 1e6);
}
export function crossCorrelation(
  x: readonly number[],
  y: readonly number[],
): { lag: number; value: number }[] {
  sample(x);
  sample(y);
  const out: { lag: number; value: number }[] = [];
  for (let lag = -(x.length - 1); lag < y.length; lag++) {
    let value = 0;
    for (let i = 0; i < x.length; i++) {
      const j = i + lag;
      if (j >= 0 && j < y.length) value += x[i]! * y[j]!;
    }
    out.push({ lag: lag === 0 ? 0 : lag, value });
  }
  return out;
}
