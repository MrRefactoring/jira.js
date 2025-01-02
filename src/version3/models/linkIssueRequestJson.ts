import type { Comment } from './comment.js';
import type { IssueLinkType } from './issueLinkType.js';
import type { LinkedIssue } from './linkedIssue.js';

export interface LinkIssueRequestJson {
  type: IssueLinkType;
  inwardIssue: LinkedIssue;
  outwardIssue: LinkedIssue;
  comment?: Comment;
}
