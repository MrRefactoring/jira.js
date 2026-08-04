import { z } from 'zod';
import { CustomerTransitionExecutionSchema } from '../models';

export const PerformCustomerTransitionSchema = z
  .object({
    /** ID or key of the issue to transition */
    issueIdOrKey: z.string(),
  })
  .extend(CustomerTransitionExecutionSchema.shape);

export type PerformCustomerTransition = z.input<typeof PerformCustomerTransitionSchema>;
