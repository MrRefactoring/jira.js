import type { z } from 'zod';
import { apiObject } from '#/core';

export const IndexPersistResponseSchema = apiObject({});

export type IndexPersistResponse = z.infer<typeof IndexPersistResponseSchema>;
