import { z } from 'zod';
import { apiObject } from '#/core';

export const LinkRelatedModelSchema = apiObject({
  /** URL to fetch this resource */
  related: z.string(),
});

export type LinkRelatedModel = z.infer<typeof LinkRelatedModelSchema>;
