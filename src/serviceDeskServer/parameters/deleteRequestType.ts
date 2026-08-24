import { z } from 'zod';

export const DeleteRequestTypeSchema = z.object({
  /** The id of the service desk. */
  serviceDeskId: z.string(),
  /** The id of the request type. */
  requestTypeId: z.string(),
});

export type DeleteRequestType = z.input<typeof DeleteRequestTypeSchema>;
