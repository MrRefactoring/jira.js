import { z } from 'zod';
import { apiObject } from '#/core';
import { GlobalScopeSchema } from './globalScope';
import { ProjectScopeSchema } from './projectScope';

export const IssueFieldOptionScopeSchema = apiObject({
  global: GlobalScopeSchema.optional(),
  /** DEPRECATED */
  projects: z.array(z.number()).optional(),
  /**
   * Defines the projects in which the option is available and the behavior of the option within each project. Specify
   * one object per project. The behavior of the option in a project context overrides the behavior in the global
   * context.
   */
  projects2: z.array(ProjectScopeSchema).optional(),
});

export type IssueFieldOptionScope = z.infer<typeof IssueFieldOptionScopeSchema>;
