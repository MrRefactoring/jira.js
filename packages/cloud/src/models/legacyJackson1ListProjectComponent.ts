import { z } from 'zod';

export const LegacyJackson1ListProjectComponentSchema = z.object({});

export type LegacyJackson1ListProjectComponent = z.infer<typeof LegacyJackson1ListProjectComponentSchema>;
