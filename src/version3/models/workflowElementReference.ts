import type { ProjectAndIssueTypePair } from './projectAndIssueTypePair';

/** A reference to the location of the error. This will be null if the error does not refer to a specific element. */
export interface WorkflowElementReference {
  /** A property key. */
  propertyKey?: string;
  /** A rule ID. */
  ruleId?: string;
  statusMappingReference?: ProjectAndIssueTypePair;
  /** A status reference. */
  statusReference?: string;
  /** A transition ID. */
  transitionId?: string;
}
