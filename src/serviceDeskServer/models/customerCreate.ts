import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomerCreateSchema = apiObject({
  email: z.string().optional(),
  fullName: z.string().optional(),
});

export type CustomerCreate = z.infer<typeof CustomerCreateSchema>;
