import { z } from 'zod';
import { IssueTypeMappingSchema } from '../models';

export const SetIssueTypeSchema = z.object({
  /** The issue type being set. */
  issueType: z.string(),
  /** The id of the scheme. */
  id: z.number(),
  body: IssueTypeMappingSchema,
});

export type SetIssueType = z.input<typeof SetIssueTypeSchema>;
