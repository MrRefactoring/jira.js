import { z } from 'zod';
import { apiObject } from '#/core';
import { IconSchema } from './icon';

export const ObjectTypeSchema = apiObject({
  id: z.number().optional(),
  name: z.string().optional(),
  type: z.number().optional(),
  description: z.string().optional(),
  icon: IconSchema.optional(),
  position: z.number().optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  objectCount: z.number().optional(),
  parentObjectTypeId: z.number().optional(),
  objectSchemaId: z.number().optional(),
  inherited: z.boolean().optional(),
  abstractObjectType: z.boolean().optional(),
  parentObjectTypeInherited: z.boolean().optional(),
});

export type ObjectType = z.infer<typeof ObjectTypeSchema>;
