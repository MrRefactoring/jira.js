import { z } from 'zod';
import { apiObject } from '#/core';

export const ReferenceTypeInSchema = apiObject({
  name: z.string(),
  displayName: z.string().max(50, 'displayName must be at most 50 characters').optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  objectSchemaId: z.string().optional(),
});

export type ReferenceTypeIn = z.infer<typeof ReferenceTypeInSchema>;
