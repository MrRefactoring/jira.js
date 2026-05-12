import { z } from 'zod';

/** Errors of bulk edit action. */
export const BulkEditActionErrorSchema = z.object({
  /** The error messages. */
  errorMessages: z.array(z.string()),
  /** The errors. */
  errors: z.record(z.string(), z.any()),
});

export type BulkEditActionError = z.infer<typeof BulkEditActionErrorSchema>;
