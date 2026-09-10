import { z } from 'zod';
import { apiObject } from '#/core';

/** Operation for a SCIM patch */
export const OperationForAScimPatchSchema = apiObject({
  op: z.string().optional(),
  path: z.string().optional(),
  value: z.unknown().optional(),
});

export type OperationForAScimPatch = z.infer<typeof OperationForAScimPatchSchema>;
