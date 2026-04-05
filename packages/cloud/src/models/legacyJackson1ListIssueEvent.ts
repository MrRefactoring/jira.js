import { z } from 'zod';

export const LegacyJackson1ListIssueEventSchema = z.object({});

export type LegacyJackson1ListIssueEvent = z.infer<typeof LegacyJackson1ListIssueEventSchema>;
