import { z } from 'zod';

export const SearchResultFieldParametersSchema = z.object({
  description: z.string().optional(),
  isRequired: z.boolean().optional(),
});

export type SearchResultFieldParameters = z.infer<typeof SearchResultFieldParametersSchema>;
