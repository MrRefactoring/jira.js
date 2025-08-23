import { z } from 'zod';
import { IssueEventSchema } from './issueEvent';

export const LegacyJackson1ListIssueEventSchema = z.array(IssueEventSchema);

export type LegacyJackson1ListIssueEvent = z.infer<typeof LegacyJackson1ListIssueEventSchema>;
