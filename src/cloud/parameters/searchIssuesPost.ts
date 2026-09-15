import { z } from 'zod';
import { SearchAndReconcileRequestSchema } from '../models';

export const SearchIssuesPostSchema = z.object(SearchAndReconcileRequestSchema.shape);

export type SearchIssuesPost = z.input<typeof SearchIssuesPostSchema>;
