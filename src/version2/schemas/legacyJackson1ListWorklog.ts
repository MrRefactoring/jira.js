import { z } from 'zod';
import { WorklogSchema } from './worklog';

export const LegacyJackson1ListWorklogSchema = z.array(WorklogSchema);

export type LegacyJackson1ListWorklog = z.infer<typeof LegacyJackson1ListWorklogSchema>;
