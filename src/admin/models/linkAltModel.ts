import { z } from 'zod';
import { apiObject } from '#/core';

export const LinkAltModelSchema = apiObject({
  /** Alternate URL to fetch this resource */
  alt: z.string(),
});

export type LinkAltModel = z.infer<typeof LinkAltModelSchema>;
