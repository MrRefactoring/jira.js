import { z } from 'zod';

export const LegacyJackson1ListWorklogSchema = z.object({});

export type LegacyJackson1ListWorklog = z.infer<typeof LegacyJackson1ListWorklogSchema>;
