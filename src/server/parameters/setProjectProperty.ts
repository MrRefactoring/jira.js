import { z } from 'zod';

export const SetProjectPropertySchema = z.object({
  /** The key of the project's property. The maximum length of the key is 255 bytes. */
  propertyKey: z.string().max(255, 'propertyKey must be at most 255 characters'),
  /** The project on which the property will be set. */
  projectIdOrKey: z.string(),
  body: z.record(z.string(), z.any()),
});

export type SetProjectProperty = z.input<typeof SetProjectPropertySchema>;
