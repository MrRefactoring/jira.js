import { z } from 'zod';
import { apiObject } from '#/core';
import { CustomerRequestLinkSchema } from './customerRequestLink';
import { CustomerRequestActionsSchema } from './customerRequestActions';
import { PagedAttachmentSchema } from './pagedAttachment';
import { PagedCommentSchema } from './pagedComment';
import { DateSchema } from './date';
import { CustomerRequestStatusSchema } from './customerRequestStatus';
import { PagedUserSchema } from './pagedUser';
import { UserSchema } from './user';
import { CustomerRequestFieldValueSchema } from './customerRequestFieldValue';
import { RequestTypeSchema } from './requestType';
import { ServiceDeskSchema } from './serviceDesk';
import { PagedSlaInformationSchema } from './pagedSlaInformation';
import { PagedCustomerRequestStatusSchema } from './pagedCustomerRequestStatus';

export const CustomerRequestSchema = apiObject({
  /** List of items that can be expanded in the response by specifying the expand query parameter. */
  _expands: z.array(z.string()).optional(),
  _links: CustomerRequestLinkSchema.optional(),
  actions: CustomerRequestActionsSchema.optional(),
  attachments: PagedAttachmentSchema.optional(),
  comments: PagedCommentSchema.optional(),
  createdDate: DateSchema.optional(),
  currentStatus: CustomerRequestStatusSchema.optional(),
  /** ID of the request, as the peer issue ID. */
  issueId: z.string().optional(),
  /** Key of the request, as the peer issue key. */
  issueKey: z.string().optional(),
  participants: PagedUserSchema.optional(),
  reporter: UserSchema.optional(),
  /**
   * JSON map of Jira field IDs and their values representing the content of the request. This list does not include
   * hidden fields.
   */
  requestFieldValues: z.array(CustomerRequestFieldValueSchema).optional(),
  requestType: RequestTypeSchema.optional(),
  /** ID of the request type for the request. */
  requestTypeId: z.string().optional(),
  serviceDesk: ServiceDeskSchema.optional(),
  /** ID of the service desk the request belongs to. */
  serviceDeskId: z.string().optional(),
  sla: PagedSlaInformationSchema.optional(),
  status: PagedCustomerRequestStatusSchema.optional(),
  /** Summary of the request created */
  summary: z.string().optional(),
});

export type CustomerRequest = z.infer<typeof CustomerRequestSchema>;
