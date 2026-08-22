import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueContextParamSchema = apiObject({
  issueTypeId: z.string().optional(),
  projectId: z.number().optional(),
});

export type IssueContextParam = z.infer<typeof IssueContextParamSchema>;
