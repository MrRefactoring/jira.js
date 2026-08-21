import { z } from 'zod';
import { IssueTypeUpdateSchema } from '../models';

export const UpdateIssueTypeSchema = z.object(IssueTypeUpdateSchema.shape).extend({
  /** The issue type id. */
  id: z.string(),
});

export type UpdateIssueType = z.input<typeof UpdateIssueTypeSchema>;
