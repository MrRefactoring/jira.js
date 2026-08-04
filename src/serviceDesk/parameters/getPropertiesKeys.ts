import { z } from 'zod';

export const GetPropertiesKeysSchema = z.object({
  /** The ID of the organization from which keys will be returned. */
  organizationId: z.string(),
});

export type GetPropertiesKeys = z.input<typeof GetPropertiesKeysSchema>;
