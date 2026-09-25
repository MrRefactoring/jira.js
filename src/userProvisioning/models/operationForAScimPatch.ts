import { z } from 'zod';
import { apiObject, JsonValueSchema } from '#/core';

/** Operation for a SCIM patch */
export const OperationForAScimPatchSchema = apiObject({
  op: z.string().optional(),
  path: z.string().optional(),
  value: JsonValueSchema.optional(),
});

export type OperationForAScimPatch = z.infer<typeof OperationForAScimPatchSchema>;
