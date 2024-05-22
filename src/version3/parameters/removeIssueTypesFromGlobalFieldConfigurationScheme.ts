import type { IssueTypeIdsToRemove } from '../models/index.js';

export interface RemoveIssueTypesFromGlobalFieldConfigurationScheme extends IssueTypeIdsToRemove {
  /** The ID of the field configuration scheme. */
  id: number;
}
