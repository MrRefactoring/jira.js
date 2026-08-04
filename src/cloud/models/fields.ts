import { z } from 'zod';
import { apiObject } from '#/core';
import { UserDetailsSchema } from './userDetails';
import { IssueTypeDetailsSchema } from './issueTypeDetails';
import { PrioritySchema } from './priority';
import { StatusDetailsSchema } from './statusDetails';
import { TimeTrackingDetailsSchema } from './timeTrackingDetails';
/** Key fields from the linked issue. */

export const FieldsSchema = apiObject({
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
