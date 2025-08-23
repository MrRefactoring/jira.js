import { z } from 'zod';

export const DeleteSharePermissionParametersSchema = z.object({
  /** The ID of the filter. */
  id: z.number().int(),
  /** The ID of the share permission. */
  permissionId: z.number().int(),
});

export type DeleteSharePermissionParameters = z.infer<typeof DeleteSharePermissionParametersSchema>;
