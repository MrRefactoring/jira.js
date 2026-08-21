import { z } from 'zod';
import { apiObject } from '#/core';
import { BulkOperationErrorResultSchema } from './bulkOperationErrorResult';
import { IssueCreateResponseSchema } from './issueCreateResponse';

export const IssuesCreateResponseSchema = apiObject({
  errors: z.array(BulkOperationErrorResultSchema).optional(),
  issues: z.array(IssueCreateResponseSchema).optional(),
});

export type IssuesCreateResponse = z.infer<typeof IssuesCreateResponseSchema>;
