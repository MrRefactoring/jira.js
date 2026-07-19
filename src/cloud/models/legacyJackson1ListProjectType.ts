import { z } from 'zod';
import { ProjectTypeSchema } from './projectType';

export const LegacyJackson1ListProjectTypeSchema = z.array(ProjectTypeSchema);

export type LegacyJackson1ListProjectType = z.infer<typeof LegacyJackson1ListProjectTypeSchema>;
