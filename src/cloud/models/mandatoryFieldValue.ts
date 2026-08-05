import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** List of string of inputs */

export const MandatoryFieldValueSchema = apiObject({
  /** If `true`, will try to retain original non-null issue field values on move. */
  retain: z.boolean().nullish(),
  /** Will treat as `MandatoryFieldValue` if type is `raw` or `empty` */
  type: openEnum(['adf', 'raw']).nullish(),
  /** Value for each field. Provide a `list of strings` for non-ADF fields. */
  value: z.array(z.string()),
});

export type MandatoryFieldValue = z.infer<typeof MandatoryFieldValueSchema>;
