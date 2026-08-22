import { z } from 'zod';
import { apiObject } from '#/core';
import { RequestTypeIconLinkSchema } from './requestTypeIconLink';

export const RequestTypeIconSchema = apiObject({
  id: z.string().optional(),
  _links: RequestTypeIconLinkSchema.optional(),
});

export type RequestTypeIcon = z.infer<typeof RequestTypeIconSchema>;
