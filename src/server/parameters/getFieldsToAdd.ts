import { z } from 'zod';

export const GetFieldsToAddSchema = z.object({
  /** Id of screen */
  screenId: z.number(),
});

export type GetFieldsToAdd = z.input<typeof GetFieldsToAddSchema>;
