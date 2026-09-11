import type { z } from 'zod';
import { apiObject } from '#/core';

export const StreamingOutputSchema = apiObject({});

export type StreamingOutput = z.infer<typeof StreamingOutputSchema>;
