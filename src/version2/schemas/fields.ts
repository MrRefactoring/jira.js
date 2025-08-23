import { z } from 'zod';
import { IssueTypeDetailsSchema } from './issueTypeDetails';

/** Key fields from the linked issue. */
export const FieldsSchema = z.object({
  /** The assignee of the linked issue. */
  assignee: z.unknown().optional(),
  /** The type of the linked issue. */
  issueType: z.unknown().optional(),
  /** The type of the linked issue. */
  issuetype: IssueTypeDetailsSchema.optional(),
  /** The priority of the linked issue. */
  priority: z.unknown().optional(),
  /** The status of the linked issue. */
  status: z.unknown().optional(),
  /** The summary description of the linked issue. */
  summary: z.string().optional(),
  /** The time tracking of the linked issue. */
  timetracking: z.unknown().optional(),
});

export type Fields = z.infer<typeof FieldsSchema>;
