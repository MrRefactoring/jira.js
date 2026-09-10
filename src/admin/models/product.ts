import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const ProductSchema = apiObject({
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
  /** Name of the Product */
  name: z.string(),
  /** URL of the Product */
  url: z.string().optional(),
  /** Last active date for a product */
  last_active: z.coerce.date().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
