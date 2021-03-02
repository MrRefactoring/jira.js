import { JqlQueryUnitaryOperand } from './jqlQueryUnitaryOperand';

/**
 * An operand that is a list of values. */
export interface ListOperand {
  /** The list of operand values. */
  values: JqlQueryUnitaryOperand[];
}
