import { z } from 'zod';

export const GetSharePermissionsParametersSchema = z.object({
  /** The ID of the filter. */
  id: z.number().int(),
});

export type GetSharePermissionsParameters = z.infer<typeof GetSharePermissionsParametersSchema>;
