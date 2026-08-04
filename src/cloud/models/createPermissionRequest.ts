import { z } from 'zod';
import { apiObject } from '#/core';
import { CreatePermissionHolderRequestSchema } from './createPermissionHolderRequest';

export const CreatePermissionRequestSchema = apiObject({
  holder: CreatePermissionHolderRequestSchema.optional(),
  /** The permission type. This must be "View" or "Edit". */
  type: z.enum(['View', 'Edit']),
});

export type CreatePermissionRequest = z.infer<typeof CreatePermissionRequestSchema>;
