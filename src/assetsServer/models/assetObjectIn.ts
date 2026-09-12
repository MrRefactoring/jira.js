import { z } from 'zod';
import { apiObject } from '#/core';
import { ObjectAttributeInSchema } from './objectAttributeIn';

export const AssetObjectInSchema = apiObject({
  objectTypeId: z.number(),
  attributes: z.array(ObjectAttributeInSchema),
});

export type AssetObjectIn = z.infer<typeof AssetObjectInSchema>;
