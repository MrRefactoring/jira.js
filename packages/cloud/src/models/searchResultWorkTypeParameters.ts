import { z } from 'zod';

export const SearchResultWorkTypeParametersSchema = z.object({
  description: z.string().optional(),
  isRequired: z.boolean().optional(),
  workTypeId: z.string().optional(),
});

export type SearchResultWorkTypeParameters = z.infer<typeof SearchResultWorkTypeParametersSchema>;
