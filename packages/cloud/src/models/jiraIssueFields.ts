import { z } from 'zod';
import { JiraCascadingSelectFieldSchema } from '#/models/jiraCascadingSelectField';
import { JiraNumberFieldSchema } from '#/models/jiraNumberField';
import { JiraColorFieldSchema } from '#/models/jiraColorField';
import { JiraDateFieldSchema } from '#/models/jiraDateField';
import { JiraDateTimeFieldSchema } from '#/models/jiraDateTimeField';
import { JiraIssueTypeFieldSchema } from '#/models/jiraIssueTypeField';
import { JiraLabelsFieldSchema } from '#/models/jiraLabelsField';
import { JiraMultipleGroupPickerFieldSchema } from '#/models/jiraMultipleGroupPickerField';
import { JiraMultipleSelectUserPickerFieldSchema } from '#/models/jiraMultipleSelectUserPickerField';
import { JiraMultipleSelectFieldSchema } from '#/models/jiraMultipleSelectField';
import { JiraMultipleVersionPickerFieldSchema } from '#/models/jiraMultipleVersionPickerField';
import { JiraMultiSelectComponentFieldSchema } from '#/models/jiraMultiSelectComponentField';
import { JiraDurationFieldSchema } from '#/models/jiraDurationField';
import { JiraPriorityFieldSchema } from '#/models/jiraPriorityField';
import { JiraRichTextFieldSchema } from '#/models/jiraRichTextField';
import { JiraSingleGroupPickerFieldSchema } from '#/models/jiraSingleGroupPickerField';
import { JiraSingleLineTextFieldSchema } from '#/models/jiraSingleLineTextField';
import { JiraSingleSelectUserPickerFieldSchema } from '#/models/jiraSingleSelectUserPickerField';
import { JiraSingleSelectFieldSchema } from '#/models/jiraSingleSelectField';
import { JiraSingleVersionPickerFieldSchema } from '#/models/jiraSingleVersionPickerField';
import { JiraStatusInputSchema } from '#/models/jiraStatusInput';
import { JiraTimeTrackingFieldSchema } from '#/models/jiraTimeTrackingField';
import { JiraUrlFieldSchema } from '#/models/jiraUrlField';

export const JiraIssueFieldsSchema = z.object({
  /**
   * Add or clear a cascading select field:
   *
   * - To add, specify `optionId` for both parent and child.
   * - To clear the child, set its `optionId` to null.
   * - To clear both, set the parent's `optionId` to null.
   */
  cascadingSelectFields: z.array(JiraCascadingSelectFieldSchema).optional(),
  /**
   * Add or clear a number field:
   *
   * - To add, specify a numeric `value`.
   * - To clear, set `value` to `null`.
   */
  clearableNumberFields: z.array(JiraNumberFieldSchema).optional(),
  /**
   * Add or clear a color field:
   *
   * - To add, specify the color `name`. Available colors are: `purple`, `blue`, `green`, `teal`, `yellow`, `orange`,
   *   `grey`, `dark purple`, `dark blue`, `dark green`, `dark teal`, `dark yellow`, `dark orange`, `dark grey`.
   * - To clear, set the color `name` to an empty string.
   */
  colorFields: z.array(JiraColorFieldSchema).optional(),
  /**
   * Add or clear a date picker field:
   *
   * - To add, specify the date in `d/mmm/yy` format or ISO format `dd-mm-yyyy`.
   * - To clear, set `formattedDate` to an empty string.
   */
  datePickerFields: z.array(JiraDateFieldSchema).optional(),
  /**
   * Add or clear the planned start date and time:
   *
   * - To add, specify the date and time in ISO format for `formattedDateTime`.
   * - To clear, provide an empty string for `formattedDateTime`.
   */
  dateTimePickerFields: z.array(JiraDateTimeFieldSchema).optional(),
  issueType: JiraIssueTypeFieldSchema.optional(),
  /**
   * Edit a labels field:
   *
   * - Options include `ADD`, `REPLACE`, `REMOVE`, or `REMOVE_ALL` for bulk edits.
   * - To clear labels, use the `REMOVE_ALL` option with an empty `labels` array.
   */
  labelsFields: z.array(JiraLabelsFieldSchema).optional(),
  /**
   * Add or clear a multi-group picker field:
   *
   * - To add groups, provide an array of groups with `groupName`s.
   * - To clear all groups, use an empty `groups` array.
   */
  multipleGroupPickerFields: z.array(JiraMultipleGroupPickerFieldSchema).optional(),
  /**
   * Assign or unassign multiple users to/from a field:
   *
   * - To assign, provide an array of user `accountId`s.
   * - To clear, set `users` to `null`.
   */
  multipleSelectClearableUserPickerFields: z.array(JiraMultipleSelectUserPickerFieldSchema).optional(),
  /**
   * Add or clear a multi-select field:
   *
   * - To add, provide an array of options with `optionId`s.
   * - To clear, use an empty `options` array.
   */
  multipleSelectFields: z.array(JiraMultipleSelectFieldSchema).optional(),
  /**
   * Edit a multi-version picker field like Fix Versions/Affects Versions:
   *
   * - Options include `ADD`, `REPLACE`, `REMOVE`, or `REMOVE_ALL` for bulk edits.
   * - To clear the field, use the `REMOVE_ALL` option with an empty `versions` array.
   */
  multipleVersionPickerFields: z.array(JiraMultipleVersionPickerFieldSchema).optional(),
  multiselectComponents: JiraMultiSelectComponentFieldSchema.optional(),
  originalEstimateField: JiraDurationFieldSchema.optional(),
  priority: JiraPriorityFieldSchema.optional(),
  /**
   * Add or clear a rich text field:
   *
   * - To add, provide `adfValue`. Note that rich text fields only support ADF values.
   * - To clear, use an empty `richText` object.
   *
   * For ADF format details, refer to: [Atlassian Document
   * Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure).
   */
  richTextFields: z.array(JiraRichTextFieldSchema).optional(),
  /**
   * Add or clear a single group picker field:
   *
   * - To add, specify the group with `groupName`.
   * - To clear, set `groupName` to an empty string.
   */
  singleGroupPickerFields: z.array(JiraSingleGroupPickerFieldSchema).optional(),
  /**
   * Add or clear a single line text field:
   *
   * - To add, provide the `text` value.
   * - To clear, set `text` to an empty string.
   */
  singleLineTextFields: z.array(JiraSingleLineTextFieldSchema).optional(),
  /**
   * Edit assignment for single select user picker fields like Assignee/Reporter:
   *
   * - To assign an issue, specify the user's `accountId`.
   * - To unassign an issue, set `user` to `null`.
   * - For automatic assignment, set `accountId` to `-1`.
   */
  singleSelectClearableUserPickerFields: z.array(JiraSingleSelectUserPickerFieldSchema).optional(),
  /**
   * Add or clear a single select field:
   *
   * - To add, specify the option with an `optionId`.
   * - To clear, pass an option with `optionId` as `-1`.
   */
  singleSelectFields: z.array(JiraSingleSelectFieldSchema).optional(),
  /**
   * Add or clear a single version picker field:
   *
   * - To add, specify the version with a `versionId`.
   * - To clear, set `versionId` to `-1`.
   */
  singleVersionPickerFields: z.array(JiraSingleVersionPickerFieldSchema).optional(),
  status: JiraStatusInputSchema.optional(),
  timeTrackingField: JiraTimeTrackingFieldSchema.optional(),
  /**
   * Add or clear a URL field:
   *
   * - To add, provide the `url` with the desired URL value.
   * - To clear, set `url` to an empty string.
   */
  urlFields: z.array(JiraUrlFieldSchema).optional(),
});

export type JiraIssueFields = z.infer<typeof JiraIssueFieldsSchema>;
