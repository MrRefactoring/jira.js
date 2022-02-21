import { GlobalScope } from './globalScope';
import { ProjectScope } from './projectScope';

/** @deprecated Use IssueFieldOptionScope instead. */
export type IssueFieldOptionScopeBean = IssueFieldOptionScope;

export interface IssueFieldOptionScope {
  /** @deprecated DEPRECATED */
  projects?: number[];
  /**
   * Defines the projects in which the option is available and the behavior of the option within each project. Specify
   * one object per project. The behavior of the option in a project context overrides the behavior in the global context.
   */
  projects2?: ProjectScope[];
  global?: GlobalScope;
}
