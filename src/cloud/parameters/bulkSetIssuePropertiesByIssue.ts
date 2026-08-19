import { z } from 'zod';
import { MultiIssueEntityPropertiesSchema } from '../models';

export const BulkSetIssuePropertiesByIssueSchema = z.object(MultiIssueEntityPropertiesSchema.shape);

export type BulkSetIssuePropertiesByIssue = z.input<typeof BulkSetIssuePropertiesByIssueSchema>;
