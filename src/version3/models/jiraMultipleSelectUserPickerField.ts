import type { JiraUserField } from './jiraUserField';

export interface JiraMultipleSelectUserPickerField {
  fieldId: string;
  users?: JiraUserField[];
}
