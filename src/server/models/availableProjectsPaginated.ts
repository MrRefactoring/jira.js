import type { z } from 'zod';
import { apiObject } from '#/core';
import { PageProjectSchema } from './pageProject';

export const AvailableProjectsPaginatedSchema = apiObject({
  results: PageProjectSchema.optional(),
});

export type AvailableProjectsPaginated = z.infer<typeof AvailableProjectsPaginatedSchema>;
