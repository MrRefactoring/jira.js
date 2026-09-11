import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueLinkTypeOrderUpdateRequestSchema = apiObject({
  newPosition: z.number().optional(),
});

export type IssueLinkTypeOrderUpdateRequest = z.infer<typeof IssueLinkTypeOrderUpdateRequestSchema>;
