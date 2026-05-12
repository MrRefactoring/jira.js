import { z } from 'zod';
import { CreatePermissionHolderRequestSchema } from '#/models/createPermissionHolderRequest';

export const CreatePermissionRequestSchema = z.object({
  holder: CreatePermissionHolderRequestSchema.optional(),
  /** The permission type. This must be "View" or "Edit". */
  type: z.enum(['View', 'Edit']),
});

export type CreatePermissionRequest = z.infer<typeof CreatePermissionRequestSchema>;
