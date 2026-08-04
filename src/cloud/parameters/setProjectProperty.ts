import { z } from 'zod';

export const SetProjectPropertySchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /** The key of the project property. The maximum length is 255 characters. */
  propertyKey: z.string(),
  body: z.record(z.string(), z.any()),
});

export type SetProjectProperty = z.input<typeof SetProjectPropertySchema>;
