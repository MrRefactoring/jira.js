import { z } from 'zod';

export const LegacyJackson1ListVersionSchema = z.object({});

export type LegacyJackson1ListVersion = z.infer<typeof LegacyJackson1ListVersionSchema>;
