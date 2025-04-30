/** A list of custom field details. */
export interface ConnectCustomFieldValue {
    /** The type of custom field. */
    Type: string;
    /** The issue ID. */
    issueID: number;
    /** The custom field ID. */
    fieldID: number;
    /** The value of string type custom field when `_type` is `StringIssueField`. */
    string?: string;
    /** The value of number type custom field when `_type` is `NumberIssueField`. */
    number?: number;
    /** The value of richText type custom field when `_type` is `RichTextIssueField`. */
    richText?: string;
    /**
     * The value of single select and multiselect custom field type when `_type` is `SingleSelectIssueField` or
     * `MultiSelectIssueField`.
     */
    optionID?: string;
    /** The value of of text custom field type when `_type` is `TextIssueField`. */
    text?: string;
}
