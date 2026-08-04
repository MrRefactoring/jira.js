import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** An object notation input */

export const MandatoryFieldValueForADFSchema = apiObject({
  /** If `true`, will try to retain original non-null issue field values on move. */
  retain: z.boolean().nullish(),
  /** Will treat as `MandatoryFieldValueForADF` if type is `adf` */
  type: openEnum(['adf', 'raw']),
  /**
   * Value for each field. Accepts Atlassian Document Format (ADF) for rich text fields like `description`,
   * `environments`. For ADF format details, refer to: [Atlassian Document
   * Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure)
   */
  value: z.record(z.string(), z.any()),
});

export type MandatoryFieldValueForADF = z.infer<typeof MandatoryFieldValueForADFSchema>;
