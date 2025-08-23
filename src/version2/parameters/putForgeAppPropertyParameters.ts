import { z } from 'zod';

export const PutForgeAppPropertyParametersSchema = z.object({
  /** The key of the property. */
  propertyKey: z.string(),
});

export type PutForgeAppPropertyParameters = z.infer<typeof PutForgeAppPropertyParametersSchema>;
