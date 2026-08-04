import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraSelectedOptionFieldSchema } from './jiraSelectedOptionField';
/**
 * Add or clear a single select field:*
 *
 * To add, specify the option with an `optionId`.* To clear, pass an option with `optionId` as `-1`.
 */

export const JiraSingleSelectFieldSchema = apiObject({
  fieldId: z.string(),
  option: JiraSelectedOptionFieldSchema,
});

export type JiraSingleSelectField = z.infer<typeof JiraSingleSelectFieldSchema>;
