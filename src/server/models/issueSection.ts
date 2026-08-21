import { z } from 'zod';
import { apiObject } from '#/core';
import { IssuePickerIssueSchema } from './issuePickerIssue';

export const IssueSectionSchema = apiObject({
  id: z.string().optional(),
  issues: z.array(IssuePickerIssueSchema).optional(),
  label: z.string().optional(),
  msg: z.string().optional(),
  sub: z.string().optional(),
});

export type IssueSection = z.infer<typeof IssueSectionSchema>;
