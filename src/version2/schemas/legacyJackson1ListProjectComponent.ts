import { z } from 'zod';
import { ProjectComponentSchema } from './projectComponent';

export const LegacyJackson1ListProjectComponentSchema = z.array(ProjectComponentSchema);

export type LegacyJackson1ListProjectComponent = z.infer<typeof LegacyJackson1ListProjectComponentSchema>;
