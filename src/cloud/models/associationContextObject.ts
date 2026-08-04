import { z } from 'zod';
import { apiObject } from '#/core';
/** Field association for example PROJECT_ID. */

export const AssociationContextObjectSchema = apiObject({
  identifier: z.record(z.string(), z.any()).optional(),
  type: z.string(),
});

export type AssociationContextObject = z.infer<typeof AssociationContextObjectSchema>;
