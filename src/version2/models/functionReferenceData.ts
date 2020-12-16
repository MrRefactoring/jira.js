/**
 * Details of functions that can be used in advanced searches. */
export interface FunctionReferenceData {
  /** The function identifier. */
  value?: string;
  /** The display name of the function. */
  displayName?: string;
  /** Whether the function can take a list of arguments. */
  isList?: string;
  /** The data types returned by the function. */
  types?: string[];
}
