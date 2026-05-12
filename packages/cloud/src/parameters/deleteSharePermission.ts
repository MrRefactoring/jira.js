import { z } from 'zod';

export const DeleteSharePermissionSchema = z.object({
  /** The ID of the filter. */
  id: z.number(),
  /** The ID of the share permission. */
  permissionId: z.number(),
});

export type DeleteSharePermission = z.input<typeof DeleteSharePermissionSchema>;
