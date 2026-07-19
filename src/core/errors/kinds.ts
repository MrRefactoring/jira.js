import { PRODUCT } from '../productInfo.js';
/**
 * Every error this package throws carries the list of kinds it belongs to, under a well-known symbol.
 *
 * The predicates read that list rather than the prototype chain, so they keep working when two copies of the package
 * end up in one process — a realistic outcome of transitive dependency ranges, and one where `instanceof` silently
 * returns false. `instanceof` still works, because each class also implements `Symbol.hasInstance` on top of the same
 * list.
 */
export const ERROR_KINDS = Symbol.for(`${PRODUCT.packageName}:error-kinds`);

export type ErrorKind =
  | 'api'
  | 'auth'
  | 'forbidden'
  | 'notFound'
  | 'rateLimit'
  | 'server'
  | 'network'
  | 'oauth'
  | 'config'
  | 'schemaMismatch'
  | 'scope';

/** Whether `value` is one of this package's errors of the given kind. */
export function hasErrorKind(value: unknown, kind: ErrorKind): boolean {
  if (typeof value !== 'object' || value === null) return false;

  const kinds = (value as Record<symbol, unknown>)[ERROR_KINDS];

  return Array.isArray(kinds) && kinds.includes(kind);
}
