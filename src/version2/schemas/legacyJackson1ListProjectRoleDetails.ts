import { z } from 'zod';
import { ProjectRoleDetailsSchema } from './projectRoleDetails';

export const LegacyJackson1ListProjectRoleDetailsSchema = z.array(ProjectRoleDetailsSchema);

export type LegacyJackson1ListProjectRoleDetails = z.infer<typeof LegacyJackson1ListProjectRoleDetailsSchema>;
