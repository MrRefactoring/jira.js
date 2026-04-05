import { z } from 'zod';

/** Field association for example PROJECT_ID. */
export const AssociationContextObjectSchema = z.object({
  identifier: z.record(z.string(), z.any()).optional(),
  type: z.string(),
});

export type AssociationContextObject = z.infer<typeof AssociationContextObjectSchema>;
