import { z } from 'zod';
import { apiObject } from '#/core';

export const RequestTypeIconLinkSchema = apiObject({
  /** URLs for the request type icons. */
  iconUrls: z.record(z.string(), z.url()).optional(),
});

export type RequestTypeIconLink = z.infer<typeof RequestTypeIconLinkSchema>;
