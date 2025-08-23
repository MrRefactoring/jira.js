import { z } from 'zod';
import { IssueTypeWithStatusSchema } from './issueTypeWithStatus';

export const LegacyJackson1ListIssueTypeWithStatusSchema = z.array(IssueTypeWithStatusSchema);

export type LegacyJackson1ListIssueTypeWithStatus = z.infer<typeof LegacyJackson1ListIssueTypeWithStatusSchema>;
