import { z } from 'zod';
import { IssueUpdateDetailsSchema } from './issueUpdateDetails';

export const CreateIssuesParametersSchema = z.object({
  issueUpdates: z.array(IssueUpdateDetailsSchema).optional(),
});

export type CreateIssuesParameters = z.infer<typeof CreateIssuesParametersSchema>;
