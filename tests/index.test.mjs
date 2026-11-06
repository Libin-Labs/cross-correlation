import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('signed lags', () => {
  assert.deepEqual(api.crossCorrelation([1, 2], [3, 4]), [
    { lag: -1, value: 6 },
    { lag: 0, value: 11 },
    { lag: 1, value: 4 },
  ]);
});
test('unequal arrays', () => {
  assert.deepEqual(
    api.crossCorrelation([2], [1, 3, 5]).map((r) => r.value),
    [2, 6, 10],
  );
});
test('lag reversal symmetry', () => {
  const a = api.crossCorrelation([1, 2, 3], [4, 5]),
    b = api.crossCorrelation([4, 5], [1, 2, 3]);
  for (const r of a) assert.equal(b.find((x) => x.lag === -r.lag).value, r.value);
});
test('zero signal', () => {
  assert.ok(api.crossCorrelation([0, 0], [2, 3]).every((r) => r.value === 0));
});
test('input preserved', () => {
  const a = [1, 2];
  api.crossCorrelation(a, a);
  assert.deepEqual(a, [1, 2]);
});
test('invalid samples', () => {
  assert.throws(() => api.crossCorrelation([], []));
  assert.throws(() => api.crossCorrelation([1], [NaN]));
});
