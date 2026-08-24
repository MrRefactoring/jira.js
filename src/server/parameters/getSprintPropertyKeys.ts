import { z } from 'zod';

export const GetSprintPropertyKeysSchema = z.object({
  /** The id of the sprint from which property keys will be returned. */
  sprintId: z.number(),
});

export type GetSprintPropertyKeys = z.input<typeof GetSprintPropertyKeysSchema>;
