import { z } from 'zod';
import { apiObject } from '#/core';
import { OperationForAScimPatchSchema } from './operationForAScimPatch';
/** Request object to patch a scim user */

export const RequestPayloadToPatchSchema = apiObject({
  /** SCIM patch schemas. */
  schemas: z.array(z.string()).optional(),
  /** SCIM patch operations. */
  operations: z.array(OperationForAScimPatchSchema).optional(),
});

export type RequestPayloadToPatch = z.infer<typeof RequestPayloadToPatchSchema>;
