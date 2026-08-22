import { z } from 'zod';
import { apiObject } from '#/core';

export const JSTreePositionSchema = apiObject({
  toObjectTypeId: z.number().optional(),
  position: z.number().optional(),
});

export type JSTreePosition = z.infer<typeof JSTreePositionSchema>;
