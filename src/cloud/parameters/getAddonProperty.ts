import { z } from 'zod';

export const GetAddonPropertySchema = z.object({
  /** The key of the app, as defined in its descriptor. */
  addonKey: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
});

export type GetAddonProperty = z.input<typeof GetAddonPropertySchema>;
