import { z } from 'zod';
import { apiObject } from '#/core';

export const AddFieldSchema = apiObject({
  /** The ID of the field to add. */
  fieldId: z.string(),
});

export type AddField = z.infer<typeof AddFieldSchema>;
