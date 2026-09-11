import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueLinkTypeResetOrderRequestSchema = apiObject({
  direction: z.string().optional(),
});

export type IssueLinkTypeResetOrderRequest = z.infer<typeof IssueLinkTypeResetOrderRequestSchema>;
