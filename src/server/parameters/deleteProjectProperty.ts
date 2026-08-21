import { z } from 'zod';

export const DeleteProjectPropertySchema = z.object({
  /** The key of the property to remove. */
  propertyKey: z.string(),
  /** The project from which the property will be removed. */
  projectIdOrKey: z.string(),
});

export type DeleteProjectProperty = z.input<typeof DeleteProjectPropertySchema>;
