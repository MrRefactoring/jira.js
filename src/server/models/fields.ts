import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueTypeJsonSchema } from './issueTypeJson';
import { PriorityJsonSchema } from './priorityJson';
import { StatusJsonSchema } from './statusJson';

export const FieldsSchema = apiObject({
  issuetype: IssueTypeJsonSchema.optional(),
  priority: PriorityJsonSchema.optional(),
  status: StatusJsonSchema.optional(),
  summary: z.string().optional(),
});

export type Fields = z.infer<typeof FieldsSchema>;
