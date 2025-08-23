import { z } from 'zod';

/** The ID of a screen scheme. */
export const UpdateDefaultScreenSchemeSchema = z.object({
  /** The ID of the screen scheme. */
  screenSchemeId: z.string(),
});

export type UpdateDefaultScreenScheme = z.infer<typeof UpdateDefaultScreenSchemeSchema>;
