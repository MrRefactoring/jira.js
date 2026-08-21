import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueUpdateSchema } from './issueUpdate';

export const IssuesUpdateSchema = apiObject({
  issueUpdates: z.array(IssueUpdateSchema).optional(),
});

export type IssuesUpdate = z.infer<typeof IssuesUpdateSchema>;
