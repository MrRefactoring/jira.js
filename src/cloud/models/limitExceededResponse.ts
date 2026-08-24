import { z } from 'zod';
import { apiObject } from '#/core';

export const LimitExceededResponseSchema = apiObject({
  current_count: z.number().optional(),
  entity_type: z.string().optional(),
  error_code: z.string().optional(),
  limit_type: z.string().optional(),
  max_allowed_limit: z.number().optional(),
  message: z.string().optional(),
  scope_id: z.string().optional(),
});

export type LimitExceededResponse = z.infer<typeof LimitExceededResponseSchema>;
