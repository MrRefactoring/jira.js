import { z } from 'zod';
import { VersionSchema } from './version';

export const LegacyJackson1ListVersionSchema = z.array(VersionSchema);

export type LegacyJackson1ListVersion = z.infer<typeof LegacyJackson1ListVersionSchema>;
