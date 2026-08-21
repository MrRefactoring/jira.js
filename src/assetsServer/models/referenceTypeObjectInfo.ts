import { z } from 'zod';
import { apiObject } from '#/core';
import { ReferenceTypeSchema } from './referenceType';
import { ObjectTypeSchema } from './objectType';

export const ReferenceTypeObjectInfoSchema = apiObject({
  referenceTypes: z.array(ReferenceTypeSchema).optional(),
  objectType: ObjectTypeSchema.optional(),
  numberOfReferencedObjects: z.number().optional(),
  openIssuesExists: z.boolean().optional(),
});

export type ReferenceTypeObjectInfo = z.infer<typeof ReferenceTypeObjectInfoSchema>;
