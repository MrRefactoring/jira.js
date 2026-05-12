import { z } from 'zod';

export const LegacyJackson1ListIssueTypeWithStatusSchema = z.object({});

export type LegacyJackson1ListIssueTypeWithStatus = z.infer<typeof LegacyJackson1ListIssueTypeWithStatusSchema>;
