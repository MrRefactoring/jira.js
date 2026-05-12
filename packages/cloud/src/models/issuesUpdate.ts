import { z } from 'zod';
import { IssueUpdateDetailsSchema } from '#/models/issueUpdateDetails';

export const IssuesUpdateSchema = z.object({
  issueUpdates: z.array(IssueUpdateDetailsSchema).optional(),
});

export type IssuesUpdate = z.infer<typeof IssuesUpdateSchema>;
