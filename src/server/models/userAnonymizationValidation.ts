import { z } from 'zod';
import { apiObject } from '#/core';
import { AffectedEntitySchema } from './affectedEntity';
import { ErrorCollectionSchema } from './errorCollection';

export const UserAnonymizationValidationSchema = apiObject({
  affectedEntities: z.record(z.string(), z.array(AffectedEntitySchema)).optional(),
  businessLogicValidationFailed: z.boolean().optional(),
  deleted: z.boolean().optional(),
  displayName: z.string().optional(),
  email: z.string().optional(),
  errors: z.record(z.string(), ErrorCollectionSchema).optional(),
  expand: z.string().optional(),
  operations: z.array(z.string()).optional(),
  success: z.boolean().optional(),
  userKey: z.string().optional(),
  userName: z.string().optional(),
  warnings: z.record(z.string(), ErrorCollectionSchema).optional(),
});

export type UserAnonymizationValidation = z.infer<typeof UserAnonymizationValidationSchema>;
