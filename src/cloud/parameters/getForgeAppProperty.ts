import { z } from 'zod';

export const GetForgeAppPropertySchema = z.object({
  /** The key of the property. */
  propertyKey: z.string(),
});

export type GetForgeAppProperty = z.input<typeof GetForgeAppPropertySchema>;
