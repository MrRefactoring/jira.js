import { z } from 'zod';
import { apiObject } from '#/core';

export const ReferenceTypeSchema = apiObject({
  expand: z.string().optional(),
  project: z.string().optional(),
  position: z.string().optional(),
  after: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  url16: z.string().optional(),
  removable: z.boolean().optional(),
  objectSchemaId: z.number().optional(),
});

export type ReferenceType = z.infer<typeof ReferenceTypeSchema>;
