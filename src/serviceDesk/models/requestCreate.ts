import { z } from 'zod';
import { apiObject } from '#/core';
import { FormSchema } from './form';

export const RequestCreateSchema = apiObject({
  /** (Experimental) Shows extra information for the request channel. */
  channel: z.string().optional(),
  form: FormSchema.optional(),
  /** (Experimental) Whether to accept rich text fields in Atlassian Document Format (ADF). */
  isAdfRequest: z.boolean().optional(),
  /** The `accountId` of the customer that the request is being raised on behalf of. */
  raiseOnBehalfOf: z.string().optional(),
  /** JSON map of Jira field IDs and their values representing the content of the request. */
  requestFieldValues: z.record(z.string(), z.any()).optional(),
  /** List of customers to participate in the request, as a list of `accountId` values. */
  requestParticipants: z.array(z.string()).optional(),
  /** ID of the request type for the request. */
  requestTypeId: z.string().optional(),
  /** ID of the service desk in which to create the request. */
  serviceDeskId: z.string().optional(),
});

export type RequestCreate = z.infer<typeof RequestCreateSchema>;
