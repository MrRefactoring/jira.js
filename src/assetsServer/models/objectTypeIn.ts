import { z } from 'zod';
import { apiObject } from '#/core';

export const ObjectTypeInSchema = apiObject({
  id: z.number().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  iconId: z.number().optional(),
  objectSchemaId: z.number().optional(),
  parentObjectTypeId: z.number().optional(),
  inherited: z.boolean().optional(),
  abstractObjectType: z.boolean().optional(),
});

export type ObjectTypeIn = z.infer<typeof ObjectTypeInSchema>;
