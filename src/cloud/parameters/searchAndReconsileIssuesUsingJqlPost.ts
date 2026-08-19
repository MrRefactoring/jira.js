import { z } from 'zod';
import { SearchAndReconcileRequestSchema } from '../models';

export const SearchAndReconsileIssuesUsingJqlPostSchema = z.object(SearchAndReconcileRequestSchema.shape);

export type SearchAndReconsileIssuesUsingJqlPost = z.input<typeof SearchAndReconsileIssuesUsingJqlPostSchema>;
