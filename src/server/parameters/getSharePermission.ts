import { z } from 'zod';

export const GetSharePermissionSchema = z.object({
  /** The permission id. */
  permissionId: z.number(),
  /** The filter id. */
  id: z.number(),
});

export type GetSharePermission = z.input<typeof GetSharePermissionSchema>;
