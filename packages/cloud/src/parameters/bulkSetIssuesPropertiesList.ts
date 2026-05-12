import { z } from 'zod';
import { IssueEntityPropertiesSchema } from '../models';

export const BulkSetIssuesPropertiesListSchema = z.object({}).extend(IssueEntityPropertiesSchema.shape);

export type BulkSetIssuesPropertiesList = z.input<typeof BulkSetIssuesPropertiesListSchema>;
