import { z } from 'zod';

/** An object notation input */
export const MandatoryFieldValueForADFSchema = z.object({
  /** If `true`, will try to retain original non-null issue field values on move. */
  retain: z.boolean().nullable().optional(),
  /** Will treat as `MandatoryFieldValueForADF` if type is `adf` */
  type: z.enum(['adf', 'raw']),
  /**
   * Value for each field. Accepts Atlassian Document Format (ADF) for rich text fields like `description`,
   * `environments`. For ADF format details, refer to: [Atlassian Document
   * Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure)
   */
  value: z.record(z.string(), z.any()),
});

export type MandatoryFieldValueForADF = z.infer<typeof MandatoryFieldValueForADFSchema>;
