import { z } from 'zod';
import { apiObject } from '#/core';
import { SecurityLevelJsonSchema } from './securityLevelJson';

export const SecurityListLevelJsonSchema = apiObject({
  levels: z.array(SecurityLevelJsonSchema).optional(),
});

export type SecurityListLevelJson = z.infer<typeof SecurityListLevelJsonSchema>;
