import { z } from 'zod';

export const GetIconSchema = z.object({
  /** The ID of the icon. */
  id: z.string(),
});

export type GetIcon = z.input<typeof GetIconSchema>;
