import { z } from 'zod';

/** Field association for example PROJECT_ID. */
export const AssociationContextObjectSchema = z.object({
  identifier: z.object({}).optional(),
  type: z.string(),
});

export type AssociationContextObject = z.infer<typeof AssociationContextObjectSchema>;
