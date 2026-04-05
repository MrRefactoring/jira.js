import { z } from 'zod';

/** The field configuration for an issue type. */
export const FieldConfigurationIssueTypeItemSchema = z.object({
  /** The ID of the field configuration. */
  fieldConfigurationId: z.string(),
  /** The ID of the field configuration scheme. */
  fieldConfigurationSchemeId: z.string(),
  /**
   * The ID of the issue type or _default_. When set to _default_ this field configuration issue type item applies to
   * all issue types without a field configuration.
   */
  issueTypeId: z.string(),
});

export type FieldConfigurationIssueTypeItem = z.infer<typeof FieldConfigurationIssueTypeItemSchema>;
