import { z } from 'zod';
import { JqlFunctionPrecomputationUpdateBeanSchema } from './jqlFunctionPrecomputationUpdateBean';

/** List of pairs (id and value) for precomputation updates. */
export const JqlFunctionPrecomputationUpdateRequestBeanSchema = z.object({
  values: z.array(JqlFunctionPrecomputationUpdateBeanSchema).optional(),
});

export type JqlFunctionPrecomputationUpdateRequestBean = z.infer<
  typeof JqlFunctionPrecomputationUpdateRequestBeanSchema
>;
