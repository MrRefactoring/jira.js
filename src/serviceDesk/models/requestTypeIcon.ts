import { z } from 'zod';
import { apiObject } from '#/core';
import { RequestTypeIconLinkSchema } from './requestTypeIconLink';

export const RequestTypeIconSchema = apiObject({
  _links: RequestTypeIconLinkSchema.optional(),
  /** ID of the request type icon. */
  id: z.string().optional(),
});

export type RequestTypeIcon = z.infer<typeof RequestTypeIconSchema>;
