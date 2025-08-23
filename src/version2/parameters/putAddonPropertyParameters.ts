import { z } from 'zod';

export const PutAddonPropertyParametersSchema = z.object({
  /** The key of the app, as defined in its descriptor. */
  addonKey: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
});

export type PutAddonPropertyParameters = z.infer<typeof PutAddonPropertyParametersSchema>;
