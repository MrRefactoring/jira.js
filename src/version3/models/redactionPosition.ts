/** Represents the position of the redaction */
export interface RedactionPosition {
  /**
   * The ADF pointer indicating the position of the text to be redacted. This is only required when redacting from rich
   * text(ADF) fields. For plain text fields, this field can be omitted.
   */
  adfPointer?: string;
  /** The text which will be redacted, encoded using SHA256 hash and Base64 digest */
  expectedText: string;
  /** The start index(inclusive) for the redaction in specified content */
  from: number;
  /** The ending index(exclusive) for the redaction in specified content */
  to: number;
}
