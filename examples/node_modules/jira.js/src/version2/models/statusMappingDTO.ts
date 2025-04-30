import type { StatusMigration } from './statusMigration';

/** The mapping of old to new status ID for a specific project and issue type. */
export interface StatusMappingDTO {
  /** The issue type for the status mapping. */
  issueTypeId: string;
  /** The project for the status mapping. */
  projectId: string;
  /** The list of old and new status ID mappings for the specified project and issue type. */
  statusMigrations: StatusMigration[];
}
