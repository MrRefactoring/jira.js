import { z } from 'zod';

export const OrganizationSchema = z.strictObject({
  /** Unique identifier of the Org */
  id: z.string(),
  /** Type name of this object */
  type: z.enum(['orgs']),
  /** Attributes of this object */
  attributes: z.strictObject({
    /** Name of this Org */
    name: z.string(),
  }),
  /** Relationships of this object */
  relationships: z.strictObject({
    /** Link to the related Domains of the Org */
    domains: z.strictObject({
      /** URL to fetch this resource */
      related: z.string(),
    }),
    /** Link to the related Users of the Org */
    users: z.strictObject({
      /** URL to fetch this resource */
      related: z.string(),
    }),
  }),
  links: z.strictObject({
    /** URL to fetch this resource */
    self: z.string(),
  }),
});

export type Organization = z.infer<typeof OrganizationSchema>;
