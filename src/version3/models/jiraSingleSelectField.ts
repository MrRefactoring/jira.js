import type { JiraSelectedOptionField } from './jiraSelectedOptionField';

/**
 * Add or clear a single select field:*
 *
 * - To add, specify the option with an `optionId`.
 * - To clear, pass an option with `optionId` as `-1`.
 */
export interface JiraSingleSelectField {
  fieldId: string;
  option: JiraSelectedOptionField;
}
