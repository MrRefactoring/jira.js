import { z } from 'zod';

/** Precomputation id and its new value. */
export const JqlFunctionPrecomputationUpdateBeanSchema = z.object({
  /**
   * The error message to be displayed to the user if the given function clause is no longer valid during recalculation
   * of the precomputation.
   */
  error: z.string().optional(),
  /** The id of the precomputation to update. */
  id: z.string(),
  /** The new value of the precomputation. */
  value: z.string().optional(),
});

export type JqlFunctionPrecomputationUpdateBean = z.infer<typeof JqlFunctionPrecomputationUpdateBeanSchema>;
