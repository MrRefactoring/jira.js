import { z } from 'zod';
import { apiObject } from '#/core';

export const ReferenceTypeCdmTypeSchema = apiObject({
  key: z.string().optional(),
  version: z.number().optional(),
  opinionated: z.boolean().optional(),
});

export type ReferenceTypeCdmType = z.infer<typeof ReferenceTypeCdmTypeSchema>;
