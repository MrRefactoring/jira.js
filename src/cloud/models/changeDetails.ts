import { z } from 'zod';
import { apiObject } from '#/core';
/** A change item. */

export const ChangeDetailsSchema = apiObject({
  /** The name of the field changed. */
  field: z.string().optional(),
  /** The ID of the field changed. */
  fieldId: z.string().optional(),
  /** The type of the field changed. */
  fieldtype: z.string().optional(),
  /** The details of the original value. */
  from: z.string().nullish(),
  /** The details of the original value as a string. */
  fromString: z.string().nullish(),
  /** The details of the new value. */
  to: z.string().nullish(),
  /** The details of the new value as a string. */
  toString: z.string().nullish(),
});

export type ChangeDetails = z.infer<typeof ChangeDetailsSchema>;
