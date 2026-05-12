import { z } from 'zod';

export const LegacyJackson1ListColumnItemSchema = z.object({});

export type LegacyJackson1ListColumnItem = z.infer<typeof LegacyJackson1ListColumnItemSchema>;
