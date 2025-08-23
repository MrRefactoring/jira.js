import { z } from 'zod';
import { JqlFunctionPrecomputationUpdateBeanSchema } from './jqlFunctionPrecomputationUpdateBean';

export const UpdatePrecomputationsParametersSchema = z.object({
  skipNotFoundPrecomputations: z.boolean().optional(),
  values: z.array(JqlFunctionPrecomputationUpdateBeanSchema).optional(),
});

export type UpdatePrecomputationsParameters = z.infer<typeof UpdatePrecomputationsParametersSchema>;
