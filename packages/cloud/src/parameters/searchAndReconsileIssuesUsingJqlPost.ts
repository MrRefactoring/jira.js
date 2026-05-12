import { z } from 'zod';
import { SearchAndReconcileRequestSchema } from '../models';

export const SearchAndReconsileIssuesUsingJqlPostSchema = z.object({}).extend(SearchAndReconcileRequestSchema.shape);

export type SearchAndReconsileIssuesUsingJqlPost = z.input<typeof SearchAndReconsileIssuesUsingJqlPostSchema>;
