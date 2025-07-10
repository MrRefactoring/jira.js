import { z } from 'zod';
import { LinksSchema } from './links';

export const ProductSchema = z.strictObject({
  key: z.enum([
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
  url: z.url().optional(),
  /** Last active date for a product */
  last_active: z.string().optional(), // todo convert to date
  links: LinksSchema,
});

export type Product = z.infer<typeof ProductSchema>;
