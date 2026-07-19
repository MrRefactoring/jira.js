import { z } from 'zod';
import { apiObject } from '#/core';

export const RequestTypeCreateSchema = apiObject({
  /** Description of the request type on the service desk. */
  description: z.string().optional(),
  /** Help text for the request type on the service desk. */
  helpText: z.string().optional(),
  /** ID of the request type to add to the service desk. */
  issueTypeId: z.string().optional(),
  /** Name of the request type on the service desk. */
  name: z.string().optional(),
});

export type RequestTypeCreate = z.infer<typeof RequestTypeCreateSchema>;
