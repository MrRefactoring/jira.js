import { z } from 'zod';

/** Can contain multiple field values of following types depending on `type` key */
export const MandatoryFieldValuesSchema = z.object({
  /** If `true`, will try to retain original non-null issue field values on move. */
  retain: z.boolean().nullable().optional(),
  type: z.enum(['adf', 'raw']).optional(),
  value: z.record(z.string(), z.any()).optional(),
});

export type MandatoryFieldValues = z.infer<typeof MandatoryFieldValuesSchema>;
