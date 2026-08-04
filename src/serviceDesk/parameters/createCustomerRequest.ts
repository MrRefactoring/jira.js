import { z } from 'zod';
import { RequestCreateSchema } from '../models';

export const CreateCustomerRequestSchema = z.object({}).extend(RequestCreateSchema.shape);

export type CreateCustomerRequest = z.input<typeof CreateCustomerRequestSchema>;
