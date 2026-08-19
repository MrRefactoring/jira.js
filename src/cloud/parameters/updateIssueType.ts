import { z } from 'zod';
import { IssueTypeUpdateSchema } from '../models';

export const UpdateIssueTypeSchema = z.object(IssueTypeUpdateSchema.shape).extend({
  /** The ID of the issue type. */
  id: z.string(),
});

export type UpdateIssueType = z.input<typeof UpdateIssueTypeSchema>;
