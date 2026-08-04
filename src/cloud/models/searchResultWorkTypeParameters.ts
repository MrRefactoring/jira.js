import { z } from 'zod';
import { apiObject } from '#/core';

export const SearchResultWorkTypeParametersSchema = apiObject({
  description: z.string().optional(),
  isRequired: z.boolean().optional(),
  rendererType: z.string().optional(),
  workTypeId: z.string().optional(),
});

export type SearchResultWorkTypeParameters = z.infer<typeof SearchResultWorkTypeParametersSchema>;
