import { z } from 'zod';

/** A change item. */
export const ChangeDetailsSchema = z.object({
  /** The name of the field changed. */
  field: z.string().optional(),
  /** The ID of the field changed. */
  fieldId: z.string().optional(),
  /** The type of the field changed. */
  fieldtype: z.string().optional(),
  /** The details of the original value. */
  from: z.string().optional(),
  /** The details of the original value as a string. */
  fromString: z.string().optional(),
  /** The details of the new value. */
  to: z.string().optional(),
  /** The details of the new value as a string. */
  toString: z.string().optional(),
});

export type ChangeDetails = z.infer<typeof ChangeDetailsSchema>;
