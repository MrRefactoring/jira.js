import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of an operation to perform on a field. */

export const FieldUpdateOperationSchema = apiObject({
  /** The value to add to the field. */
  add: z.unknown().optional(),
  /** The field value to copy from another issue. */
  copy: z.unknown().optional(),
  /** The value to edit in the field. */
  edit: z.unknown().optional(),
  /** The value to removed from the field. */
  remove: z.unknown().optional(),
  /** The value to set in the field. */
  set: z.unknown().optional(),
});

export type FieldUpdateOperation = z.infer<typeof FieldUpdateOperationSchema>;
