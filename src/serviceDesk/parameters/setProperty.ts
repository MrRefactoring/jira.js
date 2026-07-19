import { z } from 'zod';

export const SetPropertySchema = z.object({
  /** The ID of the organization on which the property will be set. */
  organizationId: z.string(),
  /** The key of the organization's property. The maximum length of the key is 255 bytes. */
  propertyKey: z.string(),
  body: z.record(z.string(), z.any()),
});

export type SetProperty = z.input<typeof SetPropertySchema>;
