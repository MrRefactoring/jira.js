import { SecurityLevel } from './securityLevel';

/**
 * List of issue level security items in a project. */
export interface ProjectIssueSecurityLevels {
  /** Issue level security items list. */
  levels: SecurityLevel[];
}
