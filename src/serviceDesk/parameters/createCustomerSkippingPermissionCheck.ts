import { z } from 'zod';
import { CustomerCreateSchema } from '../models';

export const CreateCustomerSkippingPermissionCheckSchema = z.object(CustomerCreateSchema.shape).extend({
  /** Optional boolean flag; when `true`, returns 409 Conflict for duplicate email instead of the default 400. */
  strictConflictStatusCode: z.boolean().optional(),
});

export type CreateCustomerSkippingPermissionCheck = z.input<typeof CreateCustomerSkippingPermissionCheckSchema>;
