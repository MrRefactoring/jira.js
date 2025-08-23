import { z } from 'zod';
import { ProjectScopeBeanSchema } from './projectScopeBean';

export const IssueFieldOptionScopeBeanSchema = z.object({
  /**
   * Defines the behavior of the option within the global context. If this property is set, even if set to an empty
   * object, then the option is available in all projects.
   */
  global: z.unknown().optional(),
  /** DEPRECATED */
  projects: z.array(z.number().int()).optional(),
  /**
   * Defines the projects in which the option is available and the behavior of the option within each project. Specify
   * one object per project. The behavior of the option in a project context overrides the behavior in the global
   * context.
   */
  projects2: z.array(ProjectScopeBeanSchema).optional(),
});

export type IssueFieldOptionScopeBean = z.infer<typeof IssueFieldOptionScopeBeanSchema>;
