import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldsSchema } from './fields';

export const IssueRefJsonSchema = apiObject({
  fields: FieldsSchema.optional(),
  id: z.string().optional(),
  key: z.string().optional(),
  self: z.url().optional(),
});

export type IssueRefJson = z.infer<typeof IssueRefJsonSchema>;
