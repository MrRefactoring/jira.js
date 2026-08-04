import { z } from 'zod';

export const GetSharePermissionsSchema = z.object({
  /** The ID of the filter. */
  id: z.number(),
});

export type GetSharePermissions = z.input<typeof GetSharePermissionsSchema>;
