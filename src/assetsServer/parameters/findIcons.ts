import { z } from 'zod';

export const FindIconsSchema = z.object({
  /** The ID of the object schema. */
  id: z.string(),
});

export type FindIcons = z.input<typeof FindIconsSchema>;
