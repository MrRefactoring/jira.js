import { z } from 'zod';
import { apiObject } from '#/core';

export const ObjectTypeAttributesToDisplaySchema = apiObject({
  attributesToDisplayIds: z.array(z.number()).optional(),
});

export type ObjectTypeAttributesToDisplay = z.infer<typeof ObjectTypeAttributesToDisplaySchema>;
