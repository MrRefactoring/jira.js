/** An operand that is a user-provided value. */
export interface ValueOperand {
  /** Encoded value, which can be used directly in a JQL query. */
  encodedValue?: string;
  /** The operand value. */
  value: string;
}
