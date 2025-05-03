import type { JiraVersionField } from './jiraVersionField';

export interface JiraMultipleVersionPickerField {
  bulkEditMultiSelectFieldOption: 'ADD' | 'REMOVE' | 'REPLACE' | 'REMOVE_ALL' | string;
  fieldId: string;
  versions: JiraVersionField[];
}
