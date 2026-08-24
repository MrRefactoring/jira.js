import { z } from 'zod';
import { apiObject } from '#/core';
import { ReferenceTypeSchema } from './referenceType';
import { ObjectTypeSchema } from './objectType';
/** Reference information for one object */

export const ObjectReferenceTypeInfoSchema = apiObject({
  referenceTypes: z.array(ReferenceTypeSchema).optional(),
  objectType: ObjectTypeSchema.optional(),
  numberOfReferencedObjects: z.number(),
  openIssuesExists: z.boolean(),
});

export type ObjectReferenceTypeInfo = z.infer<typeof ObjectReferenceTypeInfoSchema>;
