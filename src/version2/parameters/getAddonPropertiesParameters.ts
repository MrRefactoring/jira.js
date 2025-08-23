import { z } from 'zod';

export const GetAddonPropertiesParametersSchema = z.object({
  /** The key of the app, as defined in its descriptor. */
  addonKey: z.string(),
});

export type GetAddonPropertiesParameters = z.infer<typeof GetAddonPropertiesParametersSchema>;
