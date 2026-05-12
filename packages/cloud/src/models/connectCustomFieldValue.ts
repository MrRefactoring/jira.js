import { z } from 'zod';

/** A list of custom field details. */
export const ConnectCustomFieldValueSchema = z.object({
  /** The type of custom field. */
  _type: z.enum([
    'StringIssueField',
    'NumberIssueField',
    'RichTextIssueField',
    'SingleSelectIssueField',
    'MultiSelectIssueField',
    'TextIssueField',
  ]),
  /** The custom field ID. */
  fieldID: z.number(),
  /** The issue ID. */
  issueID: z.number(),
  /** The value of number type custom field when `_type` is `NumberIssueField`. */
  number: z.number().optional(),
  /**
   * The value of single select and multiselect custom field type when `_type` is `SingleSelectIssueField` or
   * `MultiSelectIssueField`.
   */
  optionID: z.string().optional(),
  /** The value of richText type custom field when `_type` is `RichTextIssueField`. */
  richText: z.string().optional(),
  /** The value of string type custom field when `_type` is `StringIssueField`. */
  string: z.string().optional(),
  /** The value of of text custom field type when `_type` is `TextIssueField`. */
  text: z.string().optional(),
});

export type ConnectCustomFieldValue = z.infer<typeof ConnectCustomFieldValueSchema>;
