import { z } from 'zod';
import { apiObject } from '#/core';

export const ObjectTypeInheritanceTreeSchema = apiObject({
  parentObjectTypeIdsInclSelf: z.record(z.string(), z.any()).optional(),
});

export type ObjectTypeInheritanceTree = z.infer<typeof ObjectTypeInheritanceTreeSchema>;
