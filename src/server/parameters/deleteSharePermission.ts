import { z } from 'zod';

export const DeleteSharePermissionSchema = z.object({
  /** The filter id. */
  id: z.string(),
  permissionId: z.string(),
});

export type DeleteSharePermission = z.input<typeof DeleteSharePermissionSchema>;
