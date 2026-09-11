import { z } from 'zod';
import { apiObject } from '#/core';

export const ActorInputSchema = apiObject({
  group: z.array(z.string()).optional(),
  user: z.array(z.string()).optional(),
});

export type ActorInput = z.infer<typeof ActorInputSchema>;
