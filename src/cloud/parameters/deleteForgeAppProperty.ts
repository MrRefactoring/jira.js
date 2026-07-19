import { z } from 'zod';

export const DeleteForgeAppPropertySchema = z.object({
  /** The key of the property. */
  propertyKey: z.string(),
});

export type DeleteForgeAppProperty = z.input<typeof DeleteForgeAppPropertySchema>;
