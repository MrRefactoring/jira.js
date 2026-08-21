import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const MoveFieldSchema = apiObject({
  after: z.url().optional(),
  position: openEnum(['Earlier', 'Later', 'First', 'Last']).optional(),
});

export type MoveField = z.infer<typeof MoveFieldSchema>;
