import { z } from 'zod';
import { RequestCreateSchema } from '../models';

export const ValidateCustomerRequestSchema = z.object(RequestCreateSchema.shape);

export type ValidateCustomerRequest = z.input<typeof ValidateCustomerRequestSchema>;
