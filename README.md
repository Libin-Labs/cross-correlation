# @lp-labs/cross-correlation

Direct finite-sequence cross-correlation with signed lags.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/cross-correlation
```

## Working example

```js
import { crossCorrelation } from '@lp-labs/cross-correlation';
if (crossCorrelation([1, 2], [3, 4])[1]?.value !== 11) throw new Error('Correlation');
```

CommonJS: `const api = require('@lp-labs/cross-correlation')`.

## Behavior, customization and limits

crossCorrelation(x,y) returns {lag,value} from -(x.length-1) through y.length-1,defined sum_i x[i]*y[i+lag] with out-of-range terms zero. Arrays1..2048,finite amplitudes[-1e6,1e6]. No centering,normalization,time offsets or peak selection. O((Nx+Ny)*Nx)time,O(Nx+Ny)storage; distinct from convolution.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function crossCorrelation(
  x: readonly number[],
  y: readonly number[],
): {
  lag: number;
  value: number;
}[];
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
