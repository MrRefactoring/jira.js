import { z } from 'zod';

export const GetAvailableScreenFieldsSchema = z.object({
  /** The ID of the screen. */
  screenId: z.number(),
});

export type GetAvailableScreenFields = z.input<typeof GetAvailableScreenFieldsSchema>;
