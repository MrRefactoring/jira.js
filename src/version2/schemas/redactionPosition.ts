import { z } from 'zod';

/** Represents the position of the redaction */
export const RedactionPositionSchema = z.object({
  /**
   * The ADF pointer indicating the position of the text to be redacted. This is only required when redacting from rich
   * text(ADF) fields. For plain text fields, this field can be omitted.
   */
  adfPointer: z.string().optional(),
  /** The text which will be redacted, encoded using SHA256 hash and Base64 digest */
  expectedText: z.string(),
  /** The start index(inclusive) for the redaction in specified content */
  from: z.number().int(),
  /** The ending index(exclusive) for the redaction in specified content */
  to: z.number().int(),
});

export type RedactionPosition = z.infer<typeof RedactionPositionSchema>;
