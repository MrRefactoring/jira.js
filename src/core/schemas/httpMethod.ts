import { z } from 'zod';

export const httpMethodSchema = z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']);

export type HttpMethod = z.infer<typeof httpMethodSchema>;
