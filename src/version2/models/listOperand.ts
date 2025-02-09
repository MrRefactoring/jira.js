import { JqlQueryUnitaryOperand } from './jqlQueryUnitaryOperand';

/** An operand that is a list of values. */
export interface ListOperand {
  /** Encoded operand, which can be used directly in a JQL query. */
  encodedOperand?: string;
  /** The list of operand values. */
  values: JqlQueryUnitaryOperand[];
}
