import { z } from 'zod';
import { apiObject } from '#/core';
import { ReferenceTypeCdmTypeSchema } from './referenceTypeCdmType';

export const ReferenceTypeCdmDataSchema = apiObject({
  types: z.array(ReferenceTypeCdmTypeSchema).optional(),
});

export type ReferenceTypeCdmData = z.infer<typeof ReferenceTypeCdmDataSchema>;
