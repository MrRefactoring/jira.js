import { z } from 'zod';

export const GetPropertiesKeysSchema = z.object({
  /** The ID of the sprint from which property keys will be returned. */
  sprintId: z.string(),
});

export type GetPropertiesKeys = z.input<typeof GetPropertiesKeysSchema>;
