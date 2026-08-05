import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** Details of functions that can be used in advanced searches. */

export const FunctionReferenceDataSchema = apiObject({
  /** The display name of the function. */
  displayName: z.string().optional(),
  /** Whether the function can take a list of arguments. */
  isList: openEnum(['true', 'false']).optional(),
  /** Whether the function supports both single and list value operators. */
  supportsListAndSingleValueOperators: openEnum(['true', 'false']).optional(),
  /** The data types returned by the function. */
  types: z.array(z.string()).optional(),
  /** The function identifier. */
  value: z.string().optional(),
});

export type FunctionReferenceData = z.infer<typeof FunctionReferenceDataSchema>;
