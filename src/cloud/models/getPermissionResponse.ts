import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { GetPermissionHolderResponseSchema } from './getPermissionHolderResponse';

export const GetPermissionResponseSchema = apiObject({
  holder: GetPermissionHolderResponseSchema.optional(),
  /** The permission type. This is "View" or "Edit". */
  type: openEnum(['View', 'Edit']),
});

export type GetPermissionResponse = z.infer<typeof GetPermissionResponseSchema>;
