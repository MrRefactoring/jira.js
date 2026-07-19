import type { z } from 'zod';
import { apiObject } from '#/core';

export const StreamingResponseBodySchema = apiObject({});

export type StreamingResponseBody = z.infer<typeof StreamingResponseBodySchema>;
