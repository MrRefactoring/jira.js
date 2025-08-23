import { z } from 'zod';

/** Details of names changed in the record event. */
export const ChangedValueBeanSchema = z.object({
  /** The value of the field before the change. */
  changedFrom: z.string().optional(),
  /** The value of the field after the change. */
  changedTo: z.string().optional(),
  /** The name of the field changed. */
  fieldName: z.string().optional(),
});

export type ChangedValueBean = z.infer<typeof ChangedValueBeanSchema>;
