import { z } from 'zod';
import { CustomerCreateSchema } from '../models';

export const CreateCustomerSchema = z
  .object({
    /** Optional boolean flag to return 409 Conflict status code for duplicate customer creation request */
    strictConflictStatusCode: z.boolean().optional(),
  })
  .extend(CustomerCreateSchema.shape);

export type CreateCustomer = z.input<typeof CreateCustomerSchema>;
