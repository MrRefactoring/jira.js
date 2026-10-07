import { z } from 'zod';

export const DeleteSharePermissionSchema = z.object({
  /** The filter id. */
  id: z.number(),
  permissionId: z.number(),
});

export type DeleteSharePermission = z.input<typeof DeleteSharePermissionSchema>;
