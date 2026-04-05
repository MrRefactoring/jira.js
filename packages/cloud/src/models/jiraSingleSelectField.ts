import { z } from 'zod';
import { JiraSelectedOptionFieldSchema } from '#/models/jiraSelectedOptionField';

/**
 * Add or clear a single select field:*
 *
 * To add, specify the option with an `optionId`.* To clear, pass an option with `optionId` as `-1`.
 */
export const JiraSingleSelectFieldSchema = z.object({
  fieldId: z.string(),
  option: JiraSelectedOptionFieldSchema,
});

export type JiraSingleSelectField = z.infer<typeof JiraSingleSelectFieldSchema>;
