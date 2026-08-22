import { z } from 'zod';
import { apiObject } from '#/core';

export const RequestTypeIconLinkSchema = apiObject({
  iconUrls: z.record(z.string(), z.any()).optional(),
});

export type RequestTypeIconLink = z.infer<typeof RequestTypeIconLinkSchema>;
