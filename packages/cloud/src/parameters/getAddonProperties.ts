import { z } from 'zod';

export const GetAddonPropertiesSchema = z.object({
  /** The key of the app, as defined in its descriptor. */
  addonKey: z.string(),
});

export type GetAddonProperties = z.input<typeof GetAddonPropertiesSchema>;
