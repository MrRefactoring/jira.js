import type { Comment } from './comment.mjs';
import { IssueLinkType } from './issueLinkType.mjs';
import { LinkedIssue } from './linkedIssue.mjs';

export interface LinkIssueRequestJson {
  type: IssueLinkType;
  inwardIssue: LinkedIssue;
  outwardIssue: LinkedIssue;
  comment?: Comment;
}
