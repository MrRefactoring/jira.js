import { z } from 'zod';
import { SearchRequestSchema } from '../models';

export const SearchUsingSearchRequestSchema = z.object(SearchRequestSchema.shape);

export type SearchUsingSearchRequest = z.input<typeof SearchUsingSearchRequestSchema>;
