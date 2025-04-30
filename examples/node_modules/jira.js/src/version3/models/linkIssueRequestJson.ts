import type { Comment } from './comment';
import type { IssueLinkType } from './issueLinkType';
import type { LinkedIssue } from './linkedIssue';

export interface LinkIssueRequestJson {
  type: IssueLinkType;
  inwardIssue: LinkedIssue;
  outwardIssue: LinkedIssue;
  comment?: Comment;
}
