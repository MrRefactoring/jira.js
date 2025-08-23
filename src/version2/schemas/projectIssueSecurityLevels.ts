import { z } from 'zod';
import { SecurityLevelSchema } from './securityLevel';

/** List of issue level security items in a project. */
export const ProjectIssueSecurityLevelsSchema = z.object({
  /** Issue level security items list. */
  levels: z.array(SecurityLevelSchema),
});

export type ProjectIssueSecurityLevels = z.infer<typeof ProjectIssueSecurityLevelsSchema>;
