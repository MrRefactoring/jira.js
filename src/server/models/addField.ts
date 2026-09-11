import { z } from 'zod';
import { apiObject } from '#/core';

export const AddFieldSchema = apiObject({
  fieldId: z.string().optional(),
});

export type AddField = z.infer<typeof AddFieldSchema>;
