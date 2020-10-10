import { IssueLinkType } from './issueLinkType';
import { LinkedIssue } from './linkedIssue';

export interface IssueLink {
  id: string;
  self: string;
  type: IssueLinkType[];
  inwardIssue: LinkedIssue[];
  outwardIssue: LinkedIssue[];
}
