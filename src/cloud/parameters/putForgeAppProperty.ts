import { z } from 'zod';

export const PutForgeAppPropertySchema = z.object({
  /** The key of the property. */
  propertyKey: z.string(),
  body: z.record(z.string(), z.any()),
});

export type PutForgeAppProperty = z.input<typeof PutForgeAppPropertySchema>;
