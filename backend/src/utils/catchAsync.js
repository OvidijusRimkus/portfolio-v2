// backend/src/utils/catchAsync.js

/**
 * catchAsync apgaubia async controller funkcijas.
 *
 * Be šito kiekviename controller reikėtų rašyti:
 *
 * try {
 *   ...
 * } catch (error) {
 *   next(error)
 * }
 *
 * Su catchAsync controlleriai lieka švarūs ir trumpi.
 */
export function catchAsync(fn) {
  return function wrappedAsyncFunction(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}