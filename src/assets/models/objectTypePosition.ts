import { z } from 'zod';
import { apiObject } from '#/core';

export const ObjectTypePositionSchema = apiObject({
  /** The desired new parent of the object type */
  toObjectTypeId: z.string().optional(),
  /** The preffered position */
  position: z.number(),
});

export type ObjectTypePosition = z.infer<typeof ObjectTypePositionSchema>;
