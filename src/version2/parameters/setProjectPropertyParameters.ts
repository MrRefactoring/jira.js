import { z } from 'zod';

export const SetProjectPropertyParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /** The key of the project property. The maximum length is 255 characters. */
  propertyKey: z.string(),
});

export type SetProjectPropertyParameters = z.infer<typeof SetProjectPropertyParametersSchema>;
