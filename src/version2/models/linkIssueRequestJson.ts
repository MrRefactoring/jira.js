import { Comment } from './comment';
import { IssueLinkType } from './issueLinkType';
import { LinkedIssue } from './linkedIssue';

/** @deprecated Use {@link LinkIssueRequestJson} instead. */
export type LinkIssueRequestJsonBean = LinkIssueRequestJson;

export interface LinkIssueRequestJson {
  comment?: Comment;
  inwardIssue: LinkedIssue;
  outwardIssue: LinkedIssue;
  type: IssueLinkType;
}
