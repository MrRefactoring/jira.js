import { z } from 'zod';

export const DeleteScreenSchemeSchema = z.object({
  /** The ID of the screen scheme. */
  screenSchemeId: z.string(),
});

export type DeleteScreenScheme = z.input<typeof DeleteScreenSchemeSchema>;
