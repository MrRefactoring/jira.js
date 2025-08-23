import { z } from 'zod';

export const DeleteForgeAppPropertyParametersSchema = z.object({
  /** The key of the property. */
  propertyKey: z.string(),
});

export type DeleteForgeAppPropertyParameters = z.infer<typeof DeleteForgeAppPropertyParametersSchema>;
