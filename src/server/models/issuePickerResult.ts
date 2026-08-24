import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueSectionSchema } from './issueSection';

export const IssuePickerResultSchema = apiObject({
  sections: z.array(IssueSectionSchema).optional(),
});

export type IssuePickerResult = z.infer<typeof IssuePickerResultSchema>;
