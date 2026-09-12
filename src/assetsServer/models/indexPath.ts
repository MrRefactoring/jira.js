import type { z } from 'zod';
import { apiObject } from '#/core';

export const IndexPathSchema = apiObject({});

export type IndexPath = z.infer<typeof IndexPathSchema>;
