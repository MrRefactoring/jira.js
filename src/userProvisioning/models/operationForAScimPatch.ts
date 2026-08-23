import { z } from 'zod';
import { apiObject } from '#/core';
import { JsonNodeSchema } from './jsonNode';
/** Operation for a SCIM patch */

export const OperationForAScimPatchSchema = apiObject({
  op: z.string().optional(),
  path: z.string().optional(),
  value: JsonNodeSchema.optional(),
});

export type OperationForAScimPatch = z.infer<typeof OperationForAScimPatchSchema>;
