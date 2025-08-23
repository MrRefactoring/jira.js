import { z } from 'zod';

export const StreamingResponseBodySchema = z.object({});

export type StreamingResponseBody = z.infer<typeof StreamingResponseBodySchema>;
