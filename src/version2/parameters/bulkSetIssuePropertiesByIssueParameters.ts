import { z } from 'zod';
import { IssueEntityPropertiesForMultiUpdateSchema } from './issueEntityPropertiesForMultiUpdate';

export const BulkSetIssuePropertiesByIssueParametersSchema = z.object({
  /** A list of issue IDs and their respective properties. */
  issues: z.array(IssueEntityPropertiesForMultiUpdateSchema).optional(),
});

export type BulkSetIssuePropertiesByIssueParameters = z.infer<typeof BulkSetIssuePropertiesByIssueParametersSchema>;
