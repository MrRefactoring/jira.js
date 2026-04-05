import { z } from 'zod';

/** List of string of inputs */
export const MandatoryFieldValueSchema = z.object({
  /** If `true`, will try to retain original non-null issue field values on move. */
  retain: z.boolean().nullable().optional(),
  /** Will treat as `MandatoryFieldValue` if type is `raw` or `empty` */
  type: z.enum(['adf', 'raw']).optional(),
  /** Value for each field. Provide a `list of strings` for non-ADF fields. */
  value: z.array(z.string()),
});

export type MandatoryFieldValue = z.infer<typeof MandatoryFieldValueSchema>;
