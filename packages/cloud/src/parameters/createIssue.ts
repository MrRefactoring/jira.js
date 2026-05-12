import { z } from 'zod';
import { IssueUpdateDetailsSchema } from '../models';

export const CreateIssueSchema = z
  .object({
    /**
     * Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as
     * shown under **Projects** in Jira. When provided, the issue type and request type are added to the user's history
     * for a project. These values are then used to provide defaults on the issue create screen.
     */
    updateHistory: z.boolean().optional(),
  })
  .extend(IssueUpdateDetailsSchema.shape);

export type CreateIssue = z.input<typeof CreateIssueSchema>;
