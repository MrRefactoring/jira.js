import { z } from 'zod';

export const DeleteAddonPropertySchema = z.object({
  /** The key of the app, as defined in its descriptor. */
  addonKey: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
});

export type DeleteAddonProperty = z.input<typeof DeleteAddonPropertySchema>;
