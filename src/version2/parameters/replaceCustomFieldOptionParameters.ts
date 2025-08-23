import { z } from 'zod';

export const ReplaceCustomFieldOptionParametersSchema = z.object({
  /** The ID of the option that will replace the currently selected option. */
  replaceWith: z.number().int().optional(),
  /** A JQL query that specifies the issues to be updated. For example, _project=10000_. */
  jql: z.string().optional(),
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the option to be deselected. */
  optionId: z.number().int(),
  /** The ID of the context. */
  contextId: z.number().int(),
});

export type ReplaceCustomFieldOptionParameters = z.infer<typeof ReplaceCustomFieldOptionParametersSchema>;
