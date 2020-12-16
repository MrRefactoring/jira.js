import { IssueLinkType } from './issueLinkType';
import { LinkedIssue, LinkedIssue } from './linkedIssue';

/**
 * Details of a link between issues. */
export interface IssueLink {
  /** The ID of the issue link. */
  id?: string;
  /** The URL of the issue link. */
  self?: string;
  /** The type of link between the issues. */
  type: IssueLinkType[];
  /** The issue the link joins to. */
  inwardIssue: LinkedIssue[];
  /** The issue the link originates from. */
  outwardIssue: LinkedIssue[];
}
