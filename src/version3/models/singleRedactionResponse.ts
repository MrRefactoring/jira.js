/** Result for requested redactions */
export interface SingleRedactionResponse {
  /** An unique id for the redaction request */
  externalId: string;
  /** Indicates if redaction was success/failure */
  successful: boolean;
}
