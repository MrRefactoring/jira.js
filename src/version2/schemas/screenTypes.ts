import { z } from 'zod';

/** The IDs of the screens for the screen types of the screen scheme. */
export const ScreenTypesSchema = z.object({
  /** The ID of the create screen. */
  create: z.number().int().optional(),
  /** The ID of the default screen. Required when creating a screen scheme. */
  default: z.number().int(),
  /** The ID of the edit screen. */
  edit: z.number().int().optional(),
  /** The ID of the view screen. */
  view: z.number().int().optional(),
});

export type ScreenTypes = z.infer<typeof ScreenTypesSchema>;
