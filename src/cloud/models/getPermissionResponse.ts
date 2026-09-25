import type { z } from 'zod';
import { apiObject, openEnum, requireResponseKeys } from '#/core';
import { GetPermissionHolderResponseSchema } from './getPermissionHolderResponse';

export const GetPermissionResponseSchema = requireResponseKeys(
  apiObject({
    holder: GetPermissionHolderResponseSchema.optional(),
    /** The permission type. This is "View" or "Edit". */
    type: openEnum(['View', 'Edit']),
  }),
  ['holder'],
);

export type GetPermissionResponse = z.infer<typeof GetPermissionResponseSchema>;
