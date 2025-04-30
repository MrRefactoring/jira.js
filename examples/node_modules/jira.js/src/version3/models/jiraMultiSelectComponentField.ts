import type { JiraComponentField } from './jiraComponentField';

export interface JiraMultiSelectComponentField {
  bulkEditMultiSelectFieldOption: 'ADD' | 'REMOVE' | 'REPLACE' | 'REMOVE_ALL' | string;
  components: JiraComponentField[];
  fieldId: string;
}
