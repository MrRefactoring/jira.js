import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldMetaSchema } from './fieldMeta';

export const CreateMetaIssueTypeSchema = apiObject({
  avatarId: z.number().optional(),
  description: z.string().optional(),
  fields: z.record(z.string(), FieldMetaSchema).optional(),
  iconUrl: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  self: z.string().optional(),
  subtask: z.boolean().optional(),
});

export type CreateMetaIssueType = z.infer<typeof CreateMetaIssueTypeSchema>;
