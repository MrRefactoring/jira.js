import { z } from 'zod';

/** Jql function precomputation. */
export const JqlFunctionPrecomputationBeanSchema = z.object({
  /** The list of arguments function was invoked with. */
  arguments: z.array(z.string()).optional(),
  /** The timestamp of the precomputation creation. */
  created: z.string().datetime().optional(),
  /** The error message to be displayed to the user. */
  error: z.string().optional(),
  /** The field the function was executed against. */
  field: z.string().optional(),
  /** The function key. */
  functionKey: z.string().optional(),
  /** The name of the function. */
  functionName: z.string().optional(),
  /** The id of the precomputation. */
  id: z.string().optional(),
  /** The operator in context of which function was executed. */
  operator: z.string().optional(),
  /** The timestamp of the precomputation last update. */
  updated: z.string().datetime().optional(),
  /** The timestamp of the precomputation last usage. */
  used: z.string().datetime().optional(),
  /** The JQL fragment stored as the precomputation. */
  value: z.string().optional(),
});

export type JqlFunctionPrecomputationBean = z.infer<typeof JqlFunctionPrecomputationBeanSchema>;
