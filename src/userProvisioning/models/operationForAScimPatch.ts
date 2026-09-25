import { z } from 'zod';
import { apiObject } from '#/core';
import { JsonValueSchema } from '#/core/compatibility';

/** Operation for a SCIM patch */
export const OperationForAScimPatchSchema = apiObject({
  op: z.string().optional(),
  path: z.string().optional(),
  value: JsonValueSchema.optional(),
});

export type OperationForAScimPatch = z.infer<typeof OperationForAScimPatchSchema>;
