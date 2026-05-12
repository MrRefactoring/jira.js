import { z } from 'zod';

/**
 * The level of validation to return from the API. If no values are provided, the default would return `WARNING` and
 * `ERROR` level validation results.
 */
export const ValidationOptionsForCreateSchema = z.object({
  levels: z.array(z.enum(['WARNING', 'ERROR'])).optional(),
});

export type ValidationOptionsForCreate = z.infer<typeof ValidationOptionsForCreateSchema>;
