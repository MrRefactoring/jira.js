import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';
import type { IssueLayoutItemPayload } from './issueLayoutItemPayload';

/** Defines the payload to configure the issue layouts for a project. */
export interface IssueLayoutPayload {
  containerId?: ProjectCreateResourceIdentifier;
  /** The issue layout type */
  issueLayoutType?: 'ISSUE_VIEW' | 'ISSUE_CREATE' | 'REQUEST_FORM' | string;
  /** The configuration of items in the issue layout */
  items?: IssueLayoutItemPayload[];
  pcri?: ProjectCreateResourceIdentifier;
}
