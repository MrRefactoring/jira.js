import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { LinkRelatedModelSchema } from './linkRelatedModel';
import { LinkSelfModelSchema } from './linkSelfModel';

export const OrgModelSchema = apiObject({
  /** Unique identifier of the Org */
  id: z.string(),
  /** Type name of this object */
  type: openEnum(['orgs']),
  /** Attributes of this object */
  attributes: apiObject({
    /** Name of this Org */
    name: z.string().optional(),
  }),
  /** Relationships of this object */
  relationships: apiObject({
    /** Link to the related Domains of the Org */
    domains: apiObject({
      links: LinkRelatedModelSchema.optional(),
    }).optional(),
    /** Link to the related Users of the Org */
    users: apiObject({
      links: LinkRelatedModelSchema.optional(),
    }).optional(),
  }),
  links: LinkSelfModelSchema,
});

export type OrgModel = z.infer<typeof OrgModelSchema>;
