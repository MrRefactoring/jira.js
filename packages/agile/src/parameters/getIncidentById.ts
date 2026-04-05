import { z } from 'zod';

export const GetIncidentByIdSchema = z.object({
  /** The ID of the Incident to fetch. */
  incidentId: z.string().max(255, 'incidentId must be at most 255 characters'),
});

export type GetIncidentById = z.input<typeof GetIncidentByIdSchema>;
