/**
 * The level of validation to return from the API. If no values are provided, the default would return `WARNING` and
 * `ERROR` level validation results.
 */
export interface ValidationOptionsForCreate {
  levels?: ('WARNING' | 'ERROR' | string)[];
}
