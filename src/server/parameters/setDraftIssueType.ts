import { z } from 'zod';
import { IssueTypeMappingSchema } from '../models';

export const SetDraftIssueTypeSchema = z.object({
  /** The issue type being set. */
  issueType: z.string(),
  /** The id of the parent scheme. */
  id: z.number(),
  body: IssueTypeMappingSchema,
});

export type SetDraftIssueType = z.input<typeof SetDraftIssueTypeSchema>;
