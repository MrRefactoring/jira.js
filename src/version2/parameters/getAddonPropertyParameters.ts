import { z } from 'zod';

export const GetAddonPropertyParametersSchema = z.object({
  /** The key of the app, as defined in its descriptor. */
  addonKey: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
});

export type GetAddonPropertyParameters = z.infer<typeof GetAddonPropertyParametersSchema>;
