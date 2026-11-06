import { crossCorrelation } from '@lp-labs/cross-correlation';
if (crossCorrelation([1, 2], [3, 4])[1]?.value !== 11) throw new Error('Correlation');
// @ts-expect-error invalid argument must be rejected by declarations
crossCorrelation(['1'], [2]);
