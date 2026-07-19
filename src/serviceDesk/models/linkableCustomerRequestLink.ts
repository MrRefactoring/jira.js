import type { z } from 'zod';
import { apiObject } from '#/core';
import { CustomerRequestLinkSchema } from './customerRequestLink';

export const LinkableCustomerRequestLinkSchema = apiObject({
  _links: CustomerRequestLinkSchema.optional(),
});

export type LinkableCustomerRequestLink = z.infer<typeof LinkableCustomerRequestLinkSchema>;
