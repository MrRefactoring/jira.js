import { z } from 'zod';

/** A list of custom field details. */
export const ConnectCustomFieldValueSchema = z
  .object({
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
    fieldID: z.number().int(),
    /** The issue ID. */
    issueID: z.number().int(),
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
  })
  .transform(val => ({
    type: val['_type'],
    fieldID: val['fieldID'],
    issueID: val['issueID'],
    number: val['number'],
    optionID: val['optionID'],
    richText: val['richText'],
    string: val['string'],
    text: val['text'],
  }));

export type ConnectCustomFieldValue = z.infer<typeof ConnectCustomFieldValueSchema>;
