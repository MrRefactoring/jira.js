import { z } from 'zod';
import { CustomerTransitionExecutionSchema } from '../models';

export const PerformCustomerTransitionSchema = z.object({}).extend(CustomerTransitionExecutionSchema.shape).extend({
  /** ID or key of the issue to transition */
  issueIdOrKey: z.string(),
});

export type PerformCustomerTransition = z.input<typeof PerformCustomerTransitionSchema>;
