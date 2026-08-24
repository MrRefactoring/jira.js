import { z } from 'zod';
import { apiObject } from '#/core';

export const ServletConnectionSchema = apiObject({
  connectionId: z.string().optional(),
  protocol: z.string().optional(),
  protocolConnectionId: z.string().optional(),
  secure: z.boolean().optional(),
});

export type ServletConnection = z.infer<typeof ServletConnectionSchema>;
