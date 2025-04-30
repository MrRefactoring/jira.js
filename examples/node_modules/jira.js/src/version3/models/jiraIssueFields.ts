import type { JiraCascadingSelectField } from './jiraCascadingSelectField';
import type { JiraNumberField } from './jiraNumberField';
import type { JiraColorField } from './jiraColorField';
import type { JiraDateField } from './jiraDateField';
import type { JiraDateTimeField } from './jiraDateTimeField';
import type { JiraIssueTypeField } from './jiraIssueTypeField';
import type { JiraLabelsField } from './jiraLabelsField';
import type { JiraMultipleGroupPickerField } from './jiraMultipleGroupPickerField';
import type { JiraMultipleSelectUserPickerField } from './jiraMultipleSelectUserPickerField';
import type { JiraMultipleSelectField } from './jiraMultipleSelectField';
import type { JiraMultipleVersionPickerField } from './jiraMultipleVersionPickerField';
import type { JiraMultiSelectComponentField } from './jiraMultiSelectComponentField';
import type { JiraDurationField } from './jiraDurationField';
import type { JiraPriorityField } from './jiraPriorityField';
import type { JiraRichTextField } from './jiraRichTextField';
import type { JiraSingleGroupPickerField } from './jiraSingleGroupPickerField';
import type { JiraSingleLineTextField } from './jiraSingleLineTextField';
import type { JiraSingleSelectUserPickerField } from './jiraSingleSelectUserPickerField';
import type { JiraSingleSelectField } from './jiraSingleSelectField';
import type { JiraSingleVersionPickerField } from './jiraSingleVersionPickerField';
import type { JiraTimeTrackingField } from './jiraTimeTrackingField';
import type { JiraUrlField } from './jiraUrlField';

export interface JiraIssueFields {
  /**
   * Add or clear a cascading select field:
   *
   * - To add, specify `optionId` for both parent and child.
   * - To clear the child, set its `optionId` to null.
   * - To clear both, set the parent's `optionId` to null.
   */
  cascadingSelectFields?: JiraCascadingSelectField[];
  /**
   * Add or clear a number field:
   *
   * - To add, specify a numeric `value`.
   * - To clear, set `value` to `null`.
   */
  clearableNumberFields?: JiraNumberField[];
  /**
   * Add or clear a color field:
   *
   * - To add, specify the color `name`. Available colors are: `purple`, `blue`, `green`, `teal`, `yellow`, `orange`,
   *   `grey`, `dark purple`, `dark blue`, `dark green`, `dark teal`, `dark yellow`, `dark orange`, `dark grey`.
   * - To clear, set the color `name` to an empty string.
   */
  colorFields?: JiraColorField[];
  /**
   * Add or clear a date picker field:
   *
   * - To add, specify the date in `d/mmm/yy` format or ISO format `dd-mm-yyyy`.
   * - To clear, set `formattedDate` to an empty string.
   */
  datePickerFields?: JiraDateField[];
  /**
   * Add or clear the planned start date and time:
   *
   * - To add, specify the date and time in ISO format for `formattedDateTime`.
   * - To clear, provide an empty string for `formattedDateTime`.
   */
  dateTimePickerFields?: JiraDateTimeField[];
  issueType?: JiraIssueTypeField;
  /**
   * Edit a labels field:
   *
   * - Options include `ADD`, `REPLACE`, `REMOVE`, or `REMOVE_ALL` for bulk edits.
   * - To clear labels, use the `REMOVE_ALL` option with an empty `labels` array.
   */
  labelsFields?: JiraLabelsField[];
  /**
   * Add or clear a multi-group picker field:
   *
   * - To add groups, provide an array of groups with `groupName`s.
   * - To clear all groups, use an empty `groups` array.
   */
  multipleGroupPickerFields?: JiraMultipleGroupPickerField[];
  /**
   * Assign or unassign multiple users to/from a field:
   *
   * - To assign, provide an array of user `accountId`s.
   * - To clear, set `users` to `null`.
   */
  multipleSelectClearableUserPickerFields?: JiraMultipleSelectUserPickerField[];
  /**
   * Add or clear a multi-select field:
   *
   * - To add, provide an array of options with `optionId`s.
   * - To clear, use an empty `options` array.
   */
  multipleSelectFields?: JiraMultipleSelectField[];
  /**
   * Edit a multi-version picker field like Fix Versions/Affects Versions:
   *
   * - Options include `ADD`, `REPLACE`, `REMOVE`, or `REMOVE_ALL` for bulk edits.
   * - To clear the field, use the `REMOVE_ALL` option with an empty `versions` array.
   */
  multipleVersionPickerFields?: JiraMultipleVersionPickerField[];
  multiselectComponents?: JiraMultiSelectComponentField;
  originalEstimateField?: JiraDurationField;
  priority?: JiraPriorityField;
  /**
   * Add or clear a rich text field:
   *
   * - To add, provide `adfValue`. Note that rich text fields only support ADF values.
   * - To clear, use an empty `richText` object.
   *
   *   For ADF format details, refer to: [Atlassian Document
   *   Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure).
   */
  richTextFields?: JiraRichTextField[];
  /**
   * Add or clear a single group picker field:
   *
   * - To add, specify the group with `groupName`.
   * - To clear, set `groupName` to an empty string.
   */
  singleGroupPickerFields?: JiraSingleGroupPickerField[];
  /**
   * Add or clear a single line text field:
   *
   * - To add, provide the `text` value.
   * - To clear, set `text` to an empty string.
   */
  singleLineTextFields?: JiraSingleLineTextField[];
  /**
   * Edit assignment for single select user picker fields like Assignee/Reporter:
   *
   * - To assign an issue, specify the user's `accountId`.
   * - To unassign an issue, set `user` to `null`.
   * - For automatic assignment, set `accountId` to `-1`.
   */
  singleSelectClearableUserPickerFields?: JiraSingleSelectUserPickerField[];
  /**
   * Add or clear a single select field:
   *
   * - To add, specify the option with an `optionId`.
   * - To clear, pass an option with `optionId` as `-1`.
   */
  singleSelectFields?: JiraSingleSelectField[];
  /**
   * Add or clear a single version picker field:
   *
   * - To add, specify the version with a `versionId`.
   * - To clear, set `versionId` to `-1`.
   */
  singleVersionPickerFields?: JiraSingleVersionPickerField[];
  timeTrackingField?: JiraTimeTrackingField;
  /**
   * Add or clear a URL field:
   *
   * - To add, provide the `url` with the desired URL value.
   * - To clear, set `url` to an empty string.
   */
  urlFields?: JiraUrlField[];
}
