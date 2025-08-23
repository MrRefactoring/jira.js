import { z } from 'zod';

export const ServicesParametersSchema = z.object({
  /** The ID of the services (the strings starting with "b:" need to be decoded in Base64). */
  serviceIds: z.array(z.string()),
});

export type ServicesParameters = z.infer<typeof ServicesParametersSchema>;
