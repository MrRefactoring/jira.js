import { z } from 'zod';
import { apiObject } from '#/core';

export const SearchResultFieldParametersSchema = apiObject({
  description: z.string().optional(),
  isRequired: z.boolean().optional(),
  rendererType: z.string().optional(),
});

export type SearchResultFieldParameters = z.infer<typeof SearchResultFieldParametersSchema>;
