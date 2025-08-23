import { z } from 'zod';

export const CreatePermissionRequestSchema = z.object({
  /** The permission holder. */
  holder: z.unknown(),
  /** The permission type. This must be "View" or "Edit". */
  type: z.enum(['View', 'Edit']),
});

export type CreatePermissionRequest = z.infer<typeof CreatePermissionRequestSchema>;
