import { z } from 'zod';
import { SearchAutoCompleteFilterSchema } from '../models';

export const GetAutoCompletePostSchema = z.object({}).extend(SearchAutoCompleteFilterSchema.shape);

export type GetAutoCompletePost = z.input<typeof GetAutoCompletePostSchema>;
