import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/** The payload for creating issue type schemes */
export interface IssueTypeSchemePayload {
  defaultIssueTypeId?: ProjectCreateResourceIdentifier;
  /** The description of the issue type scheme */
  description?: string;
  /** The issue type IDs for the issue type scheme */
  issueTypeIds?: ProjectCreateResourceIdentifier[];
  /** The name of the issue type scheme */
  name?: string;
  pcri?: ProjectCreateResourceIdentifier;
}
