import type { JiraSelectedOptionField } from './jiraSelectedOptionField';

export interface JiraCascadingSelectField {
  childOptionValue?: JiraSelectedOptionField;
  fieldId: string;
  parentOptionValue: JiraSelectedOptionField;
}
