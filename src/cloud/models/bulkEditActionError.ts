import { z } from 'zod';
import { apiObject } from '#/core';

/** Errors of bulk edit action. */
export const BulkEditActionErrorSchema = apiObject({
  /** The error messages. */
  errorMessages: z.array(z.string()),
  /** The errors. */
  errors: z.record(z.string(), z.string()),
});

export type BulkEditActionError = z.infer<typeof BulkEditActionErrorSchema>;
