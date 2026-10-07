import { z } from 'zod';
import { apiObject } from '#/core';

export const LinkSelfModelSchema = apiObject({
  /** URL to fetch this resource */
  self: z.string().nullish(),
});

export type LinkSelfModel = z.infer<typeof LinkSelfModelSchema>;
