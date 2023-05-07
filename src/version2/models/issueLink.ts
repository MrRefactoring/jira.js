import { IssueLinkType } from './issueLinkType';
import { LinkedIssue } from './linkedIssue';

/** Details of a link between issues. */
export interface IssueLink {
  /** The ID of the issue link. */
  id?: string;
  inwardIssue?: LinkedIssue;
  outwardIssue?: LinkedIssue;
  /** The URL of the issue link. */
  self?: string;
  type?: IssueLinkType;
}
