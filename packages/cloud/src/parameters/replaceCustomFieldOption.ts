import { z } from 'zod';

export const ReplaceCustomFieldOptionSchema = z.object({
  /** The ID of the option that will replace the currently selected option. */
  replaceWith: z.number().optional(),
  /** A JQL query that specifies the issues to be updated. For example, _project=10000_. */
  jql: z.string().optional(),
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the option to be deselected. */
  optionId: z.number(),
  /** The ID of the context. */
  contextId: z.number(),
});

export type ReplaceCustomFieldOption = z.input<typeof ReplaceCustomFieldOptionSchema>;
