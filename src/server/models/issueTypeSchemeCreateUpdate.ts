import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueTypeSchemeCreateUpdateSchema = apiObject({
  defaultIssueTypeId: z.string().optional(),
  description: z.string().optional(),
  issueTypeIDs: z.array(z.string()).optional(),
  issueTypeIds: z.array(z.string()).optional(),
  name: z.string().optional(),
});

export type IssueTypeSchemeCreateUpdate = z.infer<typeof IssueTypeSchemeCreateUpdateSchema>;
