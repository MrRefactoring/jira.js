import type { SecurityLevel } from './securityLevel.js';

/** List of issue level security items in a project. */
export interface ProjectIssueSecurityLevels {
  /** Issue level security items list. */
  levels: SecurityLevel[];
}
