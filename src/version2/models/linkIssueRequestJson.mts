import type { Comment } from './comment.mjs';
import { IssueLinkType } from './issueLinkType.mjs';
import { LinkedIssue } from './linkedIssue.mjs';

export interface LinkIssueRequestJson {
  comment?: Comment;
  inwardIssue: LinkedIssue;
  outwardIssue: LinkedIssue;
  type: IssueLinkType;
}
