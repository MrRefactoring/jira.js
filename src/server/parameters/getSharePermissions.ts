import { z } from 'zod';

export const GetSharePermissionsSchema = z.object({
  /** The filter id. */
  id: z.string(),
});

export type GetSharePermissions = z.input<typeof GetSharePermissionsSchema>;
