import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueUpdateDetailsSchema } from './issueUpdateDetails';

export const IssuesUpdateSchema = apiObject({
  issueUpdates: z.array(IssueUpdateDetailsSchema).optional(),
});

export type IssuesUpdate = z.infer<typeof IssuesUpdateSchema>;
