import { z } from 'zod';

/** A screen scheme. */
export const ScreenSchemeSchema = z.object({
  /** The description of the screen scheme. */
  description: z.string().optional(),
  /** The ID of the screen scheme. */
  id: z.number().int().optional(),
  /** Details of the issue type screen schemes associated with the screen scheme. */
  issueTypeScreenSchemes: z.unknown().optional(),
  /** The name of the screen scheme. */
  name: z.string().optional(),
  /** The IDs of the screens for the screen types of the screen scheme. */
  screens: z.unknown().optional(),
});

export type ScreenScheme = z.infer<typeof ScreenSchemeSchema>;
