import type { IssueTypeIdsToRemove } from '../models';

export interface RemoveIssueTypesFromGlobalFieldConfigurationScheme extends IssueTypeIdsToRemove {
  /** The ID of the field configuration scheme. */
  id: number;
}
