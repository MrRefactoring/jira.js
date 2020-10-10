import { Comment } from './comment';
import { IssueLinkType } from './issueLinkType';
import { LinkedIssue } from './linkedIssue';

export interface LinkIssueRequestJsonBean {
  type: IssueLinkType[];
  inwardIssue: LinkedIssue[];
  outwardIssue: LinkedIssue[];
  comment: Comment[];
}
