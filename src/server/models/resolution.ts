import type { z } from 'zod';
import { apiObject } from '#/core';

export const ResolutionSchema = apiObject({});

export type Resolution = z.infer<typeof ResolutionSchema>;
