import { z } from 'zod';

export const GetRefinedVelocitySchema = z.object({
  /** The id of the board from which the settings will be returned. */
  boardId: z.number(),
});

export type GetRefinedVelocity = z.input<typeof GetRefinedVelocitySchema>;
