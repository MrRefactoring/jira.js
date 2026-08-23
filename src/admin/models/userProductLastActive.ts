import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const UserProductLastActiveSchema = apiObject({
  /** Unique ID of the Product instance */
  id: z.string(),
  /** Unique key of the Product */
  key: openEnum([
    'jira-software',
    'jira-service-desk',
    'jira-core',
    'jira-ops',
    'stride',
    'hipchat',
    'confluence',
    'bitbucket',
    'trello',
    'opsgenie',
    'statuspage',
  ]),
  /** Last active date for a product in ISO 8601 format (UTC), with the format yyyy-MM-dd. */
  last_active: z.string().optional(),
  /** Last active timestamp for a product in ISO 8601 format (UTC), with the format yyyy-MM-dd'T'HH:mm:ss'Z'. */
  last_active_timestamp: z.coerce.date().optional(),
});

export type UserProductLastActive = z.infer<typeof UserProductLastActiveSchema>;
