import { z } from 'zod';
import { IssueUpdateDetailsSchema } from './issueUpdateDetails';

export const IssuesUpdateBeanSchema = z.object({
  issueUpdates: z.array(IssueUpdateDetailsSchema).optional(),
});

export type IssuesUpdateBean = z.infer<typeof IssuesUpdateBeanSchema>;
