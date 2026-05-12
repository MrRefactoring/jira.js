import { z } from 'zod';

export const LegacyJackson1ListProjectRoleDetailsSchema = z.object({});

export type LegacyJackson1ListProjectRoleDetails = z.infer<typeof LegacyJackson1ListProjectRoleDetailsSchema>;
