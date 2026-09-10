// backend/src/utils/AppError.js

/**
 * AppError yra mūsų custom klaidų klasė.
 *
 * Naudosime ją tada, kai norime patys sąmoningai mesti klaidą:
 * - blogi prisijungimo duomenys
 * - nerastas įrašas
 * - nėra teisių
 * - bloga validacija
 *
 * Tai geriau negu paprastas Error, nes turime statusCode.
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}