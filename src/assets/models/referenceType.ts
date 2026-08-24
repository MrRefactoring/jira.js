import { z } from 'zod';
import { apiObject } from '#/core';
import { ReferenceTypeCdmDataSchema } from './referenceTypeCdmData';

export const ReferenceTypeSchema = apiObject({
  workspaceId: z.string(),
  globalId: z.string(),
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  color: z.string().optional(),
  url16: z.string().optional(),
  objectSchemaId: z.string().optional(),
  cdmData: ReferenceTypeCdmDataSchema.optional(),
});

export type ReferenceType = z.infer<typeof ReferenceTypeSchema>;
