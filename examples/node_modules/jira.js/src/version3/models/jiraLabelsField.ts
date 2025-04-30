import type { JiraLabelsInput } from './jiraLabelsInput';

export interface JiraLabelsField {
  bulkEditMultiSelectFieldOption: 'ADD' | 'REMOVE' | 'REPLACE' | 'REMOVE_ALL' | string;
  fieldId: string;
  labels: JiraLabelsInput[];
}
