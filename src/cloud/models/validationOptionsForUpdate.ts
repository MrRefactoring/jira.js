import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/**
 * The level of validation to return from the API. If no values are provided, the default would return `WARNING` and
 * `ERROR` level validation results.
 */

export const ValidationOptionsForUpdateSchema = apiObject({
  levels: z.array(openEnum(['WARNING', 'ERROR'])).optional(),
});

export type ValidationOptionsForUpdate = z.infer<typeof ValidationOptionsForUpdateSchema>;
