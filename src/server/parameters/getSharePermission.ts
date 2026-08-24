import { z } from 'zod';

export const GetSharePermissionSchema = z.object({
  /** The permission id. */
  permissionId: z.string(),
  /** The filter id. */
  id: z.string(),
});

export type GetSharePermission = z.input<typeof GetSharePermissionSchema>;
