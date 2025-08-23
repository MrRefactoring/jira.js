import { z } from 'zod';

/** Information about the most recent use of a field. */
export const FieldLastUsedSchema = z.object({
  /**
   * Last used value type:
   *
   * - _TRACKED_: field is tracked and a last used date is available.
   * - _NOT_TRACKED_: field is not tracked, last used date is not available.
   * - _NO_INFORMATION_: field is tracked, but no last used date is available.
   */
  type: z.enum(['TRACKED', 'NOT_TRACKED', 'NO_INFORMATION']).optional(),
  /** The date when the value of the field last changed. */
  value: z.string().datetime().optional(),
});

export type FieldLastUsed = z.infer<typeof FieldLastUsedSchema>;
