import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { CreatePermissionHolderRequestSchema } from './createPermissionHolderRequest';

export const CreatePermissionRequestSchema = apiObject({
  holder: CreatePermissionHolderRequestSchema.optional(),
  /** The permission type. This must be "View" or "Edit". */
  type: openEnum(['View', 'Edit']),
});

export type CreatePermissionRequest = z.infer<typeof CreatePermissionRequestSchema>;
