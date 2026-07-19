import { z } from 'zod';
import { IssueTypeUpdateSchema } from '../models';

export const UpdateIssueTypeSchema = z
  .object({
    /** The ID of the issue type. */
    id: z.string(),
  })
  .extend(IssueTypeUpdateSchema.shape);

export type UpdateIssueType = z.input<typeof UpdateIssueTypeSchema>;
