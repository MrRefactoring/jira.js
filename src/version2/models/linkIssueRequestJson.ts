import { Comment } from './comment';
import { IssueLinkType } from './issueLinkType';
import { LinkedIssue } from './linkedIssue';

export interface LinkIssueRequestJson {
  comment?: Comment;
  inwardIssue: LinkedIssue;
  outwardIssue: LinkedIssue;
  type: IssueLinkType;
}
