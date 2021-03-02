/**
 * An operand that is a function. See [Advanced searching - functions reference](https://confluence.atlassian.com/x/dwiiLQ) for more information about JQL functions. */
export interface FunctionOperand {
  /** The name of the function. */
  function: string;
  /** The list of function arguments. */
  arguments: string[];
}
