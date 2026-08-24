import { z } from 'zod';
import { apiObject } from '#/core';

export const ReferenceTypeInSchema = apiObject({
  name: z.string(),
  description: z.string().optional(),
  color: z.string().optional(),
  objectSchemaId: z.string().optional(),
});

export type ReferenceTypeIn = z.infer<typeof ReferenceTypeInSchema>;
