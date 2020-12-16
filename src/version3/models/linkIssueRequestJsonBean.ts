import { IssueLinkType } from './issueLinkType';
import { LinkedIssue, LinkedIssue } from './linkedIssue';
import { Comment } from './comment';

export interface LinkIssueRequestJsonBean {
  type: IssueLinkType;
  inwardIssue: LinkedIssue;
  outwardIssue: LinkedIssue;
  comment?: Comment;
}
