import { IssueLinkType } from './issueLinkType';
import { LinkedIssue } from './linkedIssue';
import { Comment } from './comment';

/** @deprecated Use LinkIssueRequestJson instead. */
export type LinkIssueRequestJsonBean = LinkIssueRequestJson;

export interface LinkIssueRequestJson {
  type: IssueLinkType;
  inwardIssue: LinkedIssue;
  outwardIssue: LinkedIssue;
  comment?: Comment;
}
