import { z } from 'zod';
import { apiObject } from '#/core';

export const FieldEditSchema = apiObject({
  value: z.string().optional(),
});

export type FieldEdit = z.infer<typeof FieldEditSchema>;
