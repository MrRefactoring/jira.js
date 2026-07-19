import { z } from 'zod';
import { ProjectSchema } from './project';

export const LegacyJackson1ListProjectSchema = z.array(ProjectSchema);

export type LegacyJackson1ListProject = z.infer<typeof LegacyJackson1ListProjectSchema>;
