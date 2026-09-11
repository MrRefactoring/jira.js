import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueTypeSchemeSchema } from './issueTypeScheme';

export const IssueTypeSchemeListSchema = apiObject({
  schemes: z.array(IssueTypeSchemeSchema).optional(),
});

export type IssueTypeSchemeList = z.infer<typeof IssueTypeSchemeListSchema>;
