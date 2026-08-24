import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { LinkSelfModelSchema } from './linkSelfModel';

export const DomainModelSchema = apiObject({
  /** Unique identifier of the Domain */
  id: z.string(),
  /** Type name of this object */
  type: openEnum(['domains']),
  /** Attributes of this object */
  attributes: apiObject({
    /** Domain Name */
    name: z.string().optional(),
    /** Claim for the domain */
    claim: apiObject({
      type: openEnum(['http', 'dns']).optional(),
      /** Verification Status of the Domain Claim */
      status: openEnum(['verified', 'deleted', 'unverified', 'superseded', 'missing_token']).optional(),
    }).optional(),
  }),
  links: LinkSelfModelSchema,
});

export type DomainModel = z.infer<typeof DomainModelSchema>;
