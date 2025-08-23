import { z } from 'zod';

export const DeleteScreenSchemeParametersSchema = z.object({
  /** The ID of the screen scheme. */
  screenSchemeId: z.string(),
});

export type DeleteScreenSchemeParameters = z.infer<typeof DeleteScreenSchemeParametersSchema>;
