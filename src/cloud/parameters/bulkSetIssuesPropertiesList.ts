import { z } from 'zod';
import { IssueEntityPropertiesSchema } from '../models';

export const BulkSetIssuesPropertiesListSchema = z.object(IssueEntityPropertiesSchema.shape);

export type BulkSetIssuesPropertiesList = z.input<typeof BulkSetIssuesPropertiesListSchema>;
