import { z } from 'zod';
import { apiObject } from '#/core';
import { OrderByOptionSchema } from './orderByOption';

export const OrderByOptionsSchema = apiObject({
  fields: z.array(OrderByOptionSchema).optional(),
  matchesCount: z.number().optional(),
  maxResults: z.number().optional(),
  totalCount: z.number().optional(),
});

export type OrderByOptions = z.infer<typeof OrderByOptionsSchema>;
