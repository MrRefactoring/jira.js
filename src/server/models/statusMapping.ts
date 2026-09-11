import { z } from 'zod';
import { apiObject } from '#/core';

export const StatusMappingSchema = apiObject({
  issueTypeName: z.string().optional(),
  sourceStatusName: z.string().optional(),
  targetStatusName: z.string().optional(),
});

export type StatusMapping = z.infer<typeof StatusMappingSchema>;
