import { z } from 'zod';
import { UserDetailsSchema } from '#/models/userDetails';
import { IssueTypeDetailsSchema } from '#/models/issueTypeDetails';
import { PrioritySchema } from '#/models/priority';
import { StatusDetailsSchema } from '#/models/statusDetails';
import { TimeTrackingDetailsSchema } from '#/models/timeTrackingDetails';

/** Key fields from the linked issue. */
export const FieldsSchema = z.object({
  assignee: UserDetailsSchema.optional(),
  issueType: IssueTypeDetailsSchema.optional(),
  /** The type of the linked issue. */
  issuetype: IssueTypeDetailsSchema.optional(),
  priority: PrioritySchema.optional(),
  status: StatusDetailsSchema.optional(),
  /** The summary description of the linked issue. */
  summary: z.string().optional(),
  timetracking: TimeTrackingDetailsSchema.optional(),
});

export type Fields = z.infer<typeof FieldsSchema>;
