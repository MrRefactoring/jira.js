import { z } from 'zod';

export const GetProjectPropertySchema = z.object({
  /** The key of the property to return. */
  propertyKey: z.string(),
  /** The project from which the property will be returned. */
  projectIdOrKey: z.string(),
});

export type GetProjectProperty = z.input<typeof GetProjectPropertySchema>;
