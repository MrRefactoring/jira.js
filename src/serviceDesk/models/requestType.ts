import { z } from 'zod';
import { apiObject } from '#/core';
import { SelfLinkSchema } from './selfLink';
import { CustomerRequestCreateMetaSchema } from './customerRequestCreateMeta';
import { RequestTypeIconSchema } from './requestTypeIcon';

export const RequestTypeSchema = apiObject({
  /** List of items that can be expanded in the response by specifying the expand query parameter. */
  _expands: z.array(z.string()).optional(),
  _links: SelfLinkSchema.optional(),
  /** Whether the user has permission to create a request with this request type. */
  canCreateRequest: z.boolean().optional(),
  /** Description of the request type. */
  description: z.string().optional(),
  fields: CustomerRequestCreateMetaSchema.optional(),
  /** List of the request type groups the request type belongs to. */
  groupIds: z.array(z.string()).optional(),
  /** Help text for the request type. */
  helpText: z.string().optional(),
  icon: RequestTypeIconSchema.optional(),
  /** ID for the request type. */
  id: z.string().optional(),
  /** ID of the issue type the request type is based upon. */
  issueTypeId: z.string().optional(),
  /** Short name for the request type. */
  name: z.string().optional(),
  /** ID of the customer portal associated with the service desk project. */
  portalId: z.string().optional(),
  /** The request type's practice */
  practice: z.string().optional(),
  /** Whether request type is restricted or not. */
  restrictionStatus: z.enum(['OPEN', 'RESTRICTED']).optional(),
  /** ID of the service desk the request type belongs to. */
  serviceDeskId: z.string().optional(),
});

export type RequestType = z.infer<typeof RequestTypeSchema>;
