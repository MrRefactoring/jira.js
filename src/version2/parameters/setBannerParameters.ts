import { z } from 'zod';

export const SetBannerParametersSchema = z.object({
  /** Flag indicating if the announcement banner can be dismissed by the user. */
  isDismissible: z.boolean().optional(),
  /** Flag indicating if the announcement banner is enabled or not. */
  isEnabled: z.boolean().optional(),
  /** The text on the announcement banner. */
  message: z.string().optional(),
  /** Visibility of the announcement banner. Can be public or private. */
  visibility: z.string().optional(),
});

export type SetBannerParameters = z.infer<typeof SetBannerParametersSchema>;
