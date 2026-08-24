import { z } from 'zod';
import { CustomerTransitionExecutionSchema } from '../models';

export const PerformCustomerTransitionSchema = z.object(CustomerTransitionExecutionSchema.shape).extend({
  /** The id or key of the customer request. */
  issueIdOrKey: z.string(),
});

export type PerformCustomerTransition = z.input<typeof PerformCustomerTransitionSchema>;
