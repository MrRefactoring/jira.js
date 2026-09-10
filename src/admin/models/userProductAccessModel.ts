import { z } from 'zod';
import { apiObject } from '#/core';
import { UserProductLastActiveSchema } from './userProductLastActive';

export const UserProductAccessModelSchema = apiObject({
  /** Products accessed by the user */
  product_access: z.array(UserProductLastActiveSchema),
  /** Date the user was added to the organization in ISO 8601 format (UTC), with the format yyyy-MM-dd. */
  added_to_org: z.string().nullish(),
  /**
   * Date and timestamp the user was added to the organization in ISO 8601 format (UTC), with the format
   * yyyy-MM-dd'T'HH:mm:ss'Z'.
   */
  added_to_org_timestamp: z.coerce.date().nullish(),
});

export type UserProductAccessModel = z.infer<typeof UserProductAccessModelSchema>;
