import { z } from 'zod';
import { apiObject } from '#/core';

export const CreateCustomFieldRequestSchema = apiObject({
  /** The custom field ID. */
  customFieldId: z.number(),
  /** Allows filtering issues based on their values for the custom field. */
  filter: z.boolean().optional(),
});

export type CreateCustomFieldRequest = z.infer<typeof CreateCustomFieldRequestSchema>;
