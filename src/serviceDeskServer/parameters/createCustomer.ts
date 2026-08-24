import { z } from 'zod';
import { CustomerCreateSchema } from '../models';

export const CreateCustomerSchema = z.object(CustomerCreateSchema.shape);

export type CreateCustomer = z.input<typeof CreateCustomerSchema>;
