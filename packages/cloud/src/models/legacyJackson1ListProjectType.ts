import { z } from 'zod';

export const LegacyJackson1ListProjectTypeSchema = z.object({});

export type LegacyJackson1ListProjectType = z.infer<typeof LegacyJackson1ListProjectTypeSchema>;
