import type { Comment } from './comment';
import type { IssueLinkType } from './issueLinkType';
import type { LinkedIssue } from './linkedIssue';

export interface LinkIssueRequestJson {
  comment?: Comment;
  inwardIssue: LinkedIssue;
  outwardIssue: LinkedIssue;
  type: IssueLinkType;
}
