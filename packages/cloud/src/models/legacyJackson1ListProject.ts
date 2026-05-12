import { z } from 'zod';

export const LegacyJackson1ListProjectSchema = z.object({});

export type LegacyJackson1ListProject = z.infer<typeof LegacyJackson1ListProjectSchema>;
