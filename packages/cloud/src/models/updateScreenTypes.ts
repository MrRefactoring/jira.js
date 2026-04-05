import { z } from 'zod';

/** The IDs of the screens for the screen types of the screen scheme. */
export const UpdateScreenTypesSchema = z.object({
  /** The ID of the create screen. To remove the screen association, pass a null. */
  create: z.string().optional(),
  /** The ID of the default screen. When specified, must include a screen ID as a default screen is required. */
  default: z.string().optional(),
  /** The ID of the edit screen. To remove the screen association, pass a null. */
  edit: z.string().optional(),
  /** The ID of the view screen. To remove the screen association, pass a null. */
  view: z.string().optional(),
});

export type UpdateScreenTypes = z.infer<typeof UpdateScreenTypesSchema>;
