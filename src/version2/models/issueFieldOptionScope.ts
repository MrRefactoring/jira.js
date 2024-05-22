import type { GlobalScope } from './globalScope.js';
import type { ProjectScope } from './projectScope.js';

export interface IssueFieldOptionScope {
  global?: GlobalScope;
  /**
   * Defines the projects in which the option is available and the behavior of the option within each project. Specify
   * one object per project. The behavior of the option in a project context overrides the behavior in the global
   * context.
   */
  projects2?: ProjectScope[];
}
