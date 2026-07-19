import { z } from 'zod';
import { apiObject } from '#/core';
import { SelfLinkSchema } from './selfLink';
import { DateSchema } from './date';

export const OrganizationSchema = apiObject({
  _links: SelfLinkSchema.optional(),
  created: DateSchema.optional(),
  /** A unique system generated ID for the organization. */
  id: z.string().optional(),
  /** Name of the organization. */
  name: z.string().optional(),
  /** Returns if an organization is managed by scim. This field may not be present in some older organizations */
  scimManaged: z.boolean().optional(),
  /** A unique system generated ID for the organization. This is identity from the group directory id */
  uuid: z.string().optional(),
});

export type Organization = z.infer<typeof OrganizationSchema>;
