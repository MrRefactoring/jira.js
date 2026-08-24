import { z } from 'zod';
import { apiObject } from '#/core';

export const RequestParticipantUpdateSchema = apiObject({
  usernames: z.array(z.string()).optional(),
});

export type RequestParticipantUpdate = z.infer<typeof RequestParticipantUpdateSchema>;
