import { z } from 'zod';

export const GetPermissionResponseSchema = z.object({
  /** The permission holder. */
  holder: z.unknown(),
  /** The permission type. This is "View" or "Edit". */
  type: z.enum(['View', 'Edit']),
});

export type GetPermissionResponse = z.infer<typeof GetPermissionResponseSchema>;
