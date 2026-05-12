import { z } from 'zod';

export const GetSharePermissionSchema = z.object({
  /** The ID of the filter. */
  id: z.number(),
  /** The ID of the share permission. */
  permissionId: z.number(),
});

export type GetSharePermission = z.input<typeof GetSharePermissionSchema>;
