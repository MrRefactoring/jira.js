import { z } from 'zod';
import { apiObject } from '#/core';
/** Links for a resources with self and alternate links */

export const LinkSelfAltModelSchema = apiObject({
  /** URL to fetch this resource */
  self: z.string().nullish(),
  /** Alternate URL to fetch this resource */
  alt: z.string().optional(),
});

export type LinkSelfAltModel = z.infer<typeof LinkSelfAltModelSchema>;
