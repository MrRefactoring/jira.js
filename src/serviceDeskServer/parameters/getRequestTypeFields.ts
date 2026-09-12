import { z } from 'zod';

export const GetRequestTypeFieldsSchema = z.object({
  /** The id of the service desk. */
  serviceDeskId: z.string(),
  /** The id of the request type. */
  requestTypeId: z.string(),
});

export type GetRequestTypeFields = z.input<typeof GetRequestTypeFieldsSchema>;
