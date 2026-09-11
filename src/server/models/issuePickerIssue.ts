import { z } from 'zod';
import { apiObject } from '#/core';

export const IssuePickerIssueSchema = apiObject({
  img: z.string().optional(),
  key: z.string().optional(),
  keyHtml: z.string().optional(),
  summary: z.string().optional(),
  summaryText: z.string().optional(),
});

export type IssuePickerIssue = z.infer<typeof IssuePickerIssueSchema>;
