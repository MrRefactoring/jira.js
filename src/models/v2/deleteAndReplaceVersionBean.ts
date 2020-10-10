import { CustomFieldReplacement } from './customFieldReplacement';

export interface DeleteAndReplaceVersionBean {
  moveFixIssuesTo: number;
  moveAffectedIssuesTo: number;
  customFieldReplacementList: CustomFieldReplacement[];
}
