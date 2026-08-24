import { z } from 'zod';
import { apiObject } from '#/core';
import { RequestTypeSchema } from './requestType';
import { ServiceDeskSchema } from './serviceDesk';
import { DateSchema } from './date';
import { UserSchema } from './user';
import { CustomerRequestFieldValueSchema } from './customerRequestFieldValue';
import { CustomerRequestStatusSchema } from './customerRequestStatus';
import { PagedCustomerRequestStatusSchema } from './pagedCustomerRequestStatus';
import { PagedUserSchema } from './pagedUser';
import { PagedSlaInformationSchema } from './pagedSlaInformation';
import { CustomerRequestLinkSchema } from './customerRequestLink';

export const CustomerRequestSchema = apiObject({
  _expands: z.array(z.string()).optional(),
  issueId: z.string().optional(),
  issueKey: z.string().optional(),
  requestTypeId: z.string().optional(),
  requestType: RequestTypeSchema.optional(),
  serviceDeskId: z.string().optional(),
  serviceDesk: ServiceDeskSchema.optional(),
  createdDate: DateSchema.optional(),
  reporter: UserSchema.optional(),
  requestFieldValues: z.array(CustomerRequestFieldValueSchema).optional(),
  currentStatus: CustomerRequestStatusSchema.optional(),
  status: PagedCustomerRequestStatusSchema.optional(),
  participants: PagedUserSchema.optional(),
  sla: PagedSlaInformationSchema.optional(),
  _links: CustomerRequestLinkSchema.optional(),
});

export type CustomerRequest = z.infer<typeof CustomerRequestSchema>;
