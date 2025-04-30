import type { OldToNewSecurityLevelMappings } from '../models';

/** Issue security scheme, project, and remapping details. */
export interface AssociateSchemesToProjects {
  /** The list of scheme levels which should be remapped to new levels of the issue security scheme. */
  oldToNewSecurityLevelMappings?: OldToNewSecurityLevelMappings[];
  /** The ID of the project. */
  projectId: string;
  /** The ID of the issue security scheme. Providing null will clear the association with the issue security scheme. */
  schemeId: string;
}
