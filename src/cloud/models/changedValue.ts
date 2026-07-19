import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of names changed in the record event. */

export const ChangedValueSchema = apiObject({
  /** The value of the field before the change. */
  changedFrom: z.string().optional(),
  /** The value of the field after the change. */
  changedTo: z.string().optional(),
  /** The name of the field changed. */
  fieldName: z.string().optional(),
});

export type ChangedValue = z.infer<typeof ChangedValueSchema>;
