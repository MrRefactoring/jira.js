import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const GroupLabelSchema = apiObject({
  text: z.string().optional(),
  title: z.string().optional(),
  type: openEnum(['ADMIN', 'SINGLE', 'MULTIPLE']).optional(),
});

export type GroupLabel = z.infer<typeof GroupLabelSchema>;
