import { z } from 'zod';

export const FieldAssociationParametersSchema = z.object({
  description: z.string().optional(),
  isRequired: z.boolean(),
});

export type FieldAssociationParameters = z.infer<typeof FieldAssociationParametersSchema>;
