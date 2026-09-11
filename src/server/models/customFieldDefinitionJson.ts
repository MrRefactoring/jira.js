import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomFieldDefinitionJsonSchema = apiObject({
  description: z.string().optional(),
  id: z.string().optional(),
  issueTypeIds: z.array(z.string()).optional(),
  name: z.string().optional(),
  projectIds: z.array(z.number()).optional(),
  searcherKey: z.string().optional(),
  self: z.url().optional(),
  type: z.string().optional(),
});

export type CustomFieldDefinitionJson = z.infer<typeof CustomFieldDefinitionJsonSchema>;
