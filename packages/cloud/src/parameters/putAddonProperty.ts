import { z } from 'zod';

export const PutAddonPropertySchema = z.object({
  /** The key of the app, as defined in its descriptor. */
  addonKey: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
  body: z.record(z.string(), z.any()),
});

export type PutAddonProperty = z.input<typeof PutAddonPropertySchema>;
