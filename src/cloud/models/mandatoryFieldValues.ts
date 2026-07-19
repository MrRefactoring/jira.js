import { z } from 'zod';
import { apiObject } from '#/core';
/** Can contain multiple field values of following types depending on `type` key */

export const MandatoryFieldValuesSchema = apiObject({
  /** If `true`, will try to retain original non-null issue field values on move. */
  retain: z.boolean().nullish(),
  type: z.enum(['adf', 'raw']).optional(),
  value: z.record(z.string(), z.any()).optional(),
});

export type MandatoryFieldValues = z.infer<typeof MandatoryFieldValuesSchema>;
