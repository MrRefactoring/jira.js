import { z } from 'zod';
import { apiObject } from '#/core';

export const UserAnonymizationValidationSchema = apiObject({
  errors: z.record(z.string(), z.any()).optional(),
  warnings: z.record(z.string(), z.any()).optional(),
  userKey: z.string().optional(),
  userName: z.string().optional(),
  displayName: z.string().optional(),
  deleted: z.boolean().optional(),
  email: z.string().optional(),
  success: z.boolean().optional(),
  operations: z.array(z.string()).optional(),
  businessLogicValidationFailed: z.boolean().optional(),
  expand: z.string().optional(),
});

export type UserAnonymizationValidation = z.infer<typeof UserAnonymizationValidationSchema>;
